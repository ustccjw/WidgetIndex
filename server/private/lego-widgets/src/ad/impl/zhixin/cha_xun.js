/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/cha_xun.js ~ 2014/03/05 16:04:55
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * cha_xun相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhixin.Chaxun');

goog.include('ad/impl/zhixin/cha_xun.less');

goog.provide('ad.impl.zhixin.ChaXun');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [new ad.widget.zhixin.Chaxun(AD_CONFIG['chaxun'])]
    );


    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
