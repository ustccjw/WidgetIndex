/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/single_image.js ~ 2014/03/05 15:54:32
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ui.events');

goog.include('ad/widget/imageplus/sticker/single_image.less');
goog.include('ad/widget/imageplus/sticker/single_image.html');

goog.provide('ad.widget.imageplus.sticker.SingleImage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.SingleImage = function (data) {
    /**
     * 图片原始宽度
     * @type {number}
     */
    this._originalWidth = 0;
    /**
     * 图片原始高度
     * @type {number}
     */
    this._originalHeight = 0;

    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_single_image';
};
baidu.inherits(ad.widget.imageplus.sticker.SingleImage, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.SingleImage.prototype.patchData = function () {
    ad.widget.imageplus.sticker.SingleImage.superClass.patchData.call(this);
    if (this._data) {
        // 设置默认的图片高宽
        this._originalWidth = this._data['idea_width'] = this.getData('idea_width', 460);
        this._originalHeight = this._data['idea_height'] = this.getData('idea_height', 60);
        this._calWH();
    }
};

/**
 * 计算图片实际展现的高宽
 */
ad.widget.imageplus.sticker.SingleImage.prototype._calWH = function () {
    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this._data['api'];
    if (loaderApi) {
        var imgRect = loaderApi.getImgRect();
        if (imgRect['width'] < this._originalWidth) {
            this._data['idea_width'] = imgRect['width'];
            this._data['idea_height'] = this._originalHeight * imgRect['width'] / this._originalWidth;
        }
    }
};

/** @override */
ad.widget.imageplus.sticker.SingleImage.prototype.enterDocument = function () {
    ad.widget.imageplus.sticker.SingleImage.superClass.enterDocument.call(this);

    var me = this;
    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = me._data['api'];
    if (loaderApi) {
        // 在底图修改高宽的时候同时更新广告图片的高宽
        loaderApi.addListener(ui.events.RESIZE, function () {
            me._calWH();
            me.refresh();
        });
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100  */
