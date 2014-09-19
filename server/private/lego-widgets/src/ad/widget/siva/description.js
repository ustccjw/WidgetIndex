/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/description.js ~ 2013/09/08 20:20:09
 * @author yangfan12@baidu.com (yangfan12)
 * @version $Revision: 150523 $
 * @description
 * description相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/description.less');
goog.include('ad/widget/siva/description.html');

goog.provide('ad.widget.siva.Description');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Description = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_description';
};
baidu.inherits(ad.widget.siva.Description, ad.widget.Widget);



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
