/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/


/**
 * src/ad/impl/business_app/auto_show.js ~ 2013/03/13 14:14:29
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 150523 $
 * @description
 * auto_show相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Flash');
goog.include('ad/impl/business_app/flash.less');
goog.provide('ad.impl.business_app.Flash');

ad.Debug(function () {
    baidu.dom.setStyles(document.getElementsByTagName('body')[0], {
        'margin': 0,
        'padding': 0
    });

    // 设置页面高度
    function setIframeHeight(height) {
        var app = ad.base.getObjectByName('baidu.app');
        if (app && app['setHeight']) {
            app['setHeight'](height);
        }
    }
    var height = window['infoData'].height;
    height = height || 350;
    setIframeHeight(height);
    var material = new ad.Material('app_flash_id');
    material.setWidgets(
        [new ad.widget.Flash(window['infoData'])]
    );
    material.show();
    material.initMonitor('app_flash_main_url');
});


/* vim: set ts=4 sw=4 sts=4 tw=100: */
