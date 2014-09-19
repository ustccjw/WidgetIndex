/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/impl/imageplus/v2/dock_helper.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/01 11:48:10$
 */

goog.require('ad.widget.imageplus.v2.DockBox');
goog.require('ad.plugin.imageplus.Log');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.material.ImageplusMaterial');

goog.provide('ad.impl.imageplus.v2.dockHelper');

ad.impl.imageplus.v2.dockHelper = {
    /**
     * 创建icon类型的广告
     *
     * @param {Function} Widget class.
     * @param {Object=} opt_option .
     * @param {function(Object)=} opt_option.before 执行前回调
     * @param {function(Object, ad.widget.imageplus.Box)=} opt_option.after 执行后回调
     * @return {function(boolean=)} ad
     */
    createDockAd: function (Widget, opt_option) {
        var option = opt_option || {};

        /**
         * @param {boolean=} opt_async
         */
        return function (opt_async) {
            var material;
            var box;
            // 因为AD_CONFIG可能会被当前render的其他实例修改掉
            // 所以要保留一个变量指向旧的AD_CONFIG
            var adConfig = AD_CONFIG;

            if (option['before']) {
                option['before'](adConfig);
            }

            function rendAd() {
                material = new ad.material.ImageplusMaterial(adConfig['id']);
                material['adConfig'] = adConfig;
                box = new ad.widget.imageplus.v2.DockBox(adConfig);
                box.setWidgets([new Widget(adConfig)]);
                material.setWidgets([box]);
                material.show();
            }

            if (!COMPILED) {
                // 伪造一个id用于绘制
                adConfig['id'] = 'canvas';
            }
            rendAd();

            if (option['after']) {
                option['after'](adConfig, box);
            }

            return material;
        };
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
