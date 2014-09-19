/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: nestle_coffee.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/nestle_coffee.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');

goog.include('ad/impl/nestle_coffee.less');

goog.provide('ad.impl.NestleCoffee');


ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    material.setWidgets(
        [
            new ad.widget.Video(AD_CONFIG['video']),
            [
                new ad.widget.SmallHead(AD_CONFIG['head']),
                new ad.widget.SmallWeibo(AD_CONFIG['weibo'])
            ]
        ],
        new ad.widget.ImageCartoon(AD_CONFIG['img_group']),
        new ad.widget.ButtonList(AD_CONFIG['buttons'])
    );
    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
