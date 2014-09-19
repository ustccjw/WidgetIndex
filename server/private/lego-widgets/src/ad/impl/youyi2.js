/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: youyi2.js 150523 2013-06-07 10:29:22Z fanxueliang$
 *
 **************************************************************************/



/**
 * src/ad/impl/youyi2.js ~ 2013/06/07 10:29:22
 * @author fanxueliang@baidu.com
 * @version $Revision: 150523 $
 * @description
 * youyi相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/standard/small_weibo.less');
goog.include('ad/impl/youyi2.less');

goog.provide('ad.impl.Youyi2');

ad.Debug(function(async){

    function getVideoConfig(index) {
        var item = AD_CONFIG['small_head']['image_group_head']['options'][index];
        var videoUrl = item['video_url'];
        var imageUrl = item['img_url'];
        if (index !== 0) {
            // getVideoConfig(0)的时候必须有视频呀
            if (!videoUrl) {
                return null;
            }
        }

        var cfg = {
            "rcv_url": item['img_rcv_url'],
            "img_url": imageUrl,
            "video_url": videoUrl,
            "ipad_img": imageUrl,
            "is_play": false,
            "player_ver": 7,
            "width": 254,
            "height": 143
        };

        return cfg;
    }
    var leftVideo = new ad.widget.Video(getVideoConfig(0));
    
    //第一张小图是否显示视频脚标
    var dispayFirstTip = false;
    var options = AD_CONFIG['small_head']['image_group_head']['options'];
    for(var i = 1; i < options.length; i++) {
        if(options[i] && options[i]['video_url']){
            //有两个以上视频，显示视频脚标
            dispayFirstTip = true;
            options[i]['tip'] = "视频";
        }
    }
    if(dispayFirstTip){
        options[0]['tip'] = '视频';
    }
    
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var weibo;
    var weiboConf = AD_CONFIG['weibo']['weibo_type'];
    if ('sina' in weiboConf) {
        weibo = new ad.widget.SmallWeibo(weiboConf['sina']);
    }
    else if ('qq' in weiboConf) {
        weibo = new ad.widget.QQWeibo(weiboConf['qq']);
    }
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var currentIndex = 1;
    material.setWidgets(
        [title],
        [leftVideo, smallHead],
        [weibo],
        [buttonGroup]
    );

    if (async === true) {
        return material;
    }
    material.show();
    smallHead.addListener(ui.events.CLICK, function(index, evt){
        var videoConfig = getVideoConfig(index);
        if (dispayFirstTip && videoConfig) {
            videoConfig['is_play'] = true;
            leftVideo.setData(videoConfig);
            leftVideo.refresh();
            currentIndex = index + 1;
            return false;
        }
        return true;
    });
    leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
        leftVideo.sendLog('leftvideo' + currentIndex + 'click');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_START, function(){
        leftVideo.sendLog('leftvideo' + currentIndex + 'start');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function(){
        leftVideo.sendLog('leftvideo' + currentIndex + 'finish');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function(){
        leftVideo.sendLog('leftvideo' + currentIndex + 'pause');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
        leftVideo.sendLog('leftvideo' + currentIndex + 'continue');
        return false;
    });
});
