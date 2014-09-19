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

goog.include('ad/widget/title.html');
goog.include('ad/widget/title.less');

goog.provide('ad.widget.Title');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Title = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_title';
};
baidu.inherits(ad.widget.Title, ad.widget.Widget);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
