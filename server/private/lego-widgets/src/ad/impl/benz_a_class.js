/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/benz_a_class.js ~ 2013/01/24 21:36:04
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * benz_a_class相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/benz_a_class.less');

goog.provide('ad.impl.BenzAClass');

ad.Debug(function(async){
    AD_CONFIG['fwc']['material_name'] = 'ec-benz-a-class'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    var video_left = new ad.widget.Video(AD_CONFIG['video_left']);
    var video_fwc = new ad.widget.Video(AD_CONFIG['video_fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc'][0]);
    var ImageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var lastFWCVideoIndex;
    var cover;
    
    fwc.setWidgets([fwcVideo, ImageNormal]);
    material.setWidgets(
        [
            [
                video_left,
                new ad.widget.VideoTitle(AD_CONFIG['video_title'])
            ],
            [
                smallHead
            ]
        ],
        [new ad.widget.ImageCartoon(AD_CONFIG['image_cartoon'])],
        [fwc]
    );
    if (async === true) {
        return material;
    }

    material.show();
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
    material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) material.getCMS().init
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
    
    var arr_links;
    
    smallHead.addListener(ui.events.CLICK, function(index, me) {
        video_left.pause();
        showFWC(index + 1);
        smallHead.sendLog("floatopen");
        smallHead.sendLog('floatvideo'+(index + 2) + 'start');
        return false;
     });

    video_left.addListener(ui.events.VIDEO_START, function() {
        video_left.sendLog('leftvideostart');
        return false;
    });
    
    video_left.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        video_left.pause();
        video_left.sendLog('floatopen');
        video_left.sendLog('floatvideo1start');
        return false;
    });
    video_left.addListener(ui.events.VIDEO_FINISH, function() {
        video_left.sendLog('leftvideocomplete');
        return false;
    });
    fwc.addListener(ui.events.CLOSE, function() {
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
        fwcVideo.refresh(null,AD_CONFIG['video_fwc'][index]);
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
        if(!fwc)
            return;
        //重绘浮层视频
        if(fwcVideo) {
            ad.base.setTimeout(function() {
                fwcVideo.refresh(null,AD_CONFIG['video_fwc'][index]);
            },10);
            fwc.show();
        }
        arr_links = ImageNormal.getRoot().getElementsByTagName('a');
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

    function setCover(index) {
        if(!cover) {
            cover = baidu.dom.create('div',{'class':'ec-cover'});
            cover.innerHTML = '播放中';
        }
        var link = arr_links[index];
        if(link) {
            link.appendChild(cover);
        }
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
