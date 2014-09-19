/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/weigou/success_view.js ~ 2013/03/04 14:05:22
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * success_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.require('ad.impl.weigou.urls');


goog.include('ad/widget/weigou/success_view.less');
goog.include('ad/widget/weigou/success_view.html');

goog.provide('ad.widget.weigou.SuccessView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.weigou.SuccessView = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_weigou_success_view';

    this.name = 'success';
};
baidu.inherits(ad.widget.weigou.SuccessView, ad.widget.Widget);

/** @override */
ad.widget.weigou.SuccessView.prototype.enterDocument = function() {
    ad.widget.weigou.SuccessView.superClass.enterDocument.call(this);

    var detailLink = baidu.g('ecl-weigou-success-detail');
    detailLink.href = ad.impl.weigou.constants.WEIGOU_DOMAIN 
        + ad.impl.weigou.urls.ORDER_LINK;

    var pwLink = baidu.g('ecl-weigou-success-pw');
    pwLink.href = ad.impl.weigou.constants.WEIGOU_DOMAIN
        + ad.impl.weigou.urls.MODIFY_PASSWORD_LINK;
};

/** @override */
ad.widget.weigou.SuccessView.prototype.bindEvent = function() {
    var me = this;
    ad.widget.weigou.SuccessView.superClass.bindEvent.call(me);

    var successBtn = baidu.g('ecl-weigou-success-btn');
    if(successBtn) {
        ad.impl.weigou.dom.on(successBtn, 'click', function() {
            me.trigger(ad.impl.weigou.events.GO_ON_SHOPPING);
        });
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
