/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_top_background.js ~ 2013/06/19 13:22:13
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * image_top_background相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.plugin.api.TopBackground');

goog.include('ad/widget/image_top_background.less');
goog.include('ad/widget/image_top_background.html');

goog.provide('ad.widget.ImageTopBackground');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageTopBackground = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_top_background';
};
baidu.inherits(ad.widget.ImageTopBackground, ad.widget.Widget);

/** @override */
ad.widget.ImageTopBackground.prototype.patchData = function() {
    if (this._data) {
        ad.plugin.api.TopBackground.setData(this._data);
    }
}





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
