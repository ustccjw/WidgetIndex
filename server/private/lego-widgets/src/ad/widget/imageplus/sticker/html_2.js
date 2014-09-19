/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/html_2.js ~ 2014/05/08 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * html_2相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ui.events');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/sticker/html_2.less');
goog.include('ad/widget/imageplus/sticker/html_2.html');

goog.provide('ad.widget.imageplus.sticker.Html2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.Html2 = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_html_2';
};
baidu.inherits(ad.widget.imageplus.sticker.Html2, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.Html2.prototype.patchData = function () {
    ad.widget.imageplus.sticker.Html2.superClass.patchData.call(this);
};

/** @override */
ad.widget.imageplus.sticker.Html2.prototype.enterDocument = function () {
    var me = this;
    ad.widget.imageplus.sticker.Html2.superClass.enterDocument.call(me);

    var iframe = baidu.g(me.getId('iframe'));
    if (!iframe) {
        return;
    }

    var htmlCode = me.getData('desc') || '';
    ad.dom.writeIntoIframe(iframe, htmlCode, function (win, doc) {
        if (COMPILED) {
            var loaderApi = me.getData('api');
            var hoverClass = 'ad-widget-imageplust-sticker-html_2-hover';
            var timer = null;
            var show = function () {
                if (timer) {
                    ad.base.clearTimeout(timer);
                }
                baidu.addClass(iframe, hoverClass);
            };
            var hide = function () {
                baidu.removeClass(iframe, hoverClass);
            };
            loaderApi.addListener(ui.events.MOUSE_OVER, show);
            loaderApi.addListener(ui.events.MOUSE_MOVE, show);
            loaderApi.addListener(ui.events.MOUSE_OUT, hide);
            loaderApi.addListener(ui.events.RESIZE, function (event, rect) {
                var reloadAd = win['reloadAd'];
                if (reloadAd && baidu.lang.isFunction(reloadAd)) {
                    reloadAd(rect);
                }
            });

            // 初始展现，然后过段时间隐藏
            // 第一次展现时的展现时间
            var firstShowTime = me.getData('box.first_show_time', 5000);
            show();
            timer = ad.base.setTimeout(
                function() {
                    hide();
                    timer = null;
                },
                firstShowTime
            );

            me.trigger(ui.events.LOAD, doc);
        }
    });
};





















/* vim: set ts=4 sw=4 sts=4 tw=100  */
