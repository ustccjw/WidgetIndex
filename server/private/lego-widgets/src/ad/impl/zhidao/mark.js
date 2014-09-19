/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao/powerlink.js ~ 2013/11/06 18:30:33
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * powerlink相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhidao.MicroBrand');
goog.include('ad/impl/zhidao/mark.less');
goog.provide('ad.impl.zhidao.Mark');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        new ad.widget.zhidao.MicroBrand(AD_CONFIG['micro'])
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
