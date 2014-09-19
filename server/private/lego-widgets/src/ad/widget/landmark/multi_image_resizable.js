/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/landmark/multi_image_resizable.js ~ 2013/12/04 22:08:15
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * multi_image_resizable相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.dom');

goog.include('ad/widget/landmark/multi_image_resizable.less');
goog.include('ad/widget/landmark/multi_image_resizable.html');

goog.provide('ad.widget.landmark.MultiImageResizable');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.landmark.MultiImageResizable = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_landmark_multi_image_resizable';
};
baidu.inherits(ad.widget.landmark.MultiImageResizable, ad.widget.Widget);
























/* vim: set ts=4 sw=4 sts=4 tw=100 : */
