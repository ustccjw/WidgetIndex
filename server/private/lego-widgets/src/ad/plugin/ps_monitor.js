/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/plugin/psMonitor.js
 * desc:
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/05/24 12:22:04$
 */
goog.require('ad.base');
goog.require('ui.events');
goog.require('ad.plugin.Plugin');
goog.require('ad.service.ClickService');

goog.provide('ad.plugin.PsMonitor');

/**
 * 添加PS的监控统计
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.PsMonitor = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.PsMonitor';
}
baidu.inherits(ad.plugin.PsMonitor, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.PsMonitor());

/** @expose */
ad.plugin.PsMonitor.prototype.attachTo = function(material) {
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function(){
        var fm = ad.base.getObjectByName('pluginParam/ad.plugin.PsMonitor/fm', RT_CONFIG, '/');
        var rsvPart = ad.base.getObjectByName('pluginParam/ad.plugin.PsMonitor/rsv_part', RT_CONFIG, '/');

        // 如果在普通华彩物料中使用ad.plugin.PsMonitor，大部分情况下
        // main_url是配置在AD_CONFIG下面的，不是在AD_CONFIG['global']下面，因此
        // 需要兼容一下这种情况.
        var mainUrl = ad.base.getObjectByName('global.main_url', AD_CONFIG) || AD_CONFIG['main_url'];

        var cs = new ad.service.ClickService(/** @type {string} */ (fm), /** @type {string} */ (rsvPart));
        cs.init(material.getId(), /** @type {string} */(mainUrl));
    });
}



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
