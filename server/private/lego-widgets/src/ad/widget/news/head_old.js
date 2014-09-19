/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/news/head_old.js ~ 2013/11/05 19:17:57
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * head_old相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/news/head_old.less');
goog.include('ad/widget/news/head_old.html');

goog.provide('ad.widget.news.HeadOld');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.news.HeadOld = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_news_head_old';
};
baidu.inherits(ad.widget.news.HeadOld, ad.widget.Widget);

/** @override */
ad.widget.news.HeadOld.prototype.enterDocument = function() {
    ad.widget.news.HeadOld.superClass.enterDocument.call(this);

    var links = baidu.g(this.getId('description')).getElementsByTagName('A');
    if (links.length) {
        for (var i = 0, len = links.length; i < len; i++) {
            links[i].setAttribute('title2', '关键词' + (i + 1));
        }
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
