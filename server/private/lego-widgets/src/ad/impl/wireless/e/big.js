/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/e/big.js ~ 2013/12/25 11:06:42
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * big相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Title');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.wireless.Links');
goog.require('ad.widget.ShowUrl');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonList');

goog.include('ad/impl/wireless/big/title.less');
goog.include('ad/impl/wireless/big/show_url.less');
goog.include('ad/impl/wireless/big/htmltext.less');
goog.include('ad/impl/wireless/big/product_list.less');
goog.include('ad/impl/wireless/big/button_list.less');
goog.include('ad/impl/wireless/e/big.less');

goog.provide('ad.impl.wireless.e.Big');

ad.Debug(function(async) {

    AD_CONFIG['title']['logo'] = AD_CONFIG['title']['logo2'];
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    baidu.each(AD_CONFIG['list']['options'], function(item) {
        item['image'] = item['image2'];
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

    /*fix 极速版(utouch)无左右边距问题*/
    var canvasDom = material.getRoot();
    var canvasWrap = baidu.dom.getAncestorByClass(canvasDom, 'ec_wise_utouch');

    if(canvasWrap) {
        baidu.dom.setStyle(canvasDom, 'margin', '0 10px');
    }

    topTitle.rewriteTitle2(null, '[主标题]', true);
    htmlText.rewriteTitle2(null, '[主标题描述]', true);

});
















/* vim: set ts=4 sw=4 sts=4 tw=100: */
