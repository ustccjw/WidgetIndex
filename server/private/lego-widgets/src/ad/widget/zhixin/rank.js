/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/rank.js ~ 2013/09/13 14:02:13
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * rank相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhixin/rank.less');
goog.include('ad/widget/zhixin/rank.html');

goog.provide('ad.widget.zhixin.Rank');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhixin.Rank = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhixin_rank';
};
baidu.inherits(ad.widget.zhixin.Rank, ad.widget.Widget);



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */