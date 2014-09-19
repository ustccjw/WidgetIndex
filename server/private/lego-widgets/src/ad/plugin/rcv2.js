/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/plugin/rcv2.js
 * desc:
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/05/24 12:04:28$
 */
goog.require('ad.dom');
goog.require('ad.plugin.Plugin');
goog.require('ad.service.RCV2Service');
goog.require('ui.events');

goog.provide('ad.plugin.Rcv2');

/**
 * 添加RCV2的监控统计
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.Rcv2 = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.Rcv2';
};
baidu.inherits(ad.plugin.Rcv2, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.Rcv2());

/** @expose */
ad.plugin.Rcv2.prototype.attachTo = function(material) {
    var rcv2;
    var missedNewCanvas = [];

    function canvasHandler(canvasId) {
        if (rcv2) {
            rcv2.attachTo(baidu.g(canvasId));
        }
        else {
            missedNewCanvas.push(canvasId);
        }
    }

    function afterHandler() {
        var root = material.getRoot();
        if (root && root.parentNode && /^ec-siva-/.test(root.parentNode.id)) {
            // SIVA的物料在一个<div id="ec-siva-***">的容器里面
            return;
        }

        // 自动会调用rcv2.init();
        var config = ad.base.getObjectByName('pluginParam/ad.plugin.Rcv2/config', RT_CONFIG, '/');
        rcv2 = new ad.service.RCV2Service(material.getId(), null, null, /** @type {Object} */(config));

        if (missedNewCanvas.length) {
            baidu.each(missedNewCanvas, function(canvasId) {
                rcv2.attachTo(baidu.g(canvasId));
            });
            missedNewCanvas.length = 0;
        }

        // 让rcv2处理widget发出的SEND_LOG事件.
        // TODO(user) 优化一下实现的方式？比如用冒泡或者其它的方案，避免每次forEach的遍历.
        material.forEach(function(widget) {
            widget.addListener(ui.events.SEND_LOG, function(params) {
                var title = params['action'];
                var xp = params['xp'] || ad.dom.getXPath(params['__node']);
                rcv2.sendLog({
                    'linkName': title,
                    'xp': xp
                });
            });
        });
    }

    // 重跑错过了的事件，然后后续事件由监听函数接管
    material.addListener(ui.events.AFTER_MATERIAL_SHOW, afterHandler, true);
    material.addListener(ui.events.NEW_AD_CANVAS, canvasHandler, true);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
