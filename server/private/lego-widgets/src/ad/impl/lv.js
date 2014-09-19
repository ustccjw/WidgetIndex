/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: lv.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/lv.js ~ 2012/06/06 11:47:13
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
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ui.events');
goog.include('ad/impl/lv.less');

goog.provide('ad.impl.Lv');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    AD_CONFIG['weibo']['weibo_context_length'] = 80;
    material.setWidgets(
        [
            [new ad.widget.Video(AD_CONFIG['video']), new ad.widget.VideoTitle(AD_CONFIG['video_title'])],
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

    function sendLog(title, xp) {
        material.getCMS().sendLog({
            'r' : new Date().valueOf(),
            'q' : (window['bdQuery'] || ''),
            'xp' : xp,
            'plid' : material.getId().replace(/ec-ma-/g, ''),
            'title' : title
        });
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
