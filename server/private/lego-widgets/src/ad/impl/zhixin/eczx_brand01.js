/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/eczx_brand01.js ~ 2014/02/28 12:18:36
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * eczx_brand01相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.zhixin.Brand');

goog.include('ad/impl/zhixin/eczx_brand01.less');

goog.provide('ad.impl.zhixin.EczxBrand01');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    AD_CONFIG['brand']['ubs_config'] = '{"rsv_dl":"0_right_ppqj_999999"}';
    material.setWidgets(
        [new ad.widget.zhixin.Brand(AD_CONFIG['brand'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
