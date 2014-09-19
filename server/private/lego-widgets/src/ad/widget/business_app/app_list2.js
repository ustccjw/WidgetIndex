/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/business_app/app_list2.js ~ 2013/03/27 16:24:50
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 150523 $
 * @description
 * app_list2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/business_app/app_list2.less');
goog.include('ad/widget/business_app/app_list2.html');

goog.provide('ad.widget.business_app.AppList2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.business_app.AppList2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_business_app_app_list2';
};
baidu.inherits(ad.widget.business_app.AppList2, ad.widget.Widget);

ui.events.START_LOAD_APP = 'startloadapp';

ad.widget.business_app.AppList2.prototype.bindEvent = function() {
    ad.widget.business_app.AppList2.superClass.bindEvent.call(this);
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

        // bind click
        baidu.event.on(root, 'click', function(e) {
            var t = baidu.event.getTarget(e),
                isH4 = t.nodeName.toLowerCase() === 'h4',
                isA = t.nodeName.toLowerCase() === 'a',
                index;
            if (isA || isH4) {
                baidu.event.preventDefault(e);
                t = isH4 ? t.parentNode.parentNode : t;
                index = parseInt(baidu.dom.getAttr(t, 'data-index'), 10);
                me.trigger(ui.events.START_LOAD_APP, me._data['apps'][index]);
                // send log: START_LOAD_APP
                me.sendLog("START_LOAD_APP");   // 此日志统计app总的加载次数
                me.sendLog(
                    "START_LOAD_APP_" +
                        (isH4 ? 'tle_' : 'img_') +
                        index + "_" +
                        me._data['apps'][index]['name']
                );    // 此日志统计特定app加载次数
            }
        });
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
