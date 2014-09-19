/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/medical_hospital.js ~ 2013/15/11 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * medical_hospital相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/medical_hospital.less');
goog.include('ad/widget/imageplus/medical_hospital.html');

goog.provide('ad.widget.imageplus.MedicalHospital');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.MedicalHospital = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_medical_hospital';
};
baidu.inherits(ad.widget.imageplus.MedicalHospital, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.MedicalHospital.prototype.patchData = function () {
    ad.widget.imageplus.MedicalHospital.superClass.patchData.call(this);

    var me = this;
    if (me._data) {
        var adlist = me.getData('adlist');
        if (!adlist) {
            return;
        }

        baidu.array.each(adlist, function (value, index) {
            value['star'] = parseInt(value['star'], 10) * 2;

            if (index !== 0) {
                value['desc'] = '';
            }
        });
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100  */
