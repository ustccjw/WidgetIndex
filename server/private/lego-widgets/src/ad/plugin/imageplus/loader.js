/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/loader.js ~ 2013/08/09 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/


goog.require('ad.array');
goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.event');
goog.require('ad.plugin.imageplus.hash');
goog.require('ad.plugin.imageplus.LoaderConfig');
goog.require('ad.plugin.imageplus.LoaderTip');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.plugin.loader');
goog.require('ui.events');

goog.provide('ad.plugin.imageplus.Loader');
goog.provide('ad.plugin.imageplus.LoaderApi');


/**
 * imageplus Loader
 * 通用的loader类
 *
 * 一个页面只有一个loader实例；
 * 一个loader实例有n个有图片的广告；
 * 一个有广告的图片对应n个render实例（可以有n个广告）；
 *
 * @constructor
 * @param {ad.plugin.imageplus.LoaderConfig} config .
 */
ad.plugin.imageplus.Loader = function (config) {
    var me = this;

    /**
     * 已展现广告的图片数量
     *
     * @type {number}
     * @private
     */
    me._length = 0;

    /**
     * 自增的图片索引，每个图片都有个唯一编号，从1开始
     * @type {number}
     * @private
     */
    me._imgIndex = 0;

    /**
     * 图片相关信息，以imgIndex为索引
     * 存储了img dom, wrapper dom, canvas dom, listener等信息
     *
     * @type {Array.<Object>}
     */
    me.imgInfos = [];

    /**
     * 事件相关信息，存储回调函数
     * @type {Array.<Object>}
     * @private
     */
    me._events = [];

    /**
     * 配置对象
     *
     * @type {ad.plugin.imageplus.LoaderConfig}
     */
    me.config = config;

    /**
     * 清除render缓存时，用的cache字符串
     * 每小时更新一次，每次页面加载时才会更新
     *
     * @type {number}
     */
    me._renderCacheStr = Math.ceil(new Date() / 3600000);


    /**
     * 缓存了每个render的AD_CONFIG
     * 因为ECMA_require会缓存render的AD_CONFIG，
     * 所以导致了render多次调用生成的多个实例使用了同一个AD_CONFIG，
     * 故需要缓存最原始的AD_CONFIG，使用时拷贝，避免render多次调用时的冲突
     * @type {Object}
     * @private
     */
    me._adConfigCache = {};

    /**
     * 全局共享数据，render可以通过api来共享信息
     * 多个图片共用一份数据
     * 例如：贴片样式，在关闭一次后，此次访问不再展示。
     *       这个需求用到了全局共享数据功能
     *
     * @type {?Object}
     */
    me.gShareData = null;
};

/**
 * loader类的入口
 */
ad.plugin.imageplus.Loader.prototype.main = function () {};


/**
 * 为每个图片创建一个wrapper，wrapper可以是包裹img的span标签
 * 也可以是绝对定位的div标签，具体看loader子类的逻辑。
 * wrapper里面包含了每个render的canvas和tip。
 *
 * @param {Element} img .
 * @return {Element} wrapper .
 */
ad.plugin.imageplus.Loader.prototype.ghostWrap = function (img) {};

/**
 * 删除之前创建的wrapper。
 *
 * @param {number} imgIndex .
 */
ad.plugin.imageplus.Loader.prototype.unGhostWrap = function (imgIndex) {};

/**
 * 设置图片，调用`ghostWrap`创建wrapper，并绑定相关事件。
 *
 * @param {Element} img .
 */
ad.plugin.imageplus.Loader.prototype.setupImg = function (img) {
    var me = this;

    var imgIndex = me.getImgIndex(img);
    if (!imgIndex) {
        // imgIndex autoIncrease
        imgIndex = ++me._imgIndex;

        // wrap img
        var wrapper = me.ghostWrap(img);

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
        // 为wrapper绑定mouseover和mouseout事件
        ad.event.on(wrapper, ui.events.MOUSE_OVER, mouseover);
        ad.event.on(wrapper, ui.events.MOUSE_OUT, mouseout);
        ad.event.on(wrapper, ui.events.MOUSE_MOVE, mousemove);
        // 为图片绑定mouseover和mouseout事件
        ad.event.on(img, ui.events.MOUSE_OVER, mouseover);
        ad.event.on(img, ui.events.MOUSE_OUT, mouseout);
        ad.event.on(img, ui.events.MOUSE_MOVE, mousemove);

        me.imgInfos[imgIndex] = {
            img: img,                   // img dom
            wrapper: wrapper,           // wrapper dom
            // {canvasId: canvasDom}
            // 每个render实例（广告实例）都有一个canvas id和canvas dom
            canvas: {},
            // 记录的时间点，按照记录的顺序
            // {
            // canvasId: [
            //     {type:'loading', time:1000},       // 开始加载数据
            //     {type:'loaded', time:2000},        // 数据加载完成
            //     // render加载完成
            //     {type:'render_loaded', time:2000, url:'sticker/pa.app.js'},
            //     {type:'showed', time:2500}         // 广告已展现
            // ]
            // }
            recordedTime: {},
            tipId: '',                  // tip's dom id
            rended: false
            // 单个图片内的共享数据，render可以通过api来共享信息
            // 比如：在多个render绘制icon位置时，需要按顺序绘制则会用到
            // 每个图片的共享数据是独立的，在release时会被清理掉
            // shareData: {},
            // 如下是BaseLoader用到的配置
            // 图片的位置
            // rect: {},
            // 图片是否在可视区域内
            // inView: false,
            // 与图片链接的元素
            // links: [element],
            // 绑定在链接元素上的事件
            // linksCallback: [{mouseover: function, mouseout:function}]
        };
        me._length++;
    }

    return imgIndex;
};

/**
 * 判断target元素是否在广告（所有广告相关元素）内部
 *
 * @param {Element} target
 * @param {number} imgIndex
 */
ad.plugin.imageplus.Loader.prototype.isTargetInAd = function (target, imgIndex) {
    var imgInfo = this.imgInfos[imgIndex];
    if (!imgInfo) {
        return false;
    }

    // IE下可能为null获取如果
    if (target == null) {
        return false;
    }

    // 是否是图片元素，或者是否被wrapper包含
    if (imgInfo.img === target || ad.dom.contains(imgInfo.wrapper, target)) {
        return true;
    }

    // 是否被links所包含
    var containedByLinks = false;
    if (imgInfo.links) {
        ad.array.each(imgInfo.links, function (linkElement) {
            linkElement = /** @type {Element} */(linkElement);
            if (linkElement === target || ad.dom.contains(linkElement, target)) {
                containedByLinks = true;
                return false;
            }
        });
    }
    return containedByLinks;
};

/**
 * 根据imgIndex来替换图片元素
 *
 * 部分特殊页面，在缩放图片的时候，不是修改图片的高宽，而是直接替换图片
 * 这时可以选择release旧的图片然后重新setup，
 * 另一种选择就是直接替换图片dom，然后trigger resize事件。
 * 后者的性能更好些
 *
 * @param {number} imgIndex .
 * @param {Element} replacementImg .
 */
ad.plugin.imageplus.Loader.prototype.replaceImgDom =
    function (imgIndex, replacementImg) {
        this.imgInfos[imgIndex].img = replacementImg;
    };

/**
 * 删除对图片的设置，调用`unGhostWrap`并释放事件、删除相关信息。
 *
 * @param {number} imgIndex .
 */
ad.plugin.imageplus.Loader.prototype.releaseImg = function (imgIndex) {
    var me = this;

    var imgInfo = me.imgInfos[imgIndex];
    if (imgInfo) {
        me.trigger(imgIndex, ui.events.RELEASE);
        // 删掉canvas
        var canvas = imgInfo.canvas;
        for (var canvasId in canvas) {
            // 不用tangram的remove方法
            // 因为如果元素不存在，它会报错
            // 部分页面，可能会自己删除这些元素
            ad.dom.remove(canvasId);
        }

        // 删掉tip
        if (imgInfo.tipId) {
            // 同上
            ad.dom.remove(imgInfo.tipId);
        }

        // 解绑图片上的事件
        var img = imgInfo.img;
        ad.event.un(img, 'mouseover');
        ad.event.un(img, 'mouseout');

        // 解绑wrapper上的事件
        // 之所以强制解绑，是因为不确定`unGhostWrap`会删掉wrapper元素
        // loader可以在`unGhostWrap`中重用wrapper，而非删掉
        var wrapper = imgInfo.wrapper;
        ad.event.un(wrapper, 'mouseover');
        ad.event.un(wrapper, 'mouseout');

        // unwrap img
        me.unGhostWrap(imgIndex);
        delete me.imgInfos[imgIndex];

        // unbind event
        delete me._events[imgIndex];

        me._length--;
    }
};


/**
 * 创建canvas，调用render绘制广告。
 *
 * @param {number} imgIndex .
 * @param {string|Object} render 如果是Object则是这种形式：
 *                              {url: renderUrl, id: renderId}
 *                              如果是字符串则是renderUrl
 * @param {Object} data .
 */
ad.plugin.imageplus.Loader.prototype.createCanvas =
    function (imgIndex, render, data) {
        var me = this;
        var renderUrl = typeof render === 'string' ? render : render['url'];
        var renderId = typeof render === 'string' ? '' : render['id'];

        var api = new ad.plugin.imageplus.LoaderApi(this, imgIndex);
        var imgWrapper = api.getImgWrapper();
        if (imgWrapper) {
            api.setRenderUrl(renderUrl);
            api.setRenderId(renderId);

            // add cache string to render url
            var realRenderUrl = renderUrl;
            if (realRenderUrl.indexOf('?') !== -1) {
                realRenderUrl += '&';
            }
            else {
                realRenderUrl += '?';
            }
            realRenderUrl += 'cacheTime=' + me._renderCacheStr;

            // require render
            ECMA_require(realRenderUrl, function (m) {  // jshint ignore:line
                // 确保图片没被释放
                if (me.imgInfos[imgIndex] == null) {
                    return;
                }

                // 确保wrapper没有被其他人移除掉
                // 避免加载render的时候导致白屏
                if (!ad.dom.contains(document.documentElement, imgWrapper)) {
                    return;
                }

                // 生成AD_CONFIG
                if (!me._adConfigCache[renderUrl]) {
                    // 记录最原始的AD_CONFIG
                    me._adConfigCache[renderUrl] = m.get('AD_CONFIG');
                }
                // 拷贝原始的AD_CONFIG
                var materialConfig = {};
                ad.base.extend(materialConfig, me._adConfigCache[renderUrl]);
                /*
                 * 此处使用extend而非JSON.parse和stringify。
                 * 是因为被拷贝对象不够复杂的情况下，即使是原生JSON方法的性能也没有extend方法快
                 * http://jsperf.com/deep-copy-vs-parse-stringify/2
                 * 且JSON的降级实现方法则更慢
                 * http://jsperf.com/deep-copy-vs-parse-stringify
                var materialConfig = baidu.json.parse(baidu.json.stringify(
                    me._adConfigCache[renderUrl]
                ));
                */

                var canvasId = materialConfig['id']
                            // 如果render是一个模板（多次使用，非特殊定制）
                            // 那么他有一个独立的id，用于记录日志
                            // 如果没有id，则自动生成canvasId
                            || (HASH + imgIndex + ad.base.uuid());
                data['id'] = canvasId;
                // 触发render加载完成时间
                // renderUrl表示render地址
                // canvasId表示广告实例的id，及其canvas dom的id
                me.trigger(imgIndex, ui.events.RENDER_LOADED, renderUrl, canvasId);
                // 如果有loader级别的AD_CONFIG配置，则强制写入
                var loaderAdConfig = me.config.get('adConfig');
                if (loaderAdConfig) {
                    ad.base.extend(materialConfig, loaderAdConfig, true);
                }
                // 将数据写到AD_CONFIG中，并设置到render里面
                // 强制写入
                ad.base.extend(materialConfig, data, true);
                materialConfig['api'] = api;
                m.set('AD_CONFIG', materialConfig);

                // 绘制canvas
                var canvas = document.createElement('div');
                canvas.id = canvasId;
                canvas.style.margin = '0px';
                canvas.style.padding = '0px';
                canvas.style.border = 'none';
                canvas.style.overflow = 'visible';
                canvas.style.textAlign = 'left';
                imgWrapper.appendChild(canvas);
                me.imgInfos[imgIndex].canvas[canvasId] = canvas;
                api.setCanvasId(canvasId);
                m.start(true, true);
            });

        }
        else {
            throw Error('LOADER: Run `setupImg` before `createCanvas`!');
        }

    };

/**
 * 创建tip
 *
 * @param {number} imgIndex .
 */
ad.plugin.imageplus.Loader.prototype.createTip = function (imgIndex) {
    var me = this;
    var imgInfo = me.imgInfos[imgIndex];
    if (imgInfo && !imgInfo.tipId) {
        var imgWrapper = imgInfo.wrapper;
        var loaderTip = new ad.plugin.imageplus.LoaderTip(imgWrapper, function () {
            var args = [].slice.call(arguments, 0);
            args.unshift(imgIndex);
            me.trigger.apply(me, args);
        });
        imgInfo.tipId = loaderTip.domId;
    }
};

/**
 * 触发针对某个图片的事件
 *
 * @param {number} imgIndex .
 * @param {string|Object} eventType 事件类型（字符串）
 *                                  或者是事件对象
 *                                  {
 *                                      id： ‘aaxd’,
 *                                      type: 'resize'
 *                                  }.
 * @param {...*} var_args .
 */
ad.plugin.imageplus.Loader.prototype.trigger =
    function (imgIndex, eventType, var_args) {
        var me = this;

        var events = me._events[imgIndex];
        if (!events) {
            return;
        }

        var eventObj;
        if (typeof eventType !== 'string') {
            eventObj = eventType;
            eventType = eventType['type'];
        }

        // Get callbacks
        var callbacks = events[eventType];
        if (!callbacks || (callbacks.length === 0)) {
            return;
        }

        // trigger callback
        var callback;
        var args = Array.prototype.slice.call(arguments, 2);

        // create eventObj
        if (eventObj) {
            eventObj['imgIndex'] = imgIndex;
        }
        else {
            eventObj = {
                'imgIndex': imgIndex,
                'id': ad.base.uuid(),
                'type': eventType
            };
        }
        // TODO eventObj 对于多个回调是同一个，有冲突风险
        // 每次生成不同的eventObj则效率太低
        // `Object.freeze` 支持率太低，不然可以使用
        args.unshift(eventObj);

        // call
        for (var i = 0, l = callbacks.length; i < l; i++) {
            callback = callbacks[i];
            callback.apply(null, args);
        }
    };

/**
 * 触发事件
 *
 * @param {string} eventType .
 * @param {...*} var_args .
 */
ad.plugin.imageplus.Loader.prototype.triggerAll = function (eventType, var_args) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var newArgs;
    var events = me._events;

    args.unshift({
        'type': eventType,
        'id': ad.base.uuid()
    });
    for (var imgIndex = 1, l = events.length; imgIndex < l; imgIndex++) {
        if (events[imgIndex]) {
            newArgs = [imgIndex].concat(args);
            me.trigger.apply(me, newArgs);
        }
    }
};

/**
 * 获取图片的imgIndex，如果图片没设置过，则返回0.
 *
 * @param {Element|number} img 图片元素或者是图片索引值.
 * @return {number} imgIndex or 0 if not found.
 */
ad.plugin.imageplus.Loader.prototype.getImgIndex = function (img) {
    if (typeof img === 'number') {
        // 加这段处理是为了方便调用者
        return img;
    }

    var imgs = this.imgInfos;
    for (var imgIndex = 1, l = imgs.length; imgIndex < l; imgIndex++) {
        if (imgs[imgIndex] && imgs[imgIndex].img === img) {
            return imgIndex;
        }
    }
    return 0;
};

/**
 * 获取图片的imgInfo，如果图片没设置过，则返回空.
 *
 * @param {Element} img .
 * @return {Object} imgInfo.
 */
ad.plugin.imageplus.Loader.prototype.getImgInfo = function (img) {
    var imgs = this.imgInfos;
    for (var imgIndex = 1, l = imgs.length; imgIndex < l; imgIndex++) {
        if (imgs[imgIndex] && imgs[imgIndex].img === img) {
            return imgs[imgIndex];
        }
    }
    return null;
};

/**
 * 迭代处理所有的imgInfo
 *
 * @param {Function} callback .
 */
ad.plugin.imageplus.Loader.prototype.eachImgInfo = function (callback) {
    var imgs = this.imgInfos;
    for (var imgIndex = 1, l = imgs.length; imgIndex < l; imgIndex++) {
        if (imgs[imgIndex]) {
            callback(imgs[imgIndex], imgIndex);
        }
    }
};

/**
 * 获取已展现广告的图片数量
 *
 * @return {number} .
 */
ad.plugin.imageplus.Loader.prototype.getLength = function () {
    return this._length;
};

/**
 * 设置全局共享数据
 *
 * @param {string} key .
 * @param {*} value .
 */
ad.plugin.imageplus.Loader.prototype.setGShareData = function (key, value) {
    this.gShareData = this.gShareData || {};
    this.gShareData[key] = value;
};

/**
 * 获取全局共享数据
 *
 * @param {string} key .
 * @return {*} value.
 */
ad.plugin.imageplus.Loader.prototype.getGShareData = function (key) {
    var gShareData = this.gShareData;
    return gShareData ? (gShareData[key] || null) : null;
};

/**
 * 记录时间，发送到后端
 *
 * @param {number} imgIndex 图片索引.
 * @param {string} canvasId 表示对应的广告实例
 * @param {string|Object} type 时间点的名字，或是包含时间的对象.
 * @param {number|string=} opt_key 时间.
 */
ad.plugin.imageplus.Loader.prototype.recordKey =
    function (imgIndex, canvasId, type, opt_key) {
        var imgInfo = this.imgInfos[imgIndex];
        if (!imgInfo) {
            return;
        }

        imgInfo.recordedTime[canvasId] = imgInfo.recordedTime[canvasId] || [];
        var timeObj = typeof type === 'string'
            ? { 'type': type, 'time': opt_key }
            : type;
        imgInfo.recordedTime[canvasId].push(timeObj);
    };

/**
 * 绑定事件
 *
 * @param {number} imgIndex 图片索引.
 * @param {string} event 事件名.
 * @param {Function} callback 回调函数
 *                  第一个参数指向eventObj，例如：
 *                  {
 *                      'id': 'eventId',
 *                      'type': 'eventType[resize]',
 *                      'imgIndex': '1235'
 *                  }.
 */
ad.plugin.imageplus.Loader.prototype.addListener = function (imgIndex, event, callback) {
    var me = this;
    // special event
    var events = me._events[imgIndex];
    if (!events) {
        events = me._events[imgIndex] = {};
    }
    if (!events[event]) {
        events[event] = [];
    }
    events[event].push(callback);
};



/**
 * LoaderApi类，提供给render使用，
 * 每个render都有一个单独的loaderApi对象
 *
 * @constructor
 * @implements {ad.plugin.imageplus.ILoaderApi}
 * @param {ad.plugin.imageplus.Loader} loader .
 * @param {number} imgIndex .
 */
ad.plugin.imageplus.LoaderApi = function (loader, imgIndex) {
    /**
     * @type {ad.plugin.imageplus.Loader}
     * @private
     */
    this._loader = loader;

    /**
     * @type {number}
     * @private
     */
    this._imgIndex = imgIndex;

    /**
     * @type {string}
     * @private
     */
    this._canvasId = '';

    /**
     * @type {string}
     * @private
     */
    this._renderUrl = '';

    /**
     * @type {string}
     * @private
     */
    this._renderId = '';

    /**
     * api的版本，用于让render判断是否支持某些api
     *
     * @expose
     * @type {string}
     */
    this.version = '1.0.1';
};


/**
 * 通知loader：render绘制完成，并且是否需要显示右上角tip.
 *
 * @expose
 * @param {boolean=} opt_showTip show tip or not.
 */
ad.plugin.imageplus.LoaderApi.prototype.rendDone = function (opt_showTip) {
    var loader = this._loader;

    if (opt_showTip) {
        loader.createTip(this._imgIndex);
    }

    loader.imgInfos[this._imgIndex].rended = true;
};

/**
 * 绑定事件
 *
 * @expose
 * @param {string} event .
 * @param {Function} callback
 *                  第一个参数指向eventObj，例如：
 *                  {
 *                      'id': 'eventId',
 *                      'type': 'eventType[resize]',
 *                      'imgIndex': '1235'
 *                  }.
 */
ad.plugin.imageplus.LoaderApi.prototype.addListener = function (event, callback) {
    this._loader.addListener(this._imgIndex, event, callback);
};

/**
 * 获取img dom
 *
 * @expose
 * @return {Element} img.
 */
ad.plugin.imageplus.LoaderApi.prototype.getImg = function () {
    var imgObj = this._loader.imgInfos[this._imgIndex];
    return imgObj ? imgObj.img : null;
};

/**
 * 获取wrapper
 *
 * @expose
 * @return {Element} img.
 */
ad.plugin.imageplus.LoaderApi.prototype.getImgWrapper = function () {
    var imgObj = this._loader.imgInfos[this._imgIndex];
    return imgObj ? imgObj.wrapper : null;
};

/**
 * 获取canvas
 *
 * @expose
 * @return {Element} canvas.
 */
ad.plugin.imageplus.LoaderApi.prototype.getCanvas = function () {
    var imgObj = this._loader.imgInfos[this._imgIndex];
    return (imgObj && imgObj.canvas) ? imgObj.canvas[this._canvasId] : null;
};

/**
 * 获取imgIndex
 *
 * @expose
 * @return {number} .
 */
ad.plugin.imageplus.LoaderApi.prototype.getImgIndex = function () {
    return this._imgIndex;
};

/**
 * 设置canvas id，此方法不会暴露给render，
 * 只是loader用于设置api对象对应的canvas id
 *
 * @param {string} canvasId .
 */
ad.plugin.imageplus.LoaderApi.prototype.setCanvasId = function (canvasId) {
    this._canvasId = canvasId;
};

/**
 * 获取图片的位置和高宽
 *  {
 *      top: 100,
 *      left: 100,
 *      width: 600,
 *      heght: 400
 *  }
 *
 * @expose
 * @return {Object} .
 */
ad.plugin.imageplus.LoaderApi.prototype.getImgRect = function () {
    var imgObj = this._loader.imgInfos[this._imgIndex];
    return imgObj.rect || ad.dom.getRect(imgObj.img);
};

/**
 * 设置共享数据，默认针对每个图片的共享数据，
 * 也可以设置全局共享数据
 *
 * @expose
 * @param {string} key .
 * @param {*} value .
 * @param {boolean=} opt_global 是否是全局.
 */
ad.plugin.imageplus.LoaderApi.prototype.setShareData =
    function (key, value, opt_global) {
        var loader = this._loader;
        if (opt_global) {
            loader.setGShareData(key, value);
        }
        else {
            var imgObj = loader.imgInfos[this._imgIndex];
            if (imgObj) {
                imgObj.shareData = imgObj.shareData || {};
                imgObj.shareData[key] = value;
            }
        }
    };

/**
 * 获取共享数据
 *
 * @expose
 * @param {string} key .
 * @param {boolean=} opt_global 是否是全局.
 * @return {*} value .
 */
ad.plugin.imageplus.LoaderApi.prototype.getShareData =
    function (key, opt_global) {
        if (opt_global) {
            return this._loader.getGShareData(key);
        }
        else {
            var imgObj = this._loader.imgInfos[this._imgIndex];
            return (imgObj && imgObj.shareData) ? imgObj.shareData[key] : null;
        }
    };

/**
 * 记录时间，发送到后端
 * 1.0.0本版新增
 * 1.0.1版本修改第二个参数为支持字符串，参数名opt_time改成opt_key
 *     不得不承认recordTime这个名字就不合适了，
 *     但是要更改名字就需要修改所有ender...就暂时共存吧
 *
 * @expose
 * @param {string|Object} type 时间点的名字，或是包含时间的对象.
 * @param {number|string=} opt_key 时间.
 */
ad.plugin.imageplus.LoaderApi.prototype.recordTime =
ad.plugin.imageplus.LoaderApi.prototype.recordKey =
    function (type, opt_key) {
        this._loader.recordKey(this._imgIndex, this._canvasId, type, opt_key);
    };

/**
 * 记录时间，发送到后端
 * 1.0.0本版新增
 *
 * @expose
 * @return {Array} 记录的时间点
 */
ad.plugin.imageplus.LoaderApi.prototype.getRecordedTime =
    function () {
        var imgObj = this._loader.imgInfos[this._imgIndex];
        return (imgObj && imgObj.recordedTime)
            ? imgObj.recordedTime[this._canvasId] : null;
    };

/**
 * 设置render的地址
 *
 * @param {string} renderUrl render的地址.
 */
ad.plugin.imageplus.LoaderApi.prototype.setRenderUrl = function (renderUrl) {
    this._renderUrl = renderUrl;
};

/**
 * 获取render的地址
 * 1.0.0本版新增
 *
 * @expose
 * @return {string} renderUrl render的地址.
 */
ad.plugin.imageplus.LoaderApi.prototype.getRenderUrl = function () {
    return this._renderUrl;
};

/**
 * 设置render的id
 * 1.0.1本版新增
 *
 * @param {string} renderId render的id.
 */
ad.plugin.imageplus.LoaderApi.prototype.setRenderId = function (renderId) {
    this._renderId = renderId;
};

/**
 * 获取render的id
 * 1.0.1本版新增
 *
 * @expose
 * @return {string} renderId render的id.
 */
ad.plugin.imageplus.LoaderApi.prototype.getRenderId = function () {
    return this._renderId;
};

/**
 * 获取loader的配置，用于拿到unionId之类的配置
 * 1.0.0本版新增
 *
 * @expose
 * @param {string} key .
 * @param {*=} opt_default 默认值.
 * @return {*} value.
 */
ad.plugin.imageplus.LoaderApi.prototype.getLoaderConfig =
    function (key, opt_default) {
        var config = this._loader.config;
        return config.get.apply(config, arguments);
    };










/* vim: set ts=4 sw=4 sts=4 tw=100: */
