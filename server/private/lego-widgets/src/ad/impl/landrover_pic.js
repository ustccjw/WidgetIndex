/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landrover_pic.js ~ 2013/04/18 12:47:45
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * landrover_pic相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Slider');
goog.require('ad.widget.ImageGrid');
goog.require('ad.widget.Image');
// 暴露背景图片地址
goog.require('ecom.ma.image.TopBackground');

goog.include('ad/impl/landrover_pic.less');

goog.provide('ad.impl.LandroverPic');

ad.Debug(function(async){
    ecom.ma.image.TopBackground.data = AD_CONFIG['top_background'];
    var material = new ad.Material(AD_CONFIG['id']);
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.Slider(AD_CONFIG['slider'])],
        [new ad.widget.ImageGrid(AD_CONFIG['image_grid'])],
        [new ad.widget.Image(AD_CONFIG['image'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    material.initHMJSMoniter('8d60bd94318e2816b1efab90a4fd1003');
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
