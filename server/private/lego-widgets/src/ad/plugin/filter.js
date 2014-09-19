/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/filter.js
 * desc:    filter 基类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/07/30 18:04:05$
 */

goog.require('ad.base');

goog.provide('ad.plugin.Filter');

/**
 * Filter基类
 * @constructor
 */
ad.plugin.Filter = function() {
    // ...
};

/**
 * @param {Object} adConfig
 * @param {...*} var_args
 * @return {Object}
 * @expose
 */
ad.plugin.Filter.prototype.run = baidu.abstractMethod;

/**
 * @return {Array.<ad.plugin.Filter>}
 */
ad.plugin.Filter.getContext = function() {
    var key = 'ECOM_MA_LEGO_PLUGIN_FILTERS';
    window[key] = window[key] || [];

    return window[key];
};

/**
 * @param {ad.plugin.Filter} inst Filter的实例.
 */
ad.plugin.Filter.register = function(inst) {
    var filters = ad.plugin.Filter.getContext();

    filters.push(inst);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
