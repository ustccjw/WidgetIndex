/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: toyota.js 11222 2014-02-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/toyota.js ~ 2014/02/27 13:04:08
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * dior相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');

goog.include('ad/impl/toyota.less');

goog.provide('ad.impl.Toyota');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    var videoConf = baidu.object.clone(AD_CONFIG['video'][0]);
    videoConf['is_play'] = false;
    var video = new ad.widget.Video(videoConf);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var currentVideoIndex = 1;
    material.setWidgets(
        [
            [
                video,
                new ad.widget.VideoTitle(AD_CONFIG['video_title'])
            ],
            [
                smallHead
            ]
        ],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        [new ad.widget.ImageCartoon(AD_CONFIG['image_cartoon'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    smallHead.addListener(ui.events.CLICK, function(index){
        currentVideoIndex = index + 1;
        if(AD_CONFIG['video'][index]){
            video.refresh(video.getRoot(), AD_CONFIG['video'][index]);
        }
        return false;
    });
    video.addListener(ui.events.VIDEO_START, function() {
        video.sendLog('video' + currentVideoIndex + 'start');
        return false;
    });

    video.addListener(ui.events.VIDEO_CLICK, function() {
        video.sendLog('float' + currentVideoIndex + 'click');
        return false;
    });

    video.addListener(ui.events.VIDEO_FINISH, function() {
        video.sendLog('video' + currentVideoIndex + 'complete');
        return false;
    });

    video.addListener(ui.events.VIDEO_PAUSE, function() {
        video.sendLog('video' + currentVideoIndex + 'pause');
        return false;
    });

    video.addListener(ui.events.VIDEO_CONTINUE, function() {
        video.sendLog('video' + currentVideoIndex + 'continue');
        return false;
    });

    video.addListener(ui.events.VIDEO_AUTO, function() {
        video.sendLog('video' + currentVideoIndex + 'auto');
        return false;
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
