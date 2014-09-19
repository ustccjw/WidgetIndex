/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/a/middle.js ~ 2013/11/29 14:17:07
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * middle相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Image');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.wireless.Links');
goog.require('ad.widget.ShowUrl');
goog.require('ad.widget.wireless.TelButton');

goog.include('ad/impl/wireless/middle/old_title.less');
goog.include('ad/impl/wireless/middle/htmltext.less');
goog.include('ad/impl/wireless/middle/show_url.less');
goog.include('ad/impl/wireless/middle/links.less');
goog.include('ad/impl/wireless/middle/tel_button.less');
goog.include('ad/impl/wireless/a/middle.less');

goog.provide('ad.impl.wireless.a.Middle');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['banner']['image_url'] = AD_CONFIG['banner']['banner2'];
    AD_CONFIG['top_title']['title'] = ad.base.subByte(AD_CONFIG['top_title']['title'], 28);
    AD_CONFIG['description']['rcv_html'] = ad.base.subByte(AD_CONFIG['description']['rcv_html'], 68, '...');
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    if (AD_CONFIG['buttons']['options'].length > 3) {
        AD_CONFIG['buttons']['options'] = AD_CONFIG['buttons']['options'].slice(0, 3);
    }

    var banner = new ad.widget.Image(AD_CONFIG['banner']);
    var topTitle = new ad.widget.Title(AD_CONFIG['top_title']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);
    var buttons = new ad.widget.wireless.Links(AD_CONFIG['buttons']);
    if (AD_CONFIG['tel'] && AD_CONFIG['tel']['buttons'] && AD_CONFIG['tel']['buttons'].length) {
        var telData = AD_CONFIG['tel']['buttons'][0];
        ad.base.extend(telData, {
            "button_head_width": 19,
            "button_head_height": 18,
            "button_head_image": "http://ecma.bdimg.com/adtest/96401de8f22995d9f154b4bbe0b6c26c.png",
            "button_tail_width": 5,
            "button_tail_height": 18,
            "button_tail_image": "http://ecma.bdimg.com/adtest/56d8f7270185f28e35fc5e0e143f476b.png"
        });
        var tel = new ad.widget.wireless.TelButton(telData);
    }

    if (tel) {
        material.setWidgets(banner, topTitle, htmlText, showUrl, buttons, tel);
    }
    else {
        material.setWidgets(banner, topTitle, htmlText, showUrl, buttons);
    }

    if (async === true) {
        return material;
    }
    material.show();

    banner.rewriteTitle2(null, '[Banner]', false);
    topTitle.rewriteTitle2(null, '[主标题]', true);
    htmlText.rewriteTitle2(null, '[主标题描述]', true);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
