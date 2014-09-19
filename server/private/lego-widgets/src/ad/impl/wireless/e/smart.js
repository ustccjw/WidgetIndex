/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/e/smart.js ~ 2013/12/12 13:42:13
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * smart相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Title');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.wireless.Links');
goog.require('ad.widget.ShowUrl');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonList');

goog.include('ad/impl/wireless/smart/title.less');
goog.include('ad/impl/wireless/smart/show_url.less');
goog.include('ad/impl/wireless/smart/htmltext.less');
goog.include('ad/impl/wireless/smart/product_list.less');
goog.include('ad/impl/wireless/smart/button_list.less');
goog.include('ad/impl/wireless/e/smart.less');

goog.provide('ad.impl.wireless.e.Smart');

ad.Debug(function(async) {

    AD_CONFIG['title']['logo'] = AD_CONFIG['title']['logo1'];
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    baidu.each(AD_CONFIG['list']['options'], function(item) {
        item['image'] = item['image1'];
    });

    var material = new ad.material.BaseMaterial();
    var topTitle = new ad.widget.wireless.Title(AD_CONFIG['title']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);
    var list = new ad.widget.wireless.ProductList(AD_CONFIG['list']);
    var buttons = new ad.widget.ButtonList(AD_CONFIG['buttons']);

    material.setWidgets(topTitle, htmlText, showUrl, list, buttons);

    if (async === true) {
        return material;
    }
    material.show();

    topTitle.rewriteTitle2(null, '[主标题]', true);
    htmlText.rewriteTitle2(null, '[主标题描述]', true);

});























/* vim: set ts=4 sw=4 sts=4 tw=100: */
