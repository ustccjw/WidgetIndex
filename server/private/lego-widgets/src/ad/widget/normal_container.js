/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: normal_container.js 10927 2012-08-05 07:35:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/normal_container.js ~ 2012/08/27 19:32:08
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * normal_container相关的实现逻辑
 **/

goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.WidgetContainer');
goog.require('ui.events');

goog.include('ad/widget/normal_container.less');
goog.include('ad/widget/normal_container.html');

goog.provide('ad.widget.NormalContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {string=} opt_titlePrefix 监控前缀.
 * @extends {ad.widget.WidgetContainer}
 */
ad.widget.NormalContainer = function(data, opt_titlePrefix) {
    ad.widget.WidgetContainer.call(this, data, opt_titlePrefix);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_normal_container';

    this._render = new ad.render.RecursiveRender({
        'block_class': 'ec-normal-con'
    });

    /**
     * 由于容器的特殊性，加入物料的前缀来区别，从而成为class的一部分.
     * @type {string}
     */
    this._materialPrefix;
};
baidu.inherits(ad.widget.NormalContainer, ad.widget.WidgetContainer);

/** @override */
ad.widget.NormalContainer.prototype.patchData = function() {
    if (this._data) {
        this._materialPrefix = this._data['material_name'] || '';
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
