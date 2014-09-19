/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/image_loader.js ~ 2013/08/09 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/


goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.plugin.imageplus.Loader');
goog.require('ui.events');

goog.provide('ad.plugin.imageplus.ImageLoader');
goog.provide('ad.plugin.imageplus.imageLoader');


/**
 * imageplus Loader
 *
 * 专用于图片频道的loader
 *
 * @extends ad.plugin.imageplus.Loader
 * @constructor
 * @param {ad.plugin.imageplus.LoaderConfig} config .
 */
ad.plugin.imageplus.ImageLoader = function (config) {

    /**
     * qid 记录了页面的一次加载，用于后端统计
     * @type {string} .
     * @private
     */
    this._qid = ad.base.uuid() + new Date().getTime();

    /**
     * 图片频道的loader，同一时间只有一张图片
     * @type {?Element}
     * @private
     */
    this._ghostWrap = null;

    /**
     * 所有图片的展示数据
     * @type {?Object}
     * @private
     */
    this._imgDatas = null;

    /**
     * 当前图片的信息，由SHOW_IMAGE_DETAIL事件获得
     * @type {?Object}
     * @private
     */
    this._currentImgInfo = null;

    /**
     * 当前图片的imgIndex
     * @type {number}
     * @private
     */
    this._currentImgIndex = 0;

    /**
     * 当前页面所有要显示的图片地址
     * 即PROMOTION事件传递过来的所有图片地址
     *
     * @type {Array.<string>}
     * @private
     */
    this._imgUrls = [];

    /**
     * 已加载数据的图片地址
     *
     * @type {Object.<string, boolean>}
     * @private
     */
    this._loadedImgUrls = {};

    ad.plugin.imageplus.Loader.call(this, config);
};

baidu.inherits(ad.plugin.imageplus.ImageLoader, ad.plugin.imageplus.Loader);

/** @override */
ad.plugin.imageplus.ImageLoader.prototype.main = function () {
    var me = this;
    var globalAddListener =
        /** @type {Function} */
        (ad.base.getObjectByName('ns.image.event.addListener'));

    globalAddListener(
        'SHOW_IMAGE_PROMOTION',
        function (e, data) {
            // 获取图片url列表（30张）
            me._saveImgUrls(data);
        }
    );

    var detailTimer;
    globalAddListener(
        'SHOW_IMAGE_DETAIL',
        function (e, imgInfo) {
            if (imgInfo['etype'] === 'change') {
                // 图片切换事件
                // 增加缓冲，避免过多请求数据
                if (detailTimer) {
                    ad.base.clearTimeout(detailTimer);
                }
                detailTimer = ad.base.setTimeout(function () {
                    me._currentImgInfo = imgInfo;
                    me.showAd();
                    me._loadNeededImgData();

                    detailTimer = null;
                }, 250);
            }
            else if (me._currentImgIndex) {

                // 必须确保有_currentImgIndex
                // 因为change事件触发前会先触发一次resize事件
                // 这是图片频道的设计bug
                // etype没有时，表示resize... 另一个设计bug...

                // 图片resize事件
                var currentImg = me._getCurrentImg();
                if (!currentImg) {
                    // 可能会没有图片，另一个设计bug
                    return;
                }

                var rect = ad.dom.getRect(currentImg);
                me._updateWrapPos(currentImg, rect);
                me.trigger(me.getImgIndex(currentImg), ui.events.RESIZE, rect);

            }
        }
    );
};

/**
 * 加载当前必要的图片的数据，一般为当前图片和下一张图片的数据
 * 加载完成后，如果需要则显示广告
 *
 * 调用_getNeedLoadImgUrls方法获取要加载的图片地址
 * 调用_addLoadedImgUrls来记录图片已加载过
 */
ad.plugin.imageplus.ImageLoader.prototype._loadNeededImgData = function () {
    var me = this;
    var imgInfo = me._currentImgInfo;
    // 需要加载的图片地址
    var needLoadImgUrls = me._getNeedLoadImgUrls(
        imgInfo['pn']
    );
    if (needLoadImgUrls && needLoadImgUrls.length) {
        // 如果有需要加载的图片地址
        // 则请求获取数据
        me.getData(needLoadImgUrls, function (data) {
            // 保存数据
            me._saveData(data);
            // 设置为图片为加载结束
            me._addLoadedImgUrls(needLoadImgUrls);

            // 获取当前显示的图片地址
            var currentImg = me._getCurrentImg();

            var isShowAd =
                // 因为图片额页面会默认设置图片的高和宽
                // 所以即使不验证图片是否加载完成也是可用的
                // 这里只验证图片存在即可
                currentImg
                // 如果当前显示的图片不是这次加载
                // 则不显示广告
                && ~baidu.array.indexOf(
                        needLoadImgUrls,
                        currentImg.src
                    )
                // 如果当前图片已经设置过（展现过广告）
                // 则不显示广告
                && !me._currentImgIndex;

            if (isShowAd) {
                me.showAd();
            }
        });
    }

};

/**
 * 设置图片地址为已加载数据
 *
 * @param {Array.<string>} loadedImgUrls 已加载的图片数组
 */
ad.plugin.imageplus.ImageLoader.prototype._addLoadedImgUrls =
    function (loadedImgUrls) {
        for (var i = 0, l = loadedImgUrls.length; i < l; i++) {
            this._loadedImgUrls[loadedImgUrls[i]] = true;
        }
    };

/**
 * 分析需要加载数据的图片地址
 *
 * 如果图片的数据已经加载则不需要再次请求；
 * 如果图片的url还不知道（PROMOTION事件返回太慢）则不需要请求；
 * 只有在知道图片url并且还没加载图片数据时，需要请求获取图片数据；
 *
 * @param {number} pn 当前图片在整个图片列表中的序号
 * @return {Array.<string>} 需要加载图片url数组
 */
ad.plugin.imageplus.ImageLoader.prototype._getNeedLoadImgUrls = function (pn) {
    var imgUrl = this._imgUrls[pn];
    var nextImgUrl = this._imgUrls[pn + 1];
    var needLoadImgUrls = [];

    if (imgUrl && !this._loadedImgUrls[imgUrl]) {
        // 未加载当前图片数据时
        needLoadImgUrls.push(imgUrl);
    }

    if (nextImgUrl && !this._loadedImgUrls[nextImgUrl]) {
        // 未加载下一张图片数据时
        needLoadImgUrls.push(nextImgUrl);
    }

    return needLoadImgUrls;
};

/**
 * 保存url地址
 *
 * @param {Object} data .
 */
ad.plugin.imageplus.ImageLoader.prototype._saveImgUrls = function (data) {
    var imgUrls = data['imaURLs'];
    // 输入的图片数组中第一张图片在整个页面的图片列表中的序号
    var startPn = data['startPn'];
    var thisImgUrls = this._imgUrls;

    for (var i = 0, l = imgUrls.length; i < l; i++) {
        thisImgUrls[startPn + i] = imgUrls[i];
    }
};

/**
 * 保存并合并服务器返回的数据，存在`this._imgDatas`里面
 *
 * @param {Object} data .
 */
ad.plugin.imageplus.ImageLoader.prototype._saveData = function (data) {
    var me = this;
    // 本轮获取数据中的图片地址
    var thisRoundImgUrls = {};

    me._imgDatas = me._imgDatas || {};

    me._eachData(data, function (adData, typeData) {
        var imgUrl = adData['image'];
        if (me._imgDatas[imgUrl] && !thisRoundImgUrls[imgUrl]) {
            // 如果以前保存过此图片的数据
            // 并且不是这轮获取的
            // 清理掉之前存储的数据
            me._imgDatas[imgUrl].length = 0;
        }
        // 记录此张图片的数据是本轮获取的
        thisRoundImgUrls[imgUrl] = true;

        // 保存数据
        me._imgDatas[imgUrl] = me._imgDatas[imgUrl] || [];
        me._imgDatas[imgUrl].push({
            'render': typeData['render'],
            'adData': adData
        });
        adData['position_type'] = typeData['position_type'];
    });
};


/**
 * 专用于迭代处理API的返回数据。
 * 返回数据格式如下：
 *  [
 *      {
 *          'name':'baike',
 *          'position_type':'1',
 *          'render': 'http://bs.baidu.com/public03/imageplus/baike.app.js',
 *          'ads':[
 *              {
 *                  'image': '图片地址',
 *                  'otherData': 'foo'
 *              },
 *              ...
 *          ]
 *      },
 *      ...
 *  ]
 *
 * @param {Object} data 数据.
 * @param {Function.<Object, Object>} callback 回调函数.
 */
ad.plugin.imageplus.ImageLoader.prototype._eachData =
    function (data, callback) {
        var typeData;
        var adData;

        for (var i = 0, l = data.length; i < l; i++) {
            typeData = data[i];

            for (var m = 0, n = typeData['ads'].length; m < n; m++) {
                adData = typeData['ads'][m];
                callback(adData, typeData);
            }
        }
    };

/**
 * 获取当前图片.
 *
 * @return {Element} image element.
 */
ad.plugin.imageplus.ImageLoader.prototype._getCurrentImg =
    function () {
        var srcPic = ad.dom.g('srcPic');
        var imgs = srcPic.getElementsByTagName('img');
        // 切换过快时，有时会有没有img标签
        if (!imgs || imgs.length === 0) {
            return null;
        }

        // 图片页面的特性，DETAIL事件触发时
        // srcPic下有两张图片，第一张是缩略图，第二张是真实图片，过会儿又会删掉
        // 且有可能图片地址是一样的，故不能通过地址判断
        // 只能默认获取第二张图片，如果没有就用第一张图片
        // TODO 这方法不靠谱啊...

        var img;
        if (imgs[1] && imgs[1].parentNode === srcPic) {
            img = imgs[1];
        }
        else if (imgs[0].parentNode === srcPic){
            img = imgs[0];
        }

        return img;
    };

/**
 * Show ad.
 */
ad.plugin.imageplus.ImageLoader.prototype.showAd = function () {
    var me = this;

    if (me._currentImgInfo && me._imgDatas) {
        // 释放旧图片
        if (me._currentImgIndex) {
            me.releaseImg(me._currentImgIndex);
            me._currentImgIndex = 0;
        }

        var currentImgUrl = me._currentImgInfo['imaURL'];

        var imgData = me._imgDatas[currentImgUrl];
        if (!imgData) {
            // 没有数据
            return;
        }

        // 设置当前图片
        var img = me._getCurrentImg();
        // 切换过快时，有时会有没有img标签
        if (!img) {
            return;
        }
        // 设置图片，获取图片的索引
        me._currentImgIndex = me.setupImg(img);

        // 根据数据绘制所有的canvas
        // 有数据
        var renderData;
        for (var i = 0, l = imgData.length; i < l; i++) {
            renderData = imgData[i];
            me.createCanvas(
                me._currentImgIndex,
                renderData['render'],
                renderData['adData']
            );
        }
    }
};

/** @override */
ad.plugin.imageplus.ImageLoader.prototype.ghostWrap = function (img) {
    // 创建wrapper元素
    this._ghostWrap = document.createElement('div');
    this._ghostWrap.style.cssText = ''
            + 'position:absolute;'
            + 'border:0;'
            + 'margin:0;'
            + 'padding:0;'
            + 'height:0;'
            + 'overflow:visible;';
    // 放在srcPic里面
    ad.dom.g('srcPic').appendChild(this._ghostWrap);

    this._updateWrapPos(img);

    return this._ghostWrap;
};

/**
 * 更新wrapper的位置和宽度
 *
 * @param {Element} img .
 * @param {Object=} opt_rect .
 */
ad.plugin.imageplus.ImageLoader.prototype._updateWrapPos =
    function (img, opt_rect) {
        var offset = opt_rect || baidu.dom.getPosition(img);
        var srcPicOffset = baidu.dom.getPosition(ad.dom.g('srcPic'));

        this._ghostWrap.style.top =
            (offset['top'] - srcPicOffset['top']) + 'px';
        this._ghostWrap.style.left =
            (offset['left'] - srcPicOffset['left']) + 'px';
        this._ghostWrap.style.width =
            (offset['width'] || img.offsetWidth) + 'px';
    };

/** @override */
ad.plugin.imageplus.ImageLoader.prototype.unGhostWrap = function (imgIndex) {
    // 图片页面会在切换图片时删除wrapper元素
};

/**
 * Get data from server.
 *
 * @param {Array.<string>} imgUrls .
 * @param {Function} callback .
 */
ad.plugin.imageplus.ImageLoader.prototype.getData =
    function (imgUrls, callback) {
        var getQuery =
            /** @type {Function} */
            (ad.base.getObjectByName('ns.image.getQuery'));

        ad.base.postByWindowName(
            this.config.get('api'),
            {
                'wd': decodeURIComponent(getQuery()),
                'src': this.config.get('url_src'),
                'image_url': imgUrls,
                'qid': this._qid
            },
            function (data) {
                try {
                    data = baidu.json.parse(data);

                    // 如果返回不是数组，则表示接口有bug
                    if (baidu.lang.isArray(data)) {
                        callback(data);
                    }
                }
                catch (e) {}
            },
            {
                'proxy': this.config.get('proxy')
            }
        );
    };


ad.plugin.imageplus.imageLoader = new ad.plugin.imageplus.ImageLoader(
    new ad.plugin.imageplus.LoaderConfig({
        'url_src': 11,
        'api': 'http://imageplus.baidu.com/ui',
        'proxy': 'static/searchdetail/html/imgProxy.html'
    })
);













/* vim: set ts=4 sw=4 sts=4 tw=100: */
