/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/coca_cola/coca_cola.js ~ 2014/03/03 17:11:57
 * @author loutongbing@baidu.com (loutongbing)
 * @version $Revision: 11222 $
 * @description
 * coca_cola相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.coca_cola.CocaCola');
goog.require('ad.widget.ShowUrl');
goog.include('ad/impl/coca_cola/coca_cola.less');
goog.provide('ad.impl.coca_cola.CocaCola');
ad.Debug(function(async){    
    AD_CONFIG['show_url']['brand_url'] = 'http://yingxiao.baidu.com/product/ma/11.html';
    AD_CONFIG['show_url']['brand_text'] = '品牌推广';
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [
            new ad.widget.coca_cola.CocaCola(AD_CONFIG['cocaCola']),
            new ad.widget.ShowUrl(AD_CONFIG['show_url'])
        ]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
