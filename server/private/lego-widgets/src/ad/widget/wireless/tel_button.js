/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/tel_button.js ~ 2013/11/29 12:32:24
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * tel_button相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/tel_button.less');
goog.include('ad/widget/wireless/tel_button.html');

goog.provide('ad.widget.wireless.TelButton');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.TelButton = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_tel_button';
};
baidu.inherits(ad.widget.wireless.TelButton, ad.widget.Widget);


/** @override */
ad.widget.wireless.TelButton.prototype.patchData = function() {
    if (this._data) {
        if(!this._data['tel_rcv_url']) {
            //jn新版上线后删除
            this._data['tel_rcv_url'] = 'tel:' + this._data['tel'];
        }
    }
};

/* vim: set ts=4 sw=4 sts=4 tw=100 : */