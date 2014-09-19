/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/plugin/SivaPsMonitor.js
 * desc:
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/05/24 12:22:04$
 */

// plugin type: AFTER_MATERIAL
// plugin context: AD_CONFIG, LINKS, RT_CONFIG
goog.require('ad.base');
goog.require('ui.events');
goog.require('ad.plugin.Plugin');
goog.require('ad.service.SivaClickService');

goog.provide('ad.plugin.SivaPsMonitor');

/**
 * 添加PS的监控统计
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.SivaPsMonitor = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.SivaPsMonitor';
}
baidu.inherits(ad.plugin.SivaPsMonitor, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.SivaPsMonitor());

/** @expose */
ad.plugin.SivaPsMonitor.prototype.attachTo = function(material) {
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function(){
        var fm = 'psiva';
        var mainUrl = ad.base.getObjectByName('global.main_url', AD_CONFIG);

        var cs = new ad.service.SivaClickService(/** @type {string} */ (fm));
        cs.init(material.getId(), /** @type {string} */(mainUrl));
    });
}



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
