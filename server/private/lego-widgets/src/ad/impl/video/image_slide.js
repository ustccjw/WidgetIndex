/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/video/image_slide.js ~ 2013/09/26 18:37:29
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * image_slide相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.video.ImageSlide');
goog.require('ad.widget.video.MultiImageSlide');

goog.include('ad/impl/video/image_slide.less');

goog.provide('ad.impl.video.ImageSlide');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [
            new ad.widget.video.ImageSlide(AD_CONFIG['image_slide']),
            new ad.widget.video.MultiImageSlide(AD_CONFIG['multi_image_slide'])
        ]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});