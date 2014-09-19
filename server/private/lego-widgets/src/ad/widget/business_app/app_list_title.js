/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/business_app/app_list_title.js ~ 2013/03/27 19:06:45
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * app_list_title相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/business_app/app_list_title.less');
goog.include('ad/widget/business_app/app_list_title.html');

goog.provide('ad.widget.business_app.AppListTitle');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.business_app.AppListTitle = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_business_app_app_list_title';
};
baidu.inherits(ad.widget.business_app.AppListTitle, ad.widget.Widget);

ui.events.BACK = 'back';
ui.events.CLICK_HOME_URL = 'clickhomeurl';

/** @override */
ad.widget.business_app.AppListTitle.prototype.bindEvent = function() {
    ad.widget.business_app.AppListTitle.superClass.bindEvent.call(this);

    var root = this.getRoot();
    if (root) {
        root = baidu.dom.first(root);
        var me = this;
        baidu.event.on(root, 'click', function(e) {
            var t = baidu.event.getTarget(e);
            if (t.nodeName.toLowerCase() === 'a') {
                var eventName = baidu.dom.getAttr(t, 'data-event');
                if (eventName === 'BACK') {
                    me.trigger(ui.events.BACK);
                    me.sendLog(eventName);
                } else {
                    me.trigger(ui.events.CLICK_HOME_URL);
                    me.sendLog(eventName + '_' + me._data['app']['name']);
                }
            }
        });
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
