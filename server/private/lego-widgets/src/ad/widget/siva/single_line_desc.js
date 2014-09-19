/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/single_line_desc.js ~ 2013/10/14 11:17:01
 * @author yangfan12@baidu.com (yangfan12)
 * @version $Revision: 150523 $
 * @description
 * single_line_desc相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/single_line_desc.less');
goog.include('ad/widget/siva/single_line_desc.html');

goog.provide('ad.widget.siva.Single_line_desc');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Single_line_desc = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_single_line_desc';
};
baidu.inherits(ad.widget.siva.Single_line_desc, ad.widget.Widget);














/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
