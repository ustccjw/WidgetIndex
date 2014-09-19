/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/smart/yh_head.js ~ 2013/12/23 21:08:15
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * yh_head相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/smart/yh_head.less');
goog.include('ad/widget/smart/yh_head.html');

goog.provide('ad.widget.smart.YhHead');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.smart.YhHead = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_smart_yh_head';
};
baidu.inherits(ad.widget.smart.YhHead, ad.widget.Widget);





















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
