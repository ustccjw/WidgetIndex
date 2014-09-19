/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: c361.js 150523 2012-10-30 10:06:05Z  DestinyXie$
 *
 **************************************************************************/



/**
 * src/ad/impl/c361.js ~ 2013/04/18 15:18:36
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * c361相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');

goog.include('ad/impl/c361.less');

goog.provide('ad.impl.C361');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var buttonList = new ad.widget.ButtonGroup(AD_CONFIG['button_list']);
    var sinaWeibo = new ad.widget.SmallWeibo(AD_CONFIG['sina_weibo']);
    var tencWeibo = new ad.widget.QQWeibo(AD_CONFIG['tenc_weibo']);
    var fwcflash = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash'][0]);
    var lastFWCVideoIndex = -1;

    tabContainer.setWidgets([sinaWeibo, tencWeibo]);
    fwcflash.setWidgets([
            flash
        ]);
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [leftVideo, smallHead],
        [tabContainer],
        [buttonList],
        [fwcflash]
    );
    
    if (async === true) {
        return material;
    }

    material.show();

    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
    material.initMonitor(AD_CONFIG['main_url']);

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        leftVideo.sendLog('float1open');
        return false;
    });
    
    fwcflash.addListener(ui.events.CLOSE, function() {
        fwcflash.sendLog('float' + (lastFWCVideoIndex + 1) + 'close');
        hideFWC();
    });

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        leftVideo.pause();
        showFWC(index + 1);
        smallHead.sendLog("float" + (index + 2) + "open");
        return false;
    });

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if (lastFWCVideoIndex == index)
            return;
        hideFWC();
        if (!fwcflash)
            return;
        if (flash) {
            ad.base.setTimeout(function () {
                flash.refresh(null, AD_CONFIG['flash'][index]);
            }, 0);
            fwcflash.show();
        }
        lastFWCVideoIndex = index;
    }

    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if (flash)
            flash.clearRoot()
        fwcflash.hide();
        lastFWCVideoIndex = -1;
    }

    return material;
});
