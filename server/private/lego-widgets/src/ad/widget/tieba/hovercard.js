/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/hovercard.js ~ 2013/06/07 21:03:54
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * hovercard相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/hovercard.less');
goog.include('ad/widget/tieba/hovercard.html');

goog.provide('ad.widget.tieba.Hovercard');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.Hovercard = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_hovercard';
};
baidu.inherits(ad.widget.tieba.Hovercard, ad.widget.Widget);

/** @override */
ad.widget.tieba.Hovercard.prototype.patchData = function () {
    if (this._data) {
        this._data['is_site'] = !!this._data['is_site'];
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
