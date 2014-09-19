/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/image_259_146.js ~ 2013/11/04 22:53:44
 * @author taoxutian@baidu.com (taoxutian)
 * @version $Revision: 150523 $
 * @description
 * image_259_146相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/image_259_146.less');
goog.include('ad/widget/siva/image_259_146.html');

goog.provide('ad.widget.siva.Image_259_146');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Image_259_146 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_image_259_146';
};
baidu.inherits(ad.widget.siva.Image_259_146, ad.widget.Widget);























/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
