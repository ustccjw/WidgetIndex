/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/jyhy/card_main.js ~ 2014/04/02 14:50:13
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * card_main相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/jyhy/card_main.less');
goog.include('ad/widget/gx_sck/jyhy/card_main.html');

goog.provide('ad.widget.gx_sck.jyhy.CardMain');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.gx_sck.jyhy.CardMain = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_jyhy_card_main';
};
baidu.inherits(ad.widget.gx_sck.jyhy.CardMain, ad.widget.Widget);

/** @override */
ad.widget.gx_sck.jyhy.CardMain.prototype.enterDocument = function() {
    ad.widget.gx_sck.jyhy.CardMain.superClass.enterDocument.call(this);

};

/** @override */
ad.widget.gx_sck.jyhy.CardMain.prototype.bindEvent = function() {
    ad.widget.gx_sck.jyhy.CardMain.superClass.bindEvent.call(this);

};

/** @override */
ad.widget.gx_sck.jyhy.CardMain.prototype.patchData = function() {
    if (this._data) {
        this._data['is_ipad'] = ad.env.isIpad;
        this._data['poi_url'] = 'http://api.map.baidu.com/geocoder?address='
            + encodeURIComponent(this._data['address']) + '&output=html';
    }

    if (this._data['address']) {
        var maxLen = 44;
        var addr = this._data['address'];
        if (baidu.string.getByteLength(addr) > maxLen) {
            addr = baidu.string.subByte(addr, maxLen, '...');
        }
        this._data['_trunked_address'] = addr;
    }
};

/**
 * 显示"官网"图标
 */
ad.widget.gx_sck.jyhy.CardMain.prototype.showSite = function() {
    baidu.show(this.getId('icon-gw'));
};


/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
