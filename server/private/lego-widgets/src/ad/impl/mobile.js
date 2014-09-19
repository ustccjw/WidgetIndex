/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: mobile.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/mobile.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');
goog.require('ui.events');

goog.include('ad/impl/mobile.less');

goog.provide('ad.impl.Mobile');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    AD_CONFIG['tabs_title']['width'] = 536;
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tabs_title']);
    AD_CONFIG['tab1']['image_width'] = 110;
    AD_CONFIG['tab1']['image_margin'] = 16;
    var tab_others = AD_CONFIG['tab_others'];
    var arr_tabs_con = [];
    for(var i = 0; i < tab_others.length; i++){
        if(i === 0){
            arr_tabs_con.push(new ad.widget.ImageCartoon(AD_CONFIG['tab1']));
        }
        if(i === 2){
            arr_tabs_con.push(new ad.widget.Section(AD_CONFIG['tab4']));
        }
        arr_tabs_con.push(new ad.widget.TabCont(tab_others[i]));
    }
    tab_container.setWidgets(
        arr_tabs_con
    );
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [tab_container],
        [buttons]
    );
    if (async === true) {
        return material;
    }
    material.show();
    
    material.initMonitor(AD_CONFIG['main_url']);
    
    //百度精算监测
    material.initHMJSMoniter('0f7c38afe1ec707eb40f8132a18f03e8');
    
    buttons.rewriteTitle2(buttons.getRoot(), "底部", false);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
