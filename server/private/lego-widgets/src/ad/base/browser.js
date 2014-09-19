/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/browser.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:26:10$
 */

goog.provide('ad.browser');

ad.browser = ad.browser || {};

var r;
if (r = /msie (\d+\.\d)/i.exec(navigator.userAgent)) {
    /**
     * 判断是否为ie浏览器
     * IE 8下，以documentMode为准
     * @type {number} ie版本号
     */
    ad.browser.ie = document.documentMode || (+r[1]);
}

if (r = /firefox\/(\d+\.\d)/i.exec(navigator.userAgent)) {
    /**
     * 判断是否为firefox浏览器
     * @type {number} firefox版本号
     */
    ad.browser.firefox = (+r[1]);
}



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
