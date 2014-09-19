/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/image/list.js ~ 2013/08/14 17:43:03
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * list相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.image.Shiyan2');
goog.include('ad/impl/image/list.less');

goog.provide('ad.impl.image.List');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.image.Shiyan2(AD_CONFIG['shiyan2'])]
    );

    if(async !== true){
        material.show();
        material.initMonitor(AD_CONFIG['main_url']);
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
