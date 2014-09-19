/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/standard/hover_image.js ~ 2013/12/04 15:00:35
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * hover_image相关的实现逻辑
 **/

goog.require('ui.events');
goog.require('ad.base');
goog.require('ad.widget.Widget');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/widget/standard/hover_image.html');
goog.include('ad/widget/standard/hover_image.less');

goog.provide('ad.widget.standard.HoverImage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.standard.HoverImage = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * @private
     * @type {ad.widget.FloatWindowContainer}
     */
    this._fwc;
    this._fwcOpened = false;

    this._view = 'AD_ad_widget_standard_hover_image';
};
baidu.inherits(ad.widget.standard.HoverImage, ad.widget.Widget);

/** @override */
ad.widget.standard.HoverImage.prototype.bindEvent = function() {
    var me = this;
    var mask = this.getId('mask');
    var wrap = this.getId('wrap');
    ad.dom.enter(mask, function(e) {
        baidu.addClass(wrap, 'ec-hover');
    });
    ad.dom.leave(mask, function(e) {
        baidu.removeClass(wrap, 'ec-hover');
    });
    ad.dom.on(mask, ui.events.CLICK, function(e) {
        baidu.event.preventDefault(e || window.event);
        me._fwc.show();
        me.sendLog({
            'action': '打开大图',
            '__node': me.getRoot()
        });

        if (!me._fwcOpened) {
            me._fwcOpened = true;
            var canvas = baidu.dom.first(me._fwc.getRoot());
            if (canvas && canvas.id) {
                me.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        }
    });
}

/** @override */
ad.widget.standard.HoverImage.prototype.patchData = function() {
    if (this._data && this._data['big_image_src']) {
        var bigImage = new ad.widget.ImageLink({
            'src': this._data['big_image_src'],
            'rcv_url': this._data['rcv_url']
        });
        this._fwc = new ad.widget.FloatWindowContainer({
            'width': 540,
            'height': 304
        });
        this._fwc.setWidgets([bigImage]);
    }
}

/** @override */
ad.widget.standard.HoverImage.prototype.dispose = function() {
    if (this._fwc) {
        this._fwc.dispose();
    }
    ad.widget.standard.HoverImage.superClass.dispose.call(this);
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */