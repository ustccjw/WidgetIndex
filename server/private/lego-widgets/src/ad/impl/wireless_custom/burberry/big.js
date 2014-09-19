/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless_custom/burberry/big.js ~ 2014/02/25 18:16:28
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
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

goog.provide('ad.impl.wireless_custom.burberry.Big');

ad.Debug(function(async) {

    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo2'];
    var htmlTextConf = {
        "rcv_html": AD_CONFIG['head']['description'],
        "rcv_url": AD_CONFIG['head']['rcv_url']
    };
    var showUrlConf = {
        'site': AD_CONFIG['head']['site'],
        'brand_text': '品牌推广'
    };
    baidu.each(AD_CONFIG['list']['options'], function(item) {
        item['image'] = item['image2'];
    });

    var material = new ad.material.BaseMaterial();
    var topTitle = new ad.widget.wireless.Title(AD_CONFIG['head']);
    var htmlText = new ad.widget.HtmlText(htmlTextConf);
    var showUrl = new ad.widget.ShowUrl(showUrlConf);
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

    if (canvasWrap) {
        baidu.dom.setStyle(canvasDom, 'margin', '0 10px');
    }

    topTitle.rewriteTitle2(null, '[主标题]', true);
    htmlText.rewriteTitle2(null, '[主标题描述]', true);

});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */