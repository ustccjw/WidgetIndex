/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/nestle_milk2.js ~ 2014/04/28 11:18:23
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * nestle_milk2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.Title');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/nestle_milk2.less');

goog.provide('ad.impl.NestleMilk2');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);

    material.setWidgets(
        new ad.widget.Title(AD_CONFIG['title']), [
            leftVideo,
            smallHead
        ],
        new ad.widget.Iframe(AD_CONFIG['iframe']),
        new ad.widget.ButtonGroup(AD_CONFIG['button_group'])
    );
    if (async === true) {
        return material;
    }

    material.show();

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('videostart');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        leftVideo.sendLog('videoclick');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('videocomplete');
        return false;
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
