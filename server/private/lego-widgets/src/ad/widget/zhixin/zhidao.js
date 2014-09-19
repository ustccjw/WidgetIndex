/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/zhidao.js ~ 2013/10/31 10:19:22
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * zhidao相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhixin/zhidao.less');
goog.include('ad/widget/zhixin/zhidao.html');

goog.provide('ad.widget.zhixin.Zhidao');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhixin.Zhidao = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhixin_zhidao';
};
baidu.inherits(ad.widget.zhixin.Zhidao, ad.widget.Widget);





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
