/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/smart/brand_promotion.js ~ 2014/02/10 17:04:15
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * brand_promotion相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/smart/brand_promotion.less');
goog.include('ad/widget/smart/brand_promotion.html');

goog.provide('ad.widget.smart.BrandPromotion');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.smart.BrandPromotion = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_smart_brand_promotion';
};
baidu.inherits(ad.widget.smart.BrandPromotion, ad.widget.Widget);























/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
