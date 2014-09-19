/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: skyscraper.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/skyscraper.js ~ 2012/06/04 15:13:54
 * @author fanxueliang
 * @version $Revision: 9564 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/skyscraper.html');
goog.include('ad/widget/skyscraper.less');

goog.provide('ad.widget.Skyscraper');


/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Skyscraper = function (data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_skyscraper';
};
baidu.inherits(ad.widget.Skyscraper, ad.widget.Widget);


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
