/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: volvo.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/volvo.js ~ 2012/09/27 14:17:21
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/volvo.less');

goog.provide('ad.impl.Volvo');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender({
        'block_class': 'ad-block'
    }));
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var fwcs = [];
    var fwcRendered = [];
    var fwc_video_arr = [];
    var img_normal_arr = [];

    for (var i = 0; i < 3; i++) {
        AD_CONFIG['fwc']['lists'][i]['material_name'] = 'ec-volvo'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
        AD_CONFIG['fwc']['lists'][i]['id'] = i + 1;
        var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']['lists'][i]);
        var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc']['lists'][i]);
        var ImageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal_fwc']['lists'][i]);
        img_normal_arr.push(ImageNormal);
        fwc_video_arr.push(fwcVideo);
        fwc.setWidgets([fwcVideo, ImageNormal]);
        fwcs.push(fwc);
    }
    window['_mkt'] = window['_mkt'] || [];

    material.setWidgets(
        [leftVideo, smallHead], [new ad.widget.ImageCartoon(AD_CONFIG['image_cartoon'])], [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        fwcs
    );
    if (async === true) {
        return material;
    }
    material.show();

    baidu.array.each(fwcs, function(item, i) {
        item.addListener(ui.events.CLOSE, function(index) {
            window['_mkt'].push(['_stopTimer', index]);
            hideFWC();
        });
    });

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        leftVideo.pause();
        showFWC(index + 1);
        smallHead.sendLog("float" + (index + 1) + "open");
        smallHead.sendLog('float' + (index + 1) + 'videostart');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('videostart');
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(1);
        leftVideo.pause();
        window['_mkt'].push(['_pauseTimer', 1]);
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('float1video1start');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        leftVideo.sendLog('videopause');
        //左侧视频暂停播放精算计时$
        window['_mkt'].push(['_pauseTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        leftVideo.sendLog('videocontinue');
        //左侧视频继续播放精算计时$
        window['_mkt'].push(['_continueTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('videocomplete');
        window['_mkt'].push(['_stopTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_AUTO, function() {
        leftVideo.sendLog('video1auto');
        //左侧视频自动开始播放精算计时$
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    /*
     * FIXME(user) rewriteTitle2
    baidu.array.each(img_normal_arr, function(item, i) {
        item.rewriteTitle2(item.getRoot(), '浮层' + (i + 1), false);
    });
    */

    baidu.array.each(fwc_video_arr, function(item, i) {
        item.addListener(ui.events.VIDEO_START, function() {
            item.sendLog('float' + (i + 1) + 'videostart');
            window['_mkt'].push(['_startTimer', 2]);
            return false;
        });
        item.addListener(ui.events.VIDEO_CLICK, function() {
            item.sendLog('float' + (i + 1) + 'videojump');
            //在ipad下手动跳转
            if (item._data['is_ipad']) {
                item.redirect();
            }
            return false;
        });
        item.addListener(ui.events.VIDEO_PAUSE, function() {
            item.sendLog('float' + (i + 1) + 'videopause');
            //左侧视频暂停播放精算计时$
            window['_mkt'].push(['_pauseTimer', 2]);
            return false;
        });

        item.addListener(ui.events.VIDEO_CONTINUE, function() {
            item.sendLog('float' + (i + 1) + 'videocontinue');
            //左侧视频继续播放精算计时$
            window['_mkt'].push(['_continueTimer', 2]);
            return false;
        });
        item.addListener(ui.events.VIDEO_FINISH, function() {
            item.sendLog('float' + (i + 1) + 'videocomplete');
            window['_mkt'].push(['_stopTimer', 2]);
            return false;
        });
        item.addListener(ui.events.VIDEO_AUTO, function() {
            item.sendLog('float' + (i + 1) + 'videoauto');
            //左侧视频自动开始播放精算计时$
            window['_mkt'].push(['_startTimer', 2]);
            return false;
        });
    });


    /**
     * 显示对应的视频浮层
     */

    function showFWC(index) {
        hideFWC();
        if (!fwcs || !fwcs[index - 1])
            return;
        //重绘浮层视频
        if (fwc_video_arr && fwc_video_arr[index - 1]) {
            ad.base.setTimeout(function() {
                fwc_video_arr[index - 1].refresh(null, AD_CONFIG['video_fwc'][index - 1]);
            }, 10);
            fwcs[index - 1].show();
            if (!fwcRendered[index - 1]) {
                var canvas = baidu.dom.first(fwcs[index - 1].getRoot());
                if (canvas && canvas.id) {
                    material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                    fwcRendered[index - 1] = true;
                }
            }
        }
    }
    /**
     * 隐藏视频浮层
     */

    function hideFWC() {
        baidu.array.each(fwcs, function(item, i) {
            item.hide();
        });
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */