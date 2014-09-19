/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/common_loader.js ~ 2013/12/03 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/

goog.require('ad.array');
goog.require('ad.event');
goog.require('ad.plugin.imageplus.BaseLoader');
goog.require('ui.events');

goog.provide('ad.plugin.imageplus.CommonLoader');

/**
 * imageplus Loader
 *
 * @extends ad.plugin.imageplus.BaseLoader
 * @constructor
 * @param {ad.plugin.imageplus.LoaderConfig} config .
 */
ad.plugin.imageplus.CommonLoader = function (config) {
    /**
     * 图片状态key
     *
     * @type {string}
     */
    this._imgStatusKey = 'baiduImageplusStatus';
    /**
     * 图片原src值的key
     *
     * @type {string}
     */
    this._imgSrcKey = 'baiduImageplusOriginalSrc';
    /**
     * 是否正在加载数据
     *
     * @type {boolean}
     */
    this._loadingData = false;
    /**
     * 是否有缓存的图片信息
     *
     * @type {boolean}
     */
    this._hasCachedImgs = false;
    /**
     * 是否在缓存数据加载完成后，尝试使用缓存的数据
     * 尝试一次即可
     * @type {boolean}
     */
    this._triedUsingCacheData = false;
    /**
     * 找到的图片
     * @type {Array}
     */
    this._foundedImgs = [];

    ad.plugin.imageplus.BaseLoader.call(this, config);
};

baidu.inherits(ad.plugin.imageplus.CommonLoader, ad.plugin.imageplus.BaseLoader);

/** @override */
ad.plugin.imageplus.CommonLoader.prototype.main = function () {
    var me = this;
    if (!me.config.get('autoStart')) {
        return;
    }

    var cachedImgs = me.config.get('cachedImgs');
    me._hasCachedImgs = !!cachedImgs;
    // 标识是否使用了startOnLoad
    // opt 参数值：
    //  1 - 0001 -- 直接执行
    //  2 - 0010 -- page load之后执行
    //  5 - 0101 -- 直接执行 + 缓存
    //  6 - 0110 -- page load之后执行 + 缓存
    //  8 - 1000 -- 站点配置中设置了startOnLoad
    //  9 - 1100 -- 站点配置中设置了startOnLoad + 缓存
    me._logTimes['opt'] = 1 | (me._hasCachedImgs ? 4 : 0);
    me._logTimes['v'] = 7;

    if (me._hasCachedImgs) {
        // 获取缓存的数据并尝试展现
        me._getAndRendCacheData(cachedImgs);
    }

    // 是否在onload之后执行
    var startOnLoad = me.config.get('startOnLoad');
    var loadTimeout;
    var start = function () {
        if (startOnLoad) {
            // 记录onload的时间点
            me._logTimes['onload'] = new Date().getTime();
        }

        if (loadTimeout) {
            clearTimeout(loadTimeout);
        }

        /**
         * 定时监控并加载广告
         */
        var tick = function () {
            if (me.getLength() < me._maxAdCount) {
                // 未超过最大展现量了
                // 还可以展现广告
                if (me._hasCachedImgs && !me._triedUsingCacheData) {
                    // 只有当有缓存，且未尝试过使用缓存数据时
                    me._findAndSaveRightImgs();
                }
                else {
                    me._spyImgs();
                }
            }
            // 检查已展现的广告，图片位置是否更新
            // fix 因为动态内容加载导致，图片位置改变造成的bug
            me.updateAds();
            ad.base.setTimeout(tick, me.config.get('tickInterval'));
        };
        tick();
        me.watchAds();
    };

    if (!startOnLoad || document.readyState === 'complete') {
        start();
    }
    else {
        ad.event.on(window, 'load', start);
        // fallback
        // 避免页面js报错导致onload事件不执行
        loadTimeout = setTimeout(start, me.config.get('onloadTimeout'));
    }
};

/**
 * 监控所有未加载广告且符合规则的图片
 * 这么做是为了解决网站是延迟加载的情况
 */
ad.plugin.imageplus.CommonLoader.prototype._spyImgs = function () {
    var me = this;
    var imgs = me.findImgs();
    var statusKey = me._imgStatusKey;
    ad.array.each(imgs, function (img, i) {
        img = /** @type {Element} */(img);
        if (!img || !me.config.isImgFollowRules(img)) {
            return;
        }

        var status = img[statusKey] || 0;
        switch (status) {
            case 0:
                // 等待数据加载完成
                me._show(img);
                break;
            case 1:
                // 等待src更新中
                if (img[me._imgSrcKey] !== img.src) {
                    // 如果图片地址改动（例如延迟加载的情况）
                    // 进入loading状态
                    img[statusKey] = 1;
                    me._show(img);
                }
                break;
            case 2:
                // 已展现广告
                break;
            default:
                break;
        }
    });
};


/**
 * 存储所有的符合规范的图片，不会展示广告
 */
ad.plugin.imageplus.CommonLoader.prototype._findAndSaveRightImgs = function () {
    var me = this;
    var imgs = me.findImgs();
    var statusKey = me._imgStatusKey;
    ad.array.each(imgs, function (img, i) {
        img = /** @type {Element} */(img);
        if (!img || (img[statusKey] != null) || !me.config.isImgFollowRules(img)) {
            return;
        }

        img[statusKey] = 0;
        me._foundedImgs.push(img);
    });
};

/**
 * 尝试展现缓存的广告
 */
ad.plugin.imageplus.CommonLoader.prototype._showCachedAd = function () {
    var me = this;
    var statusKey = me._imgStatusKey;

    ad.array.each(me._foundedImgs, function (img, i) {
        img = /** @type {Element} */(img);
        var status = img[statusKey] || 0;
        var imgSrc = decodeURIComponent(img.src);
        var cache = me._cachedDatas[imgSrc];

        if (!cache || (status !== 0)) {
            // 没有缓存或者展现完成或者展现失败了
            return;
        }

        me._show(img, {
            'immediate': true
        });
    });
};

/**
 * 加载数据并展现广告
 *
 * @param {Element} img 图片元素
 * @param {Object=} opt_option 可选配置
 * @param {boolean=} opt_option.immediate 是否立即执行，不等待正在进行的请求结束
 * @param {Function=} opt_option.callback 执行结束后的回调函数
 */
ad.plugin.imageplus.CommonLoader.prototype._show = function (img, opt_option) {
    var me = this;
    var option = opt_option || {};

    if (!option['immediate'] && me._loadingData) {
        // 同时只能请求一张图片的数据
        return;
    }
    me._loadingData = true;

    me.showAd(img, function (imgIndex) {
        me._loadingData = false;
        var statusKey = me._imgStatusKey;
        if (imgIndex) {
            // 展现成功
            img[statusKey] = 2;
            me.setupImgCover(img);
        }
        else {
            // 没数据不展现
            img[statusKey] = 1;
            img[me._imgSrcKey] = img.src;
        }

        if (option['callback']) {
            option['callback'](imgIndex);
        }
    });
};

/**
 * 加载数据并展现广告
 *
 * @param {Array} cachedImgs 图片元素
 */
ad.plugin.imageplus.CommonLoader.prototype._getAndRendCacheData = function (cachedImgs) {
    var me = this;
    var img;
    var count = 0;

    me._logTimes['c_loading'] = new Date().getTime();
    for (var i = 0; i < cachedImgs.length; i++) {
        img = cachedImgs[i];
        if (img['image'] && img['width'] && img['height']) {
            me.getData(img, (function (imgUrl) {
                return function (data) {
                    if (data) {
                        me._cachedDatas[imgUrl] = data;
                    }

                    count++;
                    me._logTimes['c_loaded_' + count] = new Date().getTime();
                    if (count === cachedImgs.length) {
                        // 所有数据都已加载
                        // 再尝试查找图片
                        me._findAndSaveRightImgs();
                        // 尝试展现缓存数据
                        me._showCachedAd();
                        // 清理数据
                        me._foundedImgs.length = 0;
                        // 确保下次循环时进入spyImgs方法而不是spyImgs2方法
                        me._triedUsingCacheData = true;
                    }
                    else {
                        // 加载了一部分，先尝试展现广告
                        me._showCachedAd();
                    }
                };
            })(img['image'])); // jshint ignore:line
        }
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
