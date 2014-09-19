/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/pa2a.js ~ 2014/09/02 14:03:46
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * pa2a相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/sticker/pa2a.less');
goog.include('ad/widget/imageplus/sticker/pa2a.html');

goog.provide('ad.widget.imageplus.sticker.Pa2a');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.Pa2a = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_pa2a';
};
baidu.inherits(ad.widget.imageplus.sticker.Pa2a, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.Pa2a.prototype.enterDocument = function () {
    ad.widget.imageplus.sticker.Pa2a.superClass.enterDocument.call(this);

    var me = this;
    var widgetContent = baidu.g(this.getId('widget-content'));
    var hoverClass = 'imageplus-sticker-pa2a-hover';
    var show = function () {
        if (me.firstShowTimer) {
            ad.base.clearTimeout(me.firstShowTimer);
            me.firstShowTimer = -1;
        }
        baidu.addClass(widgetContent, hoverClass);
    };
    show();
    var loaderApi = this.getData('api');
    loaderApi.addListener(ui.events.MOUSE_OVER, show);
    loaderApi.addListener(ui.events.MOUSE_MOVE, show);
    loaderApi.addListener(ui.events.MOUSE_OUT, baidu.fn.bind(me.hide, me));
};

ad.widget.imageplus.sticker.Pa2a.prototype.hide = function () {
    var widgetContent = baidu.g(this.getId('widget-content'));
    var hoverClass = 'imageplus-sticker-pa2a-hover';
    baidu.removeClass(widgetContent, hoverClass);
};





















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
