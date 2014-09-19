/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/

/*global COMPILED:false */


/**
 * src/ad/impl/imageplus/sticker_helper.js ~ 2014/03/05 15:48:00
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * impl的相关帮助函数
 **/
goog.require('ad.widget.imageplus.StickerBox');
goog.require('ad.plugin.imageplus.Log');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.material.ImageplusMaterial');

goog.provide('ad.impl.imageplus.stickerHelper');

ad.impl.imageplus.stickerHelper = {
    /**
     * 创建icon类型的广告
     *
     * @param {Function} Widget class.
     * @param {Object=} opt_option .
     * @param {function(Object)=} opt_option.before 执行前回调
     * @param {function(Object, ad.widget.imageplus.Box)=} opt_option.after 执行后回调
     * @return {function(boolean=)} ad
     */
    createStickerAd: function (Widget, opt_option) {
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
                box = new ad.widget.imageplus.StickerBox(adConfig);
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
