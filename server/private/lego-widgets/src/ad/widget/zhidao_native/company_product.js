/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_native/company_product.js ~ 2014/04/14 18:17:39
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * company_product相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao_native/company_product.less');
goog.include('ad/widget/zhidao_native/company_product.html');

goog.provide('ad.widget.zhidao_native.CompanyProduct');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_native.CompanyProduct = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_native_company_product';
};
baidu.inherits(ad.widget.zhidao_native.CompanyProduct, ad.widget.Widget);





















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
