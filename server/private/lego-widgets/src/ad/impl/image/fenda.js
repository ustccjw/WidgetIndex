/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/image/fenda.js ~ 2013/08/06 16:48:30
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * fenda相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.image.Flash');

goog.include('ad/impl/image/fenda.less');

goog.provide('ad.impl.image.Fenda');

ad.Debug(function(async){
    //适配数据
    var content = AD_CONFIG['flash']['content']['image'] || AD_CONFIG['flash']['content']['flash'];
    AD_CONFIG['flash']['src'] = content['src'];

    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [new ad.widget.image.Flash(AD_CONFIG['flash'])]
    );

    if(async !== true){
        material.show();
        //material.initMonitor(AD_CONFIG['main_url']);
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
