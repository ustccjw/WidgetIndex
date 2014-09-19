/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/cosmetic/style1.js ~ 2013/10/31 17:50:23
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * style1相关的实现逻辑
 * 化妆品知心实验（左侧）
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.zhixin.Baike');
goog.require('ad.widget.zhixin.Zhidao');
goog.require('ad.widget.aladdin.Cosmetic');

goog.include('ad/impl/zhixin/cosmetic/style1.less');

goog.provide('ad.impl.zhixin.cosmetic.Style1');

ad.Debug(function(async){
    var baike = new ad.widget.zhixin.Baike(AD_CONFIG['baike']);
    var zhidao = new ad.widget.zhixin.Zhidao(AD_CONFIG['zhidao']);
    var aladdin = new ad.widget.aladdin.Cosmetic(AD_CONFIG['aladdin']);

    var widgets = [baike, zhidao, aladdin];

    var material = new ad.material.BaseMaterial();
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
