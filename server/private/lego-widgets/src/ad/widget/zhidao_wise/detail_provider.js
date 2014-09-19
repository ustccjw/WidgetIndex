/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_wise/detail_provider.js ~ 2014/02/18 11:15:36
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * detail_provider相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao_wise/detail_provider.less');
goog.include('ad/widget/zhidao_wise/detail_provider.html');

goog.provide('ad.widget.zhidao_wise.DetailProvider');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_wise.DetailProvider = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_wise_detail_provider';
};
baidu.inherits(ad.widget.zhidao_wise.DetailProvider, ad.widget.Widget);

/** @override */
ad.widget.zhidao_wise.DetailProvider.prototype.patchData = function() {
    if (this._data) {
        //设置一些默认值
        ad.base.extend(this._data, {
            'provider_tip_prefix': '*以上内容由',
            'provider_tip_suffix': '提供'
        });
    }
}



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */