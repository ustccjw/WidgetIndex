/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/title.js ~ 2013/12/12 14:28:01
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * title相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/title.less');
goog.include('ad/widget/wireless/title.html');

goog.provide('ad.widget.wireless.Title');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.Title = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_title';
};
baidu.inherits(ad.widget.wireless.Title, ad.widget.Widget);


/* vim: set ts=4 sw=4 sts=4 tw=100: */
