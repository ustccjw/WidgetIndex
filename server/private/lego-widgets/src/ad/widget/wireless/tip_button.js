/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/tip_button.js ~ 2014/02/13 17:10:44
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * tip_button相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/tip_button.less');
goog.include('ad/widget/wireless/tip_button.html');

goog.provide('ad.widget.wireless.TipButton');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.TipButton = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_tip_button';
};
baidu.inherits(ad.widget.wireless.TipButton, ad.widget.Widget);


/** @override */
ad.widget.wireless.TipButton.prototype.bindEvent = function() {
    var me = this;
    baidu.on(baidu.g(me.getId("button")), "click", function(opt_evt) {
        var evt = opt_evt || window.event;
        me.trigger(ui.events.CLICK, evt);
    });
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */