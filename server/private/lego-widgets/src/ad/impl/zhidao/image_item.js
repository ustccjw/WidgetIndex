/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/image_item.js ~ 2013/06/25 18:03:03
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * image_item相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.zhidao.ImageItem');

goog.include('ad/impl/zhidao/image_item.less');

goog.provide('ad.impl.zhidao.ImageItem');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    var imageItem = new ad.widget.zhidao.ImageItem(AD_CONFIG['image_item'])
    material.setWidgets(
        [imageItem]
    );
    if (typeof ECMA_define === "function") {
        ECMA_define(function(){ return material; });
    } else {
        material.show();
        material.getCMS().init(material.getId());
    }
});
