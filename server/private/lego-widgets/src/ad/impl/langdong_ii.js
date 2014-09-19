/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: langdongII.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/langdongII.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.service.StatisticsService');
goog.require('ad.service.data.DataService');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Image');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Video');
goog.require('ad.widget.Section');
goog.require('ad.widget.FloatWindow');
goog.require('ad.widget.Iframe');
goog.require('ui.events');

goog.include('ad/impl/langdong_ii.less');

goog.provide('ad.impl.LangdongII');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.Image(AD_CONFIG['logo']), new ad.widget.SmallHead(AD_CONFIG['head'])],
        [new ad.widget.Section(AD_CONFIG['colnums'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['bottons'])],
        [new ad.widget.FloatWindow(AD_CONFIG['float_layer'])]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    //统计service，主要统计可视展现率、用户鼠标停留时间、广告的加载时长
    var statisticsService = new ad.service.StatisticsService();
    statisticsService.init(material.getId());

    function sendLog(title, xp) {
        material.getCMS().sendLog({
            'r' : new Date().valueOf(),
            'q' : (window['bdQuery'] || ''),
            'xp' : xp,
            'plid' : material.getId().replace(/ec-ma-/g, ''),
            'title' : title
        });
    }

    var sign_timeout = false;
    var is_live = false;
    ad.base.setTimeout(function(){
        sign_timeout = true;
    },1000);

    var url = RT_CONFIG.HOST("wbapi.baidu.com") + "/service/live/langdong";
    var ss = new ad.service.data.DataService(url);
    ss.callData('', function(response) {
        if(!sign_timeout && response && response["success"] == "true"){
            is_live = true
        }
    });

    var logoImage = material.getWidget(0,0);
    var fw = material.getWidget(3, 0);
    var video = new ad.widget.Video({});
    var frame = new ad.widget.Iframe({});

    logoImage.addListener(ui.events.CLICK, function(){
        sendLog("打开浮层", "打开浮层");
        if(is_live &&  AD_CONFIG['float_layer']['is_live']){
            ad.base.setTimeout(function(){
                frame.refresh(baidu.g(fw.getId("float-iframe")), AD_CONFIG['float_layer']['iframe']);
            },0);
        }else{
            ad.base.setTimeout(function(){
                video.refresh(baidu.g(fw.getId("float-iframe")), AD_CONFIG['float_layer']['swf']);
            },0);
        }
        fw.show();
    });
    fw.addListener(ui.events.SHARE, function(){
        sendLog("sina分享","sina分享");
    });
    fw.addListener(ui.events.CLOSE, function(){
        sendLog("关闭浮层","关闭浮层");
        if(is_live){
            frame.getRoot().innerHTML = "";
        }else{
            video.getRoot().innerHTML = "";
        }
        fw.hide();
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
