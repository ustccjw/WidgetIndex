/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/shaxuan.js ~ 2012/08/23 16:35:41
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * shaxuan相关的实现逻辑
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

goog.include('ad/impl/shaxuan.less');

goog.provide('ad.impl.Shaxuan');

ad.Debug(function(async){
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

    var imgCartoon = material.getWidget(2, 0);
    imgCartoon.addListener(ui.events.ARROW_RIGHT, function() {
        sendLog('', 'arrowright');
    });
    imgCartoon.addListener(ui.events.ARROW_LEFT, function() {
        sendLog('', 'arrowleft');
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
