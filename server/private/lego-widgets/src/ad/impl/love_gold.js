/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/love_gold.js ~ 2013/08/14 14:49:44
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * love_gold相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Video');
goog.require('ad.widget.Map');

goog.include('ad/impl/love_gold.less');

goog.provide('ad.impl.LoveGold');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());

    var image = new ad.widget.ImageLink(AD_CONFIG['image_link']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var smallWeibo = new ad.widget.SmallWeibo(AD_CONFIG['weibo']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
    var imageCartoon = new ad.widget.ImageCartoon(AD_CONFIG['img_cartoon']);

    material.setWidgets(
        [
            image,
            [smallHead, smallWeibo]
        ],
        [buttons],
        [imageCartoon]
    );
    if (async === true) {
        return material;
    }
    
    material.show();
});