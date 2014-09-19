/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/b/smart.js ~ 2013/12/11 11:38:54
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * smart相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.Title');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.wireless.Links');
goog.require('ad.widget.ShowUrl');
goog.require('ad.widget.Colorlist');

goog.include('ad/impl/wireless/smart/old_title.less');
goog.include('ad/impl/wireless/smart/htmltext.less');
goog.include('ad/impl/wireless/smart/show_url.less');
goog.include('ad/impl/wireless/smart/colorlist.less');
goog.include('ad/impl/wireless/b/smart.less');

goog.provide('ad.impl.wireless.b.Smart');

ad.Debug(function(async) {

    AD_CONFIG['banner']['image_url'] = AD_CONFIG['banner']['banner1'];
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
