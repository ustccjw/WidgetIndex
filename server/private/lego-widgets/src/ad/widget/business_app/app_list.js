/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/business_app/app_list.js ~ 2013/03/27 16:24:50
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * app_list相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/business_app/app_list.less');
goog.include('ad/widget/business_app/app_list.html');

goog.provide('ad.widget.business_app.AppList');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.business_app.AppList = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_business_app_app_list';
};
baidu.inherits(ad.widget.business_app.AppList, ad.widget.Widget);

ui.events.START_LOAD_APP = 'startloadapp';

ad.widget.business_app.AppList.prototype.bindEvent = function() {
    ad.widget.business_app.AppList.superClass.bindEvent.call(this);
    var root = this.getRoot();
    if (root) {
        root = baidu.dom.first(root);
        var me = this;
        // 延迟加载图片
        baidu.page.lazyLoadImage({
            'className': 'ec-app-list-icon-img',
            'preloadHeight': 100,
            'placeHolder': me._data['icon_placeholder']
        });
        // set hover status for h2
        baidu.event.on(root, 'mouseover', function(e) {
            baidu.event.preventDefault(e);
            var t = baidu.event.getTarget(e);
            if (t.nodeName.toLowerCase() === 'h2') {
                baidu.dom.addClass(t, 'ec-app-list-title-hover');
            }
        });
        baidu.event.on(root, 'mouseout', function(e) {
            baidu.event.preventDefault(e);
            var t = baidu.event.getTarget(e);
            if (t.nodeName.toLowerCase() === 'h2') {
                baidu.dom.removeClass(t, 'ec-app-list-title-hover');
            }
        });


        // set hover status for icon
        baidu.event.on(root, 'mouseover', function(e) {
            baidu.event.preventDefault(e);
            var t = baidu.event.getTarget(e);
            if (t.nodeName.toLowerCase() === 'span' &&
                baidu.dom.hasClass(t.parentNode, 'ec-app-list-icon')) {
                baidu.dom.addClass(t.parentNode, 'ec-app-list-icon-hover');
            }
        });
        baidu.event.on(root, 'mouseout', function(e) {
            baidu.event.preventDefault(e);
            var t = baidu.event.getTarget(e);
            if (t.nodeName.toLowerCase() === 'span' &&
                baidu.dom.hasClass(t.parentNode, 'ec-app-list-icon')) {
                baidu.dom.removeClass(t.parentNode, 'ec-app-list-icon-hover');
            }
        });


        // bind click
        baidu.event.on(root, 'click', function(e) {
            var t = baidu.event.getTarget(e);
            var isH2 = t.nodeName.toLowerCase() === 'h2';
            var isIcon = t.nodeName.toLowerCase() === 'span' &&
                         baidu.dom.hasClass(t.parentNode, 'ec-app-list-icon');
            var isFromLink = t.nodeName.toLowerCase() === 'a' &&
                             baidu.dom.hasClass(t, 'ec-app-list-from-link');
            var index;

            if (isH2 || isIcon) {
                baidu.event.preventDefault(e);
                index = parseInt(baidu.dom.getAttr(t, 'data-index'), 10);
                me.trigger(ui.events.START_LOAD_APP, me._data['apps'][index]);
                // send log: START_LOAD_APP
                me.sendLog("START_LOAD_APP");   // 此日志统计app总的加载次数
                me.sendLog(
                    "START_LOAD_APP_" +
                    (isH2 ? 'tle_' : 'img_') +
                    index + "_" +
                    me._data['apps'][index]['name']['full']
                );    // 此日志统计特定app加载次数
            }

            if (isFromLink) {
                index = parseInt(baidu.dom.getAttr(t, 'data-index'), 10);
                me.sendLog("CLICK_FROM_LINK");   // 此日志统计app点击来源链接
                me.sendLog(
                    "CLICK_FROM_LINK_" +
                    index + "_" +
                    me._data['apps'][index]['from']['full']
                );
            }
        });
    }
};

/** @override */
ad.widget.business_app.AppList.prototype.patchData = function() {
    if (this._data && this._data['apps']) {
        var apps = this._data['apps'];
        var app;
        var appName;
        var appFrom;
        for (var i=0,l=apps.length; i<l; i++) {
            app = apps[i];
            app['index'] = i;

            // 支持name是字符串形式
            appName = app['name'];
            if (typeof appName === 'string') {
                app['name'] = {
                    'full': appName,
                    'short': appName
                };
            }

            // 支持from是字符串形式
            appFrom = app['from'];
            if (typeof appFrom === 'string') {
                app['from'] = {
                    'full': appFrom,
                    'short': appFrom
                };
            }

            app['from']['rcv_url'] = app['from']['rcv_url'] || 'javascript:void 0;';
        }
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
