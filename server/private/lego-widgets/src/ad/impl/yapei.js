/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: yapei.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/yapei.js ~ 2013/05/06 10:47:02
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * yapei相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.H1');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/yapei.less');

goog.provide('ad.impl.Yapei');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var h1 = new ad.widget.H1(AD_CONFIG['h1']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    var buttonList = new ad.widget.ButtonGroup(AD_CONFIG['button_list']);

    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            leftVideo,
            [
                [smallHead],
                [section]
            ]
        ],
        [
            [h1], 
            [iframe]
        ],
        [buttonList]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
    material.initMonitor(AD_CONFIG['main_url']);
});