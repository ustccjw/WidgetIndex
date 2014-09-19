/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/base_loader.js ~ 2013/12/03 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/

goog.require('ad.array');
goog.require('ad.base');
goog.require('ad.event');
goog.require('ad.browser');
goog.require('ad.dom');
goog.require('ad.plugin.imageplus.Loader');
goog.require('ui.events');

goog.provide('ad.plugin.imageplus.BaseLoader');

/**
 * imageplus Loader
 *
 * @extends ad.plugin.imageplus.Loader
 * @constructor
 * @param {ad.plugin.imageplus.LoaderConfig} config .
 */
ad.plugin.imageplus.BaseLoader = function (config) {
    ad.plugin.imageplus.Loader.call(this, config);

    var qidCookieKey = 'baiduImageplusQid';
    var qidInCookie = baidu.cookie.get(qidCookieKey);
    if (qidInCookie) {
        baidu.cookie.remove(qidCookieKey, {
            'path': '/'
        });
    }

    /**
     * qid 记录了页面的一次加载，用于后端统计
     * @type {string} .
     */
    this._qid = qidInCookie || (ad.base.uuid() + new Date().getTime());
    // 存在全局共享数据中，供render使用
    this.setGShareData('qid', this._qid);

    /**
     * 最大可展现图+广告的数量
     * @type {number}
     */
    this._maxAdCount = this.config.get('maxAdCount');
    /**
     * 可视窗口宽度
     * @type {number}
     */
    this._clientW = 0;
    /**
     * 可视窗口高度
     * @type {number}
     */
    this._clientH = 0;

    /**
     * 记录日志时间
     * @type {Object}
     */
    this._logTimes = {};

    /**
     * 缓存的数据
     * @type {Object}
     */
    this._cachedDatas = {};

    /**
     * 页面的图片总数
     * @type {number}
     */
    this._allPageImgsCount = document.getElementsByTagName('img').length;

    /**
     * 是否准备好，任何api可以调用
     * @type {boolean}
     */
    this._isReady = false;

    /**
     * 准备好（start）后执行的函数
     * @type {Array.<Function>}
     */
    this._readyCallbacks = [];

    /**
     * 缓存的数据
     * @type {Object}
     */
    this._cachedData = {};

    /**
     * 已展现的广告数量
     * @type {number}
     */
    this._showedAdCount = 0;

    /**
     * 获取请求的次数
     * @type {number}
     */
    this._requestDataCount = 0;

    /**
     * body的位置信息
     * @type {Object}
     */
    this._bodyPos = null;
};

baidu.inherits(ad.plugin.imageplus.BaseLoader, ad.plugin.imageplus.Loader);

/**
 * 设置logTimes
 *
 * @param {Object} logTimes .
 */
ad.plugin.imageplus.BaseLoader.prototype.setLogTimes = function (logTimes) {
    this._logTimes = logTimes;
};

/**
 * 查找页面上的图片
 * @return {Array.<Element>} imgs
 */
ad.plugin.imageplus.BaseLoader.prototype.findImgs = function () {
    // find imgs
    var imgContainerId = this.config.get('imgContainerId');
    var imgContainer = imgContainerId
        ? ad.dom.g(imgContainerId)
        : document;
    var imgs = imgContainer.nodeName.toLowerCase() === 'img'
        ? [imgContainer]
        : imgContainer.getElementsByTagName('img');
    return baidu.lang.toArray(imgs);
};

/** @override */
ad.plugin.imageplus.BaseLoader.prototype.main = function () {
    var me = this;
    if (!me.config.get('autoStart')) {
        return;
    }

    function start() {
        me.showAds();
        me.watchAds();
        me._isReady = true;
        ad.array.each(me._readyCallbacks, function (cb) {
            cb = /** @type {Function} */(cb);
            cb();
        });
    }

    if (document.readyState === 'complete') {
        start();
    }
    else {
        ad.event.on(window, 'load', start);
    }
};

/**
 *
 * @param {Function} callback
 */
ad.plugin.imageplus.BaseLoader.prototype.ready = function (callback) {
    if (this._isReady) {
        callback();
    }
    else {
        this._readyCallbacks.push(callback);
    }
};

/**
 * 尽可能展现更多广告，直到达到可展现的最大值。
 * 并且展现所有隐藏的广告。
 */
ad.plugin.imageplus.BaseLoader.prototype.showAds = function () {
    var me = this;
    var adsCount = me.getLength();

    if (adsCount > 0) {
        // 广告已经展现，则显示他们
        me.eachImgInfo(function (imgInfo, imgIndex) {
            me._showAd(imgIndex);
        });
    }

    if (adsCount < me._maxAdCount) {
        // 还可以展现更多广告
        // 则尝试获取数据找到更多广告
        var imgs = me.findImgs();
        var loadAd = function () {
            if (!imgs.length) {
                return;
            }

            if (me.getLength() >= me._maxAdCount) {
                // 广告展现量超过上限
                return;
            }

            var img = imgs.shift();
            if (!me.config.isImgFollowRules(img)) {
                loadAd();
                return;
            }

            me.showAd(img, function (success) {
                if (!success) {
                    loadAd();
                    return;
                }

                me.setupImgCover(img);
                ad.base.setTimeout(loadAd, 500);
            });
        };

        loadAd();
    }
};

/**
 * 获取数据，并显示广告.
 *
 * @param {Element|number} imgOrIndex 图片元素或是图片索引.
 * @param {function(number)=} opt_callback 展现结束后的回调函数，参数为imgIndex.
 */
ad.plugin.imageplus.BaseLoader.prototype.showAd = function (imgOrIndex, opt_callback) {
    var me = this;

    var oldImgIndex = me.getImgIndex(imgOrIndex);
    if (oldImgIndex) {
        // 如果已经被设置过了，则显示这个广告
        me._showAd(oldImgIndex);
        if (opt_callback) {
            opt_callback(oldImgIndex);
        }
        return;
    }

    // 如果图片不存在广告，则需要获取数据后再展现
    // 如果img为number，则不会执行到这里
    var img = /** @type {Element} */(imgOrIndex);

    if (me.getLength() >= me._maxAdCount) {
        // 已经超过最大展现量了
        if (opt_callback) {
            opt_callback(0);
        }
        return;
    }

    if (me._imgInAd(img)) {
        // 找到图片本身就是图+的广告图片
        if (opt_callback) {
            opt_callback(0);
        }
        return;
    }

    var foundTime = new Date().getTime();
    me._onImgLoad(img, function (success) {
        if (!success || (me.getLength() >= me._maxAdCount)) {
            // 如果图片未加载成功或是广告展现量超过上限
            if (opt_callback) {
                opt_callback(0);
            }
            return;
        }

        // 记录下决定展现这个广告时，这个图片的真实位置和高宽
        // 避免加载广告的过程中，图片被隐藏之后获取到错误位置和高宽的情况
        // 确保在调用setupImg方法创建wrapper时，能拿到正确的位置和高宽
        img['baiduImageplusRect'] = me._getRect(img);
        // 开始加载数据的时间点
        var startLoadingTime = new Date().getTime();
        me.getData(img, function (data) {
            if (!data || (me.getLength() >= me._maxAdCount)) {
                // 如果没数据或是广告展现量超过上限
                if (opt_callback) {
                    opt_callback(0);
                }
                return;
            }

            // 加载数据成功的时间点
            var loadedTime = new Date().getTime();
            // img.src 返回的是encode之后的路径
            var imgUrl = decodeURIComponent(img.src);
            var imgIndex;
            var typeData;
            var adDatas;
            var adData;
            // 是否有数据用来展现广告
            var hasDataToShow = false;
            var initedImg = false;
            var onRenderLoaded = function (event, renderUrl, canvasId) {
                if (event['imgIndex'] === imgIndex) {
                    for (var key in me._logTimes) {
                        me.recordKey(imgIndex, canvasId, key, me._logTimes[key]);
                    }
                    me.recordKey(imgIndex, canvasId, 'found', foundTime);
                    me.recordKey(imgIndex, canvasId, 'loading', startLoadingTime);
                    me.recordKey(imgIndex, canvasId, 'loaded', loadedTime);
                    me.recordKey(imgIndex, canvasId, 'render_loaded', new Date().getTime());
                    me.recordKey(imgIndex, canvasId, 'ad_count', me._showedAdCount);
                    me.recordKey(imgIndex, canvasId, 'pg_rect', me._getViewPagePos());
                    var rect = imgInfo.rect;
                    me.recordKey(imgIndex, canvasId, 'img_rect', [
                        rect['top'],
                        rect['left'],
                        rect['width'],
                        rect['height']
                    ].join('_'));
                }
            };

            for (var i = 0, l = data.length; i < l; i++) {
                typeData = data[i];
                adDatas = typeData['ads'];
                if (!adDatas.length) {
                    // 没有广告，不再继续
                    continue;
                }

                // 加载render显示广告
                for (var m = 0, n = adDatas.length; m < n; m++) {
                    adData = adDatas[m];
                    // 判断图片地址是否是返回数据中的图片地址
                    if (imgUrl !== adData['image']) {
                        continue;
                    }

                    // 获取真实render地址
                    var renderUrl = me._getRealRenderUrl(typeData['render']);
                    if (!renderUrl) {
                        continue;
                    }

                    // 修改广告数据中的position_type和box配置
                    adData['position_type'] = typeData['position_type'];
                    if (typeData['box']) {
                        adData['box'] = adData['box'] || {};
                        ad.base.extend(adData['box'], typeData['box'], true);
                    }

                    if (!initedImg) {
                        var oldRect = img['baiduImageplusRect'];
                        // 初始化img的设置
                        imgIndex = me.setupImg(img);
                        me._showedAdCount++;
                        var imgInfo = me.imgInfos[imgIndex];
                        // 记录开始加载前的rect值
                        var rect = me._getRect(img);
                        // 还是使用旧的高宽，确保之后可以更新
                        imgInfo.rect = oldRect || rect;

                        if (rect['width'] < me.config.minWidth
                            || rect['height'] < me.config.minHeight) {
                            // 图片高宽小于最小宽度（例如被隐藏了）
                            // 则暂时隐藏，用于处理slide的情况
                            imgInfo.inView = false;
                            imgInfo.wrapper.style.display = 'none';
                        }
                        else {
                            // 检测图片是否在可视区内
                            imgInfo.inView = me._inView(img);
                        }
                        initedImg = true;

                        me.addListener(imgIndex, ui.events.RENDER_LOADED, onRenderLoaded);
                    }

                    // 加载并展现广告
                    me.createCanvas(imgIndex, {
                        'url': renderUrl,
                        'id': typeData['render_id']
                    }, adData);
                    hasDataToShow = true;
                }

                if (hasDataToShow) {
                    // 有需要展现的广告时
                    // 查找图片遮住的透明浮层
                    me.detectAndLinkImgCover(imgIndex);
                }
            }

            if (opt_callback) {
                opt_callback(imgIndex || 0);
            }
        });
    });
};

/**
 * 根据配置中的renderReplaceRules来屏蔽或替换render地址
 *
 * @param {string} renderUrl 原始的render地址
 * @return {string} 正确的render地址，如果为空字符串则表示此广告不绘制
 */
ad.plugin.imageplus.BaseLoader.prototype._getRealRenderUrl =
    function (renderUrl) {
        var rules = this.config.get('renderReplaceRules');
        if (!rules) {
            // 没有规则时，直接返回原地址
            return renderUrl;
        }

        for (var rule in rules) {
            var ruleReg = new RegExp(rule);
            if (!renderUrl.match(ruleReg)) {
                // 不匹配则继续
                continue;
            }

            var value = rules[rule];
            if (!value) {
                // 匹配成功，但没有值，所以返回空字符串
                // 表示此render地址被屏蔽
                return '';
            }

            // 替换成功
            return renderUrl.replace(ruleReg, value);
        }

        // 没有匹配的规则，返回原地址
        return renderUrl;
    };

/**
 * 移除某张图片的广告
 *
 * @param {Element|number} img 图片元素或其索引值.
 */
ad.plugin.imageplus.BaseLoader.prototype.removeAd = function (img) {
    var imgIndex = this.getImgIndex(img);
    if (!imgIndex) {
        return;
    }

    var imgInfo = this.imgInfos[imgIndex];
    if (imgInfo.links) {
        ad.array.each(imgInfo.links, function (element) {
            element = /** @type {Element} */(element);
            ad.event.un(element, ui.events.MOUSE_OVER);
            ad.event.un(element, ui.events.MOUSE_OUT);
            ad.event.un(element, ui.events.MOUSE_MOVE);
        });
        imgInfo.links.length = 0;
    }
    this.releaseImg(imgIndex);
    this._showedAdCount--;
};

/**
 * 移除页面上所有的图+广告
 */
ad.plugin.imageplus.BaseLoader.prototype.removeAds = function () {
    var me = this;
    me.eachImgInfo(function (imgInfo, imgIndex) {
        me.removeAd(imgIndex);
    });
};

/**
 * 删除所有的对应图片被删除的图+广告
 */
ad.plugin.imageplus.BaseLoader.prototype.removeUselessAds = function () {
    var me = this;
    me.eachImgInfo(function (imgInfo, imgIndex) {
        if (!ad.dom.contains(document.documentElement, imgInfo.img)) {
            me.removeAd(imgIndex);
        }
    });
};

/**
 * 移除页面上所有的图+广告，重新再查找一遍
 */
ad.plugin.imageplus.BaseLoader.prototype.refreshAds = function () {
    this.removeAds();
    this.showAds();
};

/**
 * 迭代处理页面上所有广告
 *
 * @param {function(number, Element)} callback 处理图片的函数
 */
ad.plugin.imageplus.BaseLoader.prototype.eachAd = function (callback) {
    var me = this;
    me.eachImgInfo(function (imgInfo, imgIndex) {
        callback(imgIndex, imgInfo.img);
    });
};

/** @override */
ad.plugin.imageplus.BaseLoader.prototype.ghostWrap = function (img) {
    // 创建wrapper元素
    var ghostWrap = document.createElement('div');
    ghostWrap.style.cssText = ''
            + 'position:absolute;'
            + 'border:0;'
            + 'margin:0;'
            + 'padding:0;'
            + 'height:0;'
            + 'overflow:visible;'
            + 'text-align:left;';

    // 更新wrapper的z-index
    this._updateWrapperZIndex(ghostWrap, img);

    document.body.appendChild(ghostWrap);
    // 使用之前记录的真实位置和高宽来计算wrapper的位置
    var oldRect = img['baiduImageplusRect'];
    img['baiduImageplusRect'] = null;
    this._updateWrapPos(oldRect, ghostWrap);

    return ghostWrap;
};

/**
 * 获取图片的根offsetParent
 *
 * @param {Element} img 图片元素
 * @return {number} 根绝对定位元素的zIndex
 */
ad.plugin.imageplus.BaseLoader.prototype._findRootOffsetZIndex = function (img) {
    var node = img;
    var parent = node;
    var parents = [node];
    while (parent = parent.offsetParent) {
        if (parent.nodeName.toLowerCase() === 'body') {
            break;
        }

        var position = ad.dom.getStyle(parent, 'position');
        if (position !== 'static') {
            // 排除table th td元素
            node = parent;
            parents.push(node);
        }
    }

    if (ad.browser.ie === 6) {
        // 由于ie6 z-index的bug
        // 层级只看最顶级的非static父元素
        return parseInt(ad.dom.getStyle(node, 'z-index'), 10) || 0;
    }
    else {
        // 其他浏览器则简化处理，取最大的z-index值
        // 如果按照标准处理则操作太复杂了
        // 标准：https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
        var zIndex = 0;
        var tmpIndex;
        while (parents.length) {
            node = parents.pop();
            tmpIndex = parseInt(ad.dom.getStyle(node, 'z-index'), 10);
            if (!isNaN(tmpIndex)) {
                zIndex = Math.max(tmpIndex, zIndex);
            }
        }
        return zIndex;
    }
};

/**
 * 更新wrapper的位置和宽度
 *
 * @param {Element|Object} img 图片标签或者是坐标
 *                             {
 *                                 top: 100,
 *                                 left: 120,
 *                                 width: 400
 *                             }.
 * @param {Element} wrapper .
 */
ad.plugin.imageplus.BaseLoader.prototype._updateWrapPos =
    function (img, wrapper) {
        var offset = img.nodeName
            ? this._getRect(/** @type {Element} */(img))
            : img;

        var bodyPos = this._bodyPos;
        if (!bodyPos) {
            // 依赖于body计算位置
            if (ad.dom.getStyle(document.body, 'position') === 'static') {
                this._bodyPos = bodyPos = { 'top': 0, 'left': 0 };
            }
            else {
                this._bodyPos = bodyPos = baidu.dom.getPosition(document.body);
            }
        }

        wrapper.style.top = offset['top'] - bodyPos['top'] + 'px';
        wrapper.style.left = offset['left'] - bodyPos['left'] + 'px';
        wrapper.style.width = offset['width'] + 'px';
    };

/** @override */
ad.plugin.imageplus.BaseLoader.prototype.unGhostWrap = function (imgIndex) {
    var imgObj = this.imgInfos[imgIndex];
    if (!imgObj) {
        return;
    }

    ad.dom.remove(imgObj.wrapper);
};

/**
 * Get data from server.
 *
 * @param {Element|Object} img 图片元素或者是图片信息，
 *      例如：{
 *              image: 'http://google.com/xxx.png',
 *              'width': 300,
 *              'height: 200,
 *              'cached': 1 // 默认为1，可设置为0表示不是请求缓存数据
 *            }.
 *      如果传入的是图片元素，那么是新请求。
 *      如果传入的是图片信息，则是默认是请求缓存数据，除非设置了cached
 * @param {Function} callback 回调函数.
 */
ad.plugin.imageplus.BaseLoader.prototype.getData = function (img, callback) {
    if (location.href.match(/(\?|&)baiduImageplus=/)) {
        // 调试数据
        callback(window['baiduImagePlusFakeData']);
        return;
    }

    var imgUrl;
    var wd;
    var imgWidth;
    var imgHeight;
    var cached;

    if (img.nodeName && img.nodeName.toLowerCase() === 'img') {
        // img.src 返回的是encode之后的路径
        imgUrl = decodeURIComponent(img.src);
        var cache = this._cachedDatas[imgUrl];
        if (cache) {
            // 使用缓存
            callback(cache);
            return;
        }
        wd = this.config.get('apiWd');
        if (typeof wd === 'function') {
            wd = wd(img);
        }
        wd = encodeURIComponent(wd);
        imgWidth = img.offsetWidth;
        imgHeight = img.offsetHeight;
        cached = 0;
    }
    else {
        // 获取的是缓存数据
        imgUrl = img['image'];
        wd = img['wd'] || '';    // 直接返回空字符串
        imgWidth = img['width'];
        imgHeight = img['height'];
        cached = img['cached'] || 1;
    }

    var api = this.config.get('api');
    var unionId = this.config.get('unionId');
    var query = baidu.url.jsonToQuery({
        'src': this.config.get('apiSrc'),
        'k': wd,
        'iurl[]': imgUrl,
        'qid': this._qid,
        'tu': unionId,
        'width': imgWidth,
        'height': imgHeight,
        'opt': this._logTimes['opt'] || '',
        'v': this._logTimes['v'] || '',
        'cached': cached,
        'pic': this._allPageImgsCount,
        'dri': ++this._requestDataCount
    });
    api += (api.indexOf('?') === -1 ? '?' : '&') + query;

    baidu.sio.callByServer(
        api,
        callback,
        {
            'charset': 'gbk',
            'timeOut': 10000,
            'onfailure': callback
        }
    );
};

/**
 * 图片元素加载成功后执行
 *
 * @param {Element} img 图片元素.
 * @param {Function} callback 回调函数.
 */
ad.plugin.imageplus.BaseLoader.prototype._onImgLoad = function (img, callback) {
    if (img.complete) {
        // 命中缓存
        callback(true);
        return;
    }

    var success = function () {
        callback(true);
        ad.event.un(img, 'load', success);
    };
    ad.event.on(img, 'load', success);

    var error = function () {
        callback(false);
        ad.event.un(img, 'abort', error);
        ad.event.un(img, 'error', error);
    };
    ad.event.on(img, 'abort', error);
    ad.event.on(img, 'error', error);
};

/**
 * 帮助函数，依据输入参数来获得广告底图的imgIndex和imgInfo
 *
 *
 * @param {Element|number|Object} img 图片元素或是它对应的imgInfo或是imgIndex
 * @param {number=} opt_imgIndex 图片的索引
 * @return {Array} [imgIndex, imgInfo]，如果为null则未找到
 */
ad.plugin.imageplus.BaseLoader.prototype._getImgIndexAndImgInfo = function (img, opt_imgIndex) {
    var r = [];

    if (opt_imgIndex) {
        r[0] = opt_imgIndex;
        r[1] = img;
    }
    else {
        r[0] = this.getImgIndex(/** @type {Element|number} */(img));
        r[1] = this.imgInfos[r[0]];
    }

    if (!r[0] || !r[1]) {
        return null;
    }

    return r;
};

/**
 * 检查图片位置及高宽是否变化，如变化则更新图+的广告展现
 *
 *  updateAd(img);                  // 对外使用
 *  updateAd(imgIndex);             // 对外使用
 *  updateAd(imgInfo, imgIndex);    // 内部使用
 *
 * @param {Element|number|Object} img 图片元素或是它对应的imgInfo或是imgIndex
 * @param {number=} opt_imgIndex 图片的索引
 */
ad.plugin.imageplus.BaseLoader.prototype.updateAd = function (img, opt_imgIndex) {
    var r = this._getImgIndexAndImgInfo(img, opt_imgIndex);
    if (!r) {
        return;
    }

    var imgIndex = r[0];
    var imgInfo = r[1];

    if (!ad.dom.contains(document.documentElement, imgInfo.img)) {
        // 如果图片被删除了，则移除广告
        this.removeAd(imgIndex);
        return;
    }

    var rect = this._getRect(imgInfo.img);
    var oldRect = imgInfo.rect;
    if (rect['top'] !== oldRect['top']
        || rect['left'] !== oldRect['left']
        || rect['width'] !== oldRect['width']
        || rect['height'] !== oldRect['height']) {
        imgInfo.rect = rect;
        // 如果位置及高宽变化了
        if (rect['width'] < this.config.minWidth
            || rect['height'] < this.config.minHeight) {
            // 图片高宽小于最小宽度（例如被隐藏了）
            this.hideAd(imgIndex);
        }
        else {
            // 图片还在显示，则显示广告并更新位置
            this._updateWrapPos(rect, imgInfo.wrapper);
            this._showAd(imgIndex);
            // 更新z-index值
            this._updateWrapperZIndex(imgInfo.wrapper, imgInfo.img);
            this.trigger(imgIndex, ui.events.RESIZE, rect);
        }
    }
};

/**
 * 显示本就存在的图+广告
 *
 * @param {number} imgIndex 图片元素或是imgIndex
 */
ad.plugin.imageplus.BaseLoader.prototype._showAd = function (imgIndex) {
    var imgInfo = this.imgInfos[imgIndex];
    imgInfo.wrapper.style.display = 'block';
    imgInfo.inView = this._inView(imgInfo.img);
    this.trigger(imgIndex, ui.events.SHOW);
};

/**
 * 隐藏图+的广告
 *
 *  hideAd(img);                  // 对外使用
 *  hideAd(imgIndex);             // 对外使用
 *
 * @param {Element|number} img 图片元素或是imgIndex
 */
ad.plugin.imageplus.BaseLoader.prototype.hideAd = function (img) {
    var imgIndex = this.getImgIndex(img);
    if (!imgIndex) {
        return;
    }

    var imgInfo = this.imgInfos[imgIndex];
    imgInfo.inView = false;
    imgInfo.wrapper.style.display = 'none';
    this.trigger(imgIndex, ui.events.HIDE);
};

/**
 * 隐藏所有的图+广告
 */
ad.plugin.imageplus.BaseLoader.prototype.hideAds = function () {
    var me = this;
    me.eachImgInfo(function (imgInfo, imgIndex) {
        me.hideAd(imgIndex);
    });
};

/**
 * 隐藏所有的对应图片被删除的图+广告
 */
ad.plugin.imageplus.BaseLoader.prototype.hideUselessAds = function () {
    var me = this;
    me.eachImgInfo(function (imgInfo, imgIndex) {
        if (!ad.dom.contains(document.documentElement, imgInfo.img)) {
            me.hideAd(imgIndex);
        }
    });
};

/**
 * 依次检查所有图片的位置高宽是否变化，如变化则更新其图+的广告展现
 *
 */
ad.plugin.imageplus.BaseLoader.prototype.updateAds = function () {
    var me = this;
    me.eachImgInfo(function (imgInfo, imgIndex) {
        me.updateAd(imgInfo, imgIndex);
    });
};

/**
 * 在resize时监控图片位置更新
 */
ad.plugin.imageplus.BaseLoader.prototype.watchAds = function () {
    var me = this;

    me._debouceEvent(window, 'resize', function () {
        if (!me.getLength()) {
            return;
        }
        me._updateClientWH();

        me.eachImgInfo(function (imgInfo, imgIndex) {
            // 更新广告
            me.updateAd(imgInfo, imgIndex);
            // 触发inview或outview事件
            me._imgInView(imgInfo, imgIndex);
        });
    });

    me._throttleEvent(window, 'scroll', function () {
        if (!me.getLength()) {
            return;
        }

        me.eachImgInfo(function (imgInfo, imgIndex) {
            me._imgInView(imgInfo, imgIndex);
        });
    });
};

/**
 * 绑定事件的工具函数，延迟执行
 *
 * @param {Element|Window} element
 * @param {string} event
 * @param {Function} callback
 * @param {number=} opt_time
 */
ad.plugin.imageplus.BaseLoader.prototype._debouceEvent = function (element, event, callback, opt_time) {
    var timeout;

    ad.event.on(element, event, function () {
        if (timeout) {
            ad.base.clearTimeout(timeout);
        }

        var args = arguments;
        var context = this;
        timeout = ad.base.setTimeout(function () {
            callback.apply(context, args);
            timeout = null;
        }, opt_time || 500);
    });
};

/**
 * 绑定事件的工具函数，事件持续触发的过程中定时执行
 *
 * @param {Element|Window} element 元素
 * @param {string} event 时间名
 * @param {Function} callback 回调函数
 * @param {number=} opt_time 间隔时间
 */
ad.plugin.imageplus.BaseLoader.prototype._throttleEvent =
    function (element, event, callback, opt_time) {
        var timeout;
        var previous;
        var context;
        var args;
        var now;
        var waiting = opt_time || 1000;
        var success = function () {
            previous = now;
            timeout = null;
            callback.apply(context, args);
            context = args = null;
        };

        ad.event.on(element, event, function () {
            context = this;
            args = arguments;
            now = new Date().getTime();
            previous = previous || now;
            var remaining = waiting - (now - previous);
            if (remaining <= 0) {
                ad.base.clearTimeout(timeout);
                success();
            }
            else if (!timeout) {
                timeout = ad.base.setTimeout(success, remaining);
            }
        });
    };

/**
 * 判断图片是否进入或离开视区，并触发事件
 *
 * @param {Object} imgInfo
 * @param {number} imgIndex
 */
ad.plugin.imageplus.BaseLoader.prototype._imgInView = function (imgInfo, imgIndex) {
    var nowInView = this._inView(imgInfo.img);
    if (imgInfo.inView !== nowInView) {
        imgInfo.inView = nowInView;
        // 触发进入可视区和离开可视区的事件
        this.trigger(
            imgIndex,
            nowInView ? ui.events.INTO_VIEW : ui.events.OUT_VIEW
        );
    }

    if (nowInView) {
        // 只要在可视区内，并且滚动了就会触发IN_VIEW事件
        this.trigger(imgIndex, ui.events.IN_VIEW);
    }
};

/**
 * 判断是否在可视区域内
 *
 * @param {Element} element 元素dom
 * @return {boolean} 是否在可视区域内
 */
ad.plugin.imageplus.BaseLoader.prototype._inView = function (element) {
    this._clientW = this._clientW || baidu.page.getViewWidth();
    this._clientH = this._clientH || baidu.page.getViewHeight();
    var rect = element.getBoundingClientRect();
    return (rect.bottom > 0 && rect.top < this._clientH)
        && (rect.right > 0 && rect.left < this._clientW);
};

/**
 * 更新this._clientW和this._clientH
 */
ad.plugin.imageplus.BaseLoader.prototype._updateClientWH = function () {
    this._clientW = baidu.page.getViewWidth();
    this._clientH = baidu.page.getViewHeight();
};

/**
 * 设置图片cover的mouse事件，这些事件会被发给指定的广告，如果不指定就是第一个图+广告
 *
 * @param {Element=} opt_img 图片元素.
 */
ad.plugin.imageplus.BaseLoader.prototype.setupImgCover = function (opt_img) {
    var me = this;
    var imgIndex = opt_img ? me.getImgIndex(opt_img) : 1;
    var imgInfo = me.imgInfos[imgIndex];

    if (!imgInfo) {
        return;
    }

    function linkCover(coverId) {
        var cover;
        if (coverId.charAt(0) === '.') {
            cover = baidu.q(coverId.replace(/^\./, ''));
        }
        else {
            cover = ad.dom.g(coverId.replace(/^#/, ''));
        }

        if (!cover) {
            return;
        }

        if (!baidu.lang.isArray(cover)) {
            me.linkAd(cover, imgInfo, imgIndex);
        }
        else if (cover.length) {
            ad.array.each(cover, function (c) {
                c = /** @type {Element} */(c);
                me.linkAd(c, imgInfo, imgIndex);
            });
        }
    }

    var coverId = me.config.get('imgCoverId');
    if (coverId) {
        linkCover(coverId);
    }

    var imgCovers = me.config.get('imgCovers');
    if (imgCovers) {
        ad.array.each(imgCovers.split(','), linkCover);
    }
};


/**
 * 将页面元素（一般为透明浮层）与图片连接在一起
 * 该元素触发鼠标over/move/out时，图片也会触发
 *
 * @param {Element} element
 * @param {Element|Object|number} img 图片元素或是它对应的imgInfo或是imgIndex
 * @param {number=} opt_imgIndex 图片的索引
 */
ad.plugin.imageplus.BaseLoader.prototype.linkAd =
    function (element, img, opt_imgIndex) {
        var me = this;
        var r = me._getImgIndexAndImgInfo(img, opt_imgIndex);
        if (!r) {
            return;
        }

        var imgIndex = r[0];
        var imgInfo = r[1];

        imgInfo.links = imgInfo.links || [];
        imgInfo.linksCallback = imgInfo.linksCallback || [];

        var mouseover = function (event) {
            var relatedTarget = event.relatedTarget || event.fromElement;
            if (!me.isTargetInAd(relatedTarget, imgIndex)) {
                me.trigger(imgIndex, ui.events.MOUSE_OVER);
            }
        };
        var mouseout = function (event) {
            var relatedTarget = event.relatedTarget || event.toElement;
            if (!me.isTargetInAd(relatedTarget, imgIndex)) {
                me.trigger(imgIndex, ui.events.MOUSE_OUT);
            }
        };
        var mousemove = function (event) {
            me.trigger(imgIndex, ui.events.MOUSE_MOVE);
        };

        imgInfo.links.push(element);
        imgInfo.linksCallback.push({
            'mouseover': mouseover,
            'mouseout': mouseout,
            'mousemove': mousemove
        });
        ad.event.on(element, ui.events.MOUSE_OVER, mouseover);
        ad.event.on(element, ui.events.MOUSE_OUT, mouseout);
        ad.event.on(element, ui.events.MOUSE_MOVE, mousemove);

        // 更新wrap的z-index值
        me._updateWrapperZIndex(imgInfo.wrapper, element);
    };

/**
 * 依据输入的元素来更新wrapper的zIndex，确保wrapper在输入元素之上
 *
 * @param {Element} wrapper .
 * @param {Element} element 输入元素.
 */
ad.plugin.imageplus.BaseLoader.prototype._updateWrapperZIndex = function(wrapper, element) {
    var linkerZIndex = this._findRootOffsetZIndex(element);
    var wrapperZIndex = parseInt(ad.dom.getStyle(wrapper, 'z-index'), 10) || 0;
    if (linkerZIndex > wrapperZIndex) {
        wrapper.style.zIndex = linkerZIndex + 10;
    }
};


/**
 * 解除图片元素和其他元素之间的连接
 *
 * @param {Element} element
 * @param {Element|number} img
 */
ad.plugin.imageplus.BaseLoader.prototype.unlinkAd = function (element, img) {
    var me = this;
    var imgIndex = me.getImgIndex(img);
    if (!imgIndex) {
        return;
    }

    var imgInfo = me.imgInfos[imgIndex];
    if (imgInfo.links) {
        var index = baidu.array.indexOf(imgInfo.links, element);
        if (index === -1) {
            return;
        }

        var callbacks = imgInfo.linksCallback[index];
        for (var event in callbacks) {
            ad.event.un(element, event, callbacks[event]);
        }
        baidu.array.removeAt(imgInfo.links, index);
        baidu.array.removeAt(imgInfo.linksCallback, index);
    }
};

/**
 * 解除图片的所有连接的元素
 *
 * @param {Element|number} img
 */
ad.plugin.imageplus.BaseLoader.prototype.unlinkAds = function (img) {
    var me = this;
    var imgIndex = me.getImgIndex(img);
    if (!imgIndex) {
        return;
    }

    var imgInfo = me.imgInfos[imgIndex];
    if (imgInfo.links) {
        ad.array.each(imgInfo.links, function (element, index) {
            element = /** @type {Element} */(element);
            var callbacks = imgInfo.linksCallback[index];
            for (var event in callbacks) {
                ad.event.un(element, event, callbacks[event]);
            }
        });
        imgInfo.links.length = 0;
        imgInfo.linksCallback.length = 0;
    }
};

/**
 * 试探性的搜索遮住图片的浮层，并绑定链接
 *
 * @param {number} imgIndex 图片索引
 */
ad.plugin.imageplus.BaseLoader.prototype.detectAndLinkImgCover = function (imgIndex) {
    var me = this;
    var autoDetectCover = me.config.get('autoDetectCover');
    if (!autoDetectCover) {
        return;
    }

    var maxlevel = me.config.get('findCoverLevel');
    if (maxlevel <= 0) {
        return;
    }

    var imgInfo = me.imgInfos[imgIndex];
    if (!imgInfo) {
        return;
    }

    var img = imgInfo.img;
    var level = -1;
    var ignoredNodeNames = {
        'BODY': true,
        'HEAD': true,
        'SCRIPT': true,
        'STYLE': true,
        'META': true,
        'HTML': true
    };
    /**
     * 迭代查找附近的节点，每迭代一次level+1
     * 直到level达到maxlevel
     *
     * @param {Element|Node} element .
     * @param {number} from
     *      0 从自己开始;
     *      1 从父亲节点进入;
     *      2 从上一个兄弟节点进入;
     *      3 从下一个兄弟节点进入;
     *      4 从子节点进入;
     */
    var iterate = function (element, from) {
        if (level >= maxlevel || ignoredNodeNames[element.nodeName]) {
            return;
        }
        level++;

        element = /**@type {Element} */(element);

        if (from !== 0
            && me._isElementClickable(element)
            && !ad.dom.contains(element, img)
            && me._isOverlapping(ad.dom.getRect(element), imgInfo.rect)) {
            // a标签和图片重叠，且图片不是其子孙节点
            me.linkAd(element, imgInfo, imgIndex);
        }


        if (from !== 4) {
            // 进入子节点
            var firstChild = baidu.dom.first(element);
            if (firstChild) {
                iterate(firstChild, 1);
            }
        }

        if (from !== 3) {
            // 进入下一个兄弟节点
            var next = baidu.dom.next(element);
            if (next) {
                iterate(next, 2);
            }
        }

        if (from !== 2) {
            // 进入前一个兄弟节点
            var prev = baidu.dom.prev(element);
            if (prev) {
                iterate(prev, 3);
            }
        }

        if (from === 0 || from === 4) {
            // 进入父元素节点
            var parent = element.parentNode;
            if (parent) {
                iterate(parent, 4);
            }
        }

        level--;
    };

    iterate(img, 0);
};

/**
 * 判断元素是否可以点击，如果满足如下任意一点就是可以点击
 *
 *      1. 是a标签
 *      2. 元素的cursor样式是pointer或者url指定的
 *
 */
ad.plugin.imageplus.BaseLoader.prototype._isElementClickable =
    function (element) {
        if (element.nodeName.toLowerCase() === 'a') {
            return true;
        }

        var cursor = ad.dom.getStyle(element, 'cursor');
        return cursor === 'pointer' ||  cursor.indexOf('url(') === 0;
    };

/**
 * 判断两个矩形区域是否重叠
 *
 * @param {Object} rect1
 * @param {Object} rect2
 */
ad.plugin.imageplus.BaseLoader.prototype._isOverlapping =
    function (rect1, rect2) {
        var t1 = rect1['top'];
        var l1 = rect1['left'];
        var t2 = rect2['top'];
        var l2 = rect2['left'];
        var isVerticalCollapse =
            Math.abs(t1 - t2) < (t1 > t2 ? rect2['height'] : rect1['height']);
        var isHorizontalCollapse =
            Math.abs(l1 - l2) < (l1 > l2 ? rect2['width'] : rect1['width']);
        return isVerticalCollapse && isHorizontalCollapse;
    };

/**
 *
 * 获取元素的真实可见的rect值（top,left,width,height）
 * NOTE: 未处理如下情况：
 *      1. clip样式实现剪裁的情况
 *      2. 元素被浏览器可视区域隐藏，即`left:-9999px`这样的情况
 *
 * @param {Element} element .
 * @return {Object} rect.
 */
ad.plugin.imageplus.BaseLoader.prototype._getRect = function (element) {
    var me = this;
    var noneRect = {
        'top': 0,
        'left': 0,
        'width': 0,
        'height': 0
    };

    if (me._isHidden(element)) {
        // 元素是隐藏的
        return noneRect;
    }

    var overflowParentKey = 'baiduImageplusOverflowParent';
    var parent = element[overflowParentKey];
    if (parent && me._canHideChild(parent)) {
        // 如果之前已经找到了带有overflow样式的父元素，
        // 且其依旧可以隐藏子元素，则复用。
        return me._getOverlappingRect(element, parent);
    }

    var hiddenParentKey = 'baiduImageplusHiddenParent';
    parent = element[hiddenParentKey];
    if (parent && me._isHidden(parent)) {
        // 如果之前已经找到了被隐藏的父元素，且它依旧是隐藏的，则复用。
        return noneRect;
    }

    var parentHidden = false;
    var overlappingRect = null;
    parent = baidu.dom.getAncestorBy(element, function (el) {
        if (me._isHidden(el)) {
            parentHidden = true;
            return true;
        }

        if (!me._canHideChild(el)) {
            return false;
        }

        overlappingRect = me._getOverlappingRect(element, el);
        return overlappingRect['clipped'];
    });

    if (!parent) {
        // 没有父元素被隐藏或可以可以隐藏子元素时，
        // 直接返回子元素的rect
        return ad.dom.getRect(element);
    }

    if (parentHidden) {
        // 有被隐藏的父元素
        element[hiddenParentKey] = parent;
        return noneRect;
    }

    element[overflowParentKey] = parent;
    return overlappingRect;
};

/**
 * 判断元素视觉上是否可见，未考虑如下情况：
 *      1. overflow:hidden剪裁的情况
 *      2. clip样式剪裁
 *
 * @param {Element} element .
 * @return {boolean} 是否视觉上可见
 */
ad.plugin.imageplus.BaseLoader.prototype._isHidden = function (element) {
    return ad.dom.getStyle(element, 'display') === 'none'
        || ad.dom.getStyle(element, 'opacity') === '0'
        || ad.dom.getStyle(element, 'visibility') === 'hidden';
};

/**
 * 判断元素是否可以隐藏其子元素
 *
 * @param {Element} element .
 * @return {boolean} 是否可以隐藏其子元素
 */
ad.plugin.imageplus.BaseLoader.prototype._canHideChild = function (element) {
    if (element.nodeName === 'HTML') {
        // TODO
        // IE8下计算html元素的高度有误，故暂时不认为html可以隐藏其子元素
        return false;
    }
    var displayStyle = ad.dom.getStyle(element, 'display');
    var floatStyle = ad.dom.getStyle(element, 'float');
    if (displayStyle === 'inline' && (floatStyle === 'none' || floatStyle === '')) {
        // IE8 如果不设置float样式，则floatStyle为空字符串
        // 行内样式的overflow不会起作用
        return false;
    }

    var overflowStyle = ad.dom.getStyle(element, 'overflow');
    if (overflowStyle !== 'visible') {
        return true;
    }

    return false;
};

/**
 * 获取父元素和子元素之间视觉上重叠的部分
 *
 * @param {Element} element 子元素
 * @param {Element} parent 父元素
 * @return {Object} 重叠的rect
 */
ad.plugin.imageplus.BaseLoader.prototype._getOverlappingRect = function (element, parent) {
    // 父元素可以隐藏子元素（overflow:hidden | scroll）
    // NOTE: 这里没有考虑父元素被overflow隐藏的情况
    var elementRect = ad.dom.getRect(element);
    // NOTE: 为了简化处理，这里没有去掉父元素的透明边框和透明内边距
    var parentRect = ad.dom.getRect(parent);
    var eT = elementRect['top'];
    var eL = elementRect['left'];
    var eW = elementRect['width'];
    var eH = elementRect['height'];
    var pT = parentRect['top'];
    var pL = parentRect['left'];
    var pW = parentRect['width'];
    var pH = parentRect['height'];

    if (eT >= pT && eL >= pL
        && (eL + eW) <= (pL + pW)
        && (eT + eH) <= (pT + pH)) {
        elementRect['clipped'] = false;
        return elementRect;
    }

    var overlappingRect = { 'clipped': true };
    if (eL > pL) {
        overlappingRect['left'] = eL;
        overlappingRect['width'] = pW - (eL - pL);
    }
    else {
        overlappingRect['left'] = pL;
        overlappingRect['width'] = eW - (pL - eL);
    }
    overlappingRect['width'] = Math.min(overlappingRect['width'], eW, pW);

    if (eT > pT) {
        overlappingRect['top'] = eT;
        overlappingRect['height'] = pH - (eT - pT);
    }
    else {
        overlappingRect['top'] = pT;
        overlappingRect['height'] = eH - (pT - eT);
    }
    overlappingRect['height'] = Math.min(overlappingRect['height'], eH, pH);

    return overlappingRect;
};


/**
 * 判断图片是否是图+广告中的图片
 *
 * @param {Element} img .
 * @return {boolean} 是否是广告中的图片
 */
ad.plugin.imageplus.BaseLoader.prototype._imgInAd = function (img) {
    var containsByAd = false;

    this.eachImgInfo(function (imgInfo) {
        if (containsByAd) {
            return;
        }

        if (imgInfo.wrapper) {
            containsByAd = ad.dom.contains(imgInfo.wrapper, img);
        }
    });

    return containsByAd;
};

/**
 * 依据图片的位置信息计算出传给后端位置相关信息
 *
 * @return {string} rect string: top_left_width_height
 */
ad.plugin.imageplus.BaseLoader.prototype._getViewPagePos = function () {
    var viewHeight = baidu.page.getViewHeight();
    var viewWidth = baidu.page.getViewWidth();
    var top = baidu.page.getScrollTop();
    var left = baidu.page.getScrollLeft();

    return [top, left, viewWidth, viewHeight].join('_');
};


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
