/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: wdw.js  2012-07-16 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/wdw.js ~ 2012/07/16 11:47:13
 * @author wangdawei
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageMultiRegion');
goog.require('ad.widget.ButtonGroup');
goog.include('ad/impl/wdw.less');

goog.provide('ad.impl.Wdw');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG ['id']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [new ad.widget.Section(AD_CONFIG['section'])],
        [new ad.widget.ImageMultiRegion(AD_CONFIG['image_multi_region'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group'],{'isauto':false})]
    );
    if (async === true) {
    	return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
