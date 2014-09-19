/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: sinopec.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/sinopec.js ~ 2013/01/24 16:22:18
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * result相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');

goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.news.Head');
goog.require('ad.widget.news.Section');

goog.include('ad/impl/news/sinopec.less');

goog.provide('ad.impl.news.Sinopec');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.news.Head(AD_CONFIG['head'])],
        [new ad.widget.news.Section(AD_CONFIG['section'])],
        [new ad.widget.ImageNormal(AD_CONFIG['images'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.getCMS().init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
