/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/old_video.js ~ 2013/12/05 13:51:25
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * old_video相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.HtmlText');
goog.require('ad.widget.ShowUrl');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/landmark/old_button_group.less');
goog.include('ad/impl/landmark/old_video.less');

goog.provide('ad.impl.landmark.OldVideo');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['video']['width'] = 220;
    AD_CONFIG['video']['height'] = 190;

    var title = new ad.widget.Title(AD_CONFIG['title']);
    var video = new ad.widget.Video(AD_CONFIG['video']);
    var htmlText = new ad.widget.HtmlText(AD_CONFIG['description']);
    var showUrl = new ad.widget.ShowUrl(AD_CONFIG['show_url']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
    material.setWidgets(title, video, htmlText, showUrl, buttons);

    if (async === true) {
        return material;
    }
    material.show();
});

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
