/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/series_tel.js ~ 2013/12/30 15:08:54
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * series_tel相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/series_tel.less');
goog.include('ad/widget/wireless/series_tel.html');

goog.provide('ad.widget.wireless.SeriesTel');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.SeriesTel = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_series_tel';
};
baidu.inherits(ad.widget.wireless.SeriesTel, ad.widget.Widget);



/** @override */
ad.widget.wireless.SeriesTel.prototype.patchData = function() {
    if (this._data) {
        //jn新版上线后删除
        ad.base.forEach(this._data['options'], function(item) {
            if (!item['tel_rcv_url']) {
                item['tel_rcv_url'] = 'tel:' + item['tel_num'];
            }
        });
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */