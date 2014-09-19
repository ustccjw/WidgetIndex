/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/avatar/video_entry.js ~ 2014/05/21 19:22:44
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * video_entry相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/avatar/video_entry.less');
goog.include('ad/widget/imageplus/avatar/video_entry.html');

goog.provide('ad.widget.imageplus.avatar.VideoEntry');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.avatar.VideoEntry = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_avatar_video_entry';
};
baidu.inherits(ad.widget.imageplus.avatar.VideoEntry, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.avatar.VideoEntry.prototype.bindEvent = function() {
    ad.widget.imageplus.avatar.VideoEntry.superClass.bindEvent.call(this);
    var me = this;
    baidu.on(this.getId(), 'click', function () {
        me.trigger(ui.events.CLICK);
    });
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
