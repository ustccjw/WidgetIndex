/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: click_monkey_service.js 15674 2012-12-18 05:16:53Z wangdawei04 $
 *
 **************************************************************************/



/**
 * src/ad/service/click_monkey_service.js ~ 2012/06/18 15:55:26
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 15674 $
 * @description
 * Click Monkey点击监控
 **/
goog.require('ad.service.Service');

goog.provide('ad.service.ClickMonkeyService');

/**
 * @constructor
 * @param {string} plid 物料id.
 * @extends {ad.service.Service}
 */
ad.service.ClickMonkeyService = function(plid) {
    ad.service.Service.call(this);

    /**
     * @private
     * @type {string}
     */
    this._plid = plid;

    /**
     * cm文件的加载地址.
     * @type {string}
     * @private
     */
    this._url = RT_CONFIG.HOST('eiv.baidu.com') + '/mapm2/logClick/logClick5.js';
};
baidu.inherits(ad.service.ClickMonkeyService, ad.service.Service);

/**
 * @override
 * @expose
 * @param {string} domId 容器id.
 */
ad.service.ClickMonkeyService.prototype.init = function(domId) {
    var cm = window['ClickMonkey'],
        plid = this.getPlid(domId);
    if (cm && cm['setTemplate']) {
        cm['setTemplate'](domId, plid);
    } else {
        baidu.sio.callByBrowser(this._url, function() {
            if (window['ClickMonkey'] && window['ClickMonkey']['setTemplate']) {
                window['ClickMonkey']['setTemplate'](domId, plid);
            }
        });
    }
};

/**
 * 获取plid
 * @param {string=} opt_domId 容器id.
 * @return {string}
 */
ad.service.ClickMonkeyService.prototype.getPlid = function(opt_domId) {
    if (this._plid && this._plid.replace('PLID', 'IDPL') != '%IDPL%') {
        return this._plid;
    }
    else if (opt_domId) {
        return opt_domId.replace(/ec-ma-/g, '');
    }
    else {
        return '';
    }
};

/**
 * 发送clickmonkey的统计请求.
 * @param {Object} params 请求参数.
 */
ad.service.ClickMonkeyService.prototype.sendLog = function(params) {
    var queries = baidu.url.jsonToQuery(params, function(value, key) {
        return encodeURIComponent(value);
    });
    new Image().src = RT_CONFIG.HOST('clkmk.baidu.com') + '/clkmk-rcv/rcv?' + queries;
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
