/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dior.js ~ 2012/11/27 13:04:08
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * dior相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');

goog.include('ad/impl/dior.less');

goog.provide('ad.impl.Dior');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video'])],
            [new ad.widget.SmallHead(AD_CONFIG['small_head']),
             new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])
            ]
        ],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        [new ad.widget.ImageCartoon(AD_CONFIG['image_cartoon'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
