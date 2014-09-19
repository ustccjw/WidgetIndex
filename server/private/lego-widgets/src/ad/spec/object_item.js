/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/object_item.js
 * desc:    object item
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 19:52:04$
 */

/*
FIXME: 循环依赖了，这里不能require这些东东
// goog.require('ad.spec.ObjectItem');
// goog.require('ad.spec.ListItem');
// goog.require('ad.spec.GridItem');
// goog.require('ad.spec.AlternativeItem');
*/
goog.require('ad.spec.SimpleItem');
goog.require('ad.spec.ComplexItem');
goog.require('ad.spec.ItemType');

goog.provide('ad.spec.ObjectItem');

/**
 * Object类型
 * @param {Object} pref 表单配置项
 * @param {string=} opt_np 由name(即key)组成的name path
 * @param {string=} opt_dnp 由displayName组成的display name path
 * @extends {ad.spec.ComplexItem}
 * @constructor
 */
ad.spec.ObjectItem = function(pref, opt_np, opt_dnp) {
    // 兼容完整和不完整的pref：对有些object item没有name和diplayName等，只有items，所以需要补全
    pref = baidu.lang.isArray(pref)
        ? {
            'name': '',
            'displayName': '',
            'datatype': 'OBJECT',
            'items': pref
        }
        : pref;
    ad.spec.ComplexItem.call(this, pref, opt_np, opt_dnp);

    /**
     * @type {Object.<string, ad.spec.Item>}
     */
    this.children = {};

    this.createChildren();
};
baidu.inherits(ad.spec.ObjectItem, ad.spec.ComplexItem);

/**
 * @inheritDoc
 */
ad.spec.ObjectItem.prototype.setValue = function(value) {
    ad.spec.ObjectItem.superClass.setValue.call(this, value);
    var pref = this.pref;
    var items = pref['items'];
    value = value || {};
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var name = item['name'];
        var child = this.children[name];
        child.setValue(value[name]);
    }
};

/**
 * 创建子Item
 */
ad.spec.ObjectItem.prototype.createChildren = function() {
    var pref = this.pref;
    var items = pref['items'];
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
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var datatype = item['datatype'].toLowerCase();
        if (!map[datatype]) {
            throw 'unknown datatype: ' + datatype;
        }
        var name = item['name'];
        var np = this.getNamePath('.' + name);
        var isDNPEmpty = !this.getDisplayNamePath();
        // XXX: item.displayName可能是undefined
        var dnp = this.getDisplayNamePath(((!isDNPEmpty && item['displayName']) ? '_' : '') + (item['displayName'] || ''));
        this.children[name] = new map[datatype](item, np, dnp);
    }
};

/**
 * @inheritDoc
 */
ad.spec.ObjectItem.prototype.walk = function(callback) {
    var pref = this.pref;
    var items = pref['items'];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var name = item['name'];
        var child = this.children[name];
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
ad.spec.ObjectItem.prototype.search = function(pathArr) {
    var pref = this.pref;
    var items = pref['items'];
    var key = pathArr[0];
    var restPathArr = pathArr.slice(1);
    var found = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var name = item['name'];
        var child = this.children[name];
        if (child.hasValue()) {
            if (key == '*' || name == key) {
                if (child.getType() == ad.spec.ItemType.COMPLEX_ITEM) {
                    found = found.concat(child.search(restPathArr));
                }
                else {
                    found.push(child);
                }
            }
        }
    }
    return found;
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
