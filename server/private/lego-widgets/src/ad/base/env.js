/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/env.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/28 20:17:31$
 */

goog.provide('ad.env');

/**
 * @const
 * @type {boolean}
 */
ad.env.isIpad = /ipad/i.test(navigator.userAgent);

/**
 * 监测是不是在服务器端运行js脚本，比如jsdom或者rhino
 */
ad.env.isServer = (navigator.appName === 'Node.js jsDom');

/**
 * 判断是否是siva的广告，如果是的话，默认走FLAGS_auto_decorate=true的逻辑.
 * @return {boolean}
 */
ad.env.isSiva = function() {
    if (typeof AD_TEMPLATE_CONTENT === 'string' &&
        /AD_ad_widget_siva_/.test(AD_TEMPLATE_CONTENT)) {
        return true;
    }
    return false;
};


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
