/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h4.js 13834 2012-11-03 06:31:22Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/h4.js ~ 2012/06/09 00:30:31
 * @author loutongbing
 * @version $Revision: 13834 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/h4.html');
goog.include('ad/widget/h4.less');

goog.provide('ad.widget.H4');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.H4 = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_h4';
};
baidu.inherits(ad.widget.H4, ad.widget.Widget);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
