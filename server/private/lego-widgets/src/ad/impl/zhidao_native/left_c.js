/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_native/left_c.js ~ 2014/04/15 16:01:07
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * left_c相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhidao_native.CompanyId');
goog.require('ad.widget.zhidao_native.CompanyProduct');
goog.require('ad.widget.zhidao_native.Video');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ui.events');
goog.require('ad.plugin.ClickMonkey');
goog.require('ad.plugin.Rcv2');

goog.include('ad/impl/zhidao_native/left_base.less');
goog.include('ad/impl/zhidao_native/related_video.less');
goog.include('ad/impl/zhidao_native/left_c.less');

goog.provide('ad.impl.zhidao_native.LeftC');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var mainVideo = new ad.widget.Video(AD_CONFIG['video']);
    var videoThumbs = new ad.widget.zhidao_native.Video(AD_CONFIG['video_thumbs']);

    material.setWidgets(
        new ad.widget.zhidao_native.CompanyId(AD_CONFIG['cid']),
        [
            new ad.widget.HtmlText({'rcv_html': '- 推广'}),
            new ad.widget.zhidao_native.CompanyProduct(AD_CONFIG['product']),
            new ad.widget.Title({'activetip': '相关视频'}),
            [
                mainVideo,
                [
                    new ad.widget.HtmlText(AD_CONFIG['video_desc']),
                    videoThumbs
                ]
            ]
        ]
    );
    if (async === true) {
        return material;
    }
    material.show();
    var lastThumb = baidu.q('ec-item', videoThumbs.getId('thunbnail-cont'));
    lastThumb = lastThumb[lastThumb.length - 1];
    baidu.addClass(lastThumb, 'ec-item-last');

    var fwc, fwcArr = [], fwcVideo, fwcVideos = [], initedFWCLog = [], lastFwcIndex = -1;
    ad.base.forEach(AD_CONFIG['fwc'], function (config, idx) {
        config['material_name'] = 'ec-qa';
        config['id'] = Number(idx) + 1;
        fwc = new ad.widget.FloatWindowContainer(config);
        fwcVideo = new ad.widget.Video(config['video']);
        fwc.setWidgets(fwcVideo);
        fwcArr.push(fwc);
        fwcVideos.push(fwcVideo);
    });

    videoThumbs.addListener(ui.events.CLICK, function(idx, me) {
        mainVideo.pause();
        showFWC(idx);
        videoThumbs.sendLog('thumbclick' + (idx + 1));
        return false;
    });

    ad.base.forEach(fwcArr, function (fwc) {
        fwc.addListener(ui.events.CLOSE, function(index) {
            hideFWC();
            videoThumbs.clearPlayStatus();
        });
    });

    ad.base.forEach(fwcVideos, function (fwcVideo) {
        fwcVideo.addListener(ui.events.VIDEO_START, function() {
            videoThumbs.sendLog('floatvideo' + (lastFwcIndex + 1) + 'start');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
            videoThumbs.sendLog('floatvideo' + (lastFwcIndex + 1) + 'jump');
            //在ipad下手动跳转
            if(fwcVideo._data['is_ipad']){
                fwcVideo.redirect();
            }
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_PAUSE, function() {
            videoThumbs.sendLog('floatvideo' + (lastFwcIndex + 1) + 'pause');
            return false;
        });

        fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
            videoThumbs.sendLog('floatvideo' + (lastFwcIndex + 1) + 'continue');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
            videoThumbs.sendLog('floatvideo' + (lastFwcIndex + 1) + 'complete');
            return false;
        });
        fwcVideo.addListener(ui.events.VIDEO_AUTO, function() {
            videoThumbs.sendLog('floatvideo' + (lastFwcIndex + 1) + 'auto');
            return false;
        });
    });

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(lastFwcIndex === index) {
            return;
        }
        hideFWC();
        if (fwcArr.length > 0) {
            fwcArr[index].show();
            fwcVideos[index].refresh(null, AD_CONFIG['fwc'][index]['video']);
            if (!initedFWCLog[index]) {
                var canvas = baidu.dom.first(fwcArr[index].getRoot());
                if (canvas && canvas.id) {
                    material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                    initedFWCLog[index] = true;
                }
            }
        }
        lastFwcIndex = index;
    }
    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if (lastFwcIndex === -1) {
            return ;
        }
        fwcArr[lastFwcIndex].hide();
        lastFwcIndex = -1;
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
