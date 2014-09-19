/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/ishop/success_view.js ~ 2012/11/28 13:52:19
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * success_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/ishop/success_view.less');
goog.include('ad/widget/ishop/success_view.html');

goog.provide('ad.widget.ishop.SuccessView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ishop.SuccessView = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_ishop_success_view';

    this.name = 'success';
};
baidu.inherits(ad.widget.ishop.SuccessView, ad.widget.Widget);

/** @override */
ad.widget.ishop.SuccessView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.ishop.SuccessView.superClass.enterDocument.call(me);
    var root = me.getRoot();

    var nameDom = baidu.g('ishop-success-name');
    var name = nameDom.getAttribute('data-name');
    nameDom.innerHTML = baidu.string.encodeHTML(
        ad.impl.ishop.util.ellipsis(name, 50)
    );

    var link = baidu.g('ishop-success-link');
    link.href = ad.impl.ishop.constants.ISHOP_DOMAIN
        + ad.impl.ishop.urls.ORDER_LIST;

    // 根据是否存在fare_free_offset字段来决定是否显示
    // 为负数表示不免运费，0表示免运费，整数表示满多少免运费
    var fareFreeOffset = parseFloat(me._data['fare_free_offset']);
    if(fareFreeOffset === 0){
        // 免运费
        var fareDom = baidu.q('ishop-success-fare', root)[0];
        baidu.dom.addClass(fareDom, 'free');
    }
    if(fareFreeOffset > 0){
        var fareFreeOffsetDom = baidu.g('ishop-success-fare-offset');
        fareFreeOffsetDom.style.display = 'inline';
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
