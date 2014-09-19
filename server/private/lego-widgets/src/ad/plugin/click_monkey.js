/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/plugin/clickMonkey.js
 * desc:
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/05/24 12:14:59$
 */
goog.require('ad.base');
goog.require('ad.plugin.Plugin');
goog.require('ad.service.ClickMonkeyService');
goog.require('ui.events');

goog.provide('ad.plugin.ClickMonkey');

/**
 * 添加ClickMonkey的监控统计
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.ClickMonkey = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.ClickMonkey';
};
baidu.inherits(ad.plugin.ClickMonkey, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.ClickMonkey());

/** @expose */
ad.plugin.ClickMonkey.prototype.attachTo = function(material) {
    var cms;

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function() {
        var plid = ad.base.getObjectByName('pluginParam/ad.plugin.ClickMonkey/plid', RT_CONFIG, '/');
        cms = new ad.service.ClickMonkeyService(/** @type {string} */ (plid));
        material.forEach(function(widget) {
            widget.addListener(ui.events.SEND_LOG, function(params) {
                var title = params['action'];
                var xp = params['xp'] || '';
                cms.sendLog({
                    'r' : new Date().valueOf(),
                    'q' : (window['bdQuery'] || ''),
                    'xp' : xp,
                    'plid' : cms.getPlid(material.getId()),
                    'title' : (title)
                });
            });
        });
        cms.init(material.getId());
    });

    // material新增了一个canvas，需要给这个canvas也绑定事件处理函数.
    material.addListener(ui.events.NEW_AD_CANVAS, function(canvasId) {
        cms.init(canvasId);
    });
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
