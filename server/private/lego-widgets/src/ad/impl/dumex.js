/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dumex.js  2012-08-02 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dumex.js ~ 2012/08/02 11:47:13
 * @author wangdawei
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Video');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Tab');
goog.include('ad/impl/dumex.less');

goog.provide('ad.impl.Dumex');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [
            new ad.widget.Video(AD_CONFIG['video']),
            new ad.widget.SmallHead(AD_CONFIG['head'])
        ],
        [new ad.widget.Section(AD_CONFIG['section'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    
    var video = material.getWidget(0,0);
    video.addListener(ui.events.VIDEO_START, function() {
        video.sendLog('video_start',"video_start");
    });
    video.addListener(ui.events.VIDEO_FINISH, function() {
        video.sendLog('video_finish',"video_finish");
    });
    video.addListener(ui.events.VIDEO_CLICK, function() {
        video.sendLog('video_click',"video_click");
    });
    
    if (async === true) {
        return material;
    }
    
    material.show();
});

/* vim: set ts=4 sw=4 sts=4 tw=100: */
