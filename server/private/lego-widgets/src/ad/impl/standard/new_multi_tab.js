/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/new_multi_tab.js ~ 2013/11/27 14:37:24
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * new_multi_tab相关的实现逻辑
 **/


goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.standard.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.standard.TabCont');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/standard/colorlist.less');
goog.include('ad/impl/standard/tab.less');
goog.include('ad/impl/standard/tab_cont.less');
goog.include('ad/impl/standard/button_group.less');

goog.include('ad/impl/standard/new_multi_tab.less');

goog.provide('ad.impl.standard.NewMultiTab');

ad.Debug(function(async) {
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var video = new ad.widget.standard.Video(AD_CONFIG['video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var colorList = new ad.widget.Colorlist(AD_CONFIG['list']);

    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);


    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i++) {
        tabBodies.push(new ad.widget.standard.TabCont(tabOptions[i]));
    }
    tab.setWidgets(tabBodies);

    var widgets = [
        [title],
        [video, smallHead, colorList],
        [tab],
        [buttons]
    ];

    var material = new ad.material.BaseMaterial();
    material.setWidgets(widgets);

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
