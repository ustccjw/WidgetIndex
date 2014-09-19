/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/smart/suv_head.js ~ 2013/12/11 18:44:18
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * suv_head相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/smart/suv_head.less');
goog.include('ad/widget/smart/suv_head.html');

goog.provide('ad.widget.smart.SuvHead');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.smart.SuvHead = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_smart_suv_head';
};
baidu.inherits(ad.widget.smart.SuvHead, ad.widget.Widget);


/** @override */
ad.widget.smart.SuvHead.prototype.patchData = function() {
    if (this._data) {
        var imgs = this._data['images'];
        for (var i = 0, len = imgs.length; i < len; i++) {
            imgs[i]['brand_search_url'] = 'http://www.baidu.com/s?ie=UTF-8&wd=' + encodeURIComponent(imgs[i]['brand_name']);
            if (!imgs[i]['brand_rcv_url']) {
                imgs[i]['brand_rcv_url'] = imgs[i]['brand_search_url'];
            }
        }
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
