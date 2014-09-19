/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: wp.js 13954 2012-11-06 08:29:57Z songao $
 *
 **************************************************************************/



/**
 * src/ad/test/wp.js ~ 2012/09/05 21:14:13
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 13954 $
 * @description
 * 展示某个模块的配置内容
 **/
goog.require('ad.json.Schema');
goog.require('ad.test.Widget');
goog.require('ui.pref.WidgetPreference');

//goog.include('css/ui-layouteditor.less');
goog.include('css/ui-mateditor.css');

goog.provide('ad.test.wp');

/**
 * 展示某个widget的配置信息
 */
ad.test.wp = function() {
    /*
    baidu.on(window, 'scroll', function() {
        var pos = baidu.dom.getPosition(document.querySelector('.span6')),
            scrollTop = baidu.page.getScrollTop(),
            material = document.querySelector('.material');
        if (scrollTop > pos.top) {
            material.style.position = 'fixed';
            material.style.top = '20px';
        } else {
            material.style.position = 'static';
        }
    });
    */
};

/**
 * @private
 * @type {string}
 */
ad.test.wp._CURRENT_NS = null;

/**
 * @param {string} ns the widget's namespace.
 * @param {Function=} opt_callback style change callback.
 */
ad.test.wp.loadWidget = function(ns, opt_callback) {
    if (!baidu.g('wp')) {
        return false;
    }

    if (ns == ad.test.wp._CURRENT_NS) {
        return false;
    }

    var ctor = goog.getObjectByName(ns);
    if (!ctor) {
        alert("Can't find " + ns + ' constructor.');
        return false;
    }

    ad.test.wp._loadWidgetImpl(ns, opt_callback);
};

/**
 * @param {string} ns the widget's namespace.
 * @param {Function=} opt_callback style change callback.
 */
ad.test.wp._loadWidgetImpl = function(ns, opt_callback) {
    var info = ad.test.Widget.getInfo(ns);
    if (!info) {
        return;
    }

    var file = info['file'];
    var config_file = file.replace(/\.js/, '.config.js');
    baidu.ajax.get(ad.test.url.getAbsolute(config_file) + '?.stamp=' + Math.random(), function(xhr) {
        var code = xhr.responseText;
        var WIDGET_CONFIG = eval('(function(){' + code + ';return WIDGET_CONFIG;})();');

        if (typeof WIDGET_CONFIG == 'undefined') {
            return false;
        }

        var detector = new ad.json.Schema();
        var schema = detector.guess(WIDGET_CONFIG);
        var wp_schema = detector.format_wp(schema);

        var wp = new ui.pref.WidgetPreference(wp_schema, 'Ad Preference Editor', 'wp');
        baidu.g('wp').innerHTML = wp.toForm();
        wp.bindEvent();

        var instance = null;
        wp.addListener(ui.events.FORM_CHANGE, function() {
            var config = wp.getValue();
            window.console.log(config);
            /*
            if (!instance) {
                var ctor = goog.getObjectByName(ns);
                if (ctor) {
                    instance = new ctor(config);
                }
            }*/
            /* (TODO) leeight
            if (instance) {
                instance.refresh(baidu.g('material'), config);
            }*/
        });
        ad.test.wp._WP_INSTANCE = wp;
        ad.test.wp._CURRENT_NS = ns;

        if (baidu.lang.isFunction(opt_callback)) {
            opt_callback(wp);
        }
    });
};

/**
 * @private
 * @type {Function}
 */
ad.test.wp._OLD_GET_OBJECT = ui.pref.util.getObject;

/**
 * @private
 * @type {Object}
 */
ad.test.wp._WP_INSTANCE = null;

ui.pref.util.getObject = function(domId, strClass, opt_mode) {
    if (strClass === 'ui.pref.WidgetPreference') {
        return ad.test.wp._WP_INSTANCE;
    } else {
        return ad.test.wp._OLD_GET_OBJECT(domId, strClass, opt_mode);
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
