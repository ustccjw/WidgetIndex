/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/wide_tel_button.js ~ 2013/12/10 14:53:25
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * wide_tel_button相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/wide_tel_button.less');
goog.include('ad/widget/wireless/wide_tel_button.html');

goog.provide('ad.widget.wireless.WideTelButton');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.WideTelButton = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_wide_tel_button';
};
baidu.inherits(ad.widget.wireless.WideTelButton, ad.widget.Widget);

/** @override */
ad.widget.wireless.WideTelButton.prototype.patchData = function() {
    if (this._data) {
        //设置一些默认值
        ad.base.extend(this._data, {
            'tel_name': '客服电话',
            'tel_icon_src': 'http://ecma.bdimg.com/adtest/7058a912f33641a5c0637d2e3798641b.png',
            'tel_icon_width': '18',
            'tel_icon_height': '18'
        });

        if(!this._data['tel_rcv_url']) {
            //jn新版上线后删除
            this._data['tel_rcv_url'] = 'tel:' + this._data['tel'];
        }
    }
};

/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */