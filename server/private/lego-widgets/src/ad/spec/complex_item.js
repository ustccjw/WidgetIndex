/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/complex_item.js
 * desc:    complex item
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 19:47:51$
 */

goog.require('ad.spec.Item');
goog.require('ad.spec.ItemType');

goog.provide('ad.spec.ComplexItem');

/**
 * 复杂配置项(可嵌套其他配置项)
 * @param {Object} pref 表单配置项
 * @param {string=} opt_np 由name(即key)组成的name path
 * @param {string=} opt_dnp 由displayName组成的display name path
 * @extends {ad.spec.Item}
 * @constructor
 */
ad.spec.ComplexItem = function(pref, opt_np, opt_dnp) {
    ad.spec.Item.call(this, pref, opt_np, opt_dnp);

    /**
     * @type {ad.spec.ItemType}
     */
    this.type = ad.spec.ItemType.COMPLEX_ITEM;
};
baidu.inherits(ad.spec.ComplexItem, ad.spec.Item);

/**
 * 遍历所有子item
 * @param {function(ad.spec.Item)} callback 回调
 */
ad.spec.ComplexItem.prototype.walk = function(callback) {
    // to overwrite
};

/**
 * 根据normalized path array来搜索所有符合条件的item
 * @param {Array.<string>} pathArr normalized path array.
 * @return {Array.<ad.spec.Item>}
 */
ad.spec.ComplexItem.prototype.search = function(pathArr) {
    // to overwrite
};

/**
 * 根据jsonPath获取item
 * 一些限制：
 *  (1)暂时不允许有..、@、?()、()形式的path
 *  (2)允许$、. or []、*、[,]、[]/我是注释：这里指的数组/、 [start:end:step]
 * @param {string} jsonPath
 * @return {Array.<ad.spec.Item>}
 */
ad.spec.ComplexItem.prototype.query = function(jsonPath) {
    // normalize
    var normalized = this.normalize(jsonPath).replace(/^\$;/,"");

    // 用normalized的path来搜索item
    return this.search(normalized.split(';'));
};

/**
 * 归一化json path(转换为统一的分号分隔的形式)
 * normalized examples:
 *   1. $.head.title         ->  "$;head;title"
 *   2. $['head']['title']   ->  "$;head;title"
 *   3. $.buttons.0.url      ->  "$;buttons;0;url"
 * @param {string} jsonPath
 * @return {string}
 */
ad.spec.ComplexItem.prototype.normalize = function(jsonPath) {
   var subx = [];
   return jsonPath.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
              .replace(/'?\.'?|\['?/g, ";")
              .replace(/;;;|;;/g, ";..;")
              .replace(/;$|'?\]|'$/g, "")
              .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
};


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
