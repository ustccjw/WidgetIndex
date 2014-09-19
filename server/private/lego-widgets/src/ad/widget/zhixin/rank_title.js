/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/rank_title.js ~ 2014/03/05 15:06:48
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * rank_title相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhixin/rank_title.less');
goog.include('ad/widget/zhixin/rank_title.html');

goog.provide('ad.widget.zhixin.RankTitle');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhixin.RankTitle = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhixin_rank_title';
};
baidu.inherits(ad.widget.zhixin.RankTitle, ad.widget.Widget);





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
