/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/dell/style1.js ~ 2013/10/31 17:50:23
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * style1相关的实现逻辑
 * 化妆品知心实验（左侧）
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.zhixin.Tieba');
goog.require('ad.widget.zhixin.Zhidao');

goog.include('ad/impl/zhixin/dell/style1.less');

goog.provide('ad.impl.zhixin.dell.Style1');

ad.Debug(function(async){
    var zhidao = new ad.widget.zhixin.Zhidao(AD_CONFIG['zhidao']);
    var tieba = new ad.widget.zhixin.Tieba(AD_CONFIG['tieba']);

    var widgets = [zhidao, tieba];

    var material = new ad.material.BaseMaterial();
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
