/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/old_image_scroll.js ~ 2013/12/05 00:25:10
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * old_image_scroll相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.landmark.Head');
goog.require('ad.widget.landmark.OldImageScroll');
goog.require('ad.widget.Section');

goog.include('ad/impl/landmark/head.less');
goog.include('ad/impl/landmark/old_image_scroll.less');

goog.provide('ad.impl.landmark.OldImageScroll');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var head = new ad.widget.landmark.Head(AD_CONFIG['head']);
    var imageScroll = new ad.widget.landmark.OldImageScroll(AD_CONFIG['image_scroll']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    material.setWidgets(head, imageScroll, section);

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
