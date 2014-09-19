/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/imageplus/v2/sticker/multimedia.js ~ 2014/09/10 14:33:30
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * multimedia相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.ImageplusMaterial');
goog.require('ad.widget.imageplus.v2.sticker.Multimedia');
goog.require('ad.widget.imageplus.v2.StickerMultimediaBox');

goog.include('ad/impl/imageplus/v2/sticker/multimedia.less');

goog.provide('ad.impl.imageplus.v2.sticker.Multimedia');

ad.Debug(function (opt_async) {
    var material;
    var box;
    // 因为AD_CONFIG可能会被当前render的其他实例修改掉
    // 所以要保留一个变量指向旧的AD_CONFIG
    var adConfig = AD_CONFIG;

    function rendAd() {
        material = new ad.material.ImageplusMaterial(adConfig['id']);
        material['adConfig'] = adConfig;
        box = new ad.widget.imageplus.v2.StickerMultimediaBox(adConfig);
        box.setWidgets(new ad.widget.imageplus.v2.sticker.Multimedia(adConfig));
        material.setWidgets(box);
        material.show();
    }

    if (!COMPILED) {
        // 伪造一个id用于绘制
        adConfig['id'] = 'canvas';
    }
    rendAd();

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
