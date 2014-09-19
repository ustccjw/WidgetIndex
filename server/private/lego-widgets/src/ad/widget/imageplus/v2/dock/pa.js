/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/dock/pa.js ~ 2014/06/30 15:54:32
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.v2.util');
goog.require('ad.widget.imageplus.v2.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/v2/dock/pa.less');
goog.include('ad/widget/imageplus/v2/dock/pa.html');

goog.provide('ad.widget.imageplus.v2.dock.Pa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.dock.Pa = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_dock_pa';
};
baidu.inherits(ad.widget.imageplus.v2.dock.Pa, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.dock.Pa.prototype.enterDocument = function () {
    ad.widget.imageplus.v2.dock.Pa.superClass.enterDocument.call(this);

    var me = this;
    var close = me.g(this.getId('close'));
    var background = me.g(this.getId('background'));
    var root = me.getRoot();
    var opacity = me.getData('box.box_bg_opacity', 0.9);
    ad.dom.opacity(background, opacity);

    baidu.on(close, 'click', function (e) {
        baidu.event.preventDefault(e);
        me.trigger(ui.events.BOX_CLOSE);
    });

    me.addListener(ui.events.BOX_MOUSE_MOVE, function() {
        me.trigger(ui.events.BOX_SHOW);
    });

    me.addListener(ui.events.BOX_MOUSE_OVER, function() {
        me.trigger(ui.events.BOX_SHOW);
    });

    me.addListener(ui.events.BOX_MOUSE_OUT, function() {
        me.trigger(ui.events.BOX_HIDE);
    });

    me.addListener(ui.events.SHOW_THEN_HIDE, function(delay) {
        me.trigger(ui.events.BOX_SHOW);
        ad.base.setTimeout(function () {
            me.trigger(ui.events.BOX_HIDE);
        }, delay);
    });
    me.addListener(ui.events.BOX_RESIZE, function (rect) {
        if (rect['width'] <= 400) {
            baidu.dom.addClass(root, 'minimode');
        }
        else {
            baidu.dom.removeClass(root, 'minimode');
        }
    });
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
