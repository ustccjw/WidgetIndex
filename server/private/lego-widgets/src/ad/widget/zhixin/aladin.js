/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/aladin.js ~ 2013/09/13 14:01:57
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * aladin相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhixin/aladin.less');
goog.include('ad/widget/zhixin/aladin.html');

goog.provide('ad.widget.zhixin.Aladin');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhixin.Aladin = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhixin_aladin';
};
baidu.inherits(ad.widget.zhixin.Aladin, ad.widget.Widget);



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */