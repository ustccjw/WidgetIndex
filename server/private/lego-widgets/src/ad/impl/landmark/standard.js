/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/standard.js ~ 2013/11/27 20:34:21
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * standard相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Image');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ShowUrl');

goog.include('ad/impl/landmark/standard.less');
goog.include('ad/impl/landmark/button_group.less');

goog.provide('ad.impl.landmark.Standard');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['links']['colors'] = ['#1EA5FC', '#FD840C', '#51C274'];
    AD_CONFIG['show_url']['brand_url'] = 'http://yingxiao.baidu.com/product/ma/11.html';
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    if (AD_CONFIG['show_url']['ps_select']) {
        AD_CONFIG['show_url']['ps_select']['title'] = AD_CONFIG['top_title']['title'];
    }
    var topTitle = new ad.widget.Title(AD_CONFIG['top_title']);
    var banner = new ad.widget.Image(AD_CONFIG['banner']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
    var colorList = new ad.widget.Colorlist(AD_CONFIG['links']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);

    material.setWidgets(topTitle, banner, htmlText, colorList, buttons, showUrl);

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100 : */