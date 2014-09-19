/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/html.js ~ 2014/03/05 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * html相关的实现逻辑
 **/

goog.require('ui.events');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/sticker/html.less');
goog.include('ad/widget/imageplus/sticker/html.html');

goog.provide('ad.widget.imageplus.sticker.Html');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.Html = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_html';
};
baidu.inherits(ad.widget.imageplus.sticker.Html, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.Html.prototype.patchData = function () {
    ad.widget.imageplus.sticker.Html.superClass.patchData.call(this);
};

/** @override */
ad.widget.imageplus.sticker.Html.prototype.enterDocument = function () {
    var me = this;
    ad.widget.imageplus.sticker.Html.superClass.enterDocument.call(me);

    var iframe = baidu.g(me.getId('iframe'));
    if (!iframe) {
        return;
    }

    var htmlCode = me.getData('desc') || '';
    ad.dom.writeIntoIframe(iframe, htmlCode, function (win, doc) {
        // 自适应iframe高度，确保没有纵向滚动条
        // iphone、ipad等移动浏览会器忽略width/height自适应高度
        // NOTE: 没有支持Quirks mode

        // 确保scrollHeight是iframe所需的最小高度
        iframe.style.height = '0';
        iframe.style.height = Math.max(
            // 其他浏览器
            doc.body.scrollHeight,
            // IE7
            doc.documentElement.scrollHeight
        ) + 'px';
        iframe.parentNode.style.height = 'auto';
        // 提示container，iframe 高度改变
        me.trigger(ui.events.RESIZE);
        // 提示container，iframe加载完成
        me.trigger(ui.events.LOAD);
    });
};





















/* vim: set ts=4 sw=4 sts=4 tw=100  */
