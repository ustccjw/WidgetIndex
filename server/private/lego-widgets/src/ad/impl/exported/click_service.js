/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/exported/click_service.js ~ 2013/12/26 10:35:00
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * click_service相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.service.ClickService');

goog.provide('ad.impl.exported.ClickService');

ad.Debug(function(){
    /**
     * @param {string} product 产品线的类型.
     * @param {string} rsvPart 点击的区域类型(品专，知道，百科等等，这个事先需要跟UBS的同学约定).
     * @param {string} canvasId 画布的Id.
     */
    return function(product, rsvPart, canvasId) {
        var service = new ad.service.ClickService(product, rsvPart);
        service.init(canvasId);
    }
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
