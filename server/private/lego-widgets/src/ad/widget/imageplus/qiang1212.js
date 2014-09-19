/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/qiang1212.js ~ 2013/11/07 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * qiang1212相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/qiang1212.less');
goog.include('ad/widget/imageplus/qiang1212.html');

goog.provide('ad.widget.imageplus.Qiang1212');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Qiang1212 = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_qiang1212';
};
baidu.inherits(ad.widget.imageplus.Qiang1212, ad.widget.imageplus.BaseWidget);



















/* vim: set ts=4 sw=4 sts=4 tw=100  */
