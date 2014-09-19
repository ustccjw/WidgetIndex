/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: ds.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/ds.js ~ 2012/09/27 14:17:21
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.Image');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/ds.less');

goog.provide('ad.impl.DS');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-ds'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    AD_CONFIG['tab']['width'] = 535;
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var tabContCollection = [];
    var imageLogo = new ad.widget.Image(AD_CONFIG['image_logo']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc'][0]);
    var smallWeibo = new ad.widget.SmallWeibo(AD_CONFIG['small_weibo']);
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var lastFWCVideoIndex;
    var cover;

    fwc.setWidgets([fwcVideo, imageNormal]);

    tabContCollection.push(smallWeibo);
    if(AD_CONFIG['tab_cont'] && AD_CONFIG['tab_cont'].length) {
        for(var i = 0, len = AD_CONFIG['tab_cont'].length; i < len; i ++) {
            tabContCollection.push(new ad.widget.TabCont(AD_CONFIG['tab_cont'][i]));
        }
    }
    tabContainer.setWidgets(tabContCollection);

    material.setWidgets(
        [imageLogo, smallHead],
        [tabContainer],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
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

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        showFWC(index + 1);
        smallHead.sendLog("float1open");
        smallHead.sendLog('float1video'+(index + 2) + 'start');
        return false;
     });

    imageLogo.addListener(ui.events.CLICK, function() {
        showFWC(0);
        imageLogo.sendLog('float1open');
        imageLogo.sendLog('float1video1start');
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
        if(fwcVideo._data['is_ipad']){
            fwcVideo.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function() {
        fwcVideo.sendLog('float1video' + (lastFWCVideoIndex + 1) + 'complete');
        return false;
    });

    imageNormal.addListener(ui.events.CLICK, function(index,e) {
        var oTarget = baidu.event.getTarget(e);
        if(oTarget.nodeType == '1') {
            if(oTarget.nodeName.toLowerCase() == 'img') {
                this.sendLog('float1Button' + (index + 1) + 'imgclick');
            }
            else if(oTarget.nodeName.toLowerCase() == 'span') {
                this.sendLog('float1Button' + (index + 1) + 'textclick');
            }
        }
        setCover(index);
        fwcVideo.refresh(null,AD_CONFIG['video_fwc'][index]);
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
                fwcVideo.refresh(null,AD_CONFIG['video_fwc'][index]);
            },10);
            fwc.show();
        }
        arrLinks = imageNormal.getRoot().getElementsByTagName('a');
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

    var arrLinks;
    function setCover(index) {
        if(!cover) {
            cover = baidu.dom.create('div',{'class':'ec-cover'});
            cover.innerHTML = '播放中';
        }
        var link = arrLinks[index];
        if(link) {
            link.appendChild(cover);
        }else{
            arrLinks[0].appendChild(cover);
        }
    }

    return material;

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
