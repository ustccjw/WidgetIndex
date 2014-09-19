/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/gx_sck/card_main_new.js ~ 2013/12/04 13:39:22
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * card_main_new相关的实现逻辑
 **/

goog.require('ad.env');
goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/gx_sck/card_main_new.less');
goog.include('ad/widget/gx_sck/card_main_new.html');

goog.provide('ad.widget.gx_sck.CardMainNew');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gx_sck.CardMainNew = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gx_sck_card_main_new';
};
baidu.inherits(ad.widget.gx_sck.CardMainNew, ad.widget.Widget);


/** @override */
ad.widget.gx_sck.CardMainNew.prototype.patchData = function() {
    if (this._data) {
        this._data['is_ipad'] = ad.env.isIpad;
        var maxLen = 44;
        if (!this._data['show_maps']) {
            maxLen = 50;
        }
        else {
            this._data['poi_url'] = 'http://api.map.baidu.com/geocoder?address='
                + encodeURIComponent(this._data['address']) + '&output=html';
        }
        var addr = this._data['address'];
        if (baidu.string.getByteLength(addr) > maxLen) {
            addr = baidu.string.subByte(addr, maxLen, '...');
        }
        this._data['_trunked_address'] = addr;
    }

    if (this._data['ps_select']) {
        var title = (this._data['ps_select']['title']) ? this._data['ps_select']['title'] : this._data['full_name'];
        title = title.replace(/<em>|<\/em>/g, '');
        var url = (this._data['ps_select']['site']) ? this._data['ps_select']['site'] : this._data['official_site'];
        url = /^https?:\/\//.test(url) ? url : 'http://' + url;
        var data = {
            // title中会包含&quot;等字符，需要decode
            'title': baidu.decodeHTML(title),
            'url': url
        };
        this._data['ps_select']['data'] = baidu.json.stringify(data);
    }

    //v标
    if (this._data.hasOwnProperty('sign')) {
        this._data['ps_vsign'] = true;
    }
};

/** @override */
ad.widget.gx_sck.CardMainNew.prototype.bindEvent = function() {
    //v标
    var me = this;
    if (me._data['ps_vsign']) {
        var bdsReady = ad.base.getObjectByName('bds.ready');
        if ('function' === typeof bdsReady) {
            bdsReady(function() {
                //创建dom
                var trustDom = baidu.g(me.getId('c-trust'));
                trustDom.innerHTML = '<span class="c-trust" data_key="' + me._data['sign'] + '"></span>';
                var trustObj = ad.base.getObjectByName('bds.se.trust');
                if(trustObj && 'function' === typeof trustObj['init']) {
                    trustObj['init']();
                }
            });
        }
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
