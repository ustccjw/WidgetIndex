/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/spec/util.js
 * desc:    spec相关工具类函数
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/08/01 20:59:00$
 */

goog.require('ad.spec.Walker');
goog.provide('ad.spec.util');

/**
 * @type {Object}
 * @const
 */
ad.spec.util = {
    /**
     * 根据spec创建walker
     * @param {Array.<Object>} spec
     * @param {Object} adConfig 用户数据
     */
    buildWalker: function(spec, adConfig) {
        return new ad.spec.Walker(spec, adConfig);
    },

    /**
     * @param {string} key 键
     * @param {*} value 值
     * @return {string} 类型
     */
    guessType: function(key, value) {
        var urlLoose = /^((http|https):\/\/)?[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/i;
        if (baidu.lang.isBoolean(value)) {
            return 'bool';
        }
        else if (baidu.lang.isNumber(value)) {
            return 'number';
        }
        else if (baidu.lang.isString(value)) {
            if (urlLoose.test(value)
                && (/url$/.test(key)
                    || /link$/.test(key)
                    || /site$/.test(key)
                )
            ) {
                return 'url';
            }
            else {
                return 'text';
            }
        }
        else if (baidu.lang.isObject(value)) {
            return 'object';
        }
        else {
            return 'text';
        }
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
