/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/avatar/brand_marker.js ~ 2014/05/22 11:15:56
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * brand_marker相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/avatar/brand_marker.less');
goog.include('ad/widget/imageplus/avatar/brand_marker.html');

goog.provide('ad.widget.imageplus.avatar.BrandMarker');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.avatar.BrandMarker = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_avatar_brand_marker';
};
baidu.inherits(ad.widget.imageplus.avatar.BrandMarker, ad.widget.imageplus.BaseWidget);























/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
