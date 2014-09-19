/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: richan.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/richan.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Video');
goog.require('ad.widget.Map');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.NormalContainer');
goog.require('ui.events');
goog.include('ad/impl/richan.less');

goog.provide('ad.impl.Richan');


ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    AD_CONFIG['weibo']['weibo_context_length'] = 50;

    // 视频和浮层相关
    var left_video = new ad.widget.Video(AD_CONFIG['video_left']);
    var fwcConfig = AD_CONFIG['fwc'];
    var fwcVideo = new ad.widget.Video(fwcConfig);
    var fwc = new ad.widget.FloatWindowContainer({
        'width': 720,
        'height': 420,
        'material_name': 'ec-richan',
        'id': 1
    });
    var fwcLinks = new ad.widget.Map({
        'width': 720,
        'height': 420,
        'src': fwcConfig['bg_img_src'],
        'rcv_url': fwcConfig['bg_rcv_url'] || fwcConfig['rcv_url'],
        'options': [
            {
                'shape': 'rect',
                'coords': '0,0,720,420',
                'href_rcv_url': fwcConfig['bg_rcv_url'] || fwcConfig['rcv_url']
            }
        ]
    });
    fwc.setWidgets([fwcVideo, fwcLinks]);


    function getTabConfig() {
        // 从tab_cons和tab4，tab5里面提取tab的标题信息
        var options = [];
        for (var i = 0; i < AD_CONFIG['tab_cons']['options'].length; i ++) {
            options.push({
                'tab_title': AD_CONFIG['tab_cons']['options'][i]['tab_title']
            });
        }
        if ('tab_title' in AD_CONFIG['tab4']) {
            options.push({
                'tab_title': AD_CONFIG['tab4']['tab_title']
            })
        }
        if ('tab_title' in AD_CONFIG['tab5']) {
            options.push({
                'tab_title': AD_CONFIG['tab5']['tab_title']
            })
        }

        return {
            'interval_time': 500000000,
            'width': 520,
            'li_border_width': 0,
            'options': options
        }
    }
    var tab_container = new ad.widget.TabContainer(getTabConfig());
    var tab_arr = [];
    var normal_arr = [];
    var title_arr = [];
    var weibo_arr = [];

    var tabOptions = AD_CONFIG['tab_cons']['options'];
    for(var i = 0; i < tabOptions.length; i++){
        tabOptions[i]['weibo']['weibo_context_length'] = 30;
        var normal_con = new ad.widget.NormalContainer({'material_name' : 'tab'+ i +'-normal'});
        var title = new ad.widget.VideoTitle(tabOptions[i]['title']);
        var weibo = new ad.widget.SmallWeibo(tabOptions[i]['weibo']);
        normal_con.setWidgets(
            [
                new ad.widget.Iframe(tabOptions[i]['image'])
            ],
            [
                title,
                weibo
            ],
            [
                new ad.widget.TabCont(tabOptions[i]['know_more'])
            ]
        );
        title_arr.push(title);
        weibo_arr.push(weibo);
        tab_arr.push(normal_con);
        normal_arr.push(normal_con);
    }
    tab_arr.push(new ad.widget.Iframe(AD_CONFIG['tab4']));
    AD_CONFIG['tab5']['image_width'] = 110;
    AD_CONFIG['tab5']['image_margin'] = 10;
    tab_arr.push(new ad.widget.ImageCartoon(AD_CONFIG['tab5']));
    tab_container.setWidgets(tab_arr);
    material.setWidgets(
        [
            [left_video],
            [new ad.widget.SmallHead(AD_CONFIG['head']), new ad.widget.SmallWeibo(AD_CONFIG['weibo'])]
        ],
        [tab_container],
        [new ad.widget.ButtonGroup(AD_CONFIG['bottons'])],
        [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();
    //material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) 初始化浮层监测
    //material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
    //百度精算监测
    //material.initHMJSMoniter('b04c6517531dc9448173509b9085945b');

    left_video.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC();
        left_video.pause();
        left_video.sendLog('floatopen');
        return false;
    });

    left_video.addListener(ui.events.VIDEO_FINISH, function(){
        left_video.sendLog('videocomplete');
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function(index) {
        hideFWC();
     });

    fwcVideo.addListener(ui.events.VIDEO_START, function(){
        fwcVideo.sendLog('floatvideostart');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
        fwcVideo.sendLog('floatvideojump');
        //在ipad下手动跳转
        if(fwcVideo._data['is_ipad']){
            fwcVideo.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function(){
        fwcVideo.sendLog('floatvideocomplete');
        return false;
    });

    //监听map模块的事件
    fwcLinks.addListener(ui.events.MAP_CLICK,function(i){
        fwcLinks.sendLog('floatBG');
        return false;
    });

    /**
     * 显示对应的浮层
     */
    function showFWC(){
        //重绘浮层视频
        if(fwcVideo){
            ad.base.setTimeout(function(){
                fwcVideo.refresh();
            },10);
        }
        fwc.show();
    }

    /**
     * 隐藏对应的浮层
     */
    function hideFWC(){
        if(fwcVideo){
            fwcVideo.clearRoot();
        }
        fwc.hide();
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
