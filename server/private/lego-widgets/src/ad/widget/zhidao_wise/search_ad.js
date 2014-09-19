/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_wise/search_ad.js ~ 2013/12/18 18:04:56
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * search_ad相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao_wise/search_ad.less');
goog.include('ad/widget/zhidao_wise/search_ad.html');

goog.provide('ad.widget.zhidao_wise.SearchAd');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_wise.SearchAd = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_wise_search_ad';
};
baidu.inherits(ad.widget.zhidao_wise.SearchAd, ad.widget.Widget);

/** @override */
ad.widget.zhidao_wise.SearchAd.prototype.patchData = function() {
    if (this._data) {
        //设置一些默认值
        ad.base.extend(this._data, {
            'display_ad_icon': true,
            'display_v_icon': true,
            'verify_icon_src': 'http://ecma.bdimg.com/adtest/verify.gif',
            'tel_name': '电话咨询',
            'tel_icon_src': 'http://ecma.bdimg.com/adtest/7058a912f33641a5c0637d2e3798641b.png'
        });
    }
};

/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */