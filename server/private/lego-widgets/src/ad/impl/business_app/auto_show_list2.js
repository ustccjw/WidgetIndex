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
goog.require('ad.widget.business_app.AppListTitle2');
goog.require('ad.widget.business_app.AppList2');

goog.include('ad/impl/business_app/auto_show_list2.less');

goog.provide('ad.impl.business_app.AutoShowList2');

ad.Debug(function(){
    baidu.dom.setStyles(document.getElementsByTagName('body')[0], {
        'margin': 0,
        'padding': 0
    });
    var appFrame = new ad.widget.Iframe({}),
        loadingFrame = new ad.widget.Iframe({}),
        appTitle = new ad.widget.business_app.AppListTitle2(AD_CONFIG['title']),
        appList = new ad.widget.business_app.AppList2(AD_CONFIG['app_list']),
        material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [appTitle],
        [appList],
        [appFrame],
        [loadingFrame]
    );
    material.show();
    appTitle.showTitle(0);
    appFrame.hide();
    loadingFrame.hide();
    var root = material.getRoot(),
        currentApp;

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
    appTitle.addListener(ui.events.BACK, function() {
        appTitle.showTitle(0);
        appList.show();
        appFrame.hide();
        setIframeHeight(325);
        baidu.dom.removeClass(root, 'ec-auto-show-app-page');
    });
    // load app
    appList.addListener(ui.events.START_LOAD_APP, function(appData) {
        currentApp = appData;
        // 显示iframe隐藏list
        showLoadingFrame();
        // 修改页面高度
        setIframeHeight(445);

        // 设置iframe的url
        var url = appData['detail_url'];
        if (url.indexOf('?') > 0) {
            url += '&spfrom=applist';
        } else {
            url += '?spfrom=applist';
        }
        appList.hide();
        appFrame.refresh(null, {
            "width" : 535,
            "height" : 445,
            "src" : url
        });
    });

    appFrame.addListener(ui.events.LOAD, function() {
        ad.base.setTimeout(function() {
            loadingFrame.hide();
        }, 500);
        baidu.dom.addClass(root, 'ec-auto-show-app-page');
        appTitle.showTitle(1);
        appFrame.show();
    });


    // 设置页面高度
    function setIframeHeight(height) {
        var app = ad.base.getObjectByName('baidu.app');
        if (app && app['setHeight']) {
            app['setHeight'](height);
        }

    }

    // 设置默认列表页的iframe高度
    setIframeHeight(325);   // 456
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
