/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_native/company_introduct.js ~ 2014/04/14 16:35:03
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * company_introduct相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao_native/company_introduct.less');
goog.include('ad/widget/zhidao_native/company_introduct.html');

goog.provide('ad.widget.zhidao_native.CompanyIntroduct');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_native.CompanyIntroduct = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_native_company_introduct';
};
baidu.inherits(ad.widget.zhidao_native.CompanyIntroduct, ad.widget.Widget);

/** @override */
ad.widget.zhidao_native.CompanyIntroduct.prototype.bindEvent = function() {
    ad.widget.zhidao_native.CompanyIntroduct.superClass.bindEvent.call(this);

    var me = this;
    var leaveMessageButton = baidu.g(this.getId('leave-message'));
    if (leaveMessageButton) {
        baidu.on(leaveMessageButton, 'click', function(e) {
            me.trigger(ui.events.CLICK, e);

            baidu.event.preventDefault(e);
        });
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
