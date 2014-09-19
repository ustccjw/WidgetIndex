/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/card_right_new.js ~ 2013/12/04 16:18:22
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * card_right_new相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/card_right_new.less');
goog.include('ad/widget/gx_sck/card_right_new.html');

goog.provide('ad.widget.gx_sck.CardRightNew');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gx_sck.CardRightNew = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_card_right_new';
};
baidu.inherits(ad.widget.gx_sck.CardRightNew, ad.widget.Widget);






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
