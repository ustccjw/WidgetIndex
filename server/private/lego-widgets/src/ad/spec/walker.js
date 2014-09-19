/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/walker.js
 * desc:    spec walker
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 19:38:15$
 */

// 这几个是为了保证依赖关系加的
goog.require('ad.spec.ListItem');
goog.require('ad.spec.GridItem');
goog.require('ad.spec.AlternativeItem');
goog.require('ad.spec.SimpleItem');

goog.require('ad.spec.ObjectItem');
goog.provide('ad.spec.Walker');

/**
 * spec walker 构造函数
 * @param {Array.<Object>} spec 表单配置
 * @param {Object} adConfig 用户数据
 * @constructor
 */
ad.spec.Walker = function(spec, adConfig) {
    this.spec = spec;
    this.adConfig = adConfig;

    /**
     * @type {ad.spec.ObjectItem}
     */
    this.root = null;

    this.build();
};

/**
 * 建立spec tree
 */
ad.spec.Walker.prototype.build = function() {
    var pref = {
        'name': '',
        'displayName': '',
        'datatype': 'OBJECT',
        'items': this.spec
    };
    this.root = new ad.spec.ObjectItem(pref, '$', '');
    this.root.setValue(this.adConfig);
};

/**
 * 根据jsonPath获取item
 * 一些限制：
 *  (1)暂时不允许有..、@、?()、()形式的path
 *  (2)允许$、. or []、*、[,]、[]/我是注释：这里指的数组/、 [start:end:step]
 * @param {string} jsonPath
 * @return {Array.<ad.spec.Item>}
 */
ad.spec.Walker.prototype.query = function(jsonPath) {
    return this.root.query(jsonPath);
};

/**
 * 根据spec tree遍历adConfig
 * @param {function(ad.spec.Item)} callback 回调
 */
ad.spec.Walker.prototype.walk = function(callback) {
    if (this.root.walk) {
        this.root.walk(callback);
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
