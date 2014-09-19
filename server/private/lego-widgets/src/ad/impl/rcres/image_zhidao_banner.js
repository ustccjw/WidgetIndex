/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/rcres/image_zhidao_banner.js ~ 2014/03/20 16:51:03
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * image_zhidao_banner相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Image');

goog.include('ad/impl/rcres/image_zhidao_banner.less');

goog.provide('ad.impl.rcres.ImageZhidaoBanner');

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
