/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/le_shi2.js ~ 2013/08/27 14:49:37
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * le_shi2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ImageLink');


goog.include('ad/impl/le_shi2.less');

goog.provide('ad.impl.LeShi2');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var videoTitle = new ad.widget.VideoTitle(AD_CONFIG['video_title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var linkList = new ad.widget.LinkList(AD_CONFIG['link_list']);
    var tabs = new ad.widget.TabContainer(AD_CONFIG['tabs']);
    var tabImage1 = new ad.widget.ImageLink(AD_CONFIG['tag_img1']);
    var tabImage2 = new ad.widget.ImageLink(AD_CONFIG['tag_img2']);
    var tabImage3 = new ad.widget.ImageLink(AD_CONFIG['tag_img3']);
    var tabIframe = new ad.widget.Iframe(AD_CONFIG['tab_iframe']);
    var imageGroup = new ad.widget.ImageCartoon(AD_CONFIG['image_group']);

    tabs.setWidgets([tabIframe, imageGroup, tabImage1, tabImage2, tabImage3]);

    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            [
                leftVideo,
                videoTitle
            ],
            [
                smallHead,
                linkList
            ]
        ],
        [tabs]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
});
