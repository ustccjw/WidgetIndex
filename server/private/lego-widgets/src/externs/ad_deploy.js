/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * ad_deploy.js ~ 2013/07/16 18:14:22
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 * @externs
 *
 **/


/**
 * @type {Object}
 * @const
 */
var ER_AD_WIDGET_LIST;

/**
 * 物料的模板内容
 * @type {string}
 * @const
 */
var AD_TEMPLATE_CONTENT;

/**
 * 物料的样式代码
 * @type {string}
 * @const
 */
var AD_STYLE_CONTENT;

/**
 * 物料的配置内容
 * @type {Object}
 * @const
 */
var AD_CONFIG;

/**
 * 物料运行时候的一些配置信息，比如LINK_IDS, RCV2_URL等等
 * @type {Object}
 * @const
 */
var RT_CONFIG;

/**
 * @type {Object.<string, string>}
 */
RT_CONFIG.HOSTMAP;

/**
 * @param {string} host 输入的域名host.
 * @return {string} 映射之后的域名protocol + '//' + host
 */
RT_CONFIG.HOST = function(host){};

/**
 * 物料里面的链接地址
 * @type {Array.<string>}
 * @const
 */
var LINKS;

/**
 * 模块的配置内容
 * @type {Object}
 * @const
 */
var WIDGET_CONFIG;

/**
 * 物料加载之前需要使用的当前时间
 * @type {number}
 */
var m_startTime;







































/* vim: set ts=4 sw=4 sts=4 tw=100: */
