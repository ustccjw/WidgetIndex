/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: video_style_three.js 12406 2012-09-28 03:46:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/video_style_three.js ~ 2012/09/28 11:32:23
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 12406 $
 * @description
 * video_style_three相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');

goog.require('ad.widget.Header');
goog.require('ad.widget.LinkList');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');

goog.include('ad/impl/landmark/video_style_two.less');

goog.provide('ad.impl.landmark.VideoStyleTwo');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.Title(AD_CONFIG['title'])],
        [new ad.widget.Video(AD_CONFIG['video'])],
        [new ad.widget.Header(AD_CONFIG['header'])],
        [new ad.widget.LinkList(AD_CONFIG['linkList'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    var cms = material.getCMS();
    cms.init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
