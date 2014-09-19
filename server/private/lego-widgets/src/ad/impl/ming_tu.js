/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/ming_tu.js ~ 2013/11/04 14:50:55
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * ming_tu相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/ming_tu.less');

goog.provide('ad.impl.MingTu');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    AD_CONFIG['tab']['options'] = [];
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['flash']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['iframe']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab_cont1']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['img_group1']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab_cont2']['tab_title']});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['img_group2']['tab_title']});
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    var tabCont1 = new ad.widget.TabCont(AD_CONFIG['tab_cont1']);
    var tabCont2 = new ad.widget.TabCont(AD_CONFIG['tab_cont2']);
    var imgCartoon1 = new ad.widget.ImageCartoon(AD_CONFIG['img_group1']);
    var imgCartoon2 = new ad.widget.ImageCartoon(AD_CONFIG['img_group2']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);

    tabContainer.setWidgets([flash, iframe, tabCont1, imgCartoon1, tabCont2, imgCartoon2]);

    material.setWidgets(
        [leftVideo, smallHead],
        [tabContainer],
        [buttonGroup]
    );

    if (async === true) {
        return material;
    }
    
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
