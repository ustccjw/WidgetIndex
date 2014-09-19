/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/smart/head.js ~ 2013/10/29 17:47:11
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * head相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/smart/head.less');
goog.include('ad/widget/smart/head.html');

goog.provide('ad.widget.smart.Head');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.smart.Head = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_smart_head';
};
baidu.inherits(ad.widget.smart.Head, ad.widget.Widget);

/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
