/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/site_simple_header.js ~ 2013/04/19 16:19:24
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 150523 $
 * @description
 * site_simple_header相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.SiteSimpleHeader');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/site_simple_header.less');

goog.provide('ad.impl.tieba.SiteSimpleHeader');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.tieba.SiteSimpleHeader(AD_CONFIG['header'])]
    );
    material.show();

    // 生成的格式为ec_ma_m1234，需要替换掉前缀拿到mcid
    var materialId = AD_CONFIG['id'].replace(/ec_ma_m/, '');
    var extraParams = {};
    extraParams['materialId'] = materialId;
    var rcv2 = new ad.service.RCV2Service(AD_CONFIG['id'], null, null, {
        extraParams: extraParams
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */