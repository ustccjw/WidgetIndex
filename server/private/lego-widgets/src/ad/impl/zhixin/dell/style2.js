/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/cosmetic/style2.js ~ 2013/10/31 20:56:26
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 * style2相关的实现逻辑
 * 化妆品知心实验（右侧）
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.zhixin.Rank');

goog.include('ad/impl/zhixin/dell/style2.less');

goog.provide('ad.impl.zhixin.dell.Style2');

ad.Debug(function(async){
    var rank = new ad.widget.zhixin.Rank(AD_CONFIG['rank']);

    var material = new ad.material.BaseMaterial();
    material.setWidgets([rank]);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
