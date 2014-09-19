/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: biostime.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/biostime.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.Image');
goog.require('ad.widget.Video');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.MultiVideoThunbnail');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/standard/tab_cont.less');
goog.include('ad/impl/new_custom/biostime.less');

goog.provide('ad.impl.new_custom.Biostime');

ad.Debug(function(async){

    function createWidget(cfg) {
        var widgetConfig = cfg['tab_content'];
        if ('tab_form' in widgetConfig) {
            return new ad.widget.Iframe(widgetConfig['tab_form']);
        }
        else if ('tab_cont' in widgetConfig) {
            return new ad.widget.TabCont(widgetConfig['tab_cont']);
        }
    }
    
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    
    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    var tabLength = tabOptions.length;
    for (var i = 0; i < tabLength; i++) {
        tabBodies.push(createWidget(tabOptions[i]));
    }
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab.setWidgets(tabBodies);
    
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc']['options'][0]);
    var datasource = {'width': 100, 'height': 56, 'options': []};
    for (var i = 0; i < AD_CONFIG['video_fwc']['options'].length; i ++) {
        var item = AD_CONFIG['video_fwc']['options'][i];
        datasource['options'].push({
            'img_url': item['thumbnail_img_url'],
            'text': item['thumbnail_text'],
            'display_play_button': true
        });
    }
    var fwcImgs = [];
    var imgFWCs = [];
    for (var i = 0; i < AD_CONFIG['small_head']['image_group_head']['options'].length; i++) {
        var img = AD_CONFIG['small_head']['image_group_head']['options'][i]['fwc_img'];
        fwcImgs.push(new ad.widget.Image(img));
    }
    baidu.each(fwcImgs, function(item, index) {
        AD_CONFIG['img_fwc']['material_name'] = 'ec-biostime-img';
        AD_CONFIG['img_fwc']['id'] = 1 + index;
        var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['img_fwc']);
        fwc.setWidgets([item]);
        imgFWCs.push(fwc);
    });
    var multiVideoThunbnail = new ad.widget.MultiVideoThunbnail(datasource);
    AD_CONFIG['video_fwc']['material_name'] = 'ec-biostime-video';
    AD_CONFIG['video_fwc']['id'] = 1;
    var videoFWC = new ad.widget.FloatWindowContainer(AD_CONFIG['video_fwc']);
    videoFWC.setWidgets([fwcVideo, multiVideoThunbnail]);
    
    var widgets = [
        [title],
        [leftVideo, smallHead],
        [tab],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])],
        [videoFWC],
        [imgFWCs]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    
    
    leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
        showVideoFWC();
        leftVideo.sendLog('videofloatopen', 'videofloatopen');
        return false;
    });
    smallHead.addListener(ui.events.CLICK, function(index){
        showImgFWC(index);
        leftVideo.sendLog('img' + (1 + index) + 'floatopen', 'img' + (1 + index) + 'floatopen');
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
    videoFWC.addListener(ui.events.CLOSE, function() {
        hideVideoFWC();
    });
    baidu.each(imgFWCs, function(item, index){
        item.addListener(ui.events.CLOSE, function() {
            hideImgFWC();
        });
    }); 
    multiVideoThunbnail.addListener(ui.events.CLICK, function(index){
        fwcVideo.refresh(null, AD_CONFIG['video_fwc']['options'][index]);
        lastFWCVideoIndex = index + 1;
    });
    fwcVideo.addListener(ui.events.VIDEO_START, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'finish');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'pause');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'continue');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'auto');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'click');
        return false;
    });
    var lastFWCVideoIndex = -1;
    var videoFWCRenderd = false;
    var imgFWCRenderd = [false, false, false];
    /**
     * 显示视频浮层
     */
    function showVideoFWC() {
        if(!videoFWC) {
            return;
        }
        videoFWC.show();
        if(multiVideoThunbnail) {
            multiVideoThunbnail.refresh();
        }
        multiVideoThunbnail.setPlayStatus(0);
        lastFWCVideoIndex = 1;
        if(fwcVideo) {
            fwcVideo.refresh(null, AD_CONFIG['video_fwc']['options'][0]);
        }
        if (!videoFWCRenderd) {
            var canvas = baidu.dom.first(videoFWC.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                videoFWCRenderd = true;
            }
        }
    }
    
    /**
     * 隐藏视频浮层
     */
    function hideVideoFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        multiVideoThunbnail.clearPlayStatus();
        videoFWC.hide();
    }
    /**
     * 显示对应图片浮层
     */
    function showImgFWC(index) {
        if(!imgFWCs[index]) {
            return;
        }
        imgFWCs[index].show();
        if (!imgFWCRenderd[index]) {
            var canvas = baidu.dom.first(imgFWCs[index].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                imgFWCRenderd[index] = true;
            }
        }
    }
    
    /**
     * 隐藏图片浮层
     */
    function hideImgFWC() {
        baidu.each(imgFWCs, function(item, index){
            item.hide();
        });
    }
    
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
