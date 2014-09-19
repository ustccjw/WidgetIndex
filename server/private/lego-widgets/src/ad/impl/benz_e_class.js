/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/benz_e_class.js ~ 2013/01/28 15:28:57
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * benz_e_class相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Button');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ui.events');

goog.include('ad/impl/benz_e_class.less');

goog.provide('ad.impl.BenzEClass');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video']), new ad.widget.VideoTitle(AD_CONFIG['video_title'])],
            [new ad.widget.SmallHead(AD_CONFIG['head']), new ad.widget.Section(AD_CONFIG['section']), new ad.widget.Button(AD_CONFIG['details_btn'])]
        ],
        [new ad.widget.ButtonGroup(AD_CONFIG['bottons'])],
        [new ad.widget.ImageCartoon(AD_CONFIG['img_group'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
