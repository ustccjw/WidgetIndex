/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/plugin/speedup.js ~ 2013/09/18 13:20:31
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 广告的渲染速度统计，当时跟wangjunjie@baidu.com约定的接口
 * speedup.baidu.com
 * http://www.baidu.com/nocache/fesplg/s.gif?product_id=45&page_id=901&adv_id=foo-bar&time=123&_t=随机数
 **/
goog.require('ad.url');
goog.require('ad.plugin.Plugin');
goog.require('app.log.send');
goog.require('ui.events');

goog.provide('ad.plugin.Speedup');

/**
 * 统计物料的渲染时间.
 * @implements {ad.plugin.Plugin}
 * @constructor
 */
ad.plugin.Speedup = function() {
    ad.plugin.Plugin.call(this);
    this._name = 'ad.plugin.Speedup';
};
baidu.inherits(ad.plugin.Speedup, ad.plugin.Plugin);
ad.plugin.Plugin.register(new ad.plugin.Speedup());

/** @expose */
ad.plugin.Speedup.prototype.attachTo = function(material) {
    var rcv2Url = RT_CONFIG['RCV2_URL'];

    function sendTimeStat() {
        var mid = material.getId();
        var now = new Date();
        var hour = now.getHours();
        var logFlag = (hour < 8 && hour > 0) || Math.random() < 0.25; // 展现量太大, 25%的采样率就够了
        if (logFlag) {
            var matches = /m(\d+)_canvas/.exec(mid);
            if (!matches) {
                return ;
            }
            var mcid = matches[1];
            var begin = 'm' + mcid + '_BEGIN';
            if (typeof window[begin] === 'number') {
                var attachStr = '&jsLoadTime=' + (now - window[begin]);

                var end = 'm' + mcid + '_END';
                if (typeof window[end] === 'number' && window[end] > window[begin]) {
                    // 很多样式window[end] == window[begin]
                    attachStr += ('&renderTime=' + (window[end] - window[begin]));
                }

                if (RT_CONFIG['timestamp']) {
                    attachStr += ('&tid=' + RT_CONFIG['timestamp']);
                }

                rcv2Url = ad.url.normalize(rcv2Url);
                app.log.send(rcv2Url + '&attach=' + encodeURIComponent(attachStr));
            }
        }
    }
    if (rcv2Url && rcv2Url.indexOf('http://bzclk.baidu.com/') === 0) {
        material.addListener(ui.events.AFTER_MATERIAL_SHOW, sendTimeStat);  // 没必要重跑，因为不会错过
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
