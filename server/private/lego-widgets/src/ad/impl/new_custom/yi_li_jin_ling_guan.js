/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: yili.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/yi_li_jin_ling_guan.js ~ 2014/09/05 13:27:55
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.Image');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.TabContainer');

goog.include('ad/impl/new_custom/yi_li_jin_ling_guan.less');

goog.provide('ad.impl.new_custom.YiLiJinLingGuan');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);

    var tabContents = [];
    var tabOptions = AD_CONFIG['tab_container']['options'];
    var tabOption;
    var temp;
    for (var i = 0; i < tabOptions.length; ++i) {
        tabOption = tabOptions[i];
        if ('image' in tabOption['tab_type']) {
            temp = new ad.widget.Image(tabOption['tab_type']['image']);
        }
        else if ('jiejin' in tabOption['tab_type']) {
            temp = new ad.widget.Iframe(tabOption['tab_type']['jiejin']);
        }
        tabContents.push(temp);
    }
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab_container']);
    tabContainer.setWidgets(tabContents);

    material.setWidgets(
        [
            title,
            [
                video,
                smallHead
            ],
            tabContainer,
            buttons
        ]
    );
    if (async === true) {
        return material;
    }
    material.show();


});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
