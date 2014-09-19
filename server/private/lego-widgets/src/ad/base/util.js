/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/util.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:21:03$
 */

goog.provide('ad.util');

/**
 * 预加载图片
 * @param {string} url 图片地址
 * @param {function({width: number, height: number})} callback 回调函数，图片加载完之后执行此函数
 * @param {*=} opt_scope 可选，作用域，用于回调函数
 */
ad.util.loadImage = function(url, callback, opt_scope) {
    var me = opt_scope || null;
    // 创建一个Image对象，实现图片的预下载
    var img = new Image();
    img.src = url;

    // 如果图片已经存在于浏览器缓存，直接调用回调函数
    if (img.complete) {
        callback.call(me, {
            'width': img.width,
            'height': img.height
        });
        return;
    }

    // 图片下载完毕时异步调用callback函数。
    img.onload = function () {
        img.onload = null;
        callback.call(me, {
            'width': img.width,
            'height': img.height
        });
    };
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
