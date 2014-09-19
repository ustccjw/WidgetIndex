/*************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/video/ecomplayer7.js ~ 2013/11/04 10:56:07
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * ecomplayer7相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.standard.Video');
goog.require('ui.events');

goog.provide('ad.impl.video.Ecomplayer7');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var video = new ad.widget.standard.Video(AD_CONFIG['video']);
    material.setWidgets([video]);

    var events = {
        'VIDEO_START': ui.events.VIDEO_START,
        'VIDEO_FINISH': ui.events.VIDEO_FINISH,
        'VIDEO_CLICK': ui.events.VIDEO_CLICK,
        'VIDEO_PAUSE': ui.events.VIDEO_PAUSE,
        'VIDEO_CONTINUE': ui.events.VIDEO_CONTINUE,
        'VIDEO_AUTO': ui.events.VIDEO_AUTO
    }
    var bigVideo;
    var key;
    var trigged = false;

    for (key in events) {
        video.addListener(events[key], function(k) {
            return function() {
                material.trigger('SMALL_' + k, video.getSwf());
            }
        }(key));
    }

    video.addListener('VIDEO_OPEN_POPUP', function() {
        material.trigger('VIDEO_OPEN_POPUP', video.getSwf());
        if (!trigged) {
            bigVideo = video.getBigVideo();
            for (key in events) {
                bigVideo.addListener(events[key], function(k) {
                    return function() {
                        material.trigger('BIG_' + k, bigVideo.getSwf());
                    }
                }(key));
            }
            bigVideo.addListener('VIDEO_CLOSE_POPUP', function() {
                material.trigger('VIDEO_CLOSE_POPUP', bigVideo.getSwf());
            });
            trigged = true;
        }
    });

    if (async === true) {
        return material;
    }
    material.show();

});



/* vim: set ts=4 sw=4 sts=4 tw=100: */