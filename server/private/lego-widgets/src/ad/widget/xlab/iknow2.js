/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: iknow2.js 10804 2012-08-01 03:13:54Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/xlab/iknow2.js ~ 2012/07/11 10:14:50
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 10804 $
 * @description
 * 掘金实验样式 270x240
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/xlab/iknow2.html');
goog.include('ad/widget/xlab/iknow2.less');

goog.provide('ad.widget.xlab.IKnow2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.xlab.IKnow2 = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_xlab_iknow2';
};
baidu.inherits(ad.widget.xlab.IKnow2, ad.widget.Widget);






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
