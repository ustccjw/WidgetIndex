/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/car_introduction.js ~ 2013/11/05 00:10:40
 * @author taoxutian@baidu.com (taoxutian)
 * @version $Revision: 150523 $
 * @description
 * car_introduction相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/car_introduction.less');
goog.include('ad/widget/siva/car_introduction.html');

goog.provide('ad.widget.siva.Car_introduction');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Car_introduction = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_car_introduction';
};
baidu.inherits(ad.widget.siva.Car_introduction, ad.widget.Widget);























/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
