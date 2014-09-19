/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: katebile.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/katebile.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.H1');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ImageNormal');
goog.require('ui.events');

goog.include('ad/impl/katebile.less');

goog.provide('ad.impl.Katebile');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    
    AD_CONFIG['tab_titles']['width'] = 535;
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab_titles']);
    
    var iframe = new ad.widget.Iframe(AD_CONFIG['tab4']);
    var image_normal = new ad.widget.ImageNormal(AD_CONFIG['tab1']);
    var tab_arr = [];
    
    tab_arr.push(image_normal);
    
    for(var i = 0; i < AD_CONFIG['tab_cons'].length; i++){
        tab_arr.push(new ad.widget.TabCont(AD_CONFIG['tab_cons'][i]));
        if(i == 1){
            tab_arr.push(iframe);
        }
    }
    tab_container.setWidgets(tab_arr);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [tab_container],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])]
    );

    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    
    //百度精算监测
    material.initHMJSMoniter('348017aa25a2f9de681b5c7164e02434');
    
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
