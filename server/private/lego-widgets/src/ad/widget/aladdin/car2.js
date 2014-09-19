/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/aladdin/car2.js ~ 2013/09/26 09:59:04
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * car2相关的实现逻辑
 **/
goog.require('ad.date');
goog.require('ad.widget.Widget');

goog.include('ad/widget/aladdin/car2.less');
goog.include('ad/widget/aladdin/car2.html');

goog.provide('ad.widget.aladdin.Car2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.aladdin.Car2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_aladdin_car2';
};
baidu.inherits(ad.widget.aladdin.Car2, ad.widget.Widget);

/** @override */
ad.widget.aladdin.Car2.prototype.patchData = function() {
    if (this._data) {
        this._data['_date'] = ad.date.getLastUpdate();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
