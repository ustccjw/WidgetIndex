/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/xwpd/news_list.js ~ 2014/05/04 14:56:04
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * news_list相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/xwpd/news_list.less');
goog.include('ad/widget/gx_sck/xwpd/news_list.html');

goog.provide('ad.widget.gx_sck.xwpd.NewsList');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.gx_sck.xwpd.NewsList = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_xwpd_news_list';
};
baidu.inherits(ad.widget.gx_sck.xwpd.NewsList, ad.widget.Widget);





/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
