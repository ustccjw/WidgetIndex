/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/alternative_item.js
 * desc:    alternative item
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 20:53:37$
 */

goog.require('ad.spec.ComplexItem');
goog.require('ad.spec.ObjectItem');

goog.provide('ad.spec.AlternativeItem');

/**
 * Alternative类型
 * @param {Object} pref 表单配置项
 * @param {string=} opt_np 由name(即key)组成的name path
 * @param {string=} opt_dnp 由displayName组成的display name path
 * @extends {ad.spec.ComplexItem}
 * @constructor
 */
ad.spec.AlternativeItem = function(pref, opt_np, opt_dnp) {
    ad.spec.ComplexItem.call(this, pref, opt_np, opt_dnp);

    /**
     * @type {ad.spec.ObjectItem}
     */
    this.currentChild;

    /**
     * @type {string}
     */
    this.currentOption;
};
baidu.inherits(ad.spec.AlternativeItem, ad.spec.ComplexItem);

/**
 * @inheritDoc
 */
ad.spec.AlternativeItem.prototype.setValue = function(value) {
    ad.spec.AlternativeItem.superClass.setValue.call(this, value);
    value = /** @type {Object} */ (value || {});
    this.currentOption = baidu.object.keys(value)[0];

    // 创建子Item
    this.createChild(this.currentOption);
    if (this.currentChild) {
        this.currentChild.setValue(value[this.currentOption]);
    }
};

/**
 * 创建子Item
 */
ad.spec.AlternativeItem.prototype.createChild = function(current) {
    if (!current) {
        this.currentChild = null;
        return;
    }
    var pref = this.pref;
    var options = pref['enumValues'];
    if (options.length <= 0) {
        this.currentChild = null;
        return;
    }
    for(var i = 0; i < options.length; i++){
        var option = options[i];
        if (option['value'] == current) {
            var np = this.getNamePath('[' + option['value'] + ']');
            var dnp = this.getDisplayNamePath('_' + option['displayValue']);
            this.currentChild = new ad.spec.ObjectItem(option['items'], np, dnp);
            break;
        }
    }
};

/**
 * @inheritDoc
 */
ad.spec.AlternativeItem.prototype.walk = function(callback) {
    if (this.currentChild && this.currentChild.hasValue()) {
        callback(this.currentChild);
        this.currentChild.walk(callback);
    }
};

/**
 * @inheritDoc
 */
ad.spec.AlternativeItem.prototype.search = function(pathArr) {
    var key = pathArr[0];
    var restPathArr = pathArr.slice(1);
    var found = [];
    if (key == '*' || key == this.currentOption) {
        if (this.currentChild && this.currentChild.hasValue()) {
            found = this.currentChild.search(restPathArr);
        }
    }
    return found;
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
