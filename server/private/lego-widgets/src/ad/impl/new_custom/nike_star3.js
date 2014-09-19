/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/nike_star3.js ~ 2014/06/16 11:19:57
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 150523 $
 * @description
 * nike_star2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.standard.Video');
goog.require('ad.widget.tieba.Text');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.VideoTitle');

goog.include('ad/impl/new_custom/nike_star3.less');

goog.provide('ad.impl.new_custom.NikeStar3');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var bgImage = new ad.widget.ImageLink(AD_CONFIG['image_link']);
    var norCont = new ad.widget.NormalContainer({});
    
    var video = new ad.widget.standard.Video(AD_CONFIG['video']);
    //重写获取浮层视频配置信息方法
    video._getBigVideoConfig = function() {
        return AD_CONFIG['fwc_video'];
    };
    var textCfg = {
        "texts": [AD_CONFIG['text']['video_text']]
    };
    var text = new ad.widget.tieba.Text(textCfg);
    var name = new ad.widget.tieba.Text({
        "texts": [AD_CONFIG['text']['name']]
    });
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    norCont.setWidgets(
        [
            [
                video, [name, text]
            ],
            iframe,
            new ad.widget.VideoTitle(AD_CONFIG['topic'])
        ]
    );
    
    material.setWidgets(
        [
            bgImage, 
            norCont
        ]
    );

    if (async === true) {
        return material;
    }

    material.show();

    //tab1加百科链接
    var textDom = baidu.g(text.getId());
    baidu.dom.insertHTML(baidu.dom.first(textDom), 'beforeEnd', 
        '<a href="' + AD_CONFIG['text']['video_baike_link'] + '" target="_blank" title2="TAB1百科链接">[查看人物百科]</a>');
    //add百科链接log
    baidu.event.on(textDom, ui.events.CLICK, function(e) {
        var evt = e || window.event;
        var element = evt.target || evt.srcElement;
        if('a' == element.nodeName.toLowerCase()) {
            text.sendLog('人物百科链接click');
        }
    });

    video.addListener(ui.events.VIDEO_CLICK, function() {
        video._showPopup();
        return false;
    });
    video.addListener(ui.events.VIDEO_START, function() {
        video.sendLog('videostart');
        return false;
    });
    video.addListener(ui.events.VIDEO_PAUSE, function() {
        video.sendLog('videopause');
        return false;
    });

    video.addListener(ui.events.VIDEO_CONTINUE, function() {
        video.sendLog('videocontinue');
        return false;
    });
    video.addListener(ui.events.VIDEO_FINISH, function() {
        video.sendLog('videocomplete');
        return false;
    });
    video.addListener(ui.events.VIDEO_AUTO, function() {
        video.sendLog('videoauto');
        return false;
    });
    
    return material;
    
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */