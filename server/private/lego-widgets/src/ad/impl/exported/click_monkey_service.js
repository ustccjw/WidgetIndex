/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/impl/exported/click_monkey_service.js ~ 2013/12/26 11:07:59
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/

goog.require('ad.Debug');
goog.require('ad.service.ClickMonkeyService');

goog.provide('ad.impl.exported.ClickMonkeyService');

ad.Debug(function(){
    /**
     * @param {string} plid 产品线的类型.
     * @param {string} canvasId 画布的Id.
     */
    return function(plid, canvasId) {
        var service = new ad.service.ClickMonkeyService(plid);
        service.init(canvasId);
    }
});





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
