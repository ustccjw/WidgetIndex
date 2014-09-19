/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_native/company_id.js ~ 2014/04/14 16:43:44
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * company_id相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao_native/company_id.less');
goog.include('ad/widget/zhidao_native/company_id.html');

goog.provide('ad.widget.zhidao_native.CompanyId');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_native.CompanyId = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_native_company_id';
};
baidu.inherits(ad.widget.zhidao_native.CompanyId, ad.widget.Widget);

/**
 * @override
 */
ad.widget.zhidao_native.CompanyId.prototype.bindEvent = function() {
    var me = this;
    window['ecomQbSetVerify'] = function(vdata) { //V认证信息
        window['ecomQbSetVerify'] = null;
        try {
            delete window['ecomQbSetVerify'];
        } catch (e) {}
        var cmpyName = me.getData('company_name', null);
        if (cmpyName && vdata[cmpyName]) {
            vdata = vdata[cmpyName];
            var vElem = baidu.g(me.getId('v-icon'));
            baidu.addClass(vElem, 'ec-company-v' + vdata["lvl"]);
            vElem.href = vdata["site"];
        }
    };
    baidu.sio.callByServer('http://ecma.bdimg.com/adtest/60474fa077f9c322735a144d138989ae.js', 'ecomQbSetVerify');
};





















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
