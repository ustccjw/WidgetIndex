/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: video_style_four.js 12406 2012-09-28 03:46:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/video_style_four.js ~ 2012/09/28 11:32:23
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 12406 $
 * @description
 * video_style_three相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');

goog.require('ad.widget.Header');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.ImageAsVideo');
goog.require('ad.widget.Image');
goog.require('ad.widget.Video');
goog.require('ad.widget.Footer');

goog.include('ad/impl/landmark/video_style_four.less');

goog.provide('ad.impl.landmark.VideoStyleFour');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.Header(AD_CONFIG['header'])],
        [new ad.widget.ImageAsVideo(AD_CONFIG['image']), new ad.widget.LinkList(AD_CONFIG['linkList'])],
        [new ad.widget.Footer(AD_CONFIG['footer'])],
        [new ad.widget.Image(AD_CONFIG['close_button']),new ad.widget.Video(AD_CONFIG['video'])]
    );
    if (async === true) {
        return material;
    }
    
    material.show();
    var cms = material.getCMS();
    cms.init(material.getId());
    
    var image = material.getWidget(1,0);
    var close_btn = material.getWidget(3,0);
    var video = material.getWidget(3,1);
    image.addListener(ui.events.CLICK, function(){
        image.sendLog("open_float", "open_float");
        video.refresh();
        close_btn.getRoot().parentNode.style.display = 'block';
    });
    close_btn.addListener(ui.events.CLICK, function(){
        close_btn.sendLog("close_float", "close_float");
        video.clearRoot();
        close_btn.getRoot().parentNode.style.display = 'none';
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
