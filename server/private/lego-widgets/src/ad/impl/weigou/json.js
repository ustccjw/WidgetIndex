/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/json.js ~ 2013/05/02 17:46:21
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.impl.weigou.dist');

goog.provide('ad.impl.weigou.json');

/**
 * 将字符串解析成json对象。注：不会自动祛除空格
 * @param {string} source 需要解析的字符串.
 * @return {*} 解析结果json对象.
 */
ad.impl.weigou.json.parse = function(source) {
    if (ad.impl.weigou.dist.IPAD ||
        ad.impl.weigou.dist.MOBILE) {
        return JSON.parse(source);
    } else {
        return baidu.json.parse(source);
    }
};

/**
 * 将json对象序列化
 * @param {*} object 需要序列化的json对象.
 * @return {string} 序列化后的字符串.
 */
ad.impl.weigou.json.stringify = function(object) {
    if (ad.impl.weigou.dist.IPAD ||
        ad.impl.weigou.dist.MOBILE) {
        return JSON.stringify(object);
    } else {
        return baidu.json.stringify(object);
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
