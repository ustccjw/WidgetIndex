/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtz_bmw_x5_a.js ~ 2013/10/11 11:05:53
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * qtz_bmw_x5_a相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.Title');
goog.require('ad.widget.Section');
goog.require('ad.widget.LinkList');

goog.include('ad/impl/qtz/qtz_bmw_x5_a.less');

goog.provide('ad.impl.qtz.QtzBmwX5A');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var banner = new ad.widget.ImageLink(AD_CONFIG['banner']);
    var adLink = new ad.widget.Title(AD_CONFIG['ad_link']);
    var section1 = new ad.widget.Section(AD_CONFIG['section1']);
    var linkList1 = new ad.widget.LinkList(AD_CONFIG['link_list1']);
    var section2 = new ad.widget.Section(AD_CONFIG['section2']);
    var linkList2 = new ad.widget.LinkList(AD_CONFIG['link_list2']);
    var moreLink = new ad.widget.Title(AD_CONFIG['more_link']);

    material.setWidgets(
        [banner],
        [adLink],
        [section1],
        [linkList1],
        [section2],
        [linkList2],
        [moreLink]
    );

    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    
    adLink.rewriteTitle2(null, '活动推荐链接1', true);

    section1.rewriteTitle2(null, "文字介绍1标题", true);
    linkList1.rewriteTitle2(null, "文字介绍1");

    section2.rewriteTitle2(null, "文字介绍2标题", true);
    linkList2.rewriteTitle2(null, "文字介绍2");

    moreLink.rewriteTitle2(null, "全部车型", true);
});