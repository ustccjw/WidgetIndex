/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: iknow.js 10147 2012-07-11 03:35:58Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/xlab/iknow.js ~ 2012/07/06 14:24:57
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 10147 $
 * @description
 * 掘金实验样式 720x90
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/xlab/iknow.html');
goog.include('ad/widget/xlab/iknow.less');

goog.provide('ad.widget.xlab.IKnow');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.xlab.IKnow = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_xlab_iknow';
};
baidu.inherits(ad.widget.xlab.IKnow, ad.widget.Widget);






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
