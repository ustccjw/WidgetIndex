/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/cjw.js ~ 2012/11/14 12:38:23
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * 财经网相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.CardFlash');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/cjw.less');

goog.provide('ad.impl.Cjw');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']),
        tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']),
        weibo = new ad.widget.SmallWeibo(AD_CONFIG['weibo']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    tab_container.setWidgets([
        weibo
    ]);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [new ad.widget.Section(AD_CONFIG['section'])],
        [new ad.widget.CardFlash(AD_CONFIG['card_flash'])],
        [tab_container],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
