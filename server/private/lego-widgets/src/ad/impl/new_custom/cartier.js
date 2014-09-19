/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/cartier.js ~ 2014/09/16 14:24:21
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * cartier相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Image');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.ImageCartoon');

goog.include('ad/impl/new_custom/cartier.less');

goog.provide('ad.impl.new_custom.Cartier');

ad.Debug(function(async) {
    /**
     * @override
     * 不要惰性加载图片
     */
    ad.widget.ImageCartoon.prototype._initPool = function() {
        this._data['_viewable_pool'] = this.getData('options');
    };

    var material = new ad.material.BaseMaterial();

    // Video
    var video = new ad.widget.Video(AD_CONFIG['left_video']);
    var floatVideo = new ad.widget.Video(AD_CONFIG['fwc']['float_video']);
    var floatWindow = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    floatWindow.setWidgets(floatVideo);
    var initedFloatWindowLog = false;
    var isFloatWindowShowing = false;

    // Tab Cont
    var tabConts = [];
    var tabContOptions = AD_CONFIG['tab_container']['options'];
    var tabContOption;
    var temp;
    var normalCont;
    for (var i = 0; i < tabContOptions.length; ++i) {
        tabContOption = tabContOptions[i];
        if ('image_cartoon' in tabContOption['tab_content']) {
            temp = tabContOption['tab_content']['image_cartoon'];
            tabConts.push(new ad.widget.ImageCartoon(temp));
        }
        else if ('cont' in tabContOption['tab_content']) {
            temp = tabContOption['tab_content']['cont'];
            normalCont = new ad.widget.NormalContainer({});
            normalCont.setWidgets(
                new ad.widget.Image(temp['image']),
                new ad.widget.HtmlText(temp['description']),
                new ad.widget.LinkList(temp['type_links'])
            );
            tabConts.push(normalCont);
        }
    }
    // Tab Container
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    tabContainer.setWidgets(tabConts);

    // BottomButtons
    var bottomButtons = new ad.widget.ButtonGroup(AD_CONFIG['bottom_buttons']);

    material.setWidgets(
        [ new ad.widget.Title(AD_CONFIG['title']) ],
        [
            [ video ],
            [ new ad.widget.SmallHead(AD_CONFIG['small_head']) ]
        ],
        [ tabContainer ],
        [ bottomButtons ],
        [ floatWindow ]
    );


    if (async === true) {
        return material;
    }
    material.show();

    bottomButtons.rewriteTitle2(null, '底部');

    // 点击出浮层
    video.addListener(ui.events.VIDEO_CLICK, function(index) {
        showFloatWindow(index);
        return false;
    });

    floatWindow.addListener(ui.events.CLOSE, function(index) {
        hideFloatWindow();
    });

    function showFloatWindow() {
        if (!floatWindow || isFloatWindowShowing) {
            return ;
        }

        floatWindow.show();
        isFloatWindowShowing = true;

        // 重新渲染Flash
        ad.base.setTimeout(function() {
            floatVideo.refresh(null);
        }, 10);

        // 统计
        var canvas;
        if (!initedFloatWindowLog) {
            canvas = baidu.dom.first(floatWindow.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                initedFloatWindowLog = true;
            }
        }
    }

    function hideFloatWindow() {
        floatWindow.hide();
        floatVideo.clearRoot();
        isFloatWindowShowing = false;
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
