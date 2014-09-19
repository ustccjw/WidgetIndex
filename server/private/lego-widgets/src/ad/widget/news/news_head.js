/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: news_head.js 13834 2012-11-03 06:31:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/news/news_head.js ~ 2012/06/07 22:07:55
 * @author fanxueliang
 * @version $Revision: 13834 $
 * @description
 * 苏宁易购的头部效果
 **/

goog.require('ad.date');
goog.require('ad.widget.Widget');

goog.include('ad/widget/news/news_head.html');
goog.include('ad/widget/news/news_head.less');

goog.provide('ad.widget.news.Head');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.news.Head = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_news_head';
};
baidu.inherits(ad.widget.news.Head, ad.widget.Widget);

/** @override */
ad.widget.news.Head.prototype.patchData = function() {
    if (this._data) {
        this._data['last_update_date'] = ad.date.getLastUpdate();
        this._rewriteLinks();
    }
    if(this._data['description_rcv_url'] === ""){
        delete this._data['description_rcv_url'];
    }
    if(this._data['logo']['logo'] === ""){
        delete this._data['logo'];
    }
    if(this._data['image_links'] && this._data['image_links']['options'].length <= 0){
        delete this._data['image_links'];
    }
    if(this._data['news_origin'] && this._data['news_origin']['origin'] == ""){
        delete this._data['news_origin'];
    }
};
/** @override */
ad.widget.news.Head.prototype.enterDocument = function() {
    ad.widget.news.Head.superClass.enterDocument.call(this);

    var links = baidu.g(this.getId('description')).getElementsByTagName('A');
    if (links.length) {
        for (var i = 0, l = links.length; i < l; i++) {
            var key = links[i];
            if (key.innerHTML == '品牌推广') continue;
            key.setAttribute('title2', '关键词' + (i + 1));
        }
    }
    if (baidu.g(this.getId('head-img-group'))) {
        var img_links = baidu.g(this.getId('head-img-group')).getElementsByTagName('A');
        if (img_links.length) {
            for (var j = 0, l = img_links.length; j < l; j++) {
                var key = img_links[j];
                key.setAttribute('title2', '按钮' + (j + 1));
            }
        }
    }
};

/**
 * 修订链接词
 */
ad.widget.news.Head.prototype._rewriteLinks = function() {
    var desc = this._data['description'],
        arrQuery = this._data['query'],
        re;
    if(desc && arrQuery && arrQuery.length){
        for(var i = 0, len = arrQuery.length; i < len; i ++){
            re = new RegExp(arrQuery[i]['key_word'], 'g');
            desc = desc.replace(re, '<a target=\"_blank\" href=\"' + arrQuery[i]['rcv_url'] + '\">' + arrQuery[i]['key_word'] + '</a>');
        }
        this._data['description'] = desc;
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
