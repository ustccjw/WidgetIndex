/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: guolinaiyou.js 150523 2013-06-05 14:06:00Z  fanxueliang$
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/beijing_hyundai_ix25_stage1.js ~ 2014/08/29 11:51:39
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * coca2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Image');
goog.require('ad.widget.Title');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/new_custom/beijing_hyundai_ix25_stage1.less');

goog.provide('ad.impl.new_custom.BeijingHyundaiIx25Stage1');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.Video(AD_CONFIG['video']);
    if (AD_CONFIG['title']['logoimg']
    && !AD_CONFIG['title']['logoimg']['logoimg']) {
        delete AD_CONFIG['title']['logoimg'];
    }
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var head = new ad.widget.SmallHead(AD_CONFIG['head']);
    var products = new ad.widget.ImageNormal(AD_CONFIG['products']);
    var img = new ad.widget.Image(AD_CONFIG['image']);
    var app = new ad.widget.Flash(AD_CONFIG['app']);

    var floatVideo = new ad.widget.Video(AD_CONFIG['fwc']['float_video']);
    var floatWindow = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    floatWindow.setWidgets(floatVideo);
    var initedFloatWindowLog = false;
    var isFloatWindowShowing = false;

    material.setWidgets(
        [ title ],
        [
            [ video ],
            [
                head,
                products
            ]
        ],
        [ img ],
        [ app ],
        [ floatWindow ]
    );

    if (async === true) {
        return material;
    }
    material.show();

    if (app) {
        baidu.hide(app.getRoot());
        img.addListener(ui.events.CLICK, function() {
            baidu.show(app.getRoot());
            img.sendLog('app_float_open', 'app_float_open');
            return false;
        });
        var div = baidu.dom.create('div', { 'class': 'ec-float-close' });
        baidu.g(app.getId('flash')).appendChild(div);
        baidu.on(div, 'click', function() {
            baidu.hide(app.getRoot());
        });
    }

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


    products.rewriteTitle2(null, '产品');

    return material;
});
