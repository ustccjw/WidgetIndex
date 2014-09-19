/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: xuetielong.js 11222 2013-08-30 02:53:59Z dingguoliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/xuetielong.js ~ 2013/08/30 14:17:21
 * @author dingguoliang01@baidu.com (dingguoliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');
goog.include('ad/impl/xuetielong.less');

goog.provide('ad.impl.XueTieLong');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-xuetielong'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突

    if (AD_CONFIG['video_list']) { //spec中获取数据
        var videos = AD_CONFIG['video_list'];
        var len = videos.length;
        AD_CONFIG['image_normal'] = {'width': AD_CONFIG['thumb_width']};
        var thumbList = [], videoList = [];
        for (var i = 0;i < len;i++) {
            thumbList.push(videos[i]['video_thumb']);
            videoList.push(videos[i]['video_info']);
        }
        AD_CONFIG['video_fwc'] = videoList;
        AD_CONFIG['image_normal']['options'] = thumbList;
        delete AD_CONFIG['video_list'];
    }

    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);

    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arrTabCont = [];
    var iframe = new ad.widget.Iframe(AD_CONFIG['tab_form']);
    arrTabCont.push(iframe);
    // arrTabCont.push(new ad.widget.SmallWeibo(AD_CONFIG['tab_weibo']));
    if(AD_CONFIG['tab_cont'] && AD_CONFIG['tab_cont'].length) {
        for(var i = 0, len = AD_CONFIG['tab_cont'].length; i < len; i ++) {
            arrTabCont.push(new ad.widget.TabCont(AD_CONFIG['tab_cont'][i]));
        }
    }
    tabContainer.setWidgets(arrTabCont);

    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc'][0]);
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    fwc.setWidgets([fwcVideo, imageNormal]);

    material.setWidgets(
        [leftVideo, smallHead],
        tabContainer,
        new ad.widget.ButtonGroup(AD_CONFIG['button_group']),
        fwc
    );
    if (async === true) {
        return material;
    }

    material.show();

    var lastFWCVideoIndex;
    window['_mkt'] = window['_mkt'] || [];
    smallHead.addListener(ui.events.CLICK, function(index, me) {
        if(index < 2) {
            leftVideo.pause();
            showFWC(index + 1);
            smallHead.sendLog('float1open');
            smallHead.sendLog('float1video'+(index + 2) + 'start');
            return false;
        }
        return true;
     });
    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('video1start');
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        window['_mkt'].push(['_pauseTimer', 1]);
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('float1video1start');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        leftVideo.sendLog('video1pause');
        //左侧视频暂停播放精算计时$
        window['_mkt'].push(['_pauseTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        leftVideo.sendLog('video1continue');
        //左侧视频继续播放精算计时$
        window['_mkt'].push(['_continueTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('video1complete');
        window['_mkt'].push(['_stopTimer', 1]);
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_AUTO, function() {
        leftVideo.sendLog('video1auto');
        //左侧视频自动开始播放精算计时$
        window['_mkt'].push(['_startTimer', 1]);
        return false;
    });
    iframe.addListener(ui.events.CLICK, function(){
        iframe.sendLog('imgsrclink', 'imgsrclink');
        return true;
    });
    fwc.addListener(ui.events.CLOSE, function(index) {
        window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        fwc.sendLog('float1close');
        hideFWC();
     });
    fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'start');
        window['_mkt'].push(['_startTimer', lastFWCVideoIndex + 2]);
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
        //左侧视频暂停播放精算计时$
        window['_mkt'].push(['_pauseTimer', lastFWCVideoIndex + 2]);
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'continue');
        //左侧视频继续播放精算计时$
        window['_mkt'].push(['_continueTimer', lastFWCVideoIndex + 2]);
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'complete');
        window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'auto');
        //左侧视频自动开始播放精算计时$
        window['_mkt'].push(['_startTimer', lastFWCVideoIndex + 2]);
        return false;
    });
    imageNormal.addListener(ui.events.CLICK, function(index,e) {
        var oTarget = baidu.event.getTarget(e);
        if(oTarget.nodeType === '1') {
            if(oTarget.nodeName.toLowerCase() === 'img') {
                this.sendLog('float1Button' + (index + 1) + 'imgclick');
            }
            else if(oTarget.nodeName.toLowerCase() === 'span') {
                this.sendLog('float1Button' + (index + 1) + 'textclick');
            }
        }
        setCover(index);
        window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
        fwcVideo.refresh(null,AD_CONFIG['video_fwc'][index]);
        lastFWCVideoIndex = index;
        return false;
    });

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(lastFWCVideoIndex === index) {
            return;
        }
        hideFWC();
        if(!fwc) {
            return false;
        }
        //重绘浮层视频
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null,AD_CONFIG['video_fwc'][index]);
            },10);
            fwc.show();
        }
        arrLinks = imageNormal.getRoot().getElementsByTagName('a');
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

    var cover;
    var arrLinks;
    /**
     * 对给定索引的link设置遮罩
     * @param {number} index 索引.
     */
    function setCover(index) {
        if(!cover) {
            cover = baidu.dom.create('div',{'class':'ec-cover'});
            cover.innerHTML = '播放中';
        }
        var link = arrLinks[index];
        if(link) {
            link.appendChild(cover);
        }
    }
});




/* vim: set ts=4 sw=4 sts=4 tw=100: */
