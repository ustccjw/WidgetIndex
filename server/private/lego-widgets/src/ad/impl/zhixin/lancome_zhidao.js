/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/lancome_zhidao.js ~ 2014/02/19 19:33:40
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 11222 $
 * @description
 * lancome_zhidao相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhixin.ZhidaoWenda');

goog.include('ad/impl/zhixin/lancome_zhidao.less');

goog.provide('ad.impl.zhixin.LancomeZhidao');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();

    material.setWidgets(
        [new ad.widget.zhixin.ZhidaoWenda(AD_CONFIG['wenda'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
