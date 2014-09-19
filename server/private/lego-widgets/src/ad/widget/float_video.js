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

goog.include('ad/widget/float_video.html');
goog.include('ad/widget/float_video.less');

goog.provide('ad.widget.FloatVideo');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.FloatVideo = function(data) {
    ad.widget.Widget.call(this, data);
    this._patchData();
    this._view = 'AD_ad_widget_float_video';
};
baidu.inherits(ad.widget.FloatVideo, ad.widget.Widget);
/** @private */
ad.widget.FloatVideo.prototype._patchData = function() {
    this._data['OpenCstUrlCallBack'] = this.getId('OpenCstUrlCallBack').replace(/[^a-zA-Z]/g, '');
    this._data['TrackCallBack'] = this.getId('TrackCallBack').replace(/[^a-zA-Z]/g, '');
};
/** @override */
ad.widget.FloatVideo.prototype.bindEvent = function() {
    var me = this;
    var close_link = baidu.g(me.getId('close-link'));
    close_link.onclick = function() {
         baidu.dom.hide(baidu.g(me.getId('float-video-container')));
    }
    var rcv_url = this._data['rcv_url'];
    window[this._data['OpenCstUrlCallBack']] = function() {
        me.trigger(ui.events.VIDEO_CLICK);
        window.open(rcv_url);
    }

    window[this._data['TrackCallBack']] = function(num) {
        if (num === 0) {
            me.trigger(ui.events.VIDEO_START);
        } else if (num === 2) {
            me.trigger(ui.events.VIDEO_FINISH);
        }
    }
};
baidu.inherits(ad.widget.FloatVideo, ad.widget.Widget);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
