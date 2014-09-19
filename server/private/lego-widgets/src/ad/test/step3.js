/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: step3.js 12776 2012-10-15 03:08:37Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/step3.js ~ 2012/10/12 10:13:23
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 12776 $
 * @description
 * 修改Widget的配置信息
 **/
goog.require('ad.Material');
goog.require('ad.test.Widget');
goog.require('ad.test.style');
goog.require('ad.test.url');
goog.require('ad.test.wp');

goog.provide('ad.test.step3');

/**
 * @param {string} ns Widget的命名空间.
 * @param {Function=} opt_callback style change callback.
 */
ad.test.step3.loadWidget = function(ns, opt_callback) {
    var info = ad.test.Widget.getInfo(ns);
    if (!info) {
        throw new Error('Invalid ns, can\'t find *.config.js');
    }

    var file = info['file'];
    var config = file.replace(/\.js/, '.config.js');

    var material = null;
    baidu.ajax.get(ad.test.url.getAbsolute(config) + '?.stamp=' + Math.random(), function(xhr) {
        var code = xhr.responseText;
        var WIDGET_CONFIG = eval('(function(){' + code + ';return WIDGET_CONFIG;})();');

        if (material) {
            material.dispose();
        }

        var canvas = baidu.g('ad-canvas');
        canvas.innerHTML = '<div id="ec-ma-8964"></div>';

        COMPILED = true;
        var ctor = goog.getObjectByName(ns);
        var material = new ad.Material('ec-ma-8964');
        material.setWidgets(
            [new ctor(WIDGET_CONFIG)]
        );
        material.show();
        COMPILED = false;

        if (baidu.lang.isFunction(opt_callback)) {
            opt_callback(material);
        }
    });
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
