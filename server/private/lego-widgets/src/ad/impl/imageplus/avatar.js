/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/imageplus/avatar.js ~ 2014/05/23 22:39:34
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * avatar相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ui.events');
goog.require('ad.material.ImageplusMaterial');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.widget.imageplus.avatar.TabToggler');
goog.require('ad.widget.imageplus.avatar.TabContainer');
goog.require('ad.widget.imageplus.avatar.TabContent');
goog.require('ad.widget.imageplus.avatar.VideoEntry');
goog.require('ad.widget.imageplus.avatar.BrandMarker');
goog.require('ad.widget.Video');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.BaiduShareV2');
goog.require('ad.plugin.imageplus.Log');
goog.require('ad.plugin.Hmt');

goog.include('ad/impl/imageplus/avatar.less');

goog.provide('ad.impl.imageplus.Avatar');

ad.Debug(function(async){
    var material = new ad.material.ImageplusMaterial();
    var AD_CONFIG_FIXED = baidu.json.parse(AD_CONFIG["desc"]);
    material['adConfig'] = AD_CONFIG;
    AD_CONFIG_FIXED["tab"]["hmid"] = AD_CONFIG_FIXED["hmid"];
    ad.base.extend(RT_CONFIG, {
        'pluginParam': {
            'ad.plugin.Hmt': {
                'hmjs_id': AD_CONFIG_FIXED["hmid"]
            }
        }
    }, true);

    var wTabContainer = new ad.widget.imageplus.avatar.TabContainer(AD_CONFIG_FIXED["tab"]);
    var tabData = AD_CONFIG_FIXED["tab_cnt"];
    var tabs = [];
    for (var i = 0, len = tabData.length;i < len;i++) {
        tabs.push(new ad.widget.imageplus.avatar.TabContent(tabData[i]));
    }
    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi;
    wTabContainer.setWidgets(tabs);
    if (COMPILED) {
        loaderApi = AD_CONFIG['api'];
        AD_CONFIG_FIXED["toggler"]["is_collapsed"] = loaderApi.getShareData('is_collapsed', true);
    }
    var wTabToggler = new ad.widget.imageplus.avatar.TabToggler(AD_CONFIG_FIXED["toggler"]);
    var wVideoEntry = new ad.widget.imageplus.avatar.VideoEntry(AD_CONFIG_FIXED["video_entry"]);
    var wBrandMarker = new ad.widget.imageplus.avatar.BrandMarker({});
    material.setWidgets(
        [
            wTabContainer,
            wVideoEntry
        ],
        wTabToggler,
        wBrandMarker
    );
    material.show();

    if (AD_CONFIG_FIXED["toggler"]["is_collapsed"]) {
        baidu.hide(wTabContainer.getId());
        baidu.hide(wVideoEntry.getId());
    }
    function getImgRect() {
        var imgInfo;
        if (COMPILED) {
            imgInfo = loaderApi.getImgRect();
        }
        else {
            imgInfo = {"width": 3, "height": 3, "left": 0, "top": 0};
        }
        imgInfo["width"] = Math.max(imgInfo["width"], 560);
        imgInfo["height"] = Math.max(imgInfo["height"], 460);
        return imgInfo;
    }

    baidu.dom.setStyle(material.getRoot(), 'margin', '30px 0 0 20px');
    wTabToggler.addListener(ui.events.CLICK, function (nowCollapsed) {
        if (COMPILED) {
            loaderApi.setShareData("is_collapsed", nowCollapsed, true);
        }
        if (nowCollapsed) {
            baidu.hide(wTabContainer.getId());
            baidu.hide(wVideoEntry.getId());
            material.trigger(ui.events.SEND_LOG, 9, AD_CONFIG_FIXED['hmid'] + '/' + '收缩点击');
        }
        else {
            baidu.show(wTabContainer.getId());
            baidu.show(wVideoEntry.getId());
            material.trigger(ui.events.SEND_LOG, 9, AD_CONFIG_FIXED['hmid'] + '/' + '展开点击');
        }
    });

    wVideoEntry.addListener(ui.events.CLICK, function (){
        material.trigger(ui.events.SEND_LOG, 9, AD_CONFIG_FIXED['hmid'] + '/' + '观看视频');
        showFWC();
    });

    var fwcVideo = new ad.widget.Video(AD_CONFIG_FIXED['video_info']['options'][0]);
    var datasource = {'options': []};
    var thumbItem;
    for (var i = 0;i < AD_CONFIG_FIXED['video_info']['options'].length;i++) {
        thumbItem = AD_CONFIG_FIXED['video_info']['options'][i];
        datasource['options'].push({
            'img_url': thumbItem['thumbnail_img_url'],
            'text': thumbItem['thumbnail_text'],
            'display_play_button': true
        });
        ad.base.extend(thumbItem, {
            'width': 540,
            'height': 304,
            'is_play': true,
            'player_ver': 7,
            'ipad_img': thumbItem["img_url"]
        });
    }
    var multiVideoThumbnail = new ad.widget.MultiVideoThunbnail(datasource);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG_FIXED['video_info']);
    var wShare = new ad.widget.BaiduShareV2(AD_CONFIG_FIXED['share']);
    fwc.setWidgets(fwcVideo, multiVideoThumbnail, wShare);
    
    var lastFWCVideoIndex = -1;
    multiVideoThumbnail.addListener(ui.events.CLICK, function(index){
        material.trigger(ui.events.SEND_LOG, 9, AD_CONFIG_FIXED['hmid'] + '/视频缩略图' + (index + 1) + '点击');
        fwcVideo.refresh(null, AD_CONFIG_FIXED['video_info']['options'][index]);
        lastFWCVideoIndex = index + 1;
    });
    fwc.addListener(ui.events.CLOSE, function() {
        hideFWC();
        material.trigger(ui.events.SEND_LOG, 9, AD_CONFIG_FIXED['hmid'] + '/' + '浮层关闭');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function(){
        material.trigger(ui.events.SEND_LOG, 9, AD_CONFIG_FIXED['hmid'] + '/视频' + lastFWCVideoIndex + '播放');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
        material.trigger(ui.events.SEND_LOG, 9, AD_CONFIG_FIXED['hmid'] + '/视频' + lastFWCVideoIndex + '跳转');
        return false;
    });
    var fwcRenderd = false;
    /**
     * 显示视频浮层
     */
    function showFWC() {
        if (!fwcRenderd) {
            var nowImgInfo = getImgRect();
            ad.base.extend(AD_CONFIG_FIXED['video_info'], {
                'material_name': 'ec-avatar',
                'width': nowImgInfo["width"],
                'height': nowImgInfo["height"],
                'left': nowImgInfo["left"],
                'top': nowImgInfo["top"]
            }, true);
            fwc.setData(AD_CONFIG_FIXED['video_info']);
            fwc.show();
            var popupCtn = baidu.q('ec-cont', fwc.getRoot())[0];
            baidu.dom.setStyles(popupCtn, {
                'left': (nowImgInfo["width"] - 540)/2 + 'px',
                'top': (nowImgInfo["height"] - 440)/2 + 'px'
            });

            wShare.addListener(ui.events.SEND_LOG, function (logInfo) {
                material.trigger(ui.events.SEND_LOG, 9, AD_CONFIG_FIXED['hmid'] + '/' + logInfo.action);
            });
            fwcRenderd = true;
        }
        else {
            fwc.show();
        }
        if(multiVideoThumbnail) {
            multiVideoThumbnail.refresh();
        }
        multiVideoThumbnail.setPlayStatus(0);
        if(fwcVideo) {
            fwcVideo.refresh(null, AD_CONFIG_FIXED['video_info']['options'][0]);
        }
        lastFWCVideoIndex = 1;
    }
    
    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        multiVideoThumbnail.clearPlayStatus();
        fwc.hide();
    }

    baidu.on(material.getRoot(), 'mouseup', function (evt) {
        evt = evt || window.event;
        var targetElm = baidu.event.getTarget(evt);
        if (targetElm.tagName.toLowerCase() == 'img') {
            baidu.event.stopPropagation(evt);
        }
    });

    if (loaderApi) {
        loaderApi.addListener(ui.events.RELEASE, function () {
            material.dispose();
            fwc.dispose();
            var wxQr = baidu.q('bd_weixin_popup', document.body);
            var wxIframe = baidu.q('bd_weixin_popup_bg', document.body);
            wxQr = wxQr.concat(wxIframe);
            baidu.array.forEach(wxQr, function (elm) {
                baidu.hide(elm);
            });
        });
    }
    ad.base.exportPath('ecma.material', material);
    ad.base.exportPath('ecma.fwc', fwc);
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
