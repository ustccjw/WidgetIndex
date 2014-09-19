/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/

/*global COMPILED:false */


/**
 * src/ad/impl/imageplus/pa2.js ~ 2013/09/02 12:23:12
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * pa2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.widget.imageplus.Pa');
goog.require('ad.impl.imageplus.helper');
goog.require('ui.events');

goog.include('ad/impl/imageplus/pa2.less');

goog.provide('ad.impl.imageplus.Pa2');

ad.Debug(ad.impl.imageplus.helper.createIconAd(
    ad.widget.imageplus.Pa,
    {
        'after': function (adConfig, box) {
            if (COMPILED) {
                // 站内测试监控左上角tip按钮的点击率
                /**
                 * @type {ad.plugin.imageplus.ILoaderApi}
                 */
                var loaderApi = adConfig['api'];
                loaderApi.addListener(ui.events.TIP_CLICK, function () {
                    box.trigger(ui.events.SEND_LOG, {
                        'actionid': 6
                    });
                });
            }
        }
    }
));


















/* vim: set ts=4 sw=4 sts=4 tw=100  */
