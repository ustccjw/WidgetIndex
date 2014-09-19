/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/

/*global COMPILED:false */


/**
 * src/ad/impl/imageplus/helper.js ~ 2013/11/15 15:48:00
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * impl的相关帮助函数
 **/
goog.require('ad.widget.imageplus.Box');
goog.require('ad.plugin.imageplus.Log');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.material.ImageplusMaterial');

goog.provide('ad.impl.imageplus.helper');

ad.impl.imageplus.helper = {
    /**
     * 创建icon类型的广告
     *
     * @param {Function} Widget class.
     * @param {Object=} opt_option .
     * @param {function(Object)=} opt_option.before 执行前回调
     * @param {function(Object, ad.widget.imageplus.Box)=} opt_option.after 执行后回调
     * @return {function(boolean=)} ad
     */
    createIconAd: function (Widget, opt_option) {
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
                material.setRender(new ad.render.ImageplusRender());
                material['adConfig'] = adConfig;
                box = new ad.widget.imageplus.Box(adConfig);
                box.setWidgets([new Widget(adConfig)]);

                // 绑定鼠标事件，监听时间并发送记录给后端
                var startMouseOver;
                box.addListener(ui.events.MOUSE_OVER, function () {
                    startMouseOver = new Date();
                    material.trigger(ui.events.SEND_LOG, 1);
                });
                box.addListener(ui.events.MOUSE_OUT, function () {
                    material.trigger(
                        ui.events.SEND_LOG,
                        3,
                        (new Date() - startMouseOver) / 1000
                    );
                });

                // 显示
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
