/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/plugin/filter/data_filter.js
 * desc:    用户数据转换插件基类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/05 12:11:15$
 */

goog.require('ad.plugin.Filter');
goog.provide('ad.plugin.DataFilter');

/**
 * 用户数据转换插件
 * @extends {ad.plugin.Filter}
 * @constructor
 */
ad.plugin.DataFilter = function() {
    ad.plugin.Filter.call(this);
};
baidu.inherits(ad.plugin.DataFilter, ad.plugin.Filter);

/**
 * @param {Object} adConfig 用户数据
 * @param {?Object} params 插件参数
 * @return {Array.<Object>}
 * @expose
 */
ad.plugin.DataFilter.prototype.run = baidu.abstractMethod;



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
