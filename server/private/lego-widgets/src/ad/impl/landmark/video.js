/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/video.js ~ 2013/12/04 12:17:10
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ShowUrl');

goog.include('ad/impl/landmark/video.less');
goog.include('ad/impl/standard/button_group.less');

goog.provide('ad.impl.landmark.Video');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(AD_CONFIG['video']);

    AD_CONFIG['show_url']['brand_url'] = 'http://yingxiao.baidu.com/product/ma/11.html';
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    // 配置分享title
    if (AD_CONFIG['show_url']['ps_select']) {
        AD_CONFIG['show_url']['ps_select']['title'] = AD_CONFIG['top_title']['title'];
    }
    material.setWidgets(
        new ad.widget.Title(AD_CONFIG['top_title']),
        video,
        new ad.widget.HtmlText(AD_CONFIG['description']),
        new ad.widget.ButtonGroup(AD_CONFIG['buttons']),
        new ad.widget.ShowUrl(AD_CONFIG['show_url'])
    );

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */