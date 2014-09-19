/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/icon/single_image.js ~ 2014/07/14 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * v2/icon/single_image相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.include('ad/widget/imageplus/v2/icon/single_image.less');
goog.include('ad/widget/imageplus/v2/icon/single_image.html');

goog.provide('ad.widget.imageplus.v2.icon.SingleImage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.icon.SingleImage = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_icon_single_image';
};
baidu.inherits(ad.widget.imageplus.v2.icon.SingleImage, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.icon.SingleImage.prototype.patchData = function () {
    ad.widget.imageplus.v2.icon.SingleImage.superClass.patchData.call(this);

    if (this._data) {
        this._data['real_idea_width'] = this.getData('idea_width', 300);
        this._data['real_idea_height'] = this.getData('idea_height', 250);
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100  */
