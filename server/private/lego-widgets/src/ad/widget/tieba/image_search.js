/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/image_search.js ~ 2013/04/25 11:30:43
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * image_search相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/image_search.less');
goog.include('ad/widget/tieba/image_search.html');

goog.provide('ad.widget.tieba.ImageSearch');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.ImageSearch = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_image_search';

    /**
     * 图片搜索接收参数的编码.
     * @type {string}
     */
    this._imageSearchCharset = 'GBK';
};
baidu.inherits(ad.widget.tieba.ImageSearch, ad.widget.Widget);

/** @override */
ad.widget.tieba.ImageSearch.prototype.bindEvent = function () {
    var me = this;

    ad.widget.tieba.ImageSearch.superClass.bindEvent.call(me);

    var root = me.getRoot();
    var form = baidu.q('ec-image-search-form')[0];

    // IE的accept-charset仅支持指定为UTF-8
    if (baidu.browser.ie && form) {
        form.onsubmit = function () {
            var oldCharset = document.charset;
            document.charset = me._imageSearchCharset;
            this.submit();
            document.charset = oldCharset;
            return false;
        };
    }
};

/** @override */
ad.widget.tieba.ImageSearch.prototype.patchData = function () {
    if (this._data) {
        var images = this._data['images'];
        for (var i = 0, j = images.length; i < j; i++) {
            images[i]['index'] = i + 1;
        }
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
