/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/smart/image.js 2013-10-28 12:33:44
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision$
 * @description
 * 智能样式 图片版
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.smart.Title');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.smart.BrandPromotion');

goog.include('ad/impl/smart/image.less');

goog.provide('ad.impl.smart.Image');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    material.setWidgets(
        new ad.widget.smart.Title(AD_CONFIG['head']),
        new ad.widget.ImageNormal(AD_CONFIG['list']),
        new ad.widget.Title(AD_CONFIG['title']),
        new ad.widget.smart.BrandPromotion(AD_CONFIG['feedback'])
    );

    if (async === true) {
        return material;
    }

    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
