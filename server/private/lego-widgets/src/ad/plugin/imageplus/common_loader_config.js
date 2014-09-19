/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/loader_config.js ~ 2013/12/03 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/

goog.require('ad.object');
goog.require('ad.plugin.imageplus.BaseLoaderConfig');

goog.provide('ad.plugin.imageplus.CommonLoaderConfig');

/**
 * imageplus Loader
 *
 * @extends ad.plugin.imageplus.BaseLoaderConfig
 * @constructor
 * @param {Object} config .
 */
ad.plugin.imageplus.CommonLoaderConfig = function (config) {
    ad.plugin.imageplus.BaseLoaderConfig.call(this, config);

    this._config = ad.object.extend({
        // 定时监控的间隔
        'tickInterval': 1000,
        // onload事件因为页面有js错误而无法触发时的fallback时间
        'onloadTimeout': 5000,
        // 是否onload时加载广告
        'startOnLoad': false
        // 缓存的数据
        // 'cachedImgs': [
        //     {'image': 'http://baidu.com/xxx.png', 'width': 300, 'height': 400}
        // ]
    }, this._config);
};

baidu.inherits(ad.plugin.imageplus.CommonLoaderConfig, ad.plugin.imageplus.BaseLoaderConfig);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
