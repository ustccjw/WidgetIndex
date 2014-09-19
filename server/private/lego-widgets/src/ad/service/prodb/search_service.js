/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: search_service.js 13639 2012-10-31 09:33:49Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/service/prodb/search_service.js ~ 2012/06/08 00:32:13
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 13639 $
 * @description
 *
 **/

goog.require('ad.service.Service');

goog.provide('ad.service.prodb.SearchService');

/**
 * @constructor
 * @extends {ad.service.Service}
 */
ad.service.prodb.SearchService = function() {
    ad.service.Service.call(this);

    this._url = RT_CONFIG.HOST('wbapi.baidu.com') + '/service/product/query';
};
baidu.inherits(ad.service.prodb.SearchService, ad.service.Service);

/**
 * @param {string} parameters 提交请求的参数.
 * @param {Function=} opt_callback 成功之后的回调函数.
 */
ad.service.prodb.SearchService.prototype.search = function(parameters, opt_callback) {
    var url = this._url + (parameters ? ('?' + parameters) : '');
    baidu.sio.callByServer(url, (opt_callback || baidu.fn.blank));
};


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
