/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/business_app/auto_show_list.js ~ 2013/03/20 12:43:52
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * auto_show_list相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.business_app.AppListTitle');
goog.require('ad.widget.business_app.AppList');

goog.include('ad/impl/business_app/auto_show_list.less');

goog.provide('ad.impl.business_app.AutoShowList');

ad.Debug(function(){
    baidu.dom.setStyles(document.getElementsByTagName('body')[0], {
        'margin': 0,
        'padding': 0
    });
    var title = new ad.widget.business_app.AppListTitle(AD_CONFIG['title']);
    var appFrame = new ad.widget.Iframe({});
    var loadingFrame = new ad.widget.Iframe({});
    var appList = new ad.widget.business_app.AppList(AD_CONFIG['app_list']);

    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [title],
        [appList],
        [appFrame],
        [loadingFrame]
    );
    material.show();

    appFrame.hide();
    loadingFrame.hide();
    var root = material.getRoot();
    var currentApp;

    function showLoadingFrame() {
        if (!showLoadingFrame.inited) {
            var loading = baidu.dom.first(loadingFrame.getRoot());
            loading.innerHTML = '<div class="ad-widget-iframe-loading">' +
                    '<p>' +
                        '<img src="//bs.baidu.com/adtest/4fd7b8a9c56a730990f75da5747b564e.gif"/>' +
                    '</p>' +
                    '<p>正在努力为您加载，请稍作等待…</p>' +
                '</div>';
            showLoadingFrame.inited = true;
        }
        loadingFrame.show();
    }

    // load app
    appList.addListener(ui.events.START_LOAD_APP, function(appData) {
        currentApp = appData;
        // 显示iframe隐藏list
        showLoadingFrame();
        appList.hide();
        // 修改页面高度
        baidu.dom.addClass(root, 'auto-show-app-page');
        setIframeHeight(375);
        // 更新title
        title.refresh(null, {
            'app': {
                'icon': null,
                'name': '',
                'place': '',
                'url': null
            }
        });
        // 设置iframe的url
        var url = appData['url'];
        if (url.indexOf('?') > 0) {
            url += '&spfrom=applist';
        } else {
            url += '?spfrom=applist';
        }
        appFrame.refresh(null, {
            "width" : 540,
            "height" : 338,
            "src" : url
        });
    });

    appFrame.addListener(ui.events.LOAD, function() {
        loadingFrame.hide();
        appFrame.show();
    });

    // back to list
    title.addListener(ui.events.BACK, function() {
        currentApp = null;
        // 更新title
        title.refresh(null, AD_CONFIG['title']);
        // 显示list隐藏iframe
        appFrame.hide();
        loadingFrame.hide();
        appList.show();
        // 修改高度
        baidu.dom.removeClass(root, 'auto-show-app-page');
        setIframeHeight(334);   // 456
    });

    // 点击“官方网站”时，发送log
    title.addListener(ui.events.CLICK_HOME_URL, function() {
        sendLogToApp('CLICK_HOME_FROM_LIST');
    });

    // 设置proxy的回调函数
    window['showAutoMakerInfo'] = function(icon, name, place, url) {
        title.refresh(null, {
            'app': {
                'icon': icon,
                'name': name,
                'place': place,
                'url': url
            }
        });
    };

    // 设置页面高度
    function setIframeHeight(height) {
        var app = ad.base.getObjectByName('baidu.app');
        if (app && app['setHeight']) {
            app['setHeight'](height);
        }
    }

    /**
     * 发送日志给app
     * 通过修改iframe的hash的方式实现，必须iframe的url没有hash值
     *
     * @param {string} log
     */
    function sendLogToApp(log) {
        // 如果没有显示app，或显示的app是用户自定义的则不用发邮件了
        if (!currentApp || currentApp['customized']) {
            return;
        }

        var iframe = baidu.dom.query('iframe', appFrame.getRoot())[0];
        if (iframe) {
            var url = iframe.src;
            if (url.indexOf('#') < 0) {
                iframe.src = url + '#sendlog=' + log;
            } else {
                iframe.src = url.match(/[^#]+#/)[0] + 'sendlog=' + log + '&random=' + Math.random();
            }
        }
    }

    // 设置默认列表页的iframe高度
    setIframeHeight(334);   // 456
    title.sendLog('PL_SHOWED');
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
