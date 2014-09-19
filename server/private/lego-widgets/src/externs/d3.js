/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * d3.js ~ 2013/07/16 18:15:11
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * @externs
 **/

/**
 * @type {Object}
 */
var d3 = {};

/**
 * @type {Object}
 */
d3.layout = {};

/**
 * @return {D3LayoutPack}
 */
d3.layout.pack = function() {};

/**
 * @constructor
 */
function D3LayoutPack() {}

/**
 * @param {?Function} comparator 比较函数.
 * @return {D3LayoutPack}
 */
D3LayoutPack.prototype.sort = function(comparator) {};

/**
 * @param {Array.<number>} size 布局的大小.
 * @return {D3LayoutPack}
 */
D3LayoutPack.prototype.size = function(size) {};

/**
 * @param {{children:Array.<({value:number}|Object)>}} data 输入数据.
 * @return {Array.<({value:number, r:number, x:number, y:number}|Object)>} 布局之后的数据.
 */
D3LayoutPack.prototype.nodes = function(data) {};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
