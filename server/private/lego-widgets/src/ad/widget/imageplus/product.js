/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/product.js ~ 2013/09/02 15:04:48
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * product相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/product.less');
goog.include('ad/widget/imageplus/product.html');

goog.provide('ad.widget.imageplus.Product');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Product = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_product';
};
baidu.inherits(ad.widget.imageplus.Product, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.Product.prototype.patchData = function () {
    ad.widget.imageplus.Product.superClass.patchData.call(this);
    if (this._data) {
        var price = this.getData('price');
        if (price) {
            this._data['price'] = (parseInt(price, 10) / 100).toFixed(2);
        }

        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                35,
                '...'
            );
        }
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
