/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: ns_pic.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/ns_pic.js ~ 2012/06/09 00:30:31
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/ns_pic.html');
goog.include('ad/widget/ns_pic.less');
goog.provide('ad.widget.NSPic');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.NSPic = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_ns_pic';
};
baidu.inherits(ad.widget.NSPic, ad.widget.Widget);



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
