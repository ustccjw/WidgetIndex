/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/grid_item.js
 * desc:    grid item
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 20:54:23$
 */

goog.require('ad.spec.Item');
goog.require('ad.spec.ComplexItem');
goog.require('ad.spec.ObjectItem');

goog.provide('ad.spec.GridItem');

/**
 * Grid类型
 * @param {Object} pref 表单配置项
 * @param {string=} opt_np 由name(即key)组成的name path
 * @param {string=} opt_dnp 由displayName组成的display name path
 * @extends {ad.spec.ComplexItem}
 * @constructor
 */
ad.spec.GridItem = function(pref, opt_np, opt_dnp) {
    ad.spec.ComplexItem.call(this, pref, opt_np, opt_dnp);

    /**
     * @type {Array.<Array.<ad.spec.ObjectItem>>}
     */
    this.children = [];

    /**
     * @type {number}
     */
    this.rowCount = 0;

    /**
     * @type {number}
     */
    this.colCount = 0;

    /**
     * @type {boolean}
     */
    this.hasHeadPref = pref['headCell'] && pref['headCell'].length > 0;
};
baidu.inherits(ad.spec.GridItem, ad.spec.ComplexItem);

/**
 * @inheritDoc
 */
ad.spec.GridItem.prototype.setValue = function(value) {
    ad.spec.GridItem.superClass.setValue.call(this, value);
    var data = value || [];
    this.rowCount = data.length;
    this.colCount = data[0] ? data[0].length : 0;

    this.children = [];
    this.createChildren();
    // 逐个setValue
    var cs = this.children;
    for(var i = 0; i < this.rowCount; i++){
        for(var j = 0; j < this.colCount; j++){
            cs[i][j].setValue(data[i] && data[i][j] ? data[i][j] : null);
        }
    }
};

/**
 * 创建子Item
 */
ad.spec.GridItem.prototype.createChildren = function() {
    var pref = this.pref;

    var headPref = this.hasHeadPref ? pref['headCell'] : pref['dataCell'];
    var dataPref = pref['dataCell'];
    for (var i = 0; i < this.rowCount; i++) {
        this.children[i] = [];
        for (var j = 0; j < this.colCount; j++) {
            var np = this.getNamePath('[' + i + '][' + j + ']');
            var dnp = this.getDisplayNamePath('_' + (i + 1) + '_' + (j + 1));
            var thePref = i == 0 ? headPref : dataPref;
            this.children[i][j] = new ad.spec.ObjectItem(thePref, np, dnp);
        }
    }
};

/**
 * @inheritDoc
 */
ad.spec.GridItem.prototype.walk = function(callback) {
    var cs = this.children;
    for (var i = 0; i < this.rowCount; i++) {
        for (var j = 0; j < this.colCount; j++) {
            var child = cs[i][j];
            if (child.hasValue()) {
                callback(child);
                child.walk(callback);
            }
        }
    }
};

/**
 * @inheritDoc
 */
ad.spec.GridItem.prototype.search = function(pathArr) {
    var rIndexes = ad.spec.Item.parseArrayIndex(pathArr[0], this.rowCount);
    var cIndexes = ad.spec.Item.parseArrayIndex(pathArr[1], this.colCount);
    var restPathArr = pathArr.slice(2);
    var cs = this.children;
    var found = [];
    // examples:
    // [*][*] 所有单元格
    // [0][*] 第一行
    // [1:][*] 除第一行以外的
    for (var i = 0; i < rIndexes.length; i++) {
        var ri = rIndexes[i];
        for (var j = 0; j < cIndexes.length; j++) {
            var ci = cIndexes[j];
            var child = cs[ri][ci];
            if (child.hasValue()) {
                found = found.concat(child.search(restPathArr));
            }
        }
    }
    return found;
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
