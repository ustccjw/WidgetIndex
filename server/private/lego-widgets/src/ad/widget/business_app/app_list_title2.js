/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/business_app/app_list_title.js ~ 2013/03/27 19:06:45
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 150523 $
 * @description
 * app_list_title2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/business_app/app_list_title2.less');
goog.include('ad/widget/business_app/app_list_title2.html');

goog.provide('ad.widget.business_app.AppListTitle2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.business_app.AppListTitle2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_business_app_app_list_title2';
};
baidu.inherits(ad.widget.business_app.AppListTitle2, ad.widget.Widget);

ui.events.BACK = 'back';

/** @override */
ad.widget.business_app.AppListTitle2.prototype.bindEvent = function() {
    ad.widget.business_app.AppListTitle2.superClass.bindEvent.call(this);
    var root = this.getRoot();
    if (root) {
        root = baidu.dom.first(root);
        var me = this;
        baidu.event.on(root, 'click', function(e) {
            var t = baidu.event.getTarget(e);
            if (t.nodeName.toLowerCase() === 'div') {
                me.trigger(ui.events.BACK);
                me.sendLog(ui.events.BACK);
            }
        });
    }
};

/**
 * @param {Number} index 索引.
 */
ad.widget.business_app.AppListTitle2.prototype.showTitle = function(index) {
    var root = this.getRoot();
    if (root) {
        root = baidu.dom.first(root);
        baidu.each(root.children, function(item, $index) {
            if (index === $index) {
                baidu.dom.show(item);
            }
            else {
                baidu.dom.hide(item);
            }
        });
    }
};
/* vim: set ts=4 sw=4 sts=4 tw=100: */
