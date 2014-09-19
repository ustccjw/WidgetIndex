/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: image_multi_region.js 2012-07-16 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_multi_region.js ~ 2012/07/17 22:07:55
 * @author wangdawei
 * @version $Revision: $
 * @description
 * 多区域点击图片
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image_multi_region.html');
goog.include('ad/widget/image_multi_region.less');

goog.provide('ad.widget.ImageMultiRegion');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageMultiRegion = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_image_multi_region';
};
baidu.inherits(ad.widget.ImageMultiRegion, ad.widget.Widget);















/* vim: set ts=4 sw=4 sts=4 tw=100: */
