/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/title.js ~ 2013/09/06 21:06:15
 * @author yangfan12@baidu.com (yangfan12)
 * @version $Revision: 10927 $
 * @description
 * title相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/title.less');
goog.include('ad/widget/siva/title.html');

goog.provide('ad.widget.siva.Title');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Title = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_title';
};
baidu.inherits(ad.widget.siva.Title, ad.widget.Widget);





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
