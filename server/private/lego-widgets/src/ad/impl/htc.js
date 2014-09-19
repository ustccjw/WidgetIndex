/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: htc.js  2012/08/06 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/htc.js ~ 2012/08/06 11:47:13
 * @author wangdawei
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.Tab');
goog.require('ad.widget.ButtonGroup');
goog.include('ad/impl/htc.less');

goog.provide('ad.impl.HTC');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    
    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video'])],
            [new ad.widget.SmallHead(AD_CONFIG['smallhead']),new ad.widget.Section(AD_CONFIG['section'])]
        ],
        [new ad.widget.Tab(AD_CONFIG['tabs'])],
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
