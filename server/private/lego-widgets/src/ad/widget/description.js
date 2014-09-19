/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/description.js ~ 2013/03/13 15:49:14
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * description相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/description.less');
goog.include('ad/widget/description.html');

goog.provide('ad.widget.Description');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Description = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_description';
};
baidu.inherits(ad.widget.Description, ad.widget.Widget);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
