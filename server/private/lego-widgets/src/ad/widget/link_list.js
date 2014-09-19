/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: LinkList.js 9564 2012-06-06 04:43:29Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/LinkList.js ~ 2012/06/04 15:13:54
 * @author loutongbing
 * @version $Revision: 9564 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/link_list.html');
goog.include('ad/widget/link_list.less');

goog.provide('ad.widget.LinkList');


/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.LinkList = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_link_list';
};
baidu.inherits(ad.widget.LinkList, ad.widget.Widget);



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
