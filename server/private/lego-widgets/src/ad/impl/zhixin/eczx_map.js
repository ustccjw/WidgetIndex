/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/eczx_map.js ~ 2014/03/04 17:38:08
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * eczx_map相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Image');
goog.require('ad.widget.zhixin.MapImage');
goog.require('ad.widget.ShowUrl');

goog.include('ad/impl/zhixin/eczx_map.less');

goog.provide('ad.impl.zhixin.EczxMap');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var title = new ad.widget.Title(AD_CONFIG['title']);
    var image = new ad.widget.Image(AD_CONFIG['image']);
    var mapImage = new ad.widget.zhixin.MapImage(AD_CONFIG['map_image']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);

    material.setWidgets(
        [title, image, mapImage, showUrl]
    );

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */