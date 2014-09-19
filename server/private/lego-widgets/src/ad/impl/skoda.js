/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: skoda.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/skoda.js ~ 2012/09/27 14:17:21
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Video');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/skoda.less');

goog.provide('ad.impl.Skoda');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender({
        'block_class': 'ad-block'
    }));
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['tab_drive']);
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arr_tab_cont = [];
    var arr_fwc = [];
    var fwcRendered = [];
    var arr_video_fwc = [];
    var arr_small_img = [];
    var current_fwc_index = -1;
    var current_video_index = 1;
    var cover;
    window['_mkt'] = window['_mkt'] || [];

    if (AD_CONFIG['tab_cont']['content'] && AD_CONFIG['tab_cont']['content'].length) {
        for (var i = 0, len = AD_CONFIG['tab_cont']['content'].length; i < len; i++) {
            arr_tab_cont.push(new ad.widget.TabCont(AD_CONFIG['tab_cont']['content'][i]));
        }
    }
    arr_tab_cont.unshift(iframe);
    tab_container.setWidgets(arr_tab_cont);

    if (AD_CONFIG['fwc_cont']['options'] && AD_CONFIG['fwc_cont']['options'].length) {
        for (var i = 0, len = AD_CONFIG['fwc_cont']['options'].length; i < len; i++) {
            AD_CONFIG['fwc']['options'][i]['id'] = i + 1;
            AD_CONFIG['fwc']['options'][i]['material_name'] = 'ec-skoda';
            var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']['options'][i]);
            var video_fwc = new ad.widget.Video(AD_CONFIG['fwc_cont']['options'][i]['cont']['options'][0]['video']);
            arr_video_fwc.push(video_fwc);
            var smallImage = new ad.widget.ImageNormal(AD_CONFIG['fwc_cont']['options'][i]['cont']);
            arr_small_img.push(smallImage);
            fwc.setWidgets([video_fwc, smallImage]);
            arr_fwc.push(fwc);
        }
    }

    material.setWidgets(
        [leftVideo, smallHead], [tab_container], [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        arr_fwc
    );
    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
    // 百度精算监测
    // material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    baidu.array.each(arr_fwc, function(item, index) {
        // FIXME(user) 初始化浮层监测
        /*
        material.getCMS().init(
            baidu.getAttr(baidu.dom.first(item.getRoot()), 'id')
        );
        //*/

        item.addListener(ui.events.CLOSE, function() {
            hideFWC();
        });
    });

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('videostart');
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        window['_mkt'].push(['_pauseTimer', 1]);
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('float1videostart');
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
        leftVideo.sendLog('videoauto');
        //左侧视频自动开始播放精算计时$
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        showFWC(index + 1);
        smallHead.sendLog("float" + (index + 2) + "open");
        return false;
    });
    baidu.array.each(arr_video_fwc, function(item, index) {
        item.addListener(ui.events.VIDEO_START, function() {
            item.sendLog('float' + (index + 1) + 'video' + current_video_index + 'start');
            window['_mkt'].push(['_startTimer', 2 + index]);
            return false;
        });

        item.addListener(ui.events.VIDEO_CLICK, function() {
            window['_mkt'].push(['_pauseTimer', 2 + index]);
            item.sendLog('float' + (index + 1) + 'video' + current_video_index + 'jump');
            return false;
        });
        item.addListener(ui.events.VIDEO_PAUSE, function() {
            item.sendLog('float' + (index + 1) + 'video' + current_video_index + 'pause');
            //左侧视频暂停播放精算计时$
            window['_mkt'].push(['_pauseTimer', 2 + index]);
            return false;
        });
        item.addListener(ui.events.VIDEO_CONTINUE, function() {
            item.sendLog('float' + (index + 1) + 'video' + current_video_index + 'continue');
            //左侧视频继续播放精算计时$
            window['_mkt'].push(['_continueTimer', 2 + index]);
            return false;
        });
        item.addListener(ui.events.VIDEO_FINISH, function() {
            item.sendLog('float' + (index + 1) + 'video' + current_video_index + 'complete');
            window['_mkt'].push(['_stopTimer', 2 + index]);
            return false;
        });
        item.addListener(ui.events.VIDEO_AUTO, function() {
            item.sendLog('float' + (index + 1) + 'video' + current_video_index + 'auto');
            //左侧视频自动开始播放精算计时$
            window['_mkt'].push(['_startTimer', 2 + index]);
            return false;
        });
    });
    baidu.array.each(arr_small_img, function(item, i) {
        item.addListener(ui.events.CLICK, function(index, e) {
            var oTarget = baidu.event.getTarget(e);
            if (oTarget.nodeType == '1') {
                if (oTarget.nodeName.toLowerCase() == 'img') {
                    this.sendLog('float' + (i + 1) + 'Button' + (index + 1) + 'imgclick');
                } else if (oTarget.nodeName.toLowerCase() == 'span') {
                    this.sendLog('float' + (i + 1) + 'Button' + (index + 1) + 'textclick');
                }
            }
            setCover(this, index);
            window['_mkt'].push(['_stopTimer', 6 * i + index]);
            current_video_index = index + 1;
            arr_video_fwc[i].refresh(null, AD_CONFIG['fwc_cont']['options'][i]['cont']['options'][index]['video']);
            return false;
        });
    });
    /**
     * 显示对应的视频浮层
     * @param {number} index 浮层index
     */

    function showFWC(index) {
        hideFWC();
        if (!arr_fwc[index])
            return;
        //重绘浮层视频
        if (arr_video_fwc[index]) {
            ad.base.setTimeout(function() {
                arr_video_fwc[index].refresh(null, AD_CONFIG['fwc_cont']['options'][index]['cont']['options'][0]['video']);
            }, 10);
        }
        arr_fwc[index].show();
        setCover(arr_small_img[index], 0);
        current_fwc_index = index;
        
        if (!fwcRendered[index]) {
            var canvas = baidu.dom.first(arr_fwc[index].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRendered[index] = true;
            }
        }
    }
    /**
     * 隐藏视频浮层
     */

    function hideFWC() {
        baidu.array.each(arr_fwc, function(item, index) {
            item.hide();
        });
        if (arr_video_fwc[current_fwc_index]) {
            arr_video_fwc[current_fwc_index].clearRoot();
        }
        current_fwc_index = -1;
        current_video_index = 1;
    }

    function setCover(image_normal, index) {
        if (!cover) {
            cover = baidu.dom.create('div', {
                'class': 'ec-cover'
            });
            cover.innerHTML = '播放中';
        }
        var link = image_normal.getRoot().getElementsByTagName('a')[index];
        if (link) {
            link.appendChild(cover);
        }
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */