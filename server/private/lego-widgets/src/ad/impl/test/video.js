/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/test/video.js ~ 2013/10/23 15:54:56
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/test/video.less');

goog.provide('ad.impl.test.Video');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
    var buttons2 = new ad.widget.ButtonGroup(AD_CONFIG['buttons2']);
    var buttons3 = new ad.widget.ButtonGroup(AD_CONFIG['buttons3']);
    var video7 = new ad.widget.Video(AD_CONFIG['video7']);

    material.setWidgets(
        [buttons], [buttons2], [buttons3], [video7], [new ad.widget.Video(AD_CONFIG['v1'])], [new ad.widget.Video(AD_CONFIG['v2'])]
    );
    if (async === true) {
        return material;
    }
    material.show();

    var videos = [
        'http://bs.baidu.com/lego-mat-offline/1307386a-20a5-4d51-999b-7c72a3d2bd3b.flv',
        'http://ecma.bdimg.com/adtest/c406bef13ed708eaca29f6dc0ce0f673.flv',
        'http://ecma.bdimg.com/adtest/f13004eed4251c602bbe15737e8a1ecb.mp4'
    ];
    buttons.addListener(ui.events.CLICK, function(i) {
        video7.setVideo(videos[i]);
        return false;
    });
    buttons2.addListener(ui.events.CLICK, function(i) {
        var swf = video7.getSwf();
        if (i == 0) {
            alert(swf['swfGetVideoPlayedTime']());
        } else if (i == 1) {
            alert(swf['swfGetVideoTotalTime']());
        }
        return false;
    });
    buttons3.addListener(ui.events.CLICK, function(i) {
        var swf = video7.getSwf();
        if (i == 0) {
            swf['swfVideoStart']();
        } else if (i == 1) {
            swf['swfVideoPause']();
        } else if (i == 2) {
            swf['swfVideoPlay']();
        } else if (i == 3) {
            swf['swfVideoStop']();
        }
        return false;
    });


});



/* vim: set ts=4 sw=4 sts=4 tw=100: */