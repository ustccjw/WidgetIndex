/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/smart/suv.js ~ 2013/12/11 19:25:11
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * suv相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.smart.SuvHead');
goog.require('ad.widget.smart.BrandPromotion');

goog.include('ad/impl/smart/suv.less');

goog.provide('ad.impl.smart.Suv');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        new ad.widget.smart.SuvHead(AD_CONFIG['head']),
        new ad.widget.smart.BrandPromotion(AD_CONFIG['feedback'])
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
