/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/filter/pick_value_filter.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/08/21 15:02:40$
 */

goog.require('ad.object');
goog.require('ad.array');
goog.require('ad.base');
goog.require('ad.plugin.Filter');
goog.require('ad.plugin.DataFilter');
goog.require('ad.spec.util');
goog.require('ad.spec.ItemType');

goog.provide('ad.plugin.PickValueFilter');

/**
 * AKA 数据过滤插件
 * @extends {ad.plugin.DataFilter}
 * @constructor
 */
ad.plugin.PickValueFilter = function() {
    ad.plugin.DataFilter.call(this);
};
baidu.inherits(ad.plugin.PickValueFilter, ad.plugin.DataFilter);
// 实例化
ad.plugin.Filter.register(new ad.plugin.PickValueFilter());

/**
 * @inheritDoc
 */
ad.plugin.PickValueFilter.prototype.run = function(adConfig, spec, jsonPathArr, templateId, pluginParams) {
    var params = pluginParams['ad.plugin.PickValueFilter'];
    if (params['jsonPath']) {
        var util = ad.spec.util;
        var specWalker = util.buildWalker(spec, adConfig);
        var items = specWalker.query(params['jsonPath']);
        var arr = [];
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            arr.push(item.getValue());
        }
        return arr;
    }
    else if (params['key']) {
        var pickKey = params['key'];
        var arr = [];
        walk(adConfig, pickKey, arr);
        return arr;
    }
    else if (params['tag']) {
        var tag = params['tag'];
        var util = ad.spec.util;
        var specWalker = util.buildWalker(spec, adConfig);
        var arr = [];
        specWalker.walk(function(item) {
            var tags = item.getExtraAttr('tags');
            if (tags && tags.length) {
                if (baidu.array.contains(tags, tag)) {
                    arr.push(item.getValue());
                }
            }
        });
        return arr;
    }
    else {
        return [];
    }

    function walk(data, pickKey, arr) {
        if (Object.prototype.toString.call(data) === '[object Object]') {
            ad.object.each(data, function(value, key) {
                if (pickKey === key) {
                    arr.push(value);
                }
                else {
                    walk(value, pickKey, arr);
                }
            });
        }
        else if (Object.prototype.toString.call(data) === '[object Array]') {
            ad.array.each(data, function(value) {
                walk(value, pickKey, arr);
            });
        }
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
