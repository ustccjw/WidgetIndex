/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/list_item.js
 * desc:    list item
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 19:53:42$
 */

goog.require('ad.spec.Item');
goog.require('ad.spec.ComplexItem');
goog.require('ad.spec.ObjectItem');
goog.require('ad.spec.ItemType');

goog.provide('ad.spec.ListItem');

/**
 * List类型
 * @param {Object} pref 表单配置项
 * @param {string=} opt_np 由name(即key)组成的name path
 * @param {string=} opt_dnp 由displayName组成的display name path
 * @extends {ad.spec.ComplexItem}
 * @constructor
 */
ad.spec.ListItem = function(pref, opt_np, opt_dnp) {
    ad.spec.ComplexItem.call(this, pref, opt_np, opt_dnp);

    this.children = [];
};
baidu.inherits(ad.spec.ListItem, ad.spec.ComplexItem);

/**
 * @inheritDoc
 */
ad.spec.ListItem.prototype.setValue = function(value) {
    ad.spec.ListItem.superClass.setValue.call(this, value);
    value = value || [];

    this.children = [];
    this.createChildren(value.length);
    // 逐个setValue
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].setValue(value[i]);
    }
};

/**
 * 创建子Item
 */
ad.spec.ListItem.prototype.createChildren = function(count) {
    var pref = this.pref;
    var map = {
        "string" : ad.spec.SimpleItem,
        "html" : ad.spec.SimpleItem,
        "enum" : ad.spec.SimpleItem,
        "bool" : ad.spec.SimpleItem,
        "hidden" : ad.spec.SimpleItem,
        "upload" : ad.spec.SimpleItem,
        "object" : ad.spec.ObjectItem,
        "list" : ad.spec.ListItem,
        "grid" : ad.spec.GridItem,
        "alternative" : ad.spec.AlternativeItem
    };
    for (var i = 0; i < count; i++) {
        var childPref = null;
        if (pref['element']) {
            childPref = pref['element'];
        }
        else if (pref['items']) {
            childPref = {
                'name': '',
                'displayName': '',
                'datatype': 'OBJECT',
                'items': pref['items']
            };
        }
        var datatype = childPref['datatype'].toLowerCase();
        var np = this.getNamePath('[' + i + ']');
        var dnp = this.getDisplayNamePath('_' + (i + 1));
        var child = new map[datatype](childPref, np, dnp);
        this.children.push(child);
    }
};

/**
 * @inheritDoc
 */
ad.spec.ListItem.prototype.walk = function(callback) {
    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child.hasValue()) {
            callback(child);
            if (child.getType() == ad.spec.ItemType.COMPLEX_ITEM) {
                child.walk(callback);
            }
        }
    }
};

/**
 * @inheritDoc
 */
ad.spec.ListItem.prototype.search = function(pathArr) {
    var key = pathArr[0];
    var restPathArr = pathArr.slice(1);
    var found = [];

    var indexes = ad.spec.Item.parseArrayIndex(key, this.children.length);
    for (var i = 0; i < indexes.length; i++) {
        var index = indexes[i];
        var child = this.children[index];
        if (child.hasValue()) {
            found = found.concat(child.search(restPathArr));
        }
    }

    return found;
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
