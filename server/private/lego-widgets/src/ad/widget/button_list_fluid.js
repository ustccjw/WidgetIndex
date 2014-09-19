/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/button_list_fluid.js ~ 2014/03/19 14:48:07
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * button_list_fluid相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/button_list_fluid.less');
goog.include('ad/widget/button_list_fluid.html');

goog.provide('ad.widget.ButtonListFluid');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.ButtonListFluid = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_button_list_fluid';
};
baidu.inherits(ad.widget.ButtonListFluid, ad.widget.Widget);

/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
