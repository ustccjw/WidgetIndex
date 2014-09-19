/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/filter/tieba_aka_filter.js
 * desc:    Tieba Defensor filter
 * author:  guyiling(guyiling@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/19/ 18:20$
 */

goog.require('ad.base');
goog.require('ad.plugin.Filter');
goog.require('ad.plugin.AuditFilter');
goog.require('ad.spec.util');
goog.require('ad.spec.ItemType');

goog.provide('ad.plugin.TiebaDefensorFilter');

/**
 * Defensor 数据过滤插件
 * @extends {ad.plugin.AuditFilter}
 * @constructor
 */
ad.plugin.TiebaDefensorFilter = function() {
    ad.plugin.AuditFilter.call(this);
};
baidu.inherits(ad.plugin.TiebaDefensorFilter, ad.plugin.AuditFilter);
// 实例化
ad.plugin.Filter.register(new ad.plugin.TiebaDefensorFilter());

/**
 * @inheritDoc
 */
ad.plugin.TiebaDefensorFilter.prototype.run = function(adConfig, spec, jsonPathArr, templateId) {
    var util = ad.spec.util;

    var specWalker = util.buildWalker(spec, adConfig);
    var fields = this.fields;
    var map = {};
    for (var i = 0; i < fields.length; i++) {
        var path = fields[i].path;
        var key = fields[i].key;
        // query one path
        var items = specWalker.query(path);
        var item;
        if (items.length) {
            item = items[0];
            map[key] = item.getValue();
        }
    }
    return map;
};

/**
 * 需要验证的字段
 * @type {Array.<{path: string, key: string}>}
 */
ad.plugin.TiebaDefensorFilter.prototype.fields = [
    {
        path: '$.0.name',
        key: 'tiebaName'
    },
    {
        path: '$.0.banner.image_url',
        key: 'bannerImage'
    },
    {
        path: '$.0.banner.rcv_url',
        key: 'bannerUrl'
    },
    {
        path: '$.0.intro',
        key: 'intro'
    },
    {
        path: '$.0.logo_url',
        key: 'logo'
    },
    {
        path: '$.0.skin.top_url',
        key: 'skin'
    }
];

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
