/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/mweigou/success_view.js ~ 2013/04/02 18:12:30
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * success_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/mweigou/success_view.less');
goog.include('ad/widget/mweigou/success_view.html');

goog.provide('ad.widget.mweigou.SuccessView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.mweigou.SuccessView = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_mweigou_success_view';

    this.name = 'success';

    /**
     * 商品的DOM容器
     * @type {Zepto}
     */
    this.$_container = null;

    /**
     * detail view的根节点
     * @type {Zepto}
     */
    this.$_root = null;
};
baidu.inherits(ad.widget.mweigou.SuccessView, ad.widget.Widget);

/** @override */
ad.widget.mweigou.SuccessView.prototype.enterDocument = function() {
    ad.widget.mweigou.SuccessView.superClass.enterDocument.call(this);

    var me = this;

    me.$_root = $(me.getRoot());
    me.$_container = me.$_root.find('.ec-sg-weigou-' + me.name);
};

/** @override */
ad.widget.mweigou.SuccessView.prototype.bindEvent = function() {
    ad.widget.mweigou.SuccessView.superClass.bindEvent.call(this);

    var me = this;

    me.$_container.find('.ec-sg-weigou-success-continue').click(function() {
        me.delayTrigger(ad.impl.weigou.events.BACK);
        return false;
    });
};























/* vim: set ts=4 sw=4 sts=4 tw=100: */
