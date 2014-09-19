/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: ns_zhidao.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/ns_zhidao.js ~ 2012/06/09 00:30:31
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/ns_zhidao.html');
goog.include('ad/widget/ns_zhidao.less');
goog.provide('ad.widget.NSZhidao');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.NSZhidao = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_ns_zhidao';
};
baidu.inherits(ad.widget.NSZhidao, ad.widget.Widget);

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
