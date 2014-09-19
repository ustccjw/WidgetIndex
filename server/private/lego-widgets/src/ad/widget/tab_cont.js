/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tab_cont.js ~ 2012/09/06 11:09:06
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 10927 $
 * @description
 * tab_cont相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tab_cont.less');
goog.include('ad/widget/tab_cont.html');

goog.provide('ad.widget.TabCont');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.TabCont = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tab_cont';
};
baidu.inherits(ad.widget.TabCont, ad.widget.Widget);

/** @override */
ad.widget.TabCont.prototype.patchData = function() {
    if (this._data) {
        if(this._data['type_links'] && this._data['type_links'].length) {
            var links = this._data['type_links'];
            for(var i = 0, len = links.length; i < len; i ++) {
                links[i]['_itemindex'] = (i + 1);
            }
        }
        if(this._data['des_text_links']) {
            this._rewriteLinks();
        }
    }
}

/** @override */
ad.widget.TabCont.prototype.enterDocument = function() {
    ad.widget.TabCont.superClass.enterDocument.call(this);

    if (this._data && this._data['des_text_links']) {
        var links = baidu.g(this.getId('des_text_links')).getElementsByTagName('A');
        if (links.length) {
            for (var i = 0, l = links.length; i < l; i++) {
                var key = links[i];
                key.setAttribute('title2', '关键词' + (i + 1));
            }
        }
    }
};

/**
 * 修订描述的链接词
 */
ad.widget.TabCont.prototype._rewriteLinks = function() {
    var desc = this._data['des_text_links'];
    var arrQuery = this._data['query'];
    var re;
    if(desc && arrQuery && arrQuery.length) {
        for(var i = 0, len = arrQuery.length; i < len; i ++) {
            re = new RegExp(arrQuery[i]['key_word'], 'g');
            desc = desc.replace(re, '<a target=\"_blank\" href=\"' +
                arrQuery[i]['rcv_url'] + '\">' + arrQuery[i]['key_word'] + '</a>');
        }
        this._data['des_text_links'] = desc;
    }
};
