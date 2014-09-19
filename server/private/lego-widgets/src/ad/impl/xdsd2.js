/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: xdsd2.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/xdsd2.js ~ 2012/09/27 14:17:21
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/xdsd2.less');

goog.provide('ad.impl.XDSD2');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arrTabCont = [];
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var tab1 = new ad.widget.Iframe(AD_CONFIG['tab1']);
    var tab2 = new ad.widget.TabCont(AD_CONFIG['tab2']);
    var tab3 = new ad.widget.ImageCartoon(AD_CONFIG['tab3']);
    var tab4 = new ad.widget.ImageCartoon(AD_CONFIG['tab4']);
    var tab5 = new ad.widget.TabCont(AD_CONFIG['tab5']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var section = new ad.widget.Section(AD_CONFIG['section']);

    arrTabCont = [tab1, tab2, tab3, tab4, tab5];
    tabContainer.setWidgets(arrTabCont);

    material.setWidgets(
        [
            leftVideo, 
            [smallHead,
            section]
        ],
        [tabContainer],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );

    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('video1start');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('video1complete');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        return false;
    });
});
