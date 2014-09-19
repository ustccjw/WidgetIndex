/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: video.js 11340 2012-08-28 03:37:46Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/z/video.js ~ 2012/08/24 16:15:18
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 11340 $
 * @description
 * video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');

goog.include('ad/impl/z/video.less');

goog.provide('ad.impl.z.Video');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.Title(AD_CONFIG['title'])],
        [new ad.widget.Video(AD_CONFIG['video'])]
    );
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
