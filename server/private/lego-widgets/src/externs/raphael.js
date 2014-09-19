/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * raphael.js ~ 2013/07/16 18:15:34
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * @externs
 **/

/**
 * @param {Element} canvas 图表所在的画布. 
 * @return {RaphaelElement}
 */
function Raphael(canvas) {}

/**
 * @constructor
 */
function RaphaelElement(){}

/**
 * @param {string} string 逗号分隔，横轴纵轴信息. 
 * @return {RaphaelElement}
 */
RaphaelElement.prototype.path = function(string){};

/**
 * @param {Object} object 其他样式信息.
 * @return {RaphaelElement}
 */
RaphaelElement.prototype.attr = function(object) {};
/**
 * @param {number} x 横轴坐标.
 * @param {number} y 纵轴坐标.
 * @param {string} value 显示的值.
 * @return {RaphaelElement}
 */
RaphaelElement.prototype.text = function(x,y,value) {};
/**
 * @param {string} name 字段名称.
 * @param {string} value 字段属性值.
 * @return {RaphaelElement}
 */
RaphaelElement.prototype.data = function(name,value) {};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
