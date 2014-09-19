/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker.js ~ 2013/09/03 15:54:32
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/sticker.less');
goog.include('ad/widget/imageplus/sticker.html');

goog.provide('ad.widget.imageplus.Sticker');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Sticker = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker';

    /**
     * Height of this widget.
     * @type {number}
     * @private
     */
    this._widgetHeight = 75;
};
baidu.inherits(ad.widget.imageplus.Sticker, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.Sticker.prototype.patchData = function () {
    ad.widget.imageplus.Sticker.superClass.patchData.call(this);
    if (this._data) {
        //截断百科的描述
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
ad.widget.imageplus.Sticker.prototype.bindEvent = function () {
    ad.widget.imageplus.Sticker.superClass.bindEvent.call(this);

    var me = this;
    var closeBtn = baidu.g(me.getId('close'));
    if (closeBtn) {
        baidu.on(closeBtn, 'click', function (e) {
            baidu.event.preventDefault(e || window.event);
            me.hide();
            me.trigger(ui.events.CLOSE);
        });
    }
};

/** @override */
ad.widget.imageplus.Sticker.prototype.show = function () {
    if (this.getRoot()) {
        baidu.dom.first(this.getRoot()).style.height = this._widgetHeight + 'px';
    }
};

/** @override */
ad.widget.imageplus.Sticker.prototype.hide = function () {
    if (this.getRoot()) {
        baidu.dom.first(this.getRoot()).style.height = '0px';
    }
};

/**
 * update position of this widget.
 *
 * @param {number} imgHeight .
 */
ad.widget.imageplus.Sticker.prototype.updatePosition = function (imgHeight) {
    if (this.getRoot()) {
        var root = baidu.dom.first(this.getRoot());
        root.style.top = (imgHeight - this._widgetHeight) + 'px';
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
