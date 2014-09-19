/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtz_dell.js ~ 2013/11/26 15:47:34
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * qtz_dell相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.Title');
goog.require('ad.widget.Section');
goog.require('ad.widget.BaiduShare');

goog.include('ad/impl/qtz/qtz_dell.less');

goog.provide('ad.impl.qtz.QtzDell');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    var banner = new ad.widget.ImageLink(AD_CONFIG['banner']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var argumentArr = [[banner, title]];

    //栏目模块可选
    if(AD_CONFIG['section']) {
        argumentArr.push([new ad.widget.Section(AD_CONFIG['section'])]);
    }
    //分享模块可选
    if(AD_CONFIG['share']) {
        argumentArr.push([new ad.widget.BaiduShare(AD_CONFIG['share'])]);
    }

    material.setWidgets.apply(material, argumentArr);

    if (async === true) {
        return material;
    }

    material.show();

    material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    if (AD_CONFIG['banner'] && AD_CONFIG['banner']['hover_src']) {
        var bannerDom = baidu.dom.first(banner.getRoot());
        var hoverImgDom = baidu.dom.create('img', {
            'class': 'ec-img-hover-show',
            'src': AD_CONFIG['banner']['hover_src']
        });
        baidu.dom.first(bannerDom).appendChild(hoverImgDom);
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */