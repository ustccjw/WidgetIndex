/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: encore2.js 11222 2013-05-27 11:15:12Z DestinyXie $
 *
 **************************************************************************/



/**
 * src/ad/impl/encore2.js ~ 2013/05/27 11:15:12
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 11222 $
 * @description
 * encore2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/encore2.less');

goog.provide('ad.impl.Encore2');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-encore'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arrTabCont = [];
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc'][0]);
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var lastFWCVideoIndex;
    var cover;
    var arrimgLinks;

    fwc.setWidgets([fwcVideo, imageNormal]);
   
    if(AD_CONFIG['tab_cont'] && AD_CONFIG['tab_cont'].length) {
        for(var i = 0, len = AD_CONFIG['tab_cont'].length; i < len; i ++) {
            arrTabCont.push(new ad.widget.TabCont(AD_CONFIG['tab_cont'][i]));
        }
        
    }
    tabContainer.setWidgets(arrTabCont);
    
    material.setWidgets(
        [leftVideo, smallHead],
        [tabContainer],
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
    // 百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        leftVideo.pause();
        showFWC(index + 1);
        smallHead.sendLog("float1open");
        smallHead.sendLog('float1video' + (index + 2) + 'start');
        return false;
     });

    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('video1start');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_PAUSE, function() {
        leftVideo.sendLog('video1pause');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        leftVideo.sendLog('float1open');
        leftVideo.sendLog('float1video1start');
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
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'start');
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
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'complete');
        return false;
    });

    imageNormal.addListener(ui.events.CLICK, function(index, e) {
        var oTarget = baidu.event.getTarget(e);
        if(oTarget.nodeType == '1'){
            if(oTarget.nodeName.toLowerCase() == 'img') {
                this.sendLog('float1Button' + (index + 1) + 'imgclick');
            }
            else if(oTarget.nodeName.toLowerCase() == 'span') {
                this.sendLog('float1Button' + (index + 1) + 'textclick');
            }
        }
        setCover(index);
        fwcVideo.refresh(null, AD_CONFIG['video_fwc'][index]);
        lastFWCVideoIndex = index;
        return false;
    });

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(lastFWCVideoIndex == index) {
            return;
        }
        hideFWC();
        if(!fwc)
            return;
        //重绘浮层视频
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null, AD_CONFIG['video_fwc'][index]);
            }, 10);
            fwc.show();
        }
        arrimgLinks = imageNormal.getRoot().getElementsByTagName('a');
        setCover(index);
        lastFWCVideoIndex = index;
    }

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
        var link = arrimgLinks[index];
        if(link) {
            link.appendChild(cover);
        }
    }

    return material;
});
