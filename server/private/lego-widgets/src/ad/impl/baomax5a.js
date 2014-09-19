/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: baomax5a.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/baomax5a.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * burberry相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Button');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.ImageShowHorizontal');

goog.include('ad/impl/baomax5a.less');

goog.provide('ad.impl.BaoMaX5a');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var options = AD_CONFIG['logo_images']['options'];
    if(options && options.length && options.length > 1) {
        for(var w = 0; w < options.length; w++) {
            options[w]['title'] = " ";
        }
    }
    material.setWidgets(
        [new ad.widget.Title(AD_CONFIG['title'])],
        [
            [new ad.widget.ImageShowHorizontal(AD_CONFIG['logo_images'])],
            [
                new ad.widget.SmallHead(AD_CONFIG['description']),
                new ad.widget.Button(AD_CONFIG['button']),
                new ad.widget.ImageNormal(AD_CONFIG['images'])
            ]
        ],
        [new ad.widget.Section(AD_CONFIG['colnums'])],
        [new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group_foot'])]
    );
    if (async === true) {
        return material;
    }

    material.show();

    material.initMonitor(AD_CONFIG['main_url']);
    
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
