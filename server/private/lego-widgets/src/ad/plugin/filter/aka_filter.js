/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/filter/aka_filter.js
 * desc:    AKA filter
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/07/31 17:25:33$
 */

goog.require('ad.base');
goog.require('ad.plugin.Filter');
goog.require('ad.plugin.AuditFilter');
goog.require('ad.spec.util');
goog.require('ad.spec.ItemType');

goog.provide('ad.plugin.AkaFilter');

/**
 * AKA 数据过滤插件
 * @extends {ad.plugin.AuditFilter}
 * @constructor
 */
ad.plugin.AkaFilter = function() {
    ad.plugin.AuditFilter.call(this);
};
baidu.inherits(ad.plugin.AkaFilter, ad.plugin.AuditFilter);
// 实例化
ad.plugin.Filter.register(new ad.plugin.AkaFilter());

/**
 * @inheritDoc
 */
ad.plugin.AkaFilter.prototype.run = function(adConfig, spec, jsonPathArr, templateId) {
    var util = ad.spec.util;

    var specWalker = util.buildWalker(spec, adConfig);
    var arr = [];
    if (jsonPathArr) {
        for (var i = 0; i < jsonPathArr.length; i++) {
            var path = jsonPathArr[i];
            // query one path
            var items = specWalker.query(path);
            for (var j = 0; j < items.length; j++) {
                var item = items[j];
                var data = getAkaData(item);
                data && arr.push(data);
            }
        }
        return arr;
    }
    else { // 没有设置jsonPathArr时，取全集
        specWalker.walk(function(item) {
            if (item.getType() == ad.spec.ItemType.COMPLEX_ITEM) {
                return;
            }
            var data = getAkaData(item);
            data && arr.push(data);
        });
        return arr;
    }

    function getAkaData(item) {
        var value = item.getValue();
        var name = item.getName();
        var type = util.guessType(name, value);

        if (type == 'url' || type == 'text') {
            var obj = {
                'type': type,
                'value': value
            };
            if (name == 'site'
                || name == 'official_site'
                || name == 'show_url'
            ) {
                obj['subType'] = 'visible';
            }
            return obj;
        }

        return null;
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
