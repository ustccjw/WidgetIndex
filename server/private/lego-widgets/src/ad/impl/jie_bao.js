/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/jie_bao.js ~ 2013/11/05 15:34:50
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * jie_bao相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/jie_bao.less');

goog.provide('ad.impl.JieBao');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-jie-bao'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    var tabCont = new ad.widget.TabCont(AD_CONFIG['tab2_cont']);
    var widgetsArr = [iframe, tabCont];
    // 整理素材库spec数据
    AD_CONFIG['tabs']['options'] = [];
    AD_CONFIG['tabs']['options'][0] = {
        "tab_title": AD_CONFIG['iframe']['tab_title']
    };
    AD_CONFIG['tabs']['options'][1] = {
        "tab_title": AD_CONFIG['tab2_cont']['tab_title']
    };
    var imgCartoon;
    for (var i = 0; i < AD_CONFIG['img_groups']['options'].length; i++) {
        AD_CONFIG['tabs']['options'].push({
            "tab_title": AD_CONFIG['img_groups']['options'][i]['tab_title']
        });
        imgCartoon =  new ad.widget.ImageCartoon(AD_CONFIG['img_groups']['options'][i]);
        widgetsArr.push(imgCartoon);
    };
    var tabs = new ad.widget.TabContainer(AD_CONFIG['tabs']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    // 整理素材库spec数据
    AD_CONFIG['img_normal']['options'] = [];
    AD_CONFIG['fwc_video'] = [];
    for (var i = 0; i < AD_CONFIG['fwc_cont']['options'].length; i++) {
        AD_CONFIG['img_normal']['options'].push(AD_CONFIG['fwc_cont']['options'][i]['image']);
        AD_CONFIG['fwc_video'].push(AD_CONFIG['fwc_cont']['options'][i]['video']);
    };
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc_video'][0]);
    var imgNormal = new ad.widget.ImageNormal(AD_CONFIG['img_normal']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
    var defaultVideoIndex = AD_CONFIG['fwc']['default_video_index'];
    var lastFWCVideoIndex;
    var cover;
    var fwcOpened = false;

    tabs.setWidgets(widgetsArr);
    fwc.setWidgets([fwcVideo, imgNormal]);

    material.setWidgets(
        [leftVideo, smallHead], [tabs], [buttons], [fwc]
    );

    if (async === true) {
        return material;
    }

    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
    // material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
    var index;
    smallHead.addListener(ui.events.CLICK, function(index, me) {
        index = defaultVideoIndex || (index + 2);
        showFWC(index - 1);
        smallHead.sendLog("float1open");
        smallHead.sendLog('float1video' + index + 'start');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        index = defaultVideoIndex || 1;
        showFWC(index - 1);
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('float1video' + index + 'start');
        return false;
    });


    fwc.addListener(ui.events.CLOSE, function(index) {
        fwc.sendLog('float1close');
        hideFWC();
    });

    fwcVideo.addListener(ui.events.VIDEO_AUTO, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'auto');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'pause');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'jump');
        //在ipad下手动跳转
        if (fwcVideo._data['is_ipad']) {
            fwcVideo.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'complete');
        return false;
    });

    imgNormal.addListener(ui.events.CLICK, function(index, e) {
        var oTarget = baidu.event.getTarget(e);
        if (oTarget.nodeType == '1') {
            if (oTarget.nodeName.toLowerCase() == 'img') {
                this.sendLog('float1Button' + (index + 1) + 'imgclick');
            } else if (oTarget.nodeName.toLowerCase() == 'span') {
                this.sendLog('float1Button' + (index + 1) + 'textclick');
            }
        }
        setCover(index);
        fwcVideo.refresh(null, AD_CONFIG['fwc_video'][index]);
        lastFWCVideoIndex = index;
        return false;
    });

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if (lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        if (!fwc)
            return;
        //重绘浮层视频
        if (fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null, AD_CONFIG['fwc_video'][index]);
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
        arrLinks = imgNormal.getRoot().getElementsByTagName('a');
        setCover(index);
        lastFWCVideoIndex = index;
    }

    function hideFWC() {
        if (fwcVideo) {
            fwcVideo.clearRoot();
        }
        fwc.hide();
        lastFWCVideoIndex = -1;
    }

    var arrLinks;

    function setCover(index) {
        if (!cover) {
            cover = baidu.dom.create('div', {
                'class': 'ec-cover'
            });
            cover.innerHTML = '播放中';
        }
        var link = arrLinks[index];
        if (link) {
            link.appendChild(cover);
        } else {
            arrLinks[0].appendChild(cover);
        }
    }

});