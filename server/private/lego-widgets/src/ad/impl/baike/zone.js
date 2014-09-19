/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/baike/zone.js ~ 2013/12/31 15:54:50
 * @author wdw0705@gmail.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * zone相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.baike.SimpleTitle2');

goog.include('ad/impl/baike/zone.less');

goog.provide('ad.impl.baike.Zone');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        new ad.widget.baike.SimpleTitle2(AD_CONFIG['simple_title2'])
    );
    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
