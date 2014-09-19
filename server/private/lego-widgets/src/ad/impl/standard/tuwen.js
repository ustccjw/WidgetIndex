/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/tuwen.js ~ 2013/10/08 21:29:03
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision$
 * @description
 * 标准样式A
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.H1');
goog.require('ad.widget.H2');
goog.require('ad.widget.H3');
goog.require('ad.widget.search_box.SearchBox');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/h1.less');
goog.include('ad/impl/standard/h2.less');
goog.include('ad/impl/standard/h3.less');
goog.include('ad/impl/standard/search_box.less');
goog.include('ad/impl/standard/tuwen.less');

goog.provide('ad.impl.standard.Tuwen');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    
    var tableConf = {"header": "", 'rows': [] };
    tableConf['header'] = AD_CONFIG['table'][0];
    for(var w = 1; w < AD_CONFIG['table'].length; w++) {
        var cols = AD_CONFIG['table'][w];
        tableConf['rows'].push({"cols": cols});
    }
    baidu.each(AD_CONFIG['products']['data'], function(item){
        if(item && !item['price']) {
            item['hidden_price_unit'] = false;
        }
        else {
            item['hidden_price_unit'] = true;
        }
    });
    var isShowSearch = AD_CONFIG['search_box']['is_show_search'];
    if('false' in isShowSearch){
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.H2(AD_CONFIG['products']),
            new ad.widget.H3(tableConf)
        );
    }else {
        if(isShowSearch['true'] && !isShowSearch['true']['button_text']) {
            isShowSearch['true']['button_text'] = "搜索";
        }
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.H2(AD_CONFIG['products']),
            new ad.widget.H3(tableConf),
            new ad.widget.search_box.SearchBox(isShowSearch['true'])
        );
    }
    
    if (async === true) {
        return material;
    }

    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
