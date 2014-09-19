/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: request_worker.js 9564 2012-06-06 04:43:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/jn/net/worker.js ~ 2012/01/20 16:00:53
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 9564 $
 * @description
 * Request Worker
 **/

goog.require('Requester');
goog.require('base.AbstractWorker');
goog.require('er.template');

goog.provide('jn.net.RequestWorker');

/**
 * 访问远程的数据
 * @constructor
 * @extends {base.AbstractWorker}
 * @param {string} url url地址.
 * @param {...*} var_args 请求参数.
 */
jn.net.RequestWorker = function(url, var_args) {
    base.AbstractWorker.call(this);

    var me = this;
    me.callback = arguments[arguments.length - 1];
    me.args = [];
    for (var i = 0; i < arguments.length - 1; i++) {
        me.args.push(arguments[i]);
    }
    if (arguments.length === 2) {
        me.args.push(null);
    }
    me.args.push(function() {
        me.callback.apply(window, arguments);
        me.done();
    });
};
baidu.inherits(jn.net.RequestWorker, base.AbstractWorker);

/** @inheritDoc */
jn.net.RequestWorker.prototype.start = function() {
    Requester.post.apply(Requester, this.args);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
