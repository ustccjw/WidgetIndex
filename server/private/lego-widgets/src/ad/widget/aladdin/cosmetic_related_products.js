/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/aladdin/cosmetic_related_products.js ~ 2013/10/31 16:25:55
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * cosmetic_related_products相关的实现逻辑
 * 右侧相关的产品
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/aladdin/cosmetic_related_products.less');
goog.include('ad/widget/aladdin/cosmetic_related_products.html');

goog.provide('ad.widget.aladdin.CosmeticRelatedProducts');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.aladdin.CosmeticRelatedProducts = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_aladdin_cosmetic_related_products';
};
baidu.inherits(ad.widget.aladdin.CosmeticRelatedProducts, ad.widget.Widget);

/** @override */
ad.widget.aladdin.CosmeticRelatedProducts.prototype.enterDocument = function() {
    ad.widget.aladdin.CosmeticRelatedProducts.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.aladdin.CosmeticRelatedProducts.prototype.bindEvent = function() {
    ad.widget.aladdin.CosmeticRelatedProducts.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.aladdin.CosmeticRelatedProducts.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
