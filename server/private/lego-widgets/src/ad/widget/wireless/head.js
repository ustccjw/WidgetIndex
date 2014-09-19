/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: head.js 13834 2012-11-03 06:31:22Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/head.js ~ 2012/06/07 22:07:55
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 13834 $
 * @description
 * 苏宁易购的头部效果
 **/

goog.require('ad.date');
goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/head.html');
goog.include('ad/widget/wireless/head.less');

goog.provide('ad.widget.wireless.Head');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.Head = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_wireless_head';
};
baidu.inherits(ad.widget.wireless.Head, ad.widget.Widget);




/* vim: set ts=4 sw=4 sts=4 tw=100: */