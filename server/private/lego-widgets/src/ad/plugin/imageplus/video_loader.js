/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/video_loader.js ~ 2014/06/09 11:11:00
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/

/*global document:false, navigator:false, clearTimeout:false,
 setTimeout:false, ECMA_require:false, goog:false, HASH:false,
 requestAnimationFrame:false, webkitRequestAnimationFrame:false,
 mozRequestAnimationFrame:false, oRequestAnimationFrame:false */

goog.require('ad.dom');
goog.require('ad.plugin.imageplus.BaseLoader');
goog.require('ui.events');

goog.provide('ad.plugin.imageplus.VideoLoader');

/**
 * imageplus Loader
 *
 * @extends ad.plugin.imageplus.BaseLoader
 * @constructor
 * @param {ad.plugin.imageplus.LoaderConfig} config .
 */
ad.plugin.imageplus.VideoLoader = function (config) {
    ad.plugin.imageplus.BaseLoader.call(this, config);
};

baidu.inherits(ad.plugin.imageplus.VideoLoader, ad.plugin.imageplus.BaseLoader);

/** @override */
ad.plugin.imageplus.VideoLoader.prototype.showAd = function (imgOrIndex, opt_callback) {
    var imgIndex = this.getImgIndex(imgOrIndex);
    if (!imgIndex) { // 没有广告展现过
        if (imgOrIndex['baiduImageplusStatus'] === 'TRIED') {
            // 已请求过数据
            // 避免过多的重复请求
            if (opt_callback) {
                opt_callback(0);
            }
            return;
        }
        imgOrIndex['baiduImageplusStatus'] = 'TRIED';
    }
    ad.plugin.imageplus.VideoLoader.superClass.showAd.call(this, (imgIndex || imgOrIndex), opt_callback);
};

/** @override */
ad.plugin.imageplus.VideoLoader.prototype.getData = function (img, callback) {
    if (location.href.match(/(\?|&)baiduImageplus=/)) {
        // 调试数据
        callback(window['baiduImagePlusFakeData']);
        return;
    }

    var imgUrl;
    var wd;
    var imgWidth;
    var imgHeight;

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
        var searchQuery = this.config.get('searchQuery', '');
        wd[1] = searchQuery;
        wd = wd.join('_');
    }
    wd = encodeURIComponent(wd);
    imgWidth = img.offsetWidth;
    imgHeight = img.offsetHeight;

    var api = this.config.get('api');
    var query = baidu.url.jsonToQuery({
        'src': this.config.get('apiSrc'),
        'wd': wd,
        'image_url[]': imgUrl,
        'qid': this._qid,
        'width': imgWidth,
        'height': imgHeight,
        'cached': 0,
        'page_image_cnt': this._allPageImgsCount
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




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
