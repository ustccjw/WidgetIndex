/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/video.js ~ 2013/09/02 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * video相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/video.less');
goog.include('ad/widget/imageplus/video.html');

goog.provide('ad.widget.imageplus.Video');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Video = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_video';
};
baidu.inherits(ad.widget.imageplus.Video, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.Video.prototype.patchData = function () {
    ad.widget.imageplus.Video.superClass.patchData.call(this);
    if (this._data) {
        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                38,
                '...'
            );
        }

        this._data['seller_name'] = this._data['seller_name'] || '百度爱玩';
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100  */
