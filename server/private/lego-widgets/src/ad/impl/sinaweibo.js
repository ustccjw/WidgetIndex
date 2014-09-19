/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: sinaweibo.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/sinaweibo.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ui.events');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.Top');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.search_box.SearchBox');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.Section');

goog.include('ad/impl/sinaweibo.less');

goog.provide('ad.impl.SinaWeibo');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    AD_CONFIG['tab_titles']['li_width'] = 65;
    AD_CONFIG['tab_titles']['li_margin'] = 0;
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab_titles']);
    var normal_container0 = new ad.widget.NormalContainer({});
    normal_container0.setWidgets(
        [
            new ad.widget.ImageNormal(AD_CONFIG['tab_cons'][0]['logo']),
            new ad.widget.search_box.SearchBox(AD_CONFIG['tab_cons'][0]['regist_form'])
        ]
    );
    var normal_container1 = new ad.widget.NormalContainer({});
    AD_CONFIG['tab_cons'][1]['weibo']['is_display_icon'] = false;
    AD_CONFIG['tab_cons'][1]['weibo']['is_display_fans'] = false;
    AD_CONFIG['tab_cons'][1]['weibo']['is_display_weibo'] = false;
    AD_CONFIG['tab_cons'][1]['weibo']['is_display_foot'] = false;
    normal_container1.setWidgets(
        [
            [
                new ad.widget.ImageNormal(AD_CONFIG['tab_cons'][1]['logo']),
                new ad.widget.SmallWeibo(AD_CONFIG['tab_cons'][1]['weibo'])
            ],[
                new ad.widget.Section(AD_CONFIG['tab_cons'][1]['hot_talk'])
            ],[
                new ad.widget.Top(AD_CONFIG['tab_cons'][1]['top'])
            ]
        ]
    );
    var normal_container2 = new ad.widget.NormalContainer({});
    normal_container2.setWidgets(
        [
            new ad.widget.ImageNormal(AD_CONFIG['tab_cons'][2]['logo']),
            new ad.widget.Top(AD_CONFIG['tab_cons'][2]['top_impact']),
            new ad.widget.Top(AD_CONFIG['tab_cons'][2]['top_popularity'])
        ]
    );
    var normal_container3 = new ad.widget.NormalContainer({});
    normal_container3.setWidgets(
        [
            new ad.widget.ImageNormal(AD_CONFIG['tab_cons'][3]['logo']),
            new ad.widget.ImageNormal(AD_CONFIG['tab_cons'][3]['images']),
            new ad.widget.Top(AD_CONFIG['tab_cons'][3]['top_hot'])
        ]
    );
    var normal_container4 = new ad.widget.NormalContainer({});
    normal_container4.setWidgets(
        [
            new ad.widget.ImageNormal(AD_CONFIG['tab_cons'][4]['logo']),
            new ad.widget.ImageNormal(AD_CONFIG['tab_cons'][4]['images'])
        ]
    );
    tab_container.setWidgets(
         [normal_container0],
         [normal_container1],
         [normal_container2],
         [normal_container3],
         [normal_container4]
    );

    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [tab_container],
        [new ad.widget.LinkList(AD_CONFIG['logo'])]
    );

    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
