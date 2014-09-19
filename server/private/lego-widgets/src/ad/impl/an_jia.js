/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/an_jia.js ~ 2013/07/15 10:50:37
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * an_jia相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.Image');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageNormal');

goog.include('ad/impl/an_jia.less');

goog.provide('ad.impl.AnJia');

ad.Debug(function(async){
    AD_CONFIG['fwc']['material_name'] = 'ec-an-jia';
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.DefaultRender());
    var main_image = new ad.widget.Image(AD_CONFIG['main_image']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group'])
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc'][0]);
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var lastFWCVideoIndex;
    var cover;

    // window['_mkt'] = window['_mkt'] || [];

    fwc.setWidgets([fwcVideo, imageNormal]);
    material.setWidgets(
        [main_image, smallHead],
        [section],
        [buttonGroup],
        [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) 初始化浮层监测
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    //事件
    main_image.addListener(ui.events.CLICK, function(){
        showFWC(0);
        main_image.sendLog('float1open');
        return false;
    });

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        if(2 == index) {
            return true;
        }
        showFWC(index + 1);
        smallHead.sendLog("float1open");
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function(index) {
        //浮层视频关闭精算计时$
        // window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        hideFWC();
    });

    fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'start');
        //浮层视频开始播放精算计时$
        // window['_mkt'].push(['_startTimer', lastFWCVideoIndex + 2]);
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'jump');
        //在ipad下手动跳转
        if(fwcVideo._data['is_ipad']){
            fwcVideo.redirect();
        }
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'pause');
        //浮层视频暂停播放精算计时$
        // window['_mkt'].push(['_pauseTimer', lastFWCVideoIndex + 2]);
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'continue');
        //浮层视频继续播放精算计时$
        // window['_mkt'].push(['_continueTimer', lastFWCVideoIndex + 2]);
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'complete');
        //浮层视频停止播放精算计时$
        // window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        return false;
    });

    fwcVideo.addListener(ui.events.VIDEO_AUTO, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'auto');
        //浮层视频自动开始播放精算计时$
        // window['_mkt'].push(['_startTimer', lastFWCVideoIndex + 2]);
        return false;
    });


    imageNormal.addListener(ui.events.CLICK, function(index, e) {
        var oTar = baidu.event.getTarget(e);
        if(oTar.nodeType == '1') {
            if(oTar.nodeName.toLowerCase() == 'img') {
                this.sendLog('float1Button' + (index + 1) + 'imgclick');
            }
            else if(oTar.nodeName.toLowerCase() == 'span') {
                this.sendLog('float1Button' + (index + 1) + 'textclick');
            }
        }
        setCover(index);
        // window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        fwcVideo.refresh(null, AD_CONFIG['video_fwc'][index]);
        lastFWCVideoIndex = index;
        return false;
    });

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        if(!fwc) {
            return;
        }
        //重绘浮层视频
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null, AD_CONFIG['video_fwc'][index]);
            }, 10);
            fwc.show();
        }
        arr_links = imageNormal.getRoot().getElementsByTagName('a');
        setCover(index);
        lastFWCVideoIndex = index;
    }

    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        fwc.hide();
        lastFWCVideoIndex = -1;
    }

    var arr_links;
    function setCover(index) {
        if(!cover) {
            cover = baidu.dom.create('div', {'class': 'ec-cover'});
            cover.innerHTML = '播放中';
        }
        var link = arr_links[index];
        if(link) {
            link.appendChild(cover);
        }
    }
});
