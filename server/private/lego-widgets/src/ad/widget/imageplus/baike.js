/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/baike.js ~ 2013/09/02 14:11:33
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * baike相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/baike.less');
goog.include('ad/widget/imageplus/baike.html');

goog.provide('ad.widget.imageplus.Baike');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Baike = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_baike';
};
baidu.inherits(ad.widget.imageplus.Baike, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.Baike.prototype.patchData = function () {
    ad.widget.imageplus.Baike.superClass.patchData.call(this);
    if (this._data) {
        //截断百科的描述
        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                65,
                '...'
            );
        }
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100  */
