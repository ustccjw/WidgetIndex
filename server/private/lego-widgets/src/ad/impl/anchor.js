/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/


/**
 * src/ad/impl/anchor.js ~ 2013/09/13 10:45:11
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * anchor相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Image');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.Video');
goog.require('ad.widget.ImageNormal');
goog.require('ui.events');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/anchor.less');

goog.provide('ad.impl.Anchor');

ad.Debug(function(async) {
    if (AD_CONFIG['video_list']) { //spec中获取数据
        var videos = AD_CONFIG['video_list'];
        var len = videos.length;
        AD_CONFIG['image_normal'] = {"width": AD_CONFIG["thumb_width"]};
        var thumbList = [], videoList = [];
        for (var i = 0;i < len;i++) {
            thumbList.push(videos[i]["video_thumb"]);
            videoList.push(videos[i]['video_info']);
        }
        AD_CONFIG['video_info'] = videoList;
        AD_CONFIG['image_normal']['options'] = thumbList;
        delete AD_CONFIG['video_list'];
    }

    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender({
        'block_class': 'ad-block'
    }));
    var mainImage = new ad.widget.Image(AD_CONFIG['main_image']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    AD_CONFIG['fwc']['material_name'] = 'ec-anchor';
    var popWindow = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var popVideo = new ad.widget.Video(AD_CONFIG['video_info'][0]);
    var videoThumbs = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    popWindow.setWidgets([popVideo, videoThumbs]);
    material.setWidgets(
        [mainImage, smallHead],
        new ad.widget.Section(AD_CONFIG['section']),
        new ad.widget.ButtonList(AD_CONFIG['button_list']),
        popWindow
    );
    if (async === true) {
        return material;
    }

    material.show();

    mainImage.addListener(ui.events.CLICK, function() {
        mainImage.sendLog({
            'action': '点击大图',
            '__node': this.getRoot()
        });
        playVideoByIndex(0);
    });

    smallHead.addListener(ui.events.CLICK, function(idx) {
        var data = AD_CONFIG['small_head']['image_group_head']['options'];
        if (!data[idx]['img_rcv_url']) {
            playVideoByIndex(idx + 1);
        }
    });

    var lastVideoIdx = -1;
    var playingNode = null;
    var thumbs = null;

    /**
     * @param {number} idx 索引
     */
    function playVideoByIndex(idx) {
        if (lastVideoIdx == -1) {
            showPopWindow(idx);
        }
        if (idx != lastVideoIdx) {
            popVideo.refresh(null, AD_CONFIG['video_info'][idx]);
            lastVideoIdx = idx;
        }
        if (playingNode == null) {
            playingNode = baidu.dom.create('div', {
                'class': 'ec-cover'
            });
            playingNode.innerHTML = '播放中';
        }
        var thumb = thumbs[idx];
        if (thumb) {
            thumb.appendChild(playingNode);
        }
    }

    /**
     * @decription 显示弹出层
     */
    function showPopWindow() {
        popWindow.show();
        popWindow.addListener(ui.events.CLOSE, hidePopWindow);
        videoThumbs.addListener(ui.events.CLICK, bindVideoThumbsEvent);
        thumbs = videoThumbs.getRoot().getElementsByTagName('a');
    }
    /*
     * @param {number} idx 点击的第几个
     * @param {Event} evt
     * @description 浮层中图片缩略图点击事件
     */
    function bindVideoThumbsEvent(idx, evt) {
        var oTarget = baidu.event.getTarget(evt);
        var tagName = oTarget.tagName.toLowerCase();
        if (tagName == 'img') {
            videoThumbs.sendLog('float1Button' + (idx + 1) + 'imgclick');
        }
        else if (tagName == 'span') {
            videoThumbs.sendLog('float1Button' + (idx + 1) + 'textclick');
        }
        playVideoByIndex(idx)
        return false;
    }

    /**
     * @description 隐藏弹出层
     */
    function hidePopWindow() {
        lastVideoIdx = -1;
        thumbs = null;
        popVideo && popVideo.clearRoot();
        popWindow.removeListener(ui.events.CLOSE, hidePopWindow); //关闭时移除事件监听
        popWindow.hide();
        popWindow.sendLog({
            'action': '浮层关闭',
            '__node': popWindow.getRoot()
        });
    }

    //能改成只抛出一个事件吗？用type来区分不同的类型,不然绑定这么多事件，解绑也麻烦，只能一直绑着
    popVideo.addListener(ui.events.VIDEO_START, function() {
        popVideo.sendLog('anchor_video' + (lastVideoIdx + 1) + 'start');
        return false;
    });
    popVideo.addListener(ui.events.VIDEO_CLICK, function() {
        popVideo.sendLog('anchor_video' + (lastVideoIdx + 1) + 'jump');
        //在ipad下手动跳转
        if(popVideo._data['is_ipad']){
            popVideo.redirect();
        }
        return false;
    });
    popVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        popVideo.sendLog('anchor_video' + (lastVideoIdx + 1) + 'pause');
        return false;
    });

    popVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        popVideo.sendLog('anchor_video' + (lastVideoIdx + 1) + 'continue');
        return false;
    });
    popVideo.addListener(ui.events.VIDEO_FINISH, function() {
        popVideo.sendLog('anchor_video' + (lastVideoIdx + 1) + 'complete');
        return false;
    });
    popVideo.addListener(ui.events.VIDEO_AUTO, function() {
        popVideo.sendLog('anchor_video' + (lastVideoIdx + 1) + 'auto');
        return false;
    });
});









/* vim: set ts=4 sw=4 sts=4 tw=100: */
