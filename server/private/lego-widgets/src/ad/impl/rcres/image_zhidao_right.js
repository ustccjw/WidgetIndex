/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/rcres/image_zhidao_right.js ~ 2014/03/20 16:37:05
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * image_zhidao_right相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Image');

goog.include('ad/impl/rcres/image_zhidao_right.less');

goog.provide('ad.impl.rcres.ImageZhidaoRight');

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
