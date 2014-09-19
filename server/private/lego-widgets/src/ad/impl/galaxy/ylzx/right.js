/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/galaxy/ylzx/right.js ~ 2013/10/22 16:33:39
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * right相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.gx_sck.ylzx.Service');

goog.include('ad/impl/galaxy/ylzx/right.less');

goog.provide('ad.impl.galaxy.ylzx.Right');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [new ad.widget.gx_sck.ylzx.Service(AD_CONFIG['service'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
