/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/dior.js ~ 2012/11/27 13:04:08
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * dior相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.QQWeibo');
goog.require('ad.widget.Section');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/dior_two.less');

goog.provide('ad.impl.DiorTwo');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    AD_CONFIG['tab_titles']['li_width'] = 110;
    AD_CONFIG['tab_titles']['li_margin'] = 0;
    var tabs = new ad.widget.TabContainer(AD_CONFIG['tab_titles']);
    tabs.setWidgets(
         [new ad.widget.SmallWeibo(AD_CONFIG['weibo_tab1'])],
         [new ad.widget.QQWeibo(AD_CONFIG['weibo_tab2'])]
    );
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video'])],
            [new ad.widget.SmallHead(AD_CONFIG['small_head']),
             new ad.widget.Section(AD_CONFIG['colmun'])
            ]
        ],
        [tabs],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );

    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
