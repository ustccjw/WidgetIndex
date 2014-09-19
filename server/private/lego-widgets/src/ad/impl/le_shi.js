/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/le_shi.js ~ 2013/07/16 11:15:08
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * le_shi相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ad.widget.Title');
goog.require('ad.widget.Iframe');

goog.include('ad/impl/le_shi.less');

goog.provide('ad.impl.LeShi');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var image = new ad.widget.Image(AD_CONFIG['image']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);

    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            leftVideo,
            [
                smallHead,
                image
            ]
        ],
        [title],
        [iframe]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    //设置title的鼠标移入提示
    //baidu.dom.setAttr(title.getRoot().getElementsByTagName('a')[0], 'title', AD_CONFIG['title']['title_tip']);
});