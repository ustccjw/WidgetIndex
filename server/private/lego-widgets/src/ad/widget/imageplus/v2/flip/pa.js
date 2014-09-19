/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/flip/pa.js ~ 2014/07/10 15:54:32
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.v2.util');
goog.require('ad.widget.imageplus.v2.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/v2/flip/pa.less');
goog.include('ad/widget/imageplus/v2/flip/pa.html');

goog.provide('ad.widget.imageplus.v2.flip.Pa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.flip.Pa = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_flip_pa';
};
baidu.inherits(ad.widget.imageplus.v2.flip.Pa, ad.widget.imageplus.v2.BaseWidget);




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
