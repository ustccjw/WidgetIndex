/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/imageplus/nobox/brand_logo.js ~ 2014/07/30 14:50:58
 * @author songao@baidu.com (songao)
 * @version $Revision: 11222 $
 * @description
 * brand_logo相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.ImageplusMaterial');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.widget.imageplus.nobox.BrandLogo');
goog.require('ad.plugin.imageplus.Log');

goog.include('ad/impl/imageplus/nobox/brand_logo.less');

goog.provide('ad.impl.imageplus.nobox.BrandLogo');

ad.Debug(function(async) {
    var material = new ad.material.ImageplusMaterial();
    material['adConfig'] = AD_CONFIG;

    material.setWidgets(new ad.widget.imageplus.nobox.BrandLogo(AD_CONFIG));
    material.show();

    return material;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
