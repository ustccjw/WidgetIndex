/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/pa_new.js ~ 2014/09/15 18:22:49
 * @author zhouminming01@baidu.com
 * @version $Revision: 150523 $
 * @description
 * pa_new相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/sticker/pa_new.less');
goog.include('ad/widget/imageplus/sticker/pa_new.html');

goog.provide('ad.widget.imageplus.sticker.PaNew');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.PaNew = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_pa_new';
};
baidu.inherits(ad.widget.imageplus.sticker.PaNew, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.PaNew.prototype.enterDocument = function () {
    ad.widget.imageplus.sticker.PaNew.superClass.enterDocument.call(this);

    var me = this;
    var widgetContent = baidu.g(this.getId('widget-content'));
    var hoverClass = 'ad-widget-imageplus-sticker-pa_new-hover';
    var show = function () {
        if (me.firstShowTimer) {
            ad.base.clearTimeout(me.firstShowTimer);
            me.firstShowTimer = null;
        }
        baidu.addClass(widgetContent, hoverClass);
    };
    show();
    var loaderApi = this.getData('api');
    loaderApi.addListener(ui.events.MOUSE_OVER, show);
    loaderApi.addListener(ui.events.MOUSE_MOVE, show);
    loaderApi.addListener(ui.events.MOUSE_OUT, baidu.fn.bind(me.hide, me));
};

/** @override */
ad.widget.imageplus.sticker.PaNew.prototype.hide = function () {
    var widgetContent = baidu.g(this.getId('widget-content'));
    var hoverClass = 'ad-widget-imageplus-sticker-pa_new-hover';
    baidu.removeClass(widgetContent, hoverClass);
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
