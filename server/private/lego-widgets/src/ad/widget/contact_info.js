/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/contact_info.js ~ 2014/07/30 15:52:21
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * contact_info相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/contact_info.less');
goog.include('ad/widget/contact_info.html');

goog.provide('ad.widget.ContactInfo');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.ContactInfo = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_contact_info';
};
baidu.inherits(ad.widget.ContactInfo, ad.widget.Widget);


/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
