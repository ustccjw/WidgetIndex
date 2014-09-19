/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: meizy.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/meizy.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.env');
goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Video');
goog.require('ad.widget.Title');
goog.require('ad.widget.ImageMultiRegion');
goog.require('ui.events');
goog.include('ad/impl/meizy.less');

goog.provide('ad.impl.Meizy');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.Video(AD_CONFIG['video'][0]), new ad.widget.SmallHead(AD_CONFIG['head'])],
        [new ad.widget.Title(AD_CONFIG['activehead'])],
        [new ad.widget.ImageMultiRegion(AD_CONFIG['activebody'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['bottons'])]
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
    if (!ad.env.isIpad) {
        var video = material.getWidget(0, 0);
        video.addListener(ui.events.SEND_LOG, function(params) {
            // var title = params['action'];
            var type = params['xp'];
            if(type === ui.events.VIDEO_START){
                sendLog('videostart1', '');
            }else if(type === ui.events.VIDEO_FINISH){
                sendLog('videofinish1', '');
            }else if(type === ui.events.VIDEO_CLICK){
                sendLog('videoclick1', '');
            }
            return false;
        });
    }
    var head = material.getWidget(0, 1);
    var videoRoot = material.getWidget(0, 0).getRoot();
    var videoArr = [];
    function getLogHandler(index) {
        return function(params) {
            // var title = params['action'];
            var type = params['xp'];
            if (type === ui.events.VIDEO_START) {
                sendLog('videostart'+ (index + 1), '');
            }
            else if (type === ui.events.VIDEO_FINISH) {
                sendLog('videofinish'+ (index + 1), '');
            }
            else if (type === ui.events.VIDEO_CLICK) {
                sendLog('videoclick'+ (index + 1), '');
            }
            return false;
        };
    }
    for (var i = 0; i < AD_CONFIG['video'].length; i++) {
        AD_CONFIG['video'][i]['is_play'] = true;
        videoArr.push(new ad.widget.Video(AD_CONFIG['video'][i]));
        videoArr[i].addListener(ui.events.SEND_LOG, getLogHandler(i));
    }
    head.addListener(ui.events.CLICK, function(index) {
        var videoNew = videoArr[index];
        if (videoNew) {
            videoNew.refresh(videoRoot);
            sendLog('videostart'+ (index + 1), '');
            return true;
        }
        return false;
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
