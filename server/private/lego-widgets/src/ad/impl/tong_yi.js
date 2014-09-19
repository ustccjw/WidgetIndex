/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/tong_yi.js ~ 2013/08/28 15:23:22
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * tong_yi相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/tong_yi.less');

goog.provide('ad.impl.TongYi');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video'][0]);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var smallWeibo = new ad.widget.SmallWeibo(AD_CONFIG['small_weibo']);
    var tabCont1 = new ad.widget.TabCont(AD_CONFIG['tab2']);
    var tabCont2 = new ad.widget.TabCont(AD_CONFIG['tab3']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var selectVideo = 0;

    tabContainer.setWidgets([smallWeibo, tabCont1, tabCont2]);
    material.setWidgets(
        [leftVideo, smallHead],
        [tabContainer],
        [buttonGroup]
    );

    if (async === true) {
        return material;
    }

    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    //material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        var config = AD_CONFIG['left_video'][index];
        config['is_play'] = true;
        selectVideo = index;
        leftVideo.refresh(null, config);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_START, function(){
        leftVideo.sendLog("video" + (selectVideo + 1) + "start");
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_AUTO, function(){
        leftVideo.sendLog("video" + (selectVideo + 1) + "auto");
        return false;
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
