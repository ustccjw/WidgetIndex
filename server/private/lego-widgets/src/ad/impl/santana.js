/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/santana.js ~ 2013/09/17 18:17:38
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * santana相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/santana.less');

goog.provide('ad.impl.Santana');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));

    var lastFWCVideoIndex;
    var cover;
    var initedFWCLog = false;
    var fwcOpened = false;
    window['_mkt'] = window['_mkt'] || [];

    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    
    var defaultVideoIndex = parseInt(AD_CONFIG['fwc']['default_video_index'], 10);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc']['options'][defaultVideoIndex || 0]);
    var datasource = {'width': 100, 'height': 50, 'options': []};
    for (var i = 0; i < AD_CONFIG['video_fwc']['options'].length; i ++) {
        var item = AD_CONFIG['video_fwc']['options'][i];
        datasource['options'].push({
            'img_url': item['thumbnail_img_url'],
            'text': item['thumbnail_text']
        });
    }
    var ImageNormal = new ad.widget.ImageNormal(datasource);
    AD_CONFIG['fwc']['material_name'] = 'ec-santana'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    AD_CONFIG['fwc']['display_bg_iframe'] = true;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, ImageNormal]);
    
    // 准备Tab的内容.
    var arrTabCont = [];
    var iframe = new ad.widget.Iframe(AD_CONFIG['tab_form']);
    arrTabCont.push(iframe);
    var options = ad.base.getObjectByName('tab.options', AD_CONFIG);
    if (options && options.length) {
        for (var i = 0; i < options.length; i ++) {
            arrTabCont.push(new ad.widget.TabCont(options[i]));
        }
    }

    // FIXME(user)
    AD_CONFIG['tab']['options'].unshift({'tab_title': '预约试驾'});
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tabContainer.setWidgets(arrTabCont);
    
    material.setWidgets(
        [leftVideo, smallHead],
        [tabContainer],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        [fwc]
    );

    if (async === true) {
        return material;
    }
    material.show();
    
    smallHead.addListener(ui.events.CLICK, function(index, me) {
        leftVideo.pause();
        showFWC(index + 1);
        smallHead.sendLog("float1open");
        return false;
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
    fwc.addListener(ui.events.CLOSE, function(index) {
        window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
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
        if(fwcVideo._data['is_ipad']) {
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

    function initCoverLog() {
        ImageNormal.addListener(ui.events.CLICK, function(index, e) {
            var oTarget = baidu.event.getTarget(e);
            if(oTarget.nodeType == '1') {
                if(oTarget.nodeName.toLowerCase() == 'img') {
                    ImageNormal.sendLog('float1Button' + (index + 1) + 'imgclick');
                }
                else if(oTarget.nodeName.toLowerCase() == 'span') {
                    ImageNormal.sendLog('float1Button' + (index + 1) + 'textclick');
                }
            }
            setCover(index);
            window['_mkt'].push(['_stopTimer', lastFWCVideoIndex + 2]);
            fwcVideo.refresh(null, AD_CONFIG['video_fwc']['options'][index]);
            lastFWCVideoIndex = index;
            return false;
        });
    }

    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(defaultVideoIndex) {
            index = defaultVideoIndex;
        }
        if(lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        if(!fwc)
            return;
        
        //重绘浮层视频
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null, AD_CONFIG['video_fwc']['options'][index]);
            }, 10);
            fwc.show();

            if (!fwcOpened) {
                fwcOpened = true;
                var canvas = baidu.dom.first(fwc.getRoot());
                if (canvas && canvas.id) {
                    material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                }
            }
        }

        if(!initedFWCLog) {
            //初始化浮层监测
            // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
            initCoverLog();
            initedFWCLog = true;
        }
        
        arrLinks = ImageNormal.getRoot().getElementsByTagName('a');
        setCover(index);
        lastFWCVideoIndex = index;
    }

    var arrLinks;

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

    function setCover(index) {
        if(!cover) {
            cover = baidu.dom.create('div', {'class': 'ec-cover'});
            cover.innerHTML = '播放中';
        }
        arrLinks = ImageNormal.getRoot().getElementsByTagName('a');
        var link = arrLinks[index];
        if(link) {
            link.appendChild(cover);
        }
    }

});
