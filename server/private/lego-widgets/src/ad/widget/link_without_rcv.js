/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/link_without_rcv.js ~ 2013/08/05 16:38:11
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * link_without_rcv相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/link_without_rcv.less');
goog.include('ad/widget/link_without_rcv.html');

goog.provide('ad.widget.LinkWithoutRcv');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.LinkWithoutRcv = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_link_without_rcv';
};
baidu.inherits(ad.widget.LinkWithoutRcv, ad.widget.Widget);
























/* vim: set ts=4 sw=4 sts=4 tw=100 : */
