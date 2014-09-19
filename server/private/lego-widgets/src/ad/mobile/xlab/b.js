/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. Bll Rights Reserved
 * $Id: b.js 10829 2012-08-01 10:22:26Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/mobile/xlab/b.js ~ 2012/08/01 15:33:23
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 10829 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/mobile/xlab/b.html');
goog.include('ad/mobile/xlab/b.less');

goog.provide('ad.mobile.xlab.B');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.mobile.xlab.B = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_mobile_xlab_b';
};
baidu.inherits(ad.mobile.xlab.B, ad.widget.Widget);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
