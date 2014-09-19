/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: footer.js 12894 2012-10-17 08:59:31Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/footer.js ~ 2012/06/04 15:13:54
 * @author loutongbing
 * @version $Revision: 12894 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/footer.html');
goog.include('ad/widget/footer.less');

goog.provide('ad.widget.Footer');


/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Footer = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_footer';
};
baidu.inherits(ad.widget.Footer, ad.widget.Widget);



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
