/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/flag/lu.js ~ 2014/08/11 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 **/

goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.provide('ad.widget.imageplus.v2.flag.Lu');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.flag.Lu = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);
};
baidu.inherits(ad.widget.imageplus.v2.flag.Lu, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.flag.Lu.prototype.getMainHtml = function () {
    return this.getData('desc', '');
};






















/* vim: set ts=4 sw=4 sts=4 tw=100  */
