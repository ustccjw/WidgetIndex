/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/filter/defensor_filter.js
 * desc:    泰山filter
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/07/31 15:32:54$
 */

goog.require('ad.base');
goog.require('ad.plugin.Filter');
goog.require('ad.plugin.AuditFilter');
goog.require('ad.spec.util');
goog.require('ad.spec.ItemType');

goog.provide('ad.plugin.DefensorFilter');

/**
 * 泰山filter
 * @extends {ad.plugin.AuditFilter}
 * @constructor
 */
ad.plugin.DefensorFilter = function() {
    ad.plugin.AuditFilter.call(this);
};
baidu.inherits(ad.plugin.DefensorFilter, ad.plugin.AuditFilter);
// 实例化
ad.plugin.Filter.register(new ad.plugin.DefensorFilter());

/**
 * @inheritDoc
 */
ad.plugin.DefensorFilter.prototype.run = function(adConfig, spec, jsonPathArr, templateId) {
    var util = ad.spec.util;

    var specWalker = util.buildWalker(spec, adConfig);
    var arr = [];
    specWalker.walk(function(item) {
        if (item.getType() == ad.spec.ItemType.COMPLEX_ITEM) {
            return;
        }
        var value = item.getValue();
        var type = util.guessType(item.getName(), value);
        arr.push({
            'type': type,
            'value': value,
            // 泰山用的PHP，json path的前缀[$.]中的$正好是PHP关键字，所以需要将$.去掉
            'key': item.getNamePath().replace(/^\$\./, ''),
            'name': item.getDisplayNamePath()
        });
    });
    return arr;
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
