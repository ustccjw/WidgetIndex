/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: a.js 10829 2012-08-01 10:22:26Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/mobile/xlab/a.js ~ 2012/08/01 14:09:31
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 10829 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/mobile/xlab/a.html');
goog.include('ad/mobile/xlab/a.less');

goog.provide('ad.mobile.xlab.A');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.mobile.xlab.A = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_mobile_xlab_a';
};
baidu.inherits(ad.mobile.xlab.A, ad.widget.Widget);





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
