/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/j/middle.js ~ 2013/12/26 15:22:02
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * middle相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Title');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.wireless.Links');
goog.require('ad.widget.ShowUrl');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.wireless.SeriesTel');

goog.include('ad/impl/wireless/middle/title.less');
goog.include('ad/impl/wireless/middle/show_url.less');
goog.include('ad/impl/wireless/middle/htmltext.less');
goog.include('ad/impl/wireless/middle/product_list.less');
goog.include('ad/impl/wireless/middle/button_list.less');
goog.include('ad/impl/wireless/j/middle.less');

goog.provide('ad.impl.wireless.j.Middle');

ad.Debug(function(async) {
    AD_CONFIG['title']['logo'] = AD_CONFIG['title']['logo3'];
    AD_CONFIG['description']['rcv_html'] = ad.base.subByte(AD_CONFIG['description']['rcv_html'], 60, '..');
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    var plist = AD_CONFIG['products']['options'];
    for (var i = 0, len = plist.length;i < len;i++) {
        plist[i]['image'] = plist[i]['image3'];
    }

    var material = new ad.material.BaseMaterial();
    var topTitle = new ad.widget.wireless.Title(AD_CONFIG['title']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);
    var links = new ad.widget.ButtonGroup(AD_CONFIG['links']);
    var productList = new ad.widget.wireless.ProductList(AD_CONFIG['products']);
    var buttons = new ad.widget.ButtonList(AD_CONFIG['buttons']);

    material.setWidgets(
        topTitle,
        htmlText,
        showUrl,
        links,
        productList,
        buttons,
        new ad.widget.wireless.SeriesTel(AD_CONFIG['tels'])
    );

    if (async === true) {
        return material;
    }
    material.show();

    topTitle.rewriteTitle2(null, '[主标题]', true);
    htmlText.rewriteTitle2(null, '[主标题描述]', true);
    links.rewriteTitle2(null, '[产品]', false);
});

















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
