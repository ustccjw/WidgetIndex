/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/nike_pic.js ~ 2013/02/26 14:02:12
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * nike_pic相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Slider');
goog.require('ad.widget.ImageGrid');
goog.require('ad.widget.Image');
// 暴露背景图片地址
goog.require('ecom.ma.image.TopBackground');

goog.include('ad/impl/nike_pic.less');

goog.provide('ad.impl.NikePic');

ad.Debug(function(async){
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
    material.initHMJSMoniter(AD_CONFIG['jingsuan']);

    var apiName = 'ecom.ma.image.TopBackground.updataEcomBackground';
    var api = ad.base.getObjectByName(apiName);
    if (api) {
        var root = material.getRoot();
        var rootWidth = root.offsetWidth;

        ad.base.exportPath(apiName, function(obj) {
            api.call(this, obj);
            if ((obj['currImgLineWidth'] + 27) > document.documentElement.clientWidth) {
                // when scrollbar appear
                baidu.dom.setStyle(root, 'margin-left', '40px');
            } else {
                baidu.dom.setStyle(root, 'margin-left', 'auto');
            }
        });
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
