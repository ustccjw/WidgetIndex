/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/ticket/list_view.js ~ 2013/05/14 16:08:31
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 150523 $
 * @description
 * list_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/ticket/list_view.less');
goog.include('ad/widget/ticket/list_view.html');

goog.provide('ad.widget.ticket.ListView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ticket.ListView = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_ticket_list_view';
};
baidu.inherits(ad.widget.ticket.ListView, ad.widget.Widget);

/** @override */
ad.widget.ticket.ListView.prototype.enterDocument = function() {
    ad.widget.ticket.ListView.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.ticket.ListView.prototype.bindEvent = function() {
    ad.widget.ticket.ListView.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.ticket.ListView.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
