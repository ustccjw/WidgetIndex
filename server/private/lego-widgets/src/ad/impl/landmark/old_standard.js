/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/old_standard.js ~ 2013/12/05 15:05:06
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * old_standard相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.landmark.Head');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/landmark/old_button_group.less');
goog.include('ad/impl/landmark/head.less');
goog.include('ad/impl/landmark/old_standard.less');

goog.provide('ad.impl.landmark.OldStandard');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var head = new ad.widget.landmark.Head(AD_CONFIG['head']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);
    material.setWidgets(head, section, buttons);

    if (async === true) {
        return material;
    }
    material.show();
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
