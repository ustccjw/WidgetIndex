/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/loader_config.js ~ 2013/08/09 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/
/*global document:false, navigator:false, clearTimeout:false,
 setTimeout:false, ECMA_require:false, goog:false */


goog.provide('ad.plugin.imageplus.LoaderConfig');

/**
 * imageplus Loader
 *
 * @constructor
 * @param {Object} config .
 */
ad.plugin.imageplus.LoaderConfig = function (config) {
    this._config = config;
};

/**
 * Get the original value
 *
 * @param {string} key .
 * @param {*=} opt_default 默认值.
 * @return {*} value.
 */
ad.plugin.imageplus.LoaderConfig.prototype.get = function (key, opt_default) {
    return (key in this._config) ? this._config[key] : opt_default;
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
