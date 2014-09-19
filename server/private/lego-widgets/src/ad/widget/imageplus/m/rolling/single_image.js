/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/m/rolling/single_image.js ~ 2014/09/11 17:39:04
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * m/rolling/single_image相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.m.BaseWidget');

goog.include('ad/widget/imageplus/m/rolling/single_image.less');
goog.include('ad/widget/imageplus/m/rolling/single_image.html');

goog.provide('ad.widget.imageplus.m.rolling.SingleImage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.m.BaseWidget}
 */
ad.widget.imageplus.m.rolling.SingleImage = function (data) {
    ad.widget.imageplus.m.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_m_rolling_single_image';
};
baidu.inherits(ad.widget.imageplus.m.rolling.SingleImage, ad.widget.imageplus.m.BaseWidget);



















/* vim: set ts=4 sw=4 sts=4 tw=100  */
