/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/ishop/header.js ~ 2012/11/13 18:22:38
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * header相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.require('ad.impl.ishop.constants');
goog.require('ad.impl.ishop.urls');

goog.include('ad/widget/ishop/header.less');
goog.include('ad/widget/ishop/header.html');

goog.provide('ad.widget.ishop.Header');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ishop.Header = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 用户搜索的关键词
     * @type {string}
     */
    this._query = data['query'];

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_ishop_header';
};
baidu.inherits(ad.widget.ishop.Header, ad.widget.Widget);

/** @override */
ad.widget.ishop.Header.prototype.enterDocument = function() {
    ad.widget.ishop.Header.superClass.enterDocument.call(this);

    var link = baidu.g('ishop-header-link');
    link.href = ad.impl.ishop.constants.ISHOP_DOMAIN + '/';

    var more = baidu.g('ishop-header-more-link');
    more.href = ad.impl.ishop.constants.ISHOP_DOMAIN
        + ad.impl.ishop.urls.LOGIN;
};

/** @override */
ad.widget.ishop.Header.prototype.bindEvent = function() {
    ad.widget.ishop.Header.superClass.bindEvent.call(this);

    // CODE HERE
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
