/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_wise/detail_sub_page.js ~ 2013/12/18 17:24:36
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * detail_sub_page相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao_wise/detail_sub_page.less');
goog.include('ad/widget/zhidao_wise/detail_sub_page.html');

goog.provide('ad.widget.zhidao_wise.DetailSubPage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_wise.DetailSubPage = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_wise_detail_sub_page';
};
baidu.inherits(ad.widget.zhidao_wise.DetailSubPage, ad.widget.Widget);



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */