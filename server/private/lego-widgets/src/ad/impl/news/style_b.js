/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/news/style_b.js ~ 2014/07/02 16:27:17
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * style_b相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.news.Head');
goog.require('ad.widget.news.Section');

goog.include('ad/impl/news/style_b.less');

goog.provide('ad.impl.news.StyleB');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();


    material.setWidgets(
        [new ad.widget.news.Head(AD_CONFIG['0'])],
        [new ad.widget.news.Section(AD_CONFIG['1'])],
        [new ad.widget.ImageNormal(AD_CONFIG['2'])]
    );

    if (async === true) {
        return material;
    }

    material.show();

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
