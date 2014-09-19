/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/pa_with_icon.js ~ 2014/09/04 12:15:32
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/sticker/pa_with_icon.less');
goog.include('ad/widget/imageplus/sticker/pa_with_icon.html');

goog.provide('ad.widget.imageplus.sticker.PaWithIcon');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.PaWithIcon = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_pa_with_icon';
};
baidu.inherits(ad.widget.imageplus.sticker.PaWithIcon, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.PaWithIcon.prototype.patchData = function () {
    ad.widget.imageplus.sticker.PaWithIcon.superClass.patchData.call(this);
    if (this._data) {
        // 截断百科的描述
        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                70,
                '...'
            );
        }
    }
};

/** @override */
ad.widget.imageplus.sticker.PaWithIcon.prototype.enterDocument = function () {
    ad.widget.imageplus.sticker.PaWithIcon.superClass.enterDocument.call(this);

    var root = this.getRoot();
    if (root) {
        var actualRoot = baidu.q('ad-widget-imageplus-sticker-pa_with_icon', root);
        if (actualRoot.length) {
            root = actualRoot[0];
        }
        if (this.getData('show_big_title')) {
            baidu.dom.addClass(root, 'ad-widget-imageplus-sticker-pa_with_icon-with-big-title');
        }
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
