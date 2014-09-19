/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: float.js 9923 2012-06-28 10:25:19Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/float.js ~ 2012/06/08 23:52:02
 * @author loutongbing
 * @version $Revision: 9923 $
 * @description
 * 浮层控件
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/float.html');
goog.include('ad/widget/float.less');

goog.provide('ad.widget.Float');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Float = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_float';
};
baidu.inherits(ad.widget.Float, ad.widget.Widget);

/** @override */
ad.widget.Float.prototype.render = function() {
    ad.widget.Float.superClass.render.call(this);
    // TODO
};
ad.widget.Float.prototype.bindEvent = function() {
    var me = this;
    var close_link = baidu.dom.g(me.getId('close-link'));
    close_link.onclick = function() {
         baidu.dom.hide(baidu.g(me.getId('float-container')));
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
