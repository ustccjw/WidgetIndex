/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/comp_card_right.js ~ 2013/04/11 18:40:30
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * comp_card_right相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/comp_card_right.less');
goog.include('ad/widget/gx_sck/comp_card_right.html');

goog.provide('ad.widget.gx_sck.CompCardRight');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gx_sck.CompCardRight = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_comp_card_right';
};
baidu.inherits(ad.widget.gx_sck.CompCardRight, ad.widget.Widget);



/* vim: set ts=4 sw=4 sts=4 tw=100: */
