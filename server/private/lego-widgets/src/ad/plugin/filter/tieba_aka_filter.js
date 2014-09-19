/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/filter/tieba_aka_filter.js
 * desc:    Tieba AKA filter
 * author:  guyiling(guyiling@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/19/ 18:20$
 */

goog.require('ad.base');
goog.require('ad.plugin.Filter');
goog.require('ad.plugin.AuditFilter');
goog.require('ad.spec.util');
goog.require('ad.spec.ItemType');

goog.provide('ad.plugin.TiebaAkaFilter');

/**
 * AKA 数据过滤插件
 * @extends {ad.plugin.AuditFilter}
 * @constructor
 */
ad.plugin.TiebaAkaFilter = function() {
    ad.plugin.AuditFilter.call(this);
};
baidu.inherits(ad.plugin.TiebaAkaFilter, ad.plugin.AuditFilter);
// 实例化
ad.plugin.Filter.register(new ad.plugin.TiebaAkaFilter());

/**
 * @inheritDoc
 */
ad.plugin.TiebaAkaFilter.prototype.run = function(adConfig, spec, jsonPathArr, templateId) {
    var util = ad.spec.util;

    var specWalker = util.buildWalker(spec, adConfig);
    var fields = this.fields;
    var arr = [];
    for (var i = 0; i < fields.length; i++) {
        var path = fields[i].path;
        // query one path
        var items = specWalker.query(path);
        var item;
        if (items.length) {
            item = items[0];
            arr.push({
                'type': fields[i].type,
                'value': item.getValue()
            });
        }
    }
    return arr;
};

/**
 * 需要验证的字段
 * @type {Array.<{path: string, type: string}>}
 */
ad.plugin.TiebaAkaFilter.prototype.fields = [
    {
        path: '$.0.intro',
        type: 'text'
    }
];

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
