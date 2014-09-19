/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/show_url.js ~ 2013/11/28 12:21:34
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * show_url相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.date');

goog.include('ad/widget/show_url.less');
goog.include('ad/widget/show_url.html');

goog.provide('ad.widget.ShowUrl');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ShowUrl = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_show_url';
};
baidu.inherits(ad.widget.ShowUrl, ad.widget.Widget);

/** @override */
ad.widget.ShowUrl.prototype.patchData = function() {
    this._data['last_update_date'] = ad.date.getLastUpdate();
    if (!this._data['brand_text'] && !this._data['hide_brand_text']) {
        this._data['brand_text'] = '品牌推广';
    }

    if (this._data['ps_select']) {
        var title = (this._data['ps_select']['title']) ? this._data['ps_select']['title'] : this._data['title'];
        if (!title) {
            return false;
        }
        title = title.replace(/<em>|<\/em>/g, "");
        var url = (this._data['ps_select']['site']) ? this._data['ps_select']['site'] : this._data['site'];
        url = /^https?:\/\//.test(url) ? url : 'http://' + url;
        var data = {
            "title": baidu.decodeHTML(title),
            "url": url
        };
        this._data['ps_select']['data'] = baidu.json.stringify(data);
    }
}



/* vim: set ts=4 sw=4 sts=4 tw=100 : */