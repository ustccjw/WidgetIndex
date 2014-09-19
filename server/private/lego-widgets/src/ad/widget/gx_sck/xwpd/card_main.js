/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/xwpd/card_main.js ~ 2014/05/04 13:52:35
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * card_main相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/xwpd/card_main.less');
goog.include('ad/widget/gx_sck/xwpd/card_main.html');

goog.provide('ad.widget.gx_sck.xwpd.CardMain');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.gx_sck.xwpd.CardMain = function(data) {
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_xwpd_card_main';

    /**
     * V认证信息.
     * @type {Object}
     */
    this._vInfo = null;

    /**
     * bds.ready事件触发标志.
     * @type {boolean}
     */
    this._isBDSReady = false;

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.gx_sck.xwpd.CardMain, ad.widget.Widget);
























/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
