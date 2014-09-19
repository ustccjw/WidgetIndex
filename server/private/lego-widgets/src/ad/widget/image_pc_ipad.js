/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: image_pc_ipad.js 2012-07-16 10:25:19Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_pc_ipad.js ~ 2012/07/17 22:07:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: $
 * @description
 * 多区域点击图片
 **/

goog.require('ad.env');
goog.require('ad.widget.Widget');

goog.include('ad/widget/image_pc_ipad.html');
goog.include('ad/widget/image_pc_ipad.less');

goog.provide('ad.widget.ImagePcIpad');
/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImagePcIpad = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_image_pc_ipad';
};
baidu.inherits(ad.widget.ImagePcIpad, ad.widget.Widget);

/**
 * @override
 */
ad.widget.ImagePcIpad.prototype.patchData = function() {
    if (this._data){
        this._data['is_ipad'] = ad.env.isIpad;
    }
};













/* vim: set ts=4 sw=4 sts=4 tw=100: */
