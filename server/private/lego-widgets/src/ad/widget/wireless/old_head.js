/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/old_head.js ~ 2013/12/19 11:35:49
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * old_head相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/old_head.less');
goog.include('ad/widget/wireless/old_head.html');

goog.provide('ad.widget.wireless.OldHead');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.OldHead = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_old_head';
};
baidu.inherits(ad.widget.wireless.OldHead, ad.widget.Widget);




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
