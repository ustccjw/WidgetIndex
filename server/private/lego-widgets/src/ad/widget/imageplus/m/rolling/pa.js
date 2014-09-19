/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/m/rolling/pa.js ~ 2014/09/05 14:28:12
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.m.util');
goog.require('ad.widget.imageplus.m.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/m/rolling/pa.less');
goog.include('ad/widget/imageplus/m/rolling/pa.html');

goog.provide('ad.widget.imageplus.m.rolling.Pa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.m.BaseWidget}
 */
ad.widget.imageplus.m.rolling.Pa = function (data) {
    ad.widget.imageplus.m.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_m_rolling_pa';
};
baidu.inherits(ad.widget.imageplus.m.rolling.Pa, ad.widget.imageplus.m.BaseWidget);




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
