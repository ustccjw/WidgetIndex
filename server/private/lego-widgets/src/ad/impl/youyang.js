/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: youyang.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/youyang.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');
goog.require('ui.events');

goog.include('ad/impl/youyang.less');

goog.provide('ad.impl.YouYang');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [new ad.widget.Section(AD_CONFIG['colnums'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'])]
    );
    
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
