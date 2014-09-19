/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/stars_2013/image.js ~ 2013/11/20 15:01:18
 * @author loutongbing@baidu.com (loutongbing)
 * @version $Revision: 150523 $
 * @description
 * image相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.stars2013.Image');
goog.include('ad/impl/stars2013/image.less');
goog.provide('ad.impl.stars2013.Image');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [new ad.widget.stars2013.Image(AD_CONFIG['image'])]
    );
    if (async === true) {
        return material;
    }
    material.show(); 
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
