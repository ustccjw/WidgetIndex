/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/showurl.js ~ 2013/09/06 14:38:11
 * @author yangfan12@baidu.com (yangfan12)
 * @version $Revision: 10927 $
 * @description
 * showurl相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/showurl.less');
goog.include('ad/widget/siva/showurl.html');

goog.provide('ad.widget.siva.Showurl');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Showurl = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_showurl';
};
baidu.inherits(ad.widget.siva.Showurl, ad.widget.Widget);



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
