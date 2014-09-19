/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/rcres/image_iknow_im.js ~ 2014/04/13 20:22:23
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * image_iknow_im相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Image');

goog.include('ad/impl/rcres/image_iknow_im.less');

goog.provide('ad.impl.rcres.ImageIknowIm');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    material.setWidgets(
        new ad.widget.Image(AD_CONFIG['image'])
    );

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
