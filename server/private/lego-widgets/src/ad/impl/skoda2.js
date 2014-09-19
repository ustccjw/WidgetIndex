/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: skoda2.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/skoda2.js ~ 2012/09/27 14:17:21
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
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/skoda2.less');

goog.provide('ad.impl.Skoda2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['tab_drive']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arrTabCont = [];
    var arrFwc = [];
    var arrBigImg = [];
    var arrSmallImg = [];
    var fwcRendedIdMap = [];
    var currentFwcIindex = -1;
    window['_mkt'] = window['_mkt'] || [];

    if (AD_CONFIG['tab_cont'] && AD_CONFIG['tab_cont']['content'].length) {
        for (var i = 0, len = AD_CONFIG['tab_cont']['content'].length; i < len; i++) {
            arrTabCont.push(new ad.widget.TabCont(AD_CONFIG['tab_cont']['content'][i]));
        }
    }
    arrTabCont.push(iframe);
    tabContainer.setWidgets(arrTabCont);

    if (AD_CONFIG['fwc_cont'] && AD_CONFIG['fwc_cont']['content'].length) {
        for (var i = 0, len = AD_CONFIG['fwc_cont']['content'].length; i < len; i++) {
            AD_CONFIG['fwc']['id'] = i + 1;
            AD_CONFIG['fwc']['material_name'] = 'ec-skoda2';
            var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
            var bigImage = new ad.widget.ImageLink(AD_CONFIG['fwc_cont']['content'][i]['big_image']);
            arrBigImg.push(bigImage);
            var smallImage = new ad.widget.ImageNormal(AD_CONFIG['fwc_cont']['content'][i]['small_image']);
            arrSmallImg.push(smallImage);
            fwc.setWidgets([bigImage, smallImage]);
            arrFwc.push(fwc);
        }
    }

    material.setWidgets(
        [leftVideo, smallHead], [tabContainer], [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        arrFwc
    );
    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
    // 百度精算监测
    // material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    baidu.array.each(arrFwc, function(item, index) {
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
    /**
     * 显示对应的视频浮层
     * @param {number} index 浮层index
     */

    function showFWC(index) {
        hideFWC();
        if (!arrFwc[index])
            return;
        arrFwc[index].show();

        if (!fwcRendedIdMap[index]) {
            arrBigImg[index].rewriteTitle2(arrBigImg[index].getRoot(), '浮层' + (index + 1) + '大', false);
            arrSmallImg[index].rewriteTitle2(arrSmallImg[index].getRoot(), '浮层' + (index + 1), false);
            // material.getCMS().init(
            //     baidu.getAttr(baidu.dom.first(arrFwc[index].getRoot()), 'id')
            // );
            var canvas = baidu.dom.first(arrFwc[index].getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        }
        fwcRendedIdMap[index] = true;
        currentFwcIindex = index;
    }
    /**
     * 隐藏视频浮层
     */

    function hideFWC() {
        baidu.array.each(arrFwc, function(item, index) {
            item.hide();
        });
        currentFwcIindex = -1;
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */