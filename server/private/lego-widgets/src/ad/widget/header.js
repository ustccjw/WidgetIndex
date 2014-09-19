/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: header.js 13974 2012-11-06 13:17:49Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/header.js ~ 2012/06/04 14:54:58
 * @author loutongbing
 * @version $Revision: 13974 $
 * @description
 * 组件只负责渲染的逻辑和简单的事件绑定，其它都不关心
 **/
goog.require('ad.widget.Widget');
goog.require('ad.date');
goog.include('ad/widget/header.html');
goog.include('ad/widget/header.less');

goog.provide('ad.widget.Header');


/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Header = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_header';
    this._patchData();
};
baidu.inherits(ad.widget.Header, ad.widget.Widget);

/**
 * @private
 */
ad.widget.Header.prototype._patchData = function() {
    if (this._data) {
        this._data['last_update_date'] = ad.date.getLastUpdate();
        this._rewriteLinks();
    }
};

/** @override */
ad.widget.Header.prototype.enterDocument = function() {
    ad.widget.Header.superClass.enterDocument.call(this);
    if(baidu.g(this.getId('description'))){
        var links = baidu.g(this.getId('description')).getElementsByTagName('A');
        if (links.length) {
            for (var i = 0, l = links.length; i < l; i++) {
                var key = links[i];
                if (key.innerHTML == '品牌推广') continue;
                key.setAttribute('title2', '关键词' + (i + 1));
            }
        }
    }
};

/**
 * 修订链接词
 */
ad.widget.Header.prototype._rewriteLinks = function() {
    var desc = this._data['description_rcv_html'],
        arrQuery = this._data['query'],
        re;
    if(desc && arrQuery && arrQuery.length){
        for(var i = 0, len = arrQuery.length; i < len; i ++){
            re = new RegExp(arrQuery[i]['key_word'], 'g');
            desc = desc.replace(re, '<a target=\"_blank\" href=\"' + arrQuery[i]['rcv_url'] + '\">' + arrQuery[i]['key_word'] + '</a>');
        }
        this._data['description_rcv_html'] = desc;
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
