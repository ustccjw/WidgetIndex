/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: bmw3.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/bmw3.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ad.widget.CountDown');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Video');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/new_custom/bmw3.less');

goog.provide('ad.impl.new_custom.BMW3');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['video']);
    var countDown = new ad.widget.CountDown(AD_CONFIG['count_down']);
    var bigImg = new ad.widget.Image(AD_CONFIG['big_img']);
    var buttonConf = AD_CONFIG['img_buttons']['options'];
    var imgs = new ad.widget.MultiVideoThunbnail(AD_CONFIG['products']);
    baidu.each(buttonConf, function(item){
        item['img_url'] = item['img_url_' + buttonConf.length];
    });
    var imgButtons = new ad.widget.ImageNormal(AD_CONFIG['img_buttons']);
    AD_CONFIG['fwc']['material_name'] = 'ec-bmw1';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo]);
    var rightHead = [];
    rightHead.push(smallHead);
    if(countDown.isOver()) {
        rightHead.push(imgs);
    }
    else {
        rightHead.push(countDown);
    }
    var widgets = [
        [title],
        [
            [leftVideo], 
            rightHead
        ],
        [bigImg],
        [imgButtons],
        [fwc]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    
    countDown.addListener(ui.events.TIME_OVER, function(){
        imgs.refresh(countDown.getRoot());
        countDown.clearRoot();
    });
    imgs.addListener(ui.events.CLICK, function(index){
        showFWC();
        imgs.sendLog('img' + (index + 1) + 'floatopen');
    });
    leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC();
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
    fwcVideo.addListener(ui.events.VIDEO_START, function(){
        fwcVideo.sendLog('floatvideostart');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function(){
        fwcVideo.sendLog('floatvideofinish');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function(){
        fwcVideo.sendLog('floatvideopause');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
        fwcVideo.sendLog('floatvideocontinue');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function(){
        fwcVideo.sendLog('floatvideoauto');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
        fwcVideo.sendLog('floatvideoclick');
        return false;
    });
    fwc.addListener(ui.events.CLOSE, function() {
        hideFWC();
        imgs.resetCurrentIndex();
    });
    var fwcRenderd = false;
    
    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(!fwc) {
            return;
        }
        fwc.show();
        
        if(fwcVideo) {
            fwcVideo.refresh(null, AD_CONFIG['fwc']['video']);
        }
        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                fwcRenderd = true;
            }
        }
    }
    
    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        fwc.hide();
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
