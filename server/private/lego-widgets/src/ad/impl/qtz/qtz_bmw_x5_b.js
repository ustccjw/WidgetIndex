/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtz_bmw_x5_b.js ~ 2013/10/11 11:06:00
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * qtz_bmw_x5_b相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Title');
goog.require('ad.widget.Section');
goog.require('ad.widget.LinkList');

goog.include('ad/impl/qtz/qtz_bmw_x5_b.less');

goog.provide('ad.impl.qtz.QtzBmwX5B');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var imgList = new ad.widget.ImageNormal(AD_CONFIG['img_list']);
    var section1 = new ad.widget.Section(AD_CONFIG['section1']);
    var linkList1 = new ad.widget.LinkList(AD_CONFIG['link_list1']);
    var adLinkList = [];
    var moreLink = new ad.widget.Title(AD_CONFIG['more_link']);

    for(var i = 0; i < AD_CONFIG['ad_link_list'].length; i ++) {
        var adLink = new ad.widget.Title(AD_CONFIG['ad_link_list'][i]);
        adLinkList.push(adLink);
    }

    material.setWidgets(
        [imgList],
        [section1],
        [linkList1],
        [adLinkList],
        [moreLink]
    );

    if (async === true) {
        return material;
    }
    material.show();

    material.initMonitor(AD_CONFIG['main_url']);

    section1.rewriteTitle2(null, "文字介绍1标题", true);
    linkList1.rewriteTitle2(null, "文字介绍1");

    for(var i = 0; i < adLinkList.length; i ++) {
        adLinkList[i].rewriteTitle2(null, "活动推荐链接" + (i + 1), true);
    }
    moreLink.rewriteTitle2(null, "全部车型", true);
});