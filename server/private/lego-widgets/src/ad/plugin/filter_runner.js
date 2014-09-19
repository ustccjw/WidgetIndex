/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/filter_runner.js
 * desc:    filter runner
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/02 11:47:25$
 */

goog.require('ad.base');
goog.require('ad.plugin.Filter');

goog.provide('ad.plugin.FilterRunner');

/**
 * Filter runner
 * @constructor
 */
ad.plugin.FilterRunner = function() {
    // ...
};

/**
 * @return {Array.<ad.plugin.Filter>}
 */
ad.plugin.FilterRunner.getContext = function() {
    var key = 'ECOM_MA_LEGO_PLUGIN_FILTERS';
    window[key] = window[key] || [];

    return window[key];
};

/**
 * @param {number} index 第几个
 * @param {Object} adConfig
 * @param {...*} var_args
 * @export
 */
ad.plugin.FilterRunner.runByIndex = function(index, adConfig, var_args) {
    var filters = ad.plugin.FilterRunner.getContext();

    if (filters.length && index >= 0 && index < filters.length) {
        var inst = /** @type {ad.plugin.Filter} */ (filters[index]);
        var args = Array.prototype.slice.call(arguments, 1);
        return inst.run.apply(inst, args);
    }
};

/**
 * @param {Object} adConfig
 * @param {...*} var_args
 * @export
 */
ad.plugin.FilterRunner.runLast = function(adConfig, var_args) {
    var filters = ad.plugin.FilterRunner.getContext();

    if (filters.length) {
        var inst = /** @type {ad.plugin.Filter} */ (filters[filters.length - 1]);
        var args = Array.prototype.slice.call(arguments, 0);
        return inst.run.apply(inst, args);
    }
};

/**
 * @param {Object} adConfig
 * @param {...*} var_args
 * @export
 */
ad.plugin.FilterRunner.runAll = function(adConfig, var_args) {
    var filters = ad.plugin.FilterRunner.getContext();

    if (filters.length) {
        var args = Array.prototype.slice.call(arguments, 0);
        var result;
        for (var i = 0; i < filters.length; i++) {
            var inst = /** @type {ad.plugin.Filter} */ (filters[i]);
            result = inst.run.apply(inst, args);
            // 每次都将上一个filter的运行结果放到第一个参数的位置
            args[0] = result;
        }
        return result;
    }

    return null;
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
