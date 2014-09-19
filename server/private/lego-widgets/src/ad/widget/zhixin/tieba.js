/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/tieba.js ~ 2013/10/31 10:19:22
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 10927 $
 * @description
 * zhidao相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhixin/tieba.less');
goog.include('ad/widget/zhixin/tieba.html');

goog.provide('ad.widget.zhixin.Tieba');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhixin.Tieba = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhixin_tieba';
};
baidu.inherits(ad.widget.zhixin.Tieba, ad.widget.Widget);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
