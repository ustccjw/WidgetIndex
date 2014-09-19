/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * ns_external_api.js ~ 2013/07/16 18:21:32
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * 阿拉丁给图片和视频开放出来的接口
 * @externs
 **/

/**
 * 阿拉丁给图片和视频开放出来的接口
 */
var NSExternalAPI = {};

/**
 * 获取占位符id
 * @return {?string}
 */
NSExternalAPI.getId = function(){}

/**
 * 图片或者视频页面的中的代码调用这个接口来显示阿拉丁
 */
NSExternalAPI.show = function(){};

/**
 * 返回物料宽高
 * @return {{width:number,height:number}}
 */
NSExternalAPI.getArea = function(){};

/**
 * 获取附加背景的background样式
 *
 * @return {string} 样式字符串
 */
NSExternalAPI.getSecondaryBack = function(){};

/**
 * 获取附加背景的高度
 *
 * @return {number|null} 高度
 */
NSExternalAPI.getSecondaryHeight = function(){};

/**
 * 获取主要背景的background样式
 *
 * @return {string} 样式字符串
 */
NSExternalAPI.getPrimaryBack = function(){};

/**
 * 获取主要背景的高度
 *
 * @return {number|null} 高度
 */
NSExternalAPI.getPrimaryHeight = function(){};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
