/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/flag/pa.js ~ 2014/03/05 15:54:32
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * flag相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.widget.imageplus.BaseWidget');
goog.require('ui.events');

goog.include('ad/widget/imageplus/flag/pa.less');
goog.include('ad/widget/imageplus/flag/pa.html');

goog.provide('ad.widget.imageplus.flag.Pa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.flag.Pa = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_flag_box_pa';
};
baidu.inherits(ad.widget.imageplus.flag.Pa, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.flag.Pa.prototype.patchData = function () {
    ad.widget.imageplus.flag.Pa.superClass.patchData.call(this);
    if (this._data) {
        //截断百科的描述
        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                70,
                '...'
            );
        }
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */