/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lqd.js ~ 2012/08/20 13:19:37
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * lqd相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Slider');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Tab');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');

goog.require('ad.service.StatisticsService');

goog.include('ad/impl/lqd.less');

goog.provide('ad.impl.Lqd');

ad.Debug(function(){
    AD_CONFIG['tab']["inside"] = {"li_width" : 110};

    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.DefaultRender());
    material.setWidgets(
        [new ad.widget.Slider(AD_CONFIG['slider']), new ad.widget.SmallHead(AD_CONFIG['small_head'])],
        [new ad.widget.Tab(AD_CONFIG['tab'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );

    var renderFlag = []; //栏目填充标志
    var tab = material.getWidget(1,0);
    tab.addListener(ui.events.TAB_CHANGE, function(tabIndex,tabcon){
        if(!renderFlag[tabIndex]){
            if(tabIndex == 0){
                var section = new ad.widget.Section();
                section.refresh(tabcon, AD_CONFIG['section1']);
                section.rewriteTitle2(tabcon,"tab" + (tabIndex + 1));
            }
            else if(tabIndex == 1){
                var section = new ad.widget.Section();
                section.refresh(tabcon, AD_CONFIG['section2']);
                section.rewriteTitle2(tabcon,"tab" + (tabIndex + 1));
            }
            else if(tabIndex == 2){
                var weibo = new ad.widget.SmallWeibo();
                weibo.refresh(tabcon, AD_CONFIG['small_weibo']);
                material.handleWidgetEvent(weibo);
            }
            renderFlag[tabIndex] = true;
        }
    });

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    
    

	//统计service，主要统计可视展现率、用户鼠标停留时间、广告的加载时长
    var statisticsService = new ad.service.StatisticsService();
    statisticsService.init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
