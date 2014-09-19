/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/medical_disease.js ~ 2013/15/11 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * medical_disease相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/medical_disease.less');
goog.include('ad/widget/imageplus/medical_disease.html');

goog.provide('ad.widget.imageplus.MedicalDisease');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.MedicalDisease = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_medical_disease';
};
baidu.inherits(ad.widget.imageplus.MedicalDisease, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.MedicalDisease.prototype.bindEvent = function () {
    ad.widget.imageplus.MedicalDisease.superClass.bindEvent.call(this);

    var input = this.getRoot().getElementsByTagName('input')[0];
    if (input) {
        var hospitalBt = baidu.dom.next(input);
        var hospitalUrl = this.getData('search_ad.hosurl');
        var diseaseBt = baidu.dom.next(hospitalBt);
        var diseaseUrl = this.getData('search_ad.disurl');

        var originalText = input.value;
        baidu.on(input, 'focus', function (e) {
            if (ad.string.trim(input.value) === originalText) {
                input.value = '';
            }
        });
        var wdReg = /(\?|&)wd=[^&$]+/;
        baidu.on(input, 'blur', function (e) {
            if (ad.string.trim(input.value) === '') {
                input.value = originalText;
            }

            var v = input.value;
            hospitalBt.href = hospitalUrl.replace(wdReg, function (r, $1) {
                return $1 + 'wd=' + v;
            });
            diseaseBt.href = diseaseUrl.replace(wdReg, function (r, $1) {
                return $1 + 'wd=' + v;
            });
        });
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100  */
