/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/leju/spot_news.js ~ 2014/05/22 18:03:53
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 10927 $
 * @description
 * spot_news相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/leju/spot_news.less');
goog.include('ad/widget/leju/spot_news.html');

goog.provide('ad.widget.leju.SpotNews');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.leju.SpotNews = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_leju_spot_news';
};
baidu.inherits(ad.widget.leju.SpotNews, ad.widget.Widget);



/* vim: set ts=4 sw=4 sts=4 tw=100: */
