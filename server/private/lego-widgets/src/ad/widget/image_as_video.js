/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: image_as_video.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_as_video.js ~ 2012/06/09 00:30:31
 * @author fanxueliang
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.include('ad/widget/image_as_video.html');
goog.include('ad/widget/image_as_video.less');

goog.provide('ad.widget.ImageAsVideo');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageAsVideo = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_image_as_video';
};
baidu.inherits(ad.widget.ImageAsVideo, ad.widget.Widget);

/**
 * @override
 */
ad.widget.ImageAsVideo.prototype.bindEvent = function() {
    var me = this;
    ad.widget.ImageAsVideo.superClass.bindEvent.call(me);
    baidu.on(baidu.g(me.getId("image-as-video")),"click",function(){
        me.trigger(ui.events.CLICK);
    });
}


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
