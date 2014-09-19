/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: sprite.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/sprite.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Video');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.Title');
goog.require('ad.widget.Map');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ui.events');
goog.include('ad/impl/sprite.less');

goog.provide('ad.impl.Sprite');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    AD_CONFIG['fwc']['material_name'] = 'ec-sprite';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc_videos'][0]);
    var ImageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var tape = new ad.widget.ImageCartoon(AD_CONFIG['tape']);
    var map = new ad.widget.Map(AD_CONFIG['activebody']);
    var currentVideoIndex = 0;
    var lastFWCVideoIndex;
    var cover;

    fwc.setWidgets([fwcVideo,ImageNormal]);
    material.setWidgets(
        [
            leftVideo,
            [
                new ad.widget.SmallHead(AD_CONFIG['head']),
                tape
            ]
        ],
        [new ad.widget.Title(AD_CONFIG['activehead'])],
        [map],
        [new ad.widget.ButtonGroup(AD_CONFIG['bottons'])],
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
    ImageNormal.addListener(ui.events.CLICK, function(index,e) {
        var oTarget = baidu.event.getTarget(e);
        if(oTarget.nodeType == '1') {
            if(oTarget.nodeName.toLowerCase() == 'img') {
                this.sendLog('floatButton' + (index + 1) + 'imgclick');
            }
            else if(oTarget.nodeName.toLowerCase() == 'span') {
                this.sendLog('floatButton' + (index + 1) + 'textclick');
            }
        }
        setCover(index);
        fwcVideo.refresh(null,AD_CONFIG['fwc_videos'][index]);
        lastFWCVideoIndex = index;
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('video1start');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        currentVideoIndex = 1;
        showFWC(currentVideoIndex);
        leftVideo.pause();
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('video1click');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('video1complete');
        return false;
    });
    fwc.addListener(ui.events.CLOSE, function(index) {
        hideFWC();
     });
     fwcVideo.addListener(ui.events.VIDEO_START, function() {
        fwcVideo.sendLog('floatvideo' + (lastFWCVideoIndex + 1) + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function() {
        fwcVideo.sendLog('floatvideo' + (lastFWCVideoIndex + 1) + 'jump');
        //在ipad下手动跳转
        if(fwcVideo._data['is_ipad']){
            fwcVideo.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('floatvideo' + (lastFWCVideoIndex + 1) + 'complete');
        return false;
    });

    tape.addListener(ui.events.CLICK, function(index){
        currentVideoIndex = index;
        showFWC(currentVideoIndex);
        leftVideo.pause();
        tape.sendLog('float1open');
        tape.sendLog('floatvideo' + (currentVideoIndex + 1) + 'start', 'floatvideo' + (currentVideoIndex + 1) + 'start');
        return false;
    });
    map.addListener(ui.events.MAP_CLICK, function(index) {
        map.sendLog('link' + (index + 1) + 'click', 'link' + (index + 1) + 'click');
        return false;
    });

    var arrLinks;
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
    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        if(!fwc)
            return;
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null,AD_CONFIG['fwc_videos'][index]);
            },10);
            fwc.show();
        }
        arrLinks = ImageNormal.getRoot().getElementsByTagName('a');
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
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
