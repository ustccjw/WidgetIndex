/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/image.js ~ 2012/11/15 19:00:12
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * image相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/image.html');

goog.provide('ad.widget.tieba.Image');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.Image = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_image';
};
baidu.inherits(ad.widget.tieba.Image, ad.widget.Widget);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
