/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wenda.js ~ 2014/01/16 15:53:15
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * wenda相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wenda.less');
goog.include('ad/widget/wenda.html');

goog.provide('ad.widget.Wenda');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Wenda = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wenda';
};
baidu.inherits(ad.widget.Wenda, ad.widget.Widget);

/** @override */
ad.widget.Wenda.prototype.patchData = function() {
    if (!this._data) {
        return;
    }
    var items = this.getData('items');
    var titleLength = parseInt(this.getData('title_length'), 10);
    var ansLength = parseInt(this.getData('ans_length'), 10);
    for (var i = 0; i < items.length; i++) {
        var title = items[i]['title'];
        var ans = items[i]['answer'];
        if (titleLength) {
            title = ad.base.subByte(title, titleLength, '...');
        }
        if (ansLength) {
            ans = ad.base.subByte(ans, ansLength, '...');
        }
        items[i]['title'] = this.redQuery(title);
        items[i]['answer'] = this.redQuery(ans);
    }
};

/**
 * 问答营销在“问医生”下的实验，需要手动飘红
 * @param {string} text 要飘红的文字
 * @return {string} 飘红结果
 */
ad.widget.Wenda.prototype.redQuery = function(text) {
    text = baidu.string.encodeHTML(text);
    // 跟知道约定的获取query的方式：F.context('page').query 
    if (typeof window['F'] != 'undefined') {
        var page = window['F']['context']('page');
        if (page && page['query']) {
            var encodedQuery = baidu.string.encodeHTML(page['query']);
            text = text.split(encodedQuery).join('<em>' + encodedQuery + '</em>');
        }
    }
    return text;
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
