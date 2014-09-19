/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1100.js ~ 2013/11/11 14:13:31
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 11222 $
 * @description
 * case1100相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonList');

goog.include('ad/impl/advanced/case1100.less');

goog.provide('ad.impl.advanced.Case1100');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var tabBodies = [];
    for (var i = 0; i < AD_CONFIG['tab']['options'].length; i ++) {
        tabBodies.push(new ad.widget.TabCont(AD_CONFIG['tab']['options'][i]));
    }
    tab.setWidgets(tabBodies);
    material.setWidgets(
        [
            new ad.widget.Video(AD_CONFIG['video']),
            [
                new ad.widget.SmallHead(AD_CONFIG['small_head']),
                new ad.widget.Section(AD_CONFIG['section'])
            ]
        ],
        tab,
        new ad.widget.ButtonList(AD_CONFIG['button_list'])
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
