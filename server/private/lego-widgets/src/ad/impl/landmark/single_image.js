/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/single_image.js ~ 2013/12/05 18:50:23
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * single_image相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');

goog.include('ad/impl/landmark/single_image.less');

goog.provide('ad.impl.landmark.SingleImage');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['image']['tip'] = {
        'text': '品牌推广'
    };

    var image = new ad.widget.Image(AD_CONFIG['image']);
    material.setWidgets(image);

    if (async === true) {
        return material;
    }
    material.show();
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
