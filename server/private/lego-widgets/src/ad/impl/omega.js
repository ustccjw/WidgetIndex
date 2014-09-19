/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: omega.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/omega.js ~ 2012/09/27 14:17:21
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Title');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/omega.less');

goog.provide('ad.impl.Omega');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-omega'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = "video";
    AD_CONFIG['fwc_flash']['material_name'] = 'ec-omega';
    AD_CONFIG['fwc_flash']['id'] = "flash";
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender({
        'block_class': 'ad-block'
    }));
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcFlash = [];
    var fwcRendered = [];
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arr_tab_cont = [];
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc']);
    var ImageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var lastFWCIndex;

    window['_mkt'] = window['_mkt'] || []; //精算用于收集计时器的数组，用于统计视频播放时长

    fwc.setWidgets([fwcVideo]);
    if (AD_CONFIG['flash'] && AD_CONFIG['flash']['options'] && AD_CONFIG['flash']['options'].length) {
        var flashCount = AD_CONFIG['flash']['options'].length;
        for (var i = 0; i < flashCount; i++) {
            var fwcflash = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc_flash']);
            fwcflash.setWidgets([
                new ad.widget.Flash(AD_CONFIG['flash']['options'][i])
            ]);
            fwcFlash.push(fwcflash);
        }
    }
    if (AD_CONFIG['tab']['options'] && AD_CONFIG['tab']['options'].length) {
        for (var i = 0, len = AD_CONFIG['tab']['options'].length; i < len; i++) {
            arr_tab_cont.push(new ad.widget.TabCont(AD_CONFIG['tab']['options'][i]['cont']));
        }
    }
    tab_container.setWidgets(arr_tab_cont);

    material.setWidgets(
        [new ad.widget.Title(AD_CONFIG['head_title'])], [leftVideo, smallHead], [tab_container], [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])], [fwc],
        fwcFlash
    );

    if (async === true) {
        return material;
    }

    material.show();

    // material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) 初始化浮层监测
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
    /*
    if(fwcFlash && fwcFlash.length) {
        baidu.array.each(fwcFlash, function(item, i){
            material.getCMS().init(baidu.getAttr(baidu.dom.first(item.getRoot()), 'id'));
        });
    }*/

    //百度精算监测
    // material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        //leftVideo.pause();
        showFWC(index + 2);
        smallHead.sendLog('float' + (index + 2) + 'open');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('video1start');
        //左侧视频开始播放精算计时
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(1);
        leftVideo.pause();
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('floatvideostart');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('video1complete');
        //左侧视频完整播放精算计时
        window['_mkt'].push(['_stopTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        leftVideo.sendLog('video1pause');
        //左侧视频暂停播放精算计时
        window['_mkt'].push(['_pauseTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        leftVideo.sendLog('video1continue');
        //左侧视频继续播放精算计时
        window['_mkt'].push(['_continueTimer', 1]);
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_AUTO, function() {
        leftVideo.sendLog('video1auto');
        //左侧视频自动开始播放精算计时
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function(index) {
        window['_mkt'].push(['_stopTimer', 2]);
        hideFWC(1);
    });
    if (fwcFlash && fwcFlash.length) {
        baidu.array.each(fwcFlash, function(item, i) {
            item.addListener(ui.events.CLOSE, function() {
                hideFWC(i + 2);
            });
        });
    }
    fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('float1videostart');
        window['_mkt'].push(['_startTimer', 2]);
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
        fwcVideo.sendLog('float1videojump');
        //在ipad下手动跳转
        if (fwcVideo._data['is_ipad']) {
            fwcVideo.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('float1videocomplete');
        window['_mkt'].push(['_stopTimer', 2]);
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        fwcVideo.sendLog('float1videopause');
        window['_mkt'].push(['_pauseTimer', 2]);
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        fwcVideo.sendLog('float1videocontinue');
        window['_mkt'].push(['_continueTimer', 2]);
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_AUTO, function() {
        fwcVideo.sendLog('float1videoauto');
        window['_mkt'].push(['_startTimer', 2]);
        return false;
    });

    /**
     * 获取对应索引的浮层实例
     * @param {number} index 索引.
     * @return {Object} 对应的浮层实例.
     */

    function getFWCByIndex(index) {
        if (index <= 0) {
            return null;
        } else {
            if (index == 1) {
                return fwc;
            } else {
                return fwcFlash[index - 2];
            }
        }
    }

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */

    function showFWC(index) {
        if (lastFWCIndex == index) {
            return;
        }
        hideFWC(lastFWCIndex);
        var targetFWC = getFWCByIndex(index);
        if (!targetFWC)
            return;
        if (index == 1) {
            //重绘浮层视频
            if (fwcVideo) {
                ad.base.setTimeout(function() {
                    fwcVideo.refresh();
                }, 10);
                targetFWC.show();
            }
        } else {
            targetFWC.show();
        }
        //trigger NEW_AD_CANVAS
        if (!fwcRendered[index]) {
            var canvas = baidu.dom.first(targetFWC.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRendered[index] = true;
            }
        }
        lastFWCIndex = index;
    }

    /**
     * 隐藏对应的浮层
     * @param {number} index 索引.
     */

    function hideFWC(index) {
        var targetFWC = getFWCByIndex(index);
        if (!targetFWC)
            return;
        if (index == 1) {
            if (fwcVideo) {
                fwcVideo.clearRoot();
            }
        }
        targetFWC.hide();
        lastFWCIndex = -1;
    }

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */