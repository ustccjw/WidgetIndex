/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: nap.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/nap.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ImageNormal');
goog.require('ui.events');
goog.include('ad/impl/nap.less');

goog.provide('ad.impl.Nap');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    AD_CONFIG['weibo']['weibo_context_length'] = 80;
    var logo = new ad.widget.ImageNormal(AD_CONFIG['logo']);
    material.setWidgets(
        [
            [logo],
            [new ad.widget.SmallHead(AD_CONFIG['head']), new ad.widget.SmallWeibo(AD_CONFIG['weibo'])]
        ],
        [new ad.widget.ButtonGroup(AD_CONFIG['bottons'])],
        [new ad.widget.ImageCartoon(AD_CONFIG['img_group'])]
    );
    if (async === true) {
        return material;
    }
    
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
    logo.rewriteTitle2(null, 'logo', true);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
