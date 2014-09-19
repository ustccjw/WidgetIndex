/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/wrapper.js ~ 2013/07/31 18:13:38
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 * 包装一下ad.Debug的参数，方便异步投放时候来使用.
 **/
goog.provide('ad.Wrapper');

/**
 * @constructor
 * @param {function(boolean)} main 主入口.
 */
ad.Wrapper = function(main) {
    /**
     * @type {function(boolean)}
     */
    this._main = main;

    /**
     * 最后一次生成的material示例
     * @private
     */
    this._m;
};

/**
 * @expose
 * @param {boolean=} opt_async 是否是异步的方式调用.
 * @param {boolean=} opt_noDispose 强制不dispose
 * 当同一个wrapper需要被调用两次时，设置此值为true.
 * @return {?}
 */
ad.Wrapper.prototype.start = function(opt_async, opt_noDispose) {
    if (!opt_noDispose && this._m) {
        this._m.dispose();
    }
    return (this._m = this._main(!!opt_async));
};

/**
 * 在异步接口的情况下，如果需要更新AD_CONFIG, LINKS, RT_CONFIG
 * 请调用这个接口。如果传递的是null，则不会修改原来的引用.
 * @param {string} name 要设置的名称.
 * @param {?} value 要设置的值.
 * @expose
 */
ad.Wrapper.prototype.set = function(name, value) {
    if (name === 'AD_CONFIG') {
        AD_CONFIG = value;
    } else if (name === 'LINKS') {
        LINKS = value;
    } else if (name === 'RT_CONFIG') {
        RT_CONFIG = value;
    }
};

/**
 * 获取AD_CONFIG，LINKS, RT_CONFIG的内容
 * @return {?}
 * @expose
 */
ad.Wrapper.prototype.get = function(name) {
    if (name === 'AD_CONFIG') {
        return AD_CONFIG;
    } else if (name === 'LINKS') {
        return LINKS;
    } else if (name === 'RT_CONFIG') {
        return RT_CONFIG;
    } else if (name === 'AD_STYLE_CONTENT') {
        return AD_STYLE_CONTENT;
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
