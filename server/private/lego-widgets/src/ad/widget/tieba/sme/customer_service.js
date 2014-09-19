/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/sme/customer_service.js ~ 2013/04/13 17:44:48
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * customer_service相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/sme/customer_service.less');
goog.include('ad/widget/tieba/sme/customer_service.html');

goog.provide('ad.widget.tieba.sme.CustomerService');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.sme.CustomerService = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_customer_service';
};
baidu.inherits(ad.widget.tieba.sme.CustomerService, ad.widget.Widget);

/** @override */
ad.widget.tieba.sme.CustomerService.prototype.enterDocument = function() {
    ad.widget.tieba.sme.CustomerService.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.tieba.sme.CustomerService.prototype.bindEvent = function() {
    ad.widget.tieba.sme.CustomerService.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.tieba.sme.CustomerService.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
