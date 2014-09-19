/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/lqd_test.js ~ 2012/08/20 13:19:37
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * lqd_test相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Slider');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/lqd_test.less');

goog.provide('ad.impl.LqdTest');

ad.Debug(function(async){
    AD_CONFIG['tab']["li_width"] = 110;
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']),
        material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));

    tab_container.setWidgets([
        new ad.widget.SmallWeibo(AD_CONFIG['small_weibo']),
        new ad.widget.Section(AD_CONFIG['section'])
    ]);
    material.setWidgets(
        [new ad.widget.Slider(AD_CONFIG['slider']), new ad.widget.SmallHead(AD_CONFIG['small_head'])],
        [tab_container],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );

    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
