/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/baike.js ~ 2014/03/05 14:36:54
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * baike相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhixin.Baike');

goog.include('ad/impl/zhixin/baike.less');

goog.provide('ad.impl.zhixin.Baike');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [new ad.widget.zhixin.Baike(AD_CONFIG['baike'])]
    );

    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
