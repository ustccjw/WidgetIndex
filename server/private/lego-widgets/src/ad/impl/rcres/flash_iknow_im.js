/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/rcres/flash_iknow_im.js ~ 2014/03/24 16:31:36
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * flash_iknow_im相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Flash');

goog.include('ad/impl/rcres/flash_iknow_im.less');

goog.provide('ad.impl.rcres.FlashIknowIm');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    material.setWidgets(
        new ad.widget.Flash(AD_CONFIG['flash'])
    );

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
