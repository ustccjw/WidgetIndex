/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * amd.js ~ 2013/07/16 18:22:10
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * @externs
 **/


/**
 * 定义模块
 *
 * @param {(string|Function)=} opt_id 模块标识
 * @param {Array=} opt_dependencies 依赖模块列表
 * @param {Function=} opt_factory 创建模块的工厂方法
 */
function define(opt_id, opt_dependencies, opt_factory) {};

/**
 * 定义模块
 *
 * @param {(string|Function)=} opt_id 模块标识
 * @param {Array=} opt_dependencies 依赖模块列表
 * @param {Function=} opt_factory 创建模块的工厂方法
 */
function ECMA_define(opt_id, opt_dependencies, opt_factory) {};

/**
 * @const
 * @type {Object}
 */
define.amd;

/**
 * 加载模块
 *
 * @param {string|Array} requireId 模块id或模块id数组
 * @param {Function=} callback 加载完成的回调函数
 * @return {*}
 */
function require(requireId, callback) {};

/**
 * @param {Object} options AMD的配置参数
 */
require.config = function(options) {};

/**
 * @param {string} part
 * @return {string}
 */
require.toUrl = function(part) {};

/**
 * 加载模块
 *
 * @param {string|Array} requireId 模块id或模块id数组
 * @param {Function=} callback 加载完成的回调函数
 * @return {*}
 */
function ECMA_require(requireId, callback) {}

/**
 * 加载模块
 *
 * @param {string|Array} requireId 模块id或模块id数组
 * @param {Function=} callback 加载完成的回调函数
 * @return {*}
 */
function ESL_require(requireId, callback){};

/**
 * @param {Object} options AMD的配置参数
 */
ESL_require.config = function(options) {};

/**
 * 定义模块
 *
 * @param {Function} fn 模块代码
 * @return {*}
 */
function ESL_define(fn) {};

/**
 * 加载模块
 *
 * @param {Array.<string>} modIds 模块id数组
 * @param {Function=} callback 加载完成的回调函数
 * @param {boolean=} opt_isAsync 是否异步加载
 * @return {*}
 */
function BAIDU_DUP_require(modIds, callback, opt_isAsync){};

/**
 * 定义模块
 *
 * @param {string} id 模块ID
 * @param {Array.<string>} deps 依赖模块
 * @param {Function} factory 模块代码
 * @return {*}
 */
function BAIDU_DUP_define(id, deps, factory) {};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
