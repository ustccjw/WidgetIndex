/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: bjxd.js  2012/08/06 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/bjxd.js ~ 2012/08/06 11:47:13
 * @author wangdawei
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.Tab');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');
goog.include('ad/impl/bjxd.less');

goog.provide('ad.impl.Bjxd');

ad.Debug(function(async) {
    AD_CONFIG['fwc']['material_name'] = 'ec-bjxd'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc'][0]);
    var ImageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var lastFWCVideoIndex;
    var cover;
    
    fwc.setWidgets([fwcVideo,ImageNormal]);
    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video'])],
            [new ad.widget.SmallHead(AD_CONFIG['smallhead']),new ad.widget.Section(AD_CONFIG['section'])]
        ],
        [new ad.widget.Tab(AD_CONFIG['tabs'])],
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
    material.initHMJSMoniter('60377d7305aeaaf0509f59b3141e0975');
    var arr_links;
    
    var leftVideo = material.getWidget(0, 0, 0);
    leftVideo.addListener(ui.events.VIDEO_START, function() {
        leftVideo.sendLog('videostart');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(0);
        leftVideo.pause();
        leftVideo.sendLog('floatopen');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function() {
        leftVideo.sendLog('videocomplete');
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
        arr_links = ImageNormal.getRoot().getElementsByTagName('a');
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
