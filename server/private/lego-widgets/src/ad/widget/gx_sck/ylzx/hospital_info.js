/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/ylzx/hospital_info.js ~ 2013/10/17 15:54:24
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * hospital_info相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/ylzx/hospital_info.less');
goog.include('ad/widget/gx_sck/ylzx/hospital_info.html');

goog.provide('ad.widget.gx_sck.ylzx.HospitalInfo');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gx_sck.ylzx.HospitalInfo = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_ylzx_hospital_info';
};
baidu.inherits(ad.widget.gx_sck.ylzx.HospitalInfo, ad.widget.Widget);

/**
 * 显示"官网"图标
 */
ad.widget.gx_sck.ylzx.HospitalInfo.prototype.showSite = function() {
    baidu.show(this.getId('icon-gw'));
};























/* vim: set ts=4 sw=4 sts=4 tw=100: */
