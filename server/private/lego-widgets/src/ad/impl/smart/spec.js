/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/smart/spec.js ~ 2013/10/30 16:51:42
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * spec相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.smart.Title');
goog.require('ad.widget.smart.Head');
goog.require('ad.widget.smart.ImageSlider');
goog.require('ad.widget.ImageNormal');

goog.include('ad/impl/smart/spec.less');

goog.provide('ad.impl.smart.Spec');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    material.setWidgets(
        new ad.widget.smart.Title(AD_CONFIG['title']),
        [
            new ad.widget.smart.ImageSlider(AD_CONFIG['banners']),
            [
                new ad.widget.smart.Head(AD_CONFIG['head']),
                new ad.widget.ImageNormal(AD_CONFIG['images'])
            ]
        ]
    );

    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
