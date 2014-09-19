/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/image/adidas.js ~ 2013/11/10 03:02:54
 * @author wdw0705@gmail.com (wangdawei04)
 * @version $Revision: 11222 $
 * @description
 * adidas相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.image.Adidas');

goog.include('ad/impl/image/adidas.less');

goog.provide('ad.impl.image.Adidas');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [new ad.widget.image.Adidas(AD_CONFIG['adidas'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
