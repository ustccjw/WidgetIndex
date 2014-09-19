
/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h4.js 9607 2012-06-08 17:10:22Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/video.js ~ 2012/06/09 00:30:31
 * @author loutongbing
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.env');
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.include('ad/widget/card_flash.html');
goog.include('ad/widget/card_flash.less');

goog.provide('ad.widget.CardFlash');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.CardFlash = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_card_flash';
};
baidu.inherits(ad.widget.CardFlash, ad.widget.Widget);
/** @private */
ad.widget.CardFlash.prototype.patchData = function() {
    this._data['TrackCallBack'] = this.getId('TrackCallBack').replace(/[^a-zA-Z]/g, '');
    this._data['imgconfig'] = encodeURIComponent(baidu.json.stringify(this._data['image_config']));
    this._data['is_ipad'] = ad.env.isIpad;
};
/** @override */
ad.widget.CardFlash.prototype.bindEvent = function() {
    if (ad.env.isIpad) {
        return;
    }
    var me = this;
    window[this._data['TrackCallBack']] = function(no, url) {
        me.sendLog('pic' + no, 'pic' + no);
        if(url){
            window.open(url);
        }
        me.trigger(ui.events.CARD_CLICK, no, url);
    };
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
