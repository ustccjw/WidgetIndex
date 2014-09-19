/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/tian_long_ba_bu.js ~ 2013/11/20 10:25:28
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * tian_long_ba_bu相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');

goog.include('ad/impl/tian_long_ba_bu.less');

goog.provide('ad.impl.TianLongBaBu');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var imgCartoon = new ad.widget.ImageCartoon(AD_CONFIG['img_cartoon']);

    material.setWidgets(
        [leftVideo, smallHead],
        [buttonGroup],
        [imgCartoon]
    );

    if (async === true) {
        return material;
    }
    
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
