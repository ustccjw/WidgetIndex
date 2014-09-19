/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/single_flash.js ~ 2014/03/05 15:54:32
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/sticker/single_flash.less');
goog.include('ad/widget/imageplus/sticker/single_flash.html');

goog.provide('ad.widget.imageplus.sticker.SingleFlash');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.SingleFlash = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_single_flash';
};
baidu.inherits(ad.widget.imageplus.sticker.SingleFlash, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.SingleFlash.prototype.patchData = function () {
    ad.widget.imageplus.sticker.SingleFlash.superClass.patchData.call(this);
    if (this._data) {
        // 设置默认的图片高宽
        this._data['idea_width'] = this.getData('idea_width', 460);
        this._data['idea_height'] = this.getData('idea_height', 60);
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
