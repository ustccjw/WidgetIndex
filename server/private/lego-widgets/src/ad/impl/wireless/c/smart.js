/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/c/smart.js ~ 2013/12/12 21:02:01
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * smart相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Image');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ShowUrl');
goog.require('ad.widget.wireless.TelButton');

goog.include('ad/impl/wireless/smart/old_title.less');
goog.include('ad/impl/wireless/smart/htmltext.less');
goog.include('ad/impl/wireless/smart/show_url.less');
goog.include('ad/impl/wireless/smart/colorlist.less');
goog.include('ad/impl/wireless/c/smart.less');

goog.provide('ad.impl.wireless.c.Smart');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['banner']['image_url'] = AD_CONFIG['banner']['banner1'];
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';

    var banner = new ad.widget.Image(AD_CONFIG['banner']);
    var topTitle = new ad.widget.Title(AD_CONFIG['top_title']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);
    var links = new ad.widget.Colorlist(AD_CONFIG['links']);
    var telData = AD_CONFIG['tel'];
    ad.base.extend(telData, {
        "button_head_width": 26,
        "button_head_height": 25,
        "button_head_image": "http://ecma.bdimg.com/adtest/efca4575235bba6d3e9fc8fa7c84e59a.png",
        "button_tail_width": 7,
        "button_tail_height": 25,
        "button_tail_image": "http://ecma.bdimg.com/adtest/aecc610baee9e18d1fccf9d37c57ead8.png"
    });
    var tel = new ad.widget.wireless.TelButton(telData);

    material.setWidgets(banner, topTitle, htmlText, showUrl, links, tel);

    if (async === true) {
        return material;
    }
    material.show();

    banner.rewriteTitle2(null, '[Banner]', false);
    topTitle.rewriteTitle2(null, '[主标题]', true);
    htmlText.rewriteTitle2(null, '[主标题描述]', true);
});

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
