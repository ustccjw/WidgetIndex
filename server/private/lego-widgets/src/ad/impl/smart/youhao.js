/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/smart/youhao.js ~ 2013/12/23 21:22:32
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * youhao相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.smart.YhHead');
goog.require('ad.widget.smart.ImageSlider');
goog.require('ad.widget.ImageNormal');

goog.include('ad/impl/smart/spec.less');

goog.provide('ad.impl.smart.Youhao');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    material.setWidgets(
        new ad.widget.Title(AD_CONFIG['title']),
        [
            new ad.widget.smart.ImageSlider(AD_CONFIG['banners']),
            [
                new ad.widget.smart.YhHead(AD_CONFIG['head']),
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
