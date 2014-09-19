/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/b/small.js ~ 2013/12/11 13:55:24
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * small相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.Title');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.wireless.Links');
goog.require('ad.widget.ShowUrl');
goog.require('ad.widget.Colorlist');

goog.include('ad/impl/wireless/small/old_title.less');
goog.include('ad/impl/wireless/small/htmltext.less');
goog.include('ad/impl/wireless/small/show_url.less');
goog.include('ad/impl/wireless/small/colorlist.less');
goog.include('ad/impl/wireless/b/small.less');

goog.provide('ad.impl.wireless.b.Small');

ad.Debug(function(async) {

    AD_CONFIG['banner']['image_url'] = AD_CONFIG['banner']['banner3'];
    AD_CONFIG['title']['title'] = ad.base.subByte(AD_CONFIG['title']['title'], 28);
    AD_CONFIG['description']['rcv_html'] = ad.base.subByte(AD_CONFIG['description']['rcv_html'], 68, '...');
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';

    var material = new ad.material.BaseMaterial();
    var banner = new ad.widget.Image(AD_CONFIG['banner']);
    var topTitle = new ad.widget.Title(AD_CONFIG['title']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);
    var colorList = new ad.widget.Colorlist(AD_CONFIG['list']);

    material.setWidgets(banner, topTitle, htmlText, showUrl, colorList);

    if (async === true) {
        return material;
    }
    material.show();

    banner.rewriteTitle2(null, '[Banner]', false);
    topTitle.rewriteTitle2(null, '[主标题]', true);
    htmlText.rewriteTitle2(null, '[主标题描述]', true);
    colorList.rewriteTitle2(null, '[栏目]', false);

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
