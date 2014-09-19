/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/icon/fengchao_sma.js ~ 2014/06/13 06:08:00
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.include('ad/widget/imageplus/v2/icon/fengchao_sma.less');
goog.include('ad/widget/imageplus/v2/icon/fengchao_sma.html');

goog.provide('ad.widget.imageplus.v2.icon.FengchaoSma');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.icon.FengchaoSma = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_icon_fengchao_sma';
};
baidu.inherits(ad.widget.imageplus.v2.icon.FengchaoSma, ad.widget.imageplus.v2.BaseWidget);


/** @override */
ad.widget.imageplus.v2.icon.FengchaoSma.prototype.patchData = function () {
    ad.widget.imageplus.v2.icon.FengchaoSma.superClass.patchData.call(this);
    if (this._data) {
        var title = this.getData('title');
        var getQuery =
            /** @type {Function} */
            (ad.base.getObjectByName('ns.image.getQuery'));
        title = getQuery ? decodeURIComponent(getQuery()) : title;

        if (title) {
            this._data['title'] = ad.base.subByte(
                title,
                20,
                ''
            );
        }
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100  */
