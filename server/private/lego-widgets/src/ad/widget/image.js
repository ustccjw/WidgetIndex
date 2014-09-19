/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h4.js 9607 2012-06-08 17:10:22Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/h4.js ~ 2012/06/09 00:30:31
 * @author loutongbing
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.include('ad/widget/image.html');
goog.include('ad/widget/image.less');

goog.provide('ad.widget.Image');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Image = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_image';
};
baidu.inherits(ad.widget.Image, ad.widget.Widget);

/**
 * @override
 */
ad.widget.Image.prototype.bindEvent = function() {
    var me = this;
    baidu.on(baidu.g(me.getId('img')), 'click', function(e) {
        me.trigger(ui.events.CLICK, e);
    });
    if (baidu.g(me.getId('image-layer'))) {
        baidu.on(baidu.g(me.getId('image-layer')), 'click', function(e) {
            me.trigger(ui.events.CLICK, e);
        });
    }
};

/**
 * @override
 */
ad.widget.Image.prototype.patchData = function() {
    var me = this;
    if (me._data && me._data['tip']) {
        var tip = me._data['tip'];
        if (!tip['text']) {
            delete me._data['tip'];
        }
        if (tip['text'] && !tip['rcv_url']) {
            delete tip['rcv_url'];
        }
    }
};
















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
