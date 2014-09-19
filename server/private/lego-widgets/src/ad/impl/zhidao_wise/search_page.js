/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_wise/search_page.js ~ 2013/12/19 14:15:20
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * search_page相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhidao_wise.SearchAd');

goog.include('ad/impl/zhidao_wise/search_page.less');

goog.provide('ad.impl.zhidao_wise.SearchPage');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var searchAd = new ad.widget.zhidao_wise.SearchAd(AD_CONFIG['search_ad']);

    material.setWidgets(
        [searchAd]
    );

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */