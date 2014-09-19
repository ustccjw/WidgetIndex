/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/old_big_image_float.js ~ 2013/12/04 18:58:42
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * old_big_image_float相关的实现逻辑
 **/

// XXX: 大图浮层 和 FLASH浮层 共用此material，仅spec不同

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.landmark.Head');
goog.require('ad.widget.landmark.ImageFloat');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/landmark/old_button_group.less');
goog.include('ad/impl/landmark/head.less');
goog.include('ad/impl/landmark/old_big_image_float.less');

goog.provide('ad.impl.landmark.OldBigImageFloat');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var head = new ad.widget.landmark.Head(AD_CONFIG['head']);
    var imageFloat = new ad.widget.landmark.ImageFloat(AD_CONFIG['image_float']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);

    material.setWidgets(head, imageFloat, buttons);

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
