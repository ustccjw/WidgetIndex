/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/

/*global COMPILED:false */


/**
 * src/ad/impl/imageplus/medical_hospital.js ~ 2013/09/02 12:23:12
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * medical_hospital相关的实现逻辑
 **/

goog.require('ad.crypt.AntiCk');
goog.require('ad.Debug');
goog.require('ad.widget.imageplus.MedicalHospital');
goog.require('ad.impl.imageplus.helper');

goog.include('ad/impl/imageplus/medical_hospital.less');

goog.provide('ad.impl.imageplus.MedicalHospital');

ad.Debug(ad.impl.imageplus.helper.createIconAd(
    ad.widget.imageplus.MedicalHospital,
    {
        'before': function (adConfig) {
            if (adConfig['timesign']) {
                // timesign 可能是字符串需要转换成数字
                // 如果没有timesign则其值为0
                adConfig['timesign'] = parseInt(adConfig['timesign'], 10);
            }
        },
        'after': function (adConfig, box) {
            // 如果都没有就不设置ck域
            if (!adConfig['target_url'] || !adConfig['timesign']) {
                return;
            }

            // 设置ck域
            new ad.crypt.AntiCk(
                box.getRoot().getElementsByTagName('a'),
                adConfig['timesign']
            );

        }
    }
));


















/* vim: set ts=4 sw=4 sts=4 tw=100  */
