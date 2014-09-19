/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/banner_with_section.js ~ 2013/12/06 16:29:22
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * banner_with_section相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ShowUrl');

goog.include('ad/impl/landmark/banner_with_section.less');

goog.provide('ad.impl.landmark.BannerWithSection');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['links']['colors'] = ['#1EA5FC'];
    AD_CONFIG['show_url']['brand_url'] = 'http://yingxiao.baidu.com/product/ma/11.html';
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    if (AD_CONFIG['show_url']['ps_select']) {
        AD_CONFIG['show_url']['ps_select']['title'] = AD_CONFIG['show_url']['site'];
    }
    var banner = new ad.widget.Image(AD_CONFIG['banner']);
    var colorList = new ad.widget.Colorlist(AD_CONFIG['links']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);

    material.setWidgets(banner, colorList, showUrl);

    if (async === true) {
        return material;
    }
    material.show();

    if (!AD_CONFIG['links']['options'].length) {
        colorList.hide();
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
