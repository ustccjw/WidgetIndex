/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/audit_filter.js
 * desc:    获取审核信息的插件
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/05 11:38:40$
 */

goog.require('ad.plugin.Filter');
goog.provide('ad.plugin.AuditFilter');

/**
 * 审核信息过滤插件
 * @extends {ad.plugin.Filter}
 * @constructor
 */
ad.plugin.AuditFilter = function() {
    ad.plugin.Filter.call(this);
};
baidu.inherits(ad.plugin.AuditFilter, ad.plugin.Filter);

/**
 * @param {Object} adConfig 用户数据
 * @param {Array.<Object>} spec 表单配置
 * @param {?Array.<string>} jsonPathArr 用于过滤的jsonpath，如果为null表示获取所有数据
 * @param {number} templateId 样式ID
 * @return {Array.<Object>}
 * @expose
 */
ad.plugin.AuditFilter.prototype.run = baidu.abstractMethod;

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
