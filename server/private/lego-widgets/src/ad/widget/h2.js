/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h2.js 10980 2012-08-07 15:56:13Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/h2.js ~ 2012/06/07 23:00:23
 * @author loutongbing
 * @version $Revision: 10980 $
 * @description
 *
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/h2.html');
goog.include('ad/widget/h2.less');

goog.provide('ad.widget.H2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.H2 = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_h2';
};
baidu.inherits(ad.widget.H2, ad.widget.Widget);

/** @override */
ad.widget.H2.prototype.patchData = function() {
    if (this._data) {
        this._data['hidden_price_unit'] = this._data['hidden_price_unit'] ? false : true;

        var items = this._data['data'];
        for (var i = 0, l = items.length; i < l; i ++) {
            if (!items[i]['description_rcv_url']) {
                items[i]['description_rcv_url'] = items[i]['rcv_url'];
            }
        }
    }
};


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
