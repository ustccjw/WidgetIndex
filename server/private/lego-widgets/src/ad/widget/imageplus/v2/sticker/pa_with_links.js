/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/sticker/pa_with_links.js ~ 2014/08/04 15:54:32
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.array');
goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.include('ad/widget/imageplus/v2/sticker/pa_with_links.less');
goog.include('ad/widget/imageplus/v2/sticker/pa_with_links.html');

goog.provide('ad.widget.imageplus.v2.sticker.PaWithLinks');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.sticker.PaWithLinks = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_sticker_pa_with_links';
};
baidu.inherits(ad.widget.imageplus.v2.sticker.PaWithLinks, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.sticker.PaWithLinks.prototype.patchData = function () {
    ad.widget.imageplus.v2.sticker.PaWithLinks.superClass.patchData.apply(this, arguments);
    if (this._data && this._data['sturl'] && this._data['sturl'].length) {
        var array = this._data['sturl'];
        ad.array.each(this._data['sturl'], function (value, index) {
            array[index] = ad.base.subByte(value, 12, '...');
        });
    }
    return ;
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
