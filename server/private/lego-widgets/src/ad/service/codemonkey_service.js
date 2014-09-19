/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/service/codemonkey_service.js ~ 2013/11/08 17:39:55
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 计数器服务
 * //timeliness.smrapp.baidu.com/leslie
 * 服务接口人：liuchao09, wenxianhui
 **/
goog.require('ad.service.Service');

goog.provide('ad.service.CodemonkeyService');

/**
 * @constructor
 * @param {string} clientId The Client Id.
 * @param {string} clientToken The Client Token.
 * @extends {ad.service.Service}
 */
ad.service.CodemonkeyService = function(clientId, clientToken) {
    ad.service.Service.call(this);

    /**
     * @private
     * @type {string}
     */
    this._clientId = clientId;

    /**
     * @private
     * @type {string}
     */
    this._clientToken = clientToken;
};
baidu.inherits(ad.service.CodemonkeyService, ad.service.Service);

/**
 * @param {string} param 额外的参数.
 * @return {string} 最终的url地址.
 */
ad.service.CodemonkeyService.prototype._buildUrl = function(param) {
    var host = RT_CONFIG.HOST('codemonkey.baidu.com') + '/bin/index.php';
    var params = [
        param,
        'ie=utf-8',
        'oe=utf-8',
        'client_id=' + this._clientId,
        'client_token=' + this._clientToken,
        't=' + new Date().getTime()
    ].join('&');

    return host + '?' + params;
};

/**
 * @param {string} url 最终要请求的url.
 * @param {function(?boolean, Object)} callback The callback.
 */
ad.service.CodemonkeyService.prototype._execute = function(url, callback) {
    baidu.sio.callByServer(url, function(object) {
        if (object['msg'] === 'ok' && object['status'] === 0) {
            callback(null, object['data']);
        }
        else {
            callback(object, null);
        }
    });
};

/**
 * 增加一次计数.
 * @param {function(?boolean, Object)} callback 成功之后的回掉函数.
 */
ad.service.CodemonkeyService.prototype.add = function(callback) {
    var url = this._buildUrl('add_count=true');
    this._execute(url, callback);
};

/**
 * 查询当前的计数.
 * @param {function(?boolean, Object)} callback 成功之后的回掉函数.
 */
ad.service.CodemonkeyService.prototype.get = function(callback) {
    var url = this._buildUrl('get_count=true');
    this._execute(url, callback);
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
