/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/avatar/tab_content.js ~ 2014/05/21 19:48:25
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * tab_content相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/avatar/tab_content.less');
goog.include('ad/widget/imageplus/avatar/tab_content.html');

goog.provide('ad.widget.imageplus.avatar.TabContent');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.avatar.TabContent = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_avatar_tab_content';
};
baidu.inherits(ad.widget.imageplus.avatar.TabContent, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.avatar.TabContent.prototype.bindEvent = function() {
    ad.widget.imageplus.avatar.TabContent.superClass.bindEvent.call(this);
    var me = this;
    var rootDoc = this.getRoot();
    rootDoc.onclick = function (evt) {
        evt = evt || window.event;
        var targetElm = evt.target || evt.srcElement;
        if (baidu.dom.hasClass(targetElm, 'ec-logo-img')) {
            me.trigger(ui.events.SEND_LOG, {"actionid":9, "attach": '图片点击'});
        }
        else if (baidu.dom.hasClass(targetElm, 'ec-title')) {
            me.trigger(ui.events.SEND_LOG, {"actionid":9, "attach": '标题点击'});
        }
        else if (baidu.dom.hasClass(targetElm, 'ec-desc')) {
            me.trigger(ui.events.SEND_LOG, {"actionid":9, "attach": '描述点击'});
        }
        else if (baidu.dom.hasClass(targetElm, 'ec-more-btn')) {
            me.trigger(ui.events.SEND_LOG, {"actionid":9, "attach": '按钮点击'});
        }
    };
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
