/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/iloader_api.js ~ 2013/08/09 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/

goog.provide('ad.plugin.imageplus.ILoaderApi');

/**
 * imageplus ILoaderApi
 *
 * @interface
 * @param {Object} loader .
 * @param {number} imgIndex .
 */
ad.plugin.imageplus.ILoaderApi = function (loader, imgIndex) {};


/**
 * 通知loader：render绘制完成，并且是否需要显示右上角tip.
 *
 * @expose
 * @param {boolean=} opt_showTip show tip or not.
 */
ad.plugin.imageplus.ILoaderApi.prototype.rendDone = function (opt_showTip) {};

/**
 * 绑定事件
 *
 * @expose
 * @param {string} event .
 * @param {Function} callback .
 */
ad.plugin.imageplus.ILoaderApi.prototype.addListener =
    function (event, callback) {};

/**
 * 获取img dom
 *
 * @expose
 * @return {Element} img.
 */
ad.plugin.imageplus.ILoaderApi.prototype.getImg = function () {};

/**
 * 获取wrapper
 *
 * @expose
 * @return {Element} img.
 */
ad.plugin.imageplus.ILoaderApi.prototype.getImgWrapper = function () {};

/**
 * 获取canvas
 *
 * @expose
 * @return {Element} canvas.
 */
ad.plugin.imageplus.ILoaderApi.prototype.getCanvas = function () {};


/**
 * 获取imgIndex
 *
 * @expose
 * @return {number} .
 */
ad.plugin.imageplus.ILoaderApi.prototype.getImgIndex = function () {};


/**
 * 获取图片的位置和高宽
 *  {
 *      top: 100,
 *      left: 100,
 *      width: 600,
 *      heght: 400
 *  }
 *
 * @expose
 * @return {Object} .
 */
ad.plugin.imageplus.ILoaderApi.prototype.getImgRect = function () {};

/**
 * 设置共享数据，默认针对每个图片的共享数据，
 * 也可以设置全局共享数据
 *
 * @expose
 * @param {string} key .
 * @param {*} value .
 * @param {boolean=} opt_global 是否是全局.
 */
ad.plugin.imageplus.ILoaderApi.prototype.setShareData =
    function (key, value, opt_global) {};

/**
 * 获取共享数据
 *
 * @expose
 * @param {string} key .
 * @param {boolean=} opt_global 是否是全局.
 * @return {*} value .
 */
ad.plugin.imageplus.ILoaderApi.prototype.getShareData =
    function (key, opt_global) {};

/**
 * 记录时间，发送到后端
 * 1.0.0本版新增
 * 1.0.1版本修改第二个参数为支持字符串，参数名opt_time改成opt_key
 *
 * @expose
 * @param {string|Object} type 时间点的名字，或是包含时间的对象.
 * @param {number|string=} opt_key 时间.
 */
ad.plugin.imageplus.ILoaderApi.prototype.recordTime =
ad.plugin.imageplus.ILoaderApi.prototype.recordKey =
    function (type, opt_key) {};

/**
 * 记录时间，发送到后端
 * 1.0.0本版新增
 *
 * @expose
 * @return {Array} 记录的时间点
 */
ad.plugin.imageplus.ILoaderApi.prototype.getRecordedTime =
    function () {};

/**
 * 获取render的地址
 * 1.0.0本版新增
 *
 * @expose
 * @return {string} renderUrl render的地址.
 */
ad.plugin.imageplus.ILoaderApi.prototype.getRenderUrl = function () {};

/**
 * 获取loader的配置，用于拿到unionId之类的配置
 * 1.0.0本版新增
 *
 * @expose
 * @param {string} key .
 * @param {*=} opt_default 默认值.
 * @return {*} value.
 */
ad.plugin.imageplus.ILoaderApi.prototype.getLoaderConfig =
    function (key, opt_default) {};

/**
 * 设置render的id
 * 1.0.1本版新增
 *
 * @param {string} renderId render的id.
 */
ad.plugin.imageplus.ILoaderApi.prototype.setRenderId = function (renderId) {};

/**
 * 获取render的id
 * 1.0.1本版新增
 *
 * @expose
 * @return {string} renderId render的id.
 */
ad.plugin.imageplus.ILoaderApi.prototype.getRenderId = function () {};
