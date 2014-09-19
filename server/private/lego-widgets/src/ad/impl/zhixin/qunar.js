/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/qunar.js ~ 2014/03/05 11:11:21
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * qunar相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.ShowUrl');

goog.include('ad/impl/zhixin/qunar.less');

goog.provide('ad.impl.zhixin.Qunar');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var images = new ad.widget.ImageNormal(AD_CONFIG['images']);
    var show_url = new ad.widget.ShowUrl(AD_CONFIG['show_url']);

    material.setWidgets(
        [title],
        [images],
        [show_url]
    );

    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
