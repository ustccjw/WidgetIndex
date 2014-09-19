/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/image_scroll.js ~ 2013/12/02 16:27:22
 * @author loutongbing@baidu.com (loutongbing)
 * @version $Revision: 11222 $
 * @description
 * 大图轮播
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Title');
goog.require('ad.widget.standard.ImageSlideShow');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ShowUrl');

goog.include('ad/impl/landmark/image_scroll.less');

goog.provide('ad.impl.landmark.ImageScroll');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    // material.setRender(new ad.render.RecursiveRender());
    AD_CONFIG['links']['colors'] = ['#1EA5FC', '#FD840C'];
    AD_CONFIG['show_url']['brand_url'] = 'http://yingxiao.baidu.com/product/ma/11.html';
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    // 配置分享title
    if (AD_CONFIG['show_url']['ps_select']) {
        AD_CONFIG['show_url']['ps_select']['title'] = AD_CONFIG['top_title']['title'];
    }
    AD_CONFIG['image_scroll']['auto_slide_duration'] = 3000;
    material.setWidgets(
        new ad.widget.Title(AD_CONFIG['top_title']),
        new ad.widget.standard.ImageSlideShow(AD_CONFIG['image_scroll']),
        new ad.widget.HtmlText(AD_CONFIG['description']),
        new ad.widget.Colorlist(AD_CONFIG['links']),
        new ad.widget.ShowUrl(AD_CONFIG['show_url'])
    );
    if (async === true) {
        return material;
    }
    material.show();

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */