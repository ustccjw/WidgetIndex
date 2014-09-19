/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/sprite.js ~ 2014/08/18 11:17:20
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * sprite相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Image');
goog.require('ad.widget.SinaWeibo');
goog.require('ad.widget.ButtonListFluid');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/new_custom/sprite.less');

goog.provide('ad.impl.new_custom.Sprite');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    // Left Video
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    // Float Video Layer
    var floatVideo = new ad.widget.Video(AD_CONFIG['float_layer']['float_video']);
    var floatWindow = new ad.widget.FloatWindowContainer(AD_CONFIG['float_layer']);
    floatWindow.setWidgets(floatVideo);
    var initedFloatWindowLog = false;

    // Tab Container
    var tabConts = [];
    var tabContOptions = AD_CONFIG['tab_container']['options'];
    var weibos = [];
    var tabContOption;
    var temp;
    for (var i = 0; i < tabContOptions.length; ++i) {
        tabContOption = tabContOptions[i];
        if ('image' in tabContOption['tab_type']) {
            temp = new ad.widget.Image(tabContOption['tab_type']['image']);
        }
        else if ('weibo' in tabContOption['tab_type']) {
            temp = new ad.widget.SinaWeibo(tabContOption['tab_type']['weibo']);
            weibos.push(temp);
        }
        tabConts.push(temp);
    }
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    tabContainer.setWidgets(tabConts);


    material.setWidgets(
        [ new ad.widget.Title(AD_CONFIG['title']) ],
        [
            [ leftVideo ],
            [
                new ad.widget.SmallHead(AD_CONFIG['small_head']),
                new ad.widget.ButtonListFluid(AD_CONFIG['right_buttons'])
            ]
        ],
        [ tabContainer ],
        [ floatWindow ]
    );

    if (async === true) {
        return material;
    }

    material.show();


    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFloatWindow();
    });

    floatWindow.addListener(ui.events.CLOSE, function() {
        hideFloatWindow();
    });

    function showFloatWindow() {
        hideFloatWindow();
        floatWindow.show();

        ad.base.setTimeout(function() {
            floatVideo.refresh(null);
        }, 10);

        var canvas;
        if (!initedFloatWindowLog && floatWindow) {
            canvas = baidu.dom.first(floatWindow.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                initedFloatWindowLog = true;
            }
        }
    }

    function hideFloatWindow() {
        floatWindow.hide();
        if (floatVideo) {
            floatVideo.clearRoot();
        }
    }

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
