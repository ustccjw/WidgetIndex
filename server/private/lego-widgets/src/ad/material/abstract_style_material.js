/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/material/abstract_style_material.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/09/04 11:27:57$
 */

goog.provide('ad.material.AbstractStyleMaterial');

/**
 * @typedef {{
 *   width: number,
 *   height: number,
 *   padding: Array.<number>,
 *   index: number,
 *   content: number,
 *   ns: Function
 * }}
 */
ad.LayoutCellType;

/**
 * @typedef {{
 *   cols: Array.<ad.LayoutCellType>,
 *   width: number,
 *   height: number,
 *   index: number,
 *   content: number
 * }}
 */
ad.LayoutRowType;

/**
 * @typedef {{
 *   height: number,
 *   width: number,
 *   padding: Array.<number>,
 *   margin: Array.<number>,
 *   background: string,
 *   rows: Array.<ad.LayoutRowType>
 * }|Object}
 */
ad.LayoutType;

/**
 * @param {string} canvas_id 画布的Id.
 * @param {ad.LayoutType} layout 布局数据.
 * @param {Object} adConfig 配置数据
 * @interface
 */
ad.material.AbstractStyleMaterial = function(canvas_id, layout, adConfig) {
};

/**
 * @expose
 * @param {...number} var_args 索引序列.
 * @return {?ad.widget.Widget}
 */
ad.material.AbstractStyleMaterial.prototype.getWidget = function(var_args) {
};

/**
 * 获取画布元素.
 * @expose
 * @return {!Element} 画布所处的DOM元素.
 */
ad.material.AbstractStyleMaterial.prototype.getRoot = function() {
};

/**
 * 获取画布元素的Id.
 * @expose
 * @return {string} 画布元素的Id.
 */
ad.material.AbstractStyleMaterial.prototype.getId = function() {
};

/**
 * 展示物料，这个函数应该只会被调用一次.
 * @expose
 */
ad.material.AbstractStyleMaterial.prototype.show = function() {
};

/**
 * 物料销毁的工作.
 */
ad.material.AbstractStyleMaterial.prototype.dispose = function() {
};

/**
 * 添加监听器
 * @param {string} eventType 事件类型.
 * @param {Function} listener 监听器.
 */
ad.material.AbstractStyleMaterial.prototype.addListener = function(eventType, listener) {
};


/**
 * 移除监听器
 *
 * @param {string} eventType 事件类型.
 * @param {Function} listener 监听器.
 */
ad.material.AbstractStyleMaterial.prototype.removeListener = function(eventType, listener) {
};

/**
 * 触发事件
 *
 * @param {string} eventType 事件类型.
 * @param {...*} var_args 自定义参数.
 * @return {boolean} 返回值.
 */
ad.material.AbstractStyleMaterial.prototype.trigger = function(eventType, var_args) {
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
