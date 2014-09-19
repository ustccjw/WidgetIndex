/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_native/left_d.js ~ 2014/04/15 13:49:31
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * left_a相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhidao_native.CompanyId');
goog.require('ad.widget.zhidao_native.ProductCase');
goog.require('ad.widget.HtmlText');
goog.require('ad.plugin.ClickMonkey');
goog.require('ad.plugin.Rcv2');

goog.include('ad/impl/zhidao_native/left_base.less');
goog.include('ad/impl/zhidao_native/left_d.less');

goog.provide('ad.impl.zhidao_native.LeftD');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    AD_CONFIG['product']['title2_text'] = '产品';
    AD_CONFIG['cases']['title2_text'] = '案例';
    material.setWidgets(
        new ad.widget.zhidao_native.CompanyId(AD_CONFIG['cid']),
        [
            new ad.widget.HtmlText({'rcv_html': '- 推广'}),
            new ad.widget.zhidao_native.ProductCase(AD_CONFIG['product']),
            new ad.widget.zhidao_native.ProductCase(AD_CONFIG['cases'])
        ]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
