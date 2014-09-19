/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/case1179.js ~ 2013/10/30 14:23:28
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * case1179相关的实现逻辑
 * 【新版品专-高级样式】标准微博样式（多微博）
 * icafe.baidu.com/issue/1007418/show?cid=5&spaceId=519&from=email
 * 通过检测tab的格式来支持多微博和单微博样式的切换.
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.standard.Video');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/standard/small_weibo.less');
goog.include('ad/impl/standard/qq_weibo.less');
goog.include('ad/impl/standard/tab.less');
goog.include('ad/impl/standard/button_group.less');
goog.include('ad/impl/standard/case1179.less');

goog.provide('ad.impl.standard.Case1179');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);

    // 如果只有一个视频的话，那么视频的位置直接用，3个小图的位置不显示『视频』的文字提示
    // 如果有2个视频的话，那么视频的位置直接使用第一个视频，2个位置显示『视频』的文字提示
    // 如果有3个视频的话，同2
    // 表单的规则限制了肯定有一个视频存在
    var videoIndexCache = [];
    var smallHeadOptions = AD_CONFIG['small_head']['image_group_head']['options'];
    for (var i = 0; i < smallHeadOptions.length; i ++) {
        if (smallHeadOptions[i]['video_url']) {
            // smallHeadOptions[i]['tip'] = '视频';
            videoIndexCache.push(i);
        }
    }

    var videoIndex = videoIndexCache[0];
    var videoConfig = getVideoConfig(videoIndex || 0);
    if (videoIndexCache.length === 1) {
        // 只有一个视频
        delete smallHeadOptions[videoIndex]['video_url'];
        delete smallHeadOptions[videoIndex]['img_url'];
    }
    else if (videoIndexCache.length > 1) {
        for (var i = 0; i < videoIndexCache.length; i ++) {
            videoIndex = videoIndexCache[i];
            if (smallHeadOptions[videoIndex]['video_url']) {
                smallHeadOptions[videoIndex]['tip'] = '视频';
            }
        }
    }

    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);

    videoConfig['is_play'] = false;
    var video = new ad.widget.standard.Video(videoConfig);

    // 创建Tab的内容.
    var tabBodies = [];
    var tabOptions = AD_CONFIG['tab']['options'];
    for (var i = 0; i < tabOptions.length; i ++) {
        var tabOption = tabOptions[i]['weibo'];
        var weibo = null;
        if (tabOption['_type'] === 'qq') {
            weibo = new ad.widget.QQWeibo(tabOption);
        }
        else if (tabOption['_type'] === 'sina') {
            weibo = new ad.widget.SmallWeibo(tabOption);
        }

        if (weibo) {
            tabBodies.push(weibo);
        }
    }

    var weiboModule = null;
    if (tabBodies.length > 1) {
        weiboModule = new ad.widget.TabContainer(AD_CONFIG['tab']);
        weiboModule.setWidgets(tabBodies);
    }
    else {
        // 至少会有一个，表单的验证规则已经保证了.
        weiboModule = tabBodies[0];
    }

    function getVideoConfig(index) {
        var item = ad.base.getObjectByName('small_head.image_group_head.options.' + index, AD_CONFIG)
        var config = {
            "player_ver": 6,
            "width": 254,
            "height": 143,
            "video_url": item['video_url'],
            "img_url": item['img_url'],
            "ipad_img": item['img_url'],
            "rcv_url": item['img_rcv_url'],
            "is_play": true
        };

        return config;
    }

    smallHead.addListener(ui.events.CLICK, function(index, evt){
        var config = getVideoConfig(index);
        if (config['video_url']) {
            video.setData(config);
            video.refresh();
            return false;
        }
    });

    var widgets = [
        [title],
        [video, smallHead],
        [weiboModule],
        [buttonGroup]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
