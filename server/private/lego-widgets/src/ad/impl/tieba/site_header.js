/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/site_header.js ~ 2013/04/03 16:47:31
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 11222 $
 * @description
 * site_header相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.tieba.SiteHeader');
goog.require('ad.service.RCV2Service');

goog.include('ad/impl/tieba/site_header.less');

goog.provide('ad.impl.tieba.SiteHeader');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.tieba.SiteHeader(AD_CONFIG['header'])]
    );
    if (async === true) {
        return material;
    }
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
