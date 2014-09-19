/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/links.js ~ 2013/11/29 12:19:40
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * links相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/links.less');
goog.include('ad/widget/wireless/links.html');

goog.provide('ad.widget.wireless.Links');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.Links = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_links';
};
baidu.inherits(ad.widget.wireless.Links, ad.widget.Widget);























/* vim: set ts=4 sw=4 sts=4 tw=100 : */