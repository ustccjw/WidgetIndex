/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dazongchina.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/dazongchina.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.H1');
goog.require('ad.widget.Tab');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.CardFlash');
goog.require('ad.widget.SmallWeibo');
goog.require('ui.events');

goog.include('ad/impl/dazongchina.less');

goog.provide('ad.impl.Dazongchina');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [new ad.widget.Tab(AD_CONFIG['tabs'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])]
    );

    AD_CONFIG['weibo']['is_display_icon'] = false;
    var weibo = new ad.widget.SmallWeibo(AD_CONFIG['weibo']);
    var cardFlash = new ad.widget.CardFlash(AD_CONFIG['flash']);
    var tabs = material.getWidget(1, 0);
    tabs.addListener(ui.events.TAB_CHANGE, function(index){
        if(typeof tabs[index] == 'undefined'){
            tabs[index] = false;
        }
        var tabcon = tabs.getWidget(index).getRoot();
        if(index == 1 && !tabs[index]){
            weibo.refresh(tabcon);
            tabs[index] = true;
        }else if(index == 0 && !tabs[index]){
            cardFlash.refresh(tabcon);
            tabs[index] = true;
        }
    });
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
