/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/customer_service.js ~ 2013/04/13 17:44:48
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * customer_service相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/customer_service.less');
goog.include('ad/widget/tieba/customer_service.html');

goog.provide('ad.widget.tieba.CustomerService');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.CustomerService = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_customer_service';
};
baidu.inherits(ad.widget.tieba.CustomerService, ad.widget.Widget);























/* vim: set ts=4 sw=4 sts=4 tw=100: */
