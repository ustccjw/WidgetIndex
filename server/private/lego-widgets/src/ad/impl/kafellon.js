/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/kafellon.js ~ 2014/05/22 14:07:08
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * kafellon相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.Image');
goog.require('ad.widget.SinaWeibo');

goog.include('ad/impl/kafellon.less');

goog.provide('ad.impl.Kafellon');

ad.Debug(function(async) {

    /**
     * @override
     */
    ad.widget.ImageCartoon.prototype._initPool = function() {
        this._data['_viewable_pool'] = this.getData('options');
    };
    

    var material = new ad.material.BaseMaterial();

    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var rightImages = new ad.widget.MultiVideoThunbnail(AD_CONFIG['right_images']);

    // 底部按钮
    var bottomButtons = (function(buttons) {
        var result = [];
        var _button = baidu.object.clone(buttons);
        baidu.each(buttons.options, function (button) {
            _button.options = button.options;
            result.push(new ad.widget.ButtonGroup(_button));
        });
        return result;
    })(AD_CONFIG['bottom_buttons']);

    // 胶带图片
    var tapeImages = (function(tapes) {
        var result = [];
        var _tape = baidu.object.clone(tapes);
        baidu.each(tapes.options, function (tape) {
            _tape.options = tape.options;
            result.push(new ad.widget.ImageCartoon(_tape));
        });
        return result;
    })(AD_CONFIG['tape_images']);

    // TabCont
    var tabCont = new ad.widget.TabCont(AD_CONFIG['tab_cont']);
    // Weibo
    var sinaWeibo = new ad.widget.SinaWeibo(AD_CONFIG['sina_weibo']);
    // QRCODE
    var qrcode = new ad.widget.Image(AD_CONFIG['qrcode']);

    // Normal Container
    var tabs = [];
    var normalContainer;
    var temp;
    for (var i = 0, j = 0; i < bottomButtons.length; i++) {
        if (i === 2) {
            temp = [ tabCont, bottomButtons[i] ];
            ++j;
        } 
        else if (i === 4) {
            temp = [ sinaWeibo, qrcode, bottomButtons[i] ];
            ++j;
        } 
        else {
            temp = [ tapeImages[i - j], bottomButtons[i] ];
        }
        normalContainer = new ad.widget.NormalContainer({});
        normalContainer.setWidgets(temp);
        tabs.push(normalContainer);
    }

    // Tab Container
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    tabContainer.setWidgets(tabs);

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
        return new ad.widget.MultiVideoThunbnail({ 'options': options });
    })(AD_CONFIG['float_video']['options']);
    // 视频浮层窗口
    var floatVideoWindow = new ad.widget.FloatWindowContainer(AD_CONFIG['float_video']);
    floatVideoWindow.setWidgets([ floatVideoPlayer, floatVideoThunbnails ]);

    // 图片浮层
    var floatImageWindows = (function (data) {
        var images = data['float_bg'];
        var _data = baidu.object.clone(data);
        _data['material_name'] = 'ec-float-image';
        var container;
        var containers = [];
        // var image;
        for (var i = 0; i < images.length; i++) {
            _data['float_bg'] = images[i];
            container = new ad.widget.FloatWindowContainer(_data);
            containers.push(container);
        }
        return containers;
    })(AD_CONFIG['float_images']);


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
        [ floatVideoWindow ],
        floatImageWindows
    );

    if (async === true) {
        return material;
    }

    material.show();

    var lastFloatVideoIndex;
    var initedFloatVideoLog;
    var initedFLoatImagesLog = [];


    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFloatVideoWindow(0);
        leftVideo.sendLog('FloatVideoWindowOpen');
        return false;
    });

    floatVideoThunbnails.addListener(ui.events.CLICK, function (index) {
        switchFloatVideo(index);
        floatVideoThunbnails.sendLog('FloatVideo' + index + 'Play');
    });

    floatVideoWindow.addListener(ui.events.CLOSE, function () {
        hideFloatVideoWindow();
    });

    rightImages.addListener(ui.events.CLICK, function (index) {
        showFloatImageWindow(index);
        rightImages.sendLog('FloatImage' + index + 'Open');
    });


    function showFloatVideoWindow(index) {
        hideFloatImageWindow();
        hideFloatVideoWindow();
        if (!floatVideoWindow) {
            return ;
        }
        // 重绘浮层视频
        if (floatVideoPlayer) {
            ad.base.setTimeout(function() {
                switchFloatVideo(index);
                floatVideoThunbnails.setPlayStatus(index);
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
    }

    function hideFloatVideoWindow() {
        if (floatVideoPlayer) {
            floatVideoPlayer.clearRoot();
        }
        // floatVideoPlayer.hide();
        lastFloatVideoIndex = -1;
    }



    function showFloatImageWindow(index) {
        hideFloatVideoWindow();
        hideFloatImageWindow();
        floatImageWindows[index].show();
        if (!initedFLoatImagesLog[index]) {
            var canvas = baidu.dom.first(floatImageWindows[index].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                initedFLoatImagesLog[index] = true;
            }
        }
    }

    function hideFloatImageWindow() {
        rightImages.clearPlayStatus();
        for (var i = floatImageWindows.length - 1; i >= 0; i--) {
            floatImageWindows[i].hide();
        }
    }


});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
