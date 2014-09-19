/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/audi.js ~ 2013/01/18 15:48:01
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * audi相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/audi.less');

goog.provide('ad.impl.Audi');

ad.Debug(function(async){
    AD_CONFIG['tab_container']["li_width"] = 110;
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    var videoLeft = new ad.widget.Video(AD_CONFIG['video_left']);
    var videoFwc = new ad.widget.Video(AD_CONFIG['video_fwc']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([videoFwc]);
    var sinaWeibo = new ad.widget.SmallWeibo(AD_CONFIG['small_weibo']);
    var txWeibo = new ad.widget.QQWeibo(AD_CONFIG['qq_weibo']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    tabContainer.setWidgets([sinaWeibo], [txWeibo]);

    material.setWidgets(
        [
            videoLeft,
            [
                new ad.widget.SmallHead(AD_CONFIG['small_head']),
                new ad.widget.Section(AD_CONFIG['section'])
            ]
        ],
        [tabContainer],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])],
        [fwc]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user)
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));

    videoLeft.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC();
        videoLeft.pause();
        videoLeft.sendLog('打开浮层');
        return false;
    });

    videoFwc.addListener(ui.events.VIDEO_START, function(){
        videoFwc.sendLog('浮层视频播放');
        return false;
    });
    videoFwc.addListener(ui.events.VIDEO_CLICK, function(){
        videoFwc.sendLog('浮层视频播跳转');
        //在ipad下手动跳转
        if(videoFwc._data['is_ipad']){
            videoFwc.redirect();
        }
        return false;
    });
    videoFwc.addListener(ui.events.VIDEO_FINISH, function(){
        videoFwc.sendLog('浮层视频完整播放');
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function() {
        hideFWC();
     });

    /**
     * 显示对应的浮层
     */
    function showFWC(){
        hideFWC();
        if(!fwc)
            return;
        //重绘浮层视频
        if(videoFwc){
            ad.base.setTimeout(function(){
                videoFwc.refresh();
            },10);
            fwc.show();
        }
    }

    /**
     * 隐藏对应的浮层
     */
    function hideFWC(){
        if(!fwc)
            return;
        if(videoFwc){
            videoFwc.clearRoot();
        }
        fwc.hide();
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
