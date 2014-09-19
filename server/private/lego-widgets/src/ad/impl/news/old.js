/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/news/old.js ~ 2013/11/06 11:28:03
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * old相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.news.HeadOld');
goog.require('ad.widget.news.SectionOld');

goog.include('ad/impl/news/old.less');

goog.provide('ad.impl.news.Old');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        new ad.widget.news.HeadOld(AD_CONFIG['head']),
        new ad.widget.news.SectionOld(AD_CONFIG['list'])
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
