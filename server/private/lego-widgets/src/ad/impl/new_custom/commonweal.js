/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: commonweal.js 11222 2012-08-20 02:53:59Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/commonweal.js ~ 2013/10/30 14:23:28
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Section');
goog.require('ad.widget.Image');
goog.require('ad.widget.Video');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/new_custom/commonweal.less');

goog.provide('ad.impl.new_custom.Commonweal');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var bigImg = new ad.widget.Image(AD_CONFIG['big_img']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var widgets = [
        [title],
        [
            leftVideo,
            [
                smallHead,
                imageNormal
            ]
        ],
        section,
        bigImg
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
        leftVideo.pause();
        leftVideo.sendLog('floatopen', 'floatopen');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_START, function(){
        leftVideo.sendLog('leftvideostart');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function(){
        leftVideo.sendLog('leftvideofinish');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function(){
        leftVideo.sendLog('leftvideopause');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
        leftVideo.sendLog('leftvideocontinue');
        return false;
    });
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
