/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: top.js 2012-07-16 10:25:19Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/top.js ~ 2012/06/07 22:07:55
 * @author fanxueliang
 * @version $Revision: $
 * @description
 * 栏目模块
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/top.html');
goog.include('ad/widget/top.less');

goog.provide('ad.widget.Top');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Top = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_top';
};
baidu.inherits(ad.widget.Top, ad.widget.Widget);














/* vim: set ts=4 sw=4 sts=4 tw=100: */
