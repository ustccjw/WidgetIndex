/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/plugin/imageplus/log.js
 * desc:
 * author:  zhouminming01(zhouminming01@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/09/12 12:14:59$
 */
goog.require('ad.base');
goog.require('ad.plugin.Plugin');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ui.events');

goog.provide('ad.plugin.imageplus.Log');

/**
 * 添加imageplus.Log的监控统计
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.imageplus.Log = function () {
    ad.plugin.Plugin.call(this);
};
baidu.inherits(ad.plugin.imageplus.Log, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.imageplus.Log());

/**
 * 发送监控
 *
 * @param {Object} adConfig 配置
 * @param {number} actionid 1表示物料显示;
 *                          2表示点击，此时
 *                              attach为1表示从icon点击
 *                              attach为0表示从其他地方点击;
 *                          3表示物料隐藏，此时attach表示展示的时长;
 *                          4表示物料初次展现;
 *                          5贴片样式关闭，不再展现；
 *                          6表示右上角tip按钮点击;
 *                          7表示只是icon展现;
 *                          9表示行为点击(不需要计费的点击)：比如切换图片等
 * @param {string=} opt_attach 显示的时间.
 */
ad.plugin.imageplus.Log.prototype._sendLog =
    function (adConfig, actionid, opt_attach) {
        var me = this;
        if (adConfig['encry_url']) {
            me._log(adConfig, actionid, opt_attach);
        }
    };

/**
 * 发送监控
 *
 * @param {Object} adConfig 配置
 * @param {number} actionid 1表示物料显示;
 *                          2表示点击，此时
 *                              attach为1表示从icon点击
 *                              attach为0表示从其他地方点击;
 *                          3表示物料隐藏，此时attach表示展示的时长;
 *                          4表示物料初次展现;
 *                          5贴片样式关闭，不再展现；
 *                          6表示右上角tip按钮点击;
 *                          7表示只是icon展现;
 * @param {string=} opt_attach 显示的时间.
 */
ad.plugin.imageplus.Log.prototype._log = function (adConfig, actionid, opt_attach) {
    var timeQuery = '&time=' + new Date().getTime();
    var url = adConfig['encry_url']
        + '&actionid=' + actionid
        + '&attach=' + (opt_attach || 0)
        // clear cache
        + timeQuery;

    if (actionid === 4) {
        if (adConfig['notice_url']) {
            baidu.sio.log(adConfig['notice_url']);
        }

        this.sendRecordedTime(adConfig);
    }

    baidu.sio.log(url);
};

/** @expose */
ad.plugin.imageplus.Log.prototype.attachTo = function (material) {
    var me = this;

    material.addListener(ui.events.AFTER_MATERIAL_SHOW, function () {
        me._sendLog(material['adConfig'], 4);
    });

    material.addListener(ui.events.SEND_LOG, function (actionId, attach) {
        if (actionId['actionid']) {
            // 处理输入为：{actionid: 2, attach: 1}的情况.
            attach = actionId['attach'];
            actionId = actionId['actionid'];
        }

        me._sendLog(material['adConfig'], actionId, attach);
    });

};

/**
 * 发送记录的时间点
 *
 *  &action_id=8
 *  &loading=12312321&
 *  loaded=123123&
 *  showed=123123
 *  &render_loaded=233
 *  &render=sticker/pa.app.js
 *  &union_id=xxxx
 *
 * @param {Object} adConfig .
 */
ad.plugin.imageplus.Log.prototype.sendRecordedTime = function (adConfig) {
    /**
     * loader api
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var api = adConfig['api'];
    var encryUrl = adConfig['encry_url'];

    if (!api.version || api.version < '1.0.0') {
        // 如果不支持api，则不发日志了
        return;
    }

    api.recordTime('showed', new Date().getTime());
    var recordedTime = api.getRecordedTime();
    if (!recordedTime) {
        return;
    }

    for (var i = 0, l = recordedTime.length; i < l; i++) {
        var timePoint = recordedTime[i];
        encryUrl += '&'
            + timePoint['type'] + '='
            + timePoint['time'];
    }

    encryUrl += '&render=' + encodeURIComponent(api.getRenderUrl());
    encryUrl += '&union_id=' + api.getLoaderConfig('unionId', '');
    encryUrl += '&actionid=8';
    baidu.sio.log(encryUrl);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
