/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/pa_links.js ~ 2014/09/02 14:47:32
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * pa_links相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ad.array');
goog.include('ad/widget/imageplus/sticker/pa_links.less');
goog.include('ad/widget/imageplus/sticker/pa_links.html');

goog.provide('ad.widget.imageplus.sticker.PaLinks');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.PaLinks = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_pa_links';
};
baidu.inherits(ad.widget.imageplus.sticker.PaLinks, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.PaLinks.prototype.patchData = function () {
    ad.widget.imageplus.sticker.PaLinks.superClass.patchData.apply(this, arguments);
    if (this._data && this._data['sturl'] && this._data['sturl'].length) {
        var array = this._data['sturl'];
        ad.array.each(this._data['sturl'], function (value, index) {
            array[index] = ad.base.subByte(value, 12, '...');
        });
    }
    return ;
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
