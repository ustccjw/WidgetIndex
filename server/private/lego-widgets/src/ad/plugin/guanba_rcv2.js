/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/plugin/guanba_rcv2.js
 * desc:
 * author:  guyiling(guyiling@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/06/12 18:29:50$
 */
goog.require('ad.base');
goog.require('ui.events');
goog.require('ad.plugin.Plugin');
goog.require('ad.service.RCV2Service');

goog.provide('ad.plugin.GuanbaRcv2');

/**
 * 添加RCV2的监控统计
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.GuanbaRcv2 = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.GuanbaRcv2';
}
baidu.inherits(ad.plugin.GuanbaRcv2, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.GuanbaRcv2());

/** @expose */
ad.plugin.GuanbaRcv2.prototype.attachTo = function(material) {
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function(){
        // 添加RCV2的监控
        var params = ad.base.getObjectByName('pluginParam/ad.plugin.GuanbaRcv2', RT_CONFIG, '/');
        new ad.service.RCV2Service(material.getId(), null, null, {'extraParams': params});
    });
}





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
