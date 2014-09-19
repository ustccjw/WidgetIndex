/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/


/**
 * src/ad/impl/app/ping_an.js ~ 2013/07/16 14:11:43
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 150523 $
 * @description
 * ping_an相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.BaiduApp');

goog.include('ad/impl/app/ping_an.less');
goog.provide('ad.impl.app.PingAn');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var app = new ad.widget.BaiduApp(AD_CONFIG['app']);
    material.setWidgets(
        [app]
    );
    if (async === true) {
        return material;
    }
    material.show();
    app.sendLog('平安计算器pv', 'pv');
});


/* vim: set ts=4 sw=4 sts=4 tw=100: */
