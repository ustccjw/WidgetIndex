/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/lexus.js ~ 2014/07/25 14:40:05
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * lexus相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.MultiVideoThunbnailV2');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Image');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.LinkList');

goog.include('ad/impl/new_custom/lexus.less');

goog.provide('ad.impl.new_custom.Lexus');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var rightImages = new ad.widget.ImageNormal(AD_CONFIG['right_images']);

    // Tab Cont
    var tabConts = [];
    var tabContOptions = AD_CONFIG['tab_container']['options'];
    var iframeIndexs  = [];
    var tabContOption;
    var temp;
    var normalCont;
    for (var i = 0; i < tabContOptions.length; ++i) {
        tabContOption = tabContOptions[i];
        if ('form' in tabContOption['tab_type']) {
            temp = tabContOption['tab_type']['form'];
            temp['image'] = tabContOption['image']['image_url'];
            temp['image_rcv_url'] = tabContOption['image']['image_rcv_url'];
            temp = new ad.widget.Iframe(temp);
            iframeIndexs.push(i);
            tabConts.push(temp);
        }
        else if ('cont' in tabContOption['tab_type']) {
            temp = tabContOption['tab_type']['cont'];
            normalCont = new ad.widget.NormalContainer({});
            normalCont.setWidgets(
                new ad.widget.Image(tabContOption['image']),
                new ad.widget.HtmlText(temp['description']),
                new ad.widget.LinkList(temp['type_links'])
            );
            tabConts.push(normalCont);
        }
    }


    // Tab Container
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    tabContainer.setWidgets(tabConts);

    // 浮层视频
    AD_CONFIG['float_video']['material_name'] = 'ec-float-video';
    // 播放器
    var floatVideoPlayer = new ad.widget.Video(AD_CONFIG['float_video']['options'][0]);
    // 视频略缩图
    var floatVideoThunbnails = (function (videos) {
        var _option = {
            'display_playing_tip': true,
            'display_play_button': true,
            'play_btn_text': '播放'
        };
        var option;
        var options = [];
        for (var i = 0; i < videos.length; i++) {
            option = baidu.object.clone(_option);
            option['img_url'] = videos[i]['thumbnail_img_url'];
            option['text'] = videos[i]['thumbnail_text'];
            options.push(option);
        }
        return new ad.widget.MultiVideoThunbnailV2({
            'options': options
        });
    })(AD_CONFIG['float_video']['options']);
    // 视频浮层窗口
    var floatVideoWindow = new ad.widget.FloatWindowContainer(AD_CONFIG['float_video']);
    floatVideoWindow.setWidgets([
        floatVideoPlayer, 
        floatVideoThunbnails
    ]);


    material.setWidgets(
        [ new ad.widget.Title(AD_CONFIG['title']) ],
        [
            [ leftVideo ],
            [
                new ad.widget.SmallHead(AD_CONFIG['small_head']),
                rightImages
            ]
        ],
        [ tabContainer ],
        [ new ad.widget.ButtonGroup(AD_CONFIG['bottom_buttons']) ],
        [ floatVideoWindow ]
    );

    if (async === true) {
        return material;
    }

    material.show();

    var lastFloatVideoIndex;
    var initedFloatVideoLog;


    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFloatVideoWindow(0);
        leftVideo.pause();
        leftVideo.sendLog('FloatVideoWindowOpen');
        return false;
    });

    floatVideoThunbnails.addListener(ui.events.CLICK, function(index) {
        switchFloatVideo(index);
        floatVideoThunbnails.sendLog('LeftVideoClicked [' + index + ']');
        return false;
    });

    floatVideoWindow.addListener(ui.events.CLOSE, function() {
        hideFloatVideoWindow();
    });

    rightImages.addListener(ui.events.CLICK, function(index) {
        showFloatVideoWindow(index);
        rightImages.sendLog('RightImageClicked [' + index + ']');
        return false;
    });


    function showFloatVideoWindow(index) {
        hideFloatVideoWindow();
        if (!floatVideoWindow) {
            return false;
        }
        // 重绘浮层视频
        if (floatVideoPlayer) {
            ad.base.setTimeout(function() {
                switchFloatVideo(index);
            }, 10);
            
            floatVideoWindow.show();
        }
        
        lastFloatVideoIndex = index;
        if (!initedFloatVideoLog) {
            var canvas = baidu.dom.first(floatVideoWindow.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                initedFloatVideoLog = true;
            }
        }
    }

    function switchFloatVideo(index) {
        floatVideoPlayer.refresh(null, AD_CONFIG['float_video']['options'][index]);
        floatVideoThunbnails.setPlayStatus(index);
        floatVideoPlayer.sendLog('FloatVideoPlayed [' + index + ']');
    }

    function hideFloatVideoWindow() {
        if (floatVideoPlayer) {
            floatVideoPlayer.clearRoot();
        }
        lastFloatVideoIndex = -1;
    }

    // 产品展示图点击出多视频浮层不带外链，不需要监控点击
    rightImages.rewriteTitle2(null, '', true);
    

    // Iframe Widget 左侧图片点击统计
    // TAB内容是懒惰加载的，不能一开始就读取
    tabContainer.addListener(ui.events.TAB_CHANGE, function(i) {
        if (baidu.array.contains(iframeIndexs, i)) {
            tabConts[i].rewriteTitle2(null, 'TAB' + (i + 1) + ' 捷径左侧图片', true);
            baidu.array.remove(iframeIndexs, i);
        }
    });
    // 第一个加载不会触发TAB_CHANGE，手动触发
    tabContainer.trigger(ui.events.TAB_CHANGE, 0);

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
