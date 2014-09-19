/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: video_title.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/h4.js ~ 2012/06/09 00:30:31
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/video_title.html');
goog.include('ad/widget/video_title.less');
goog.provide('ad.widget.VideoTitle');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.VideoTitle = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_video_title';
};
baidu.inherits(ad.widget.VideoTitle, ad.widget.Widget);
















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
