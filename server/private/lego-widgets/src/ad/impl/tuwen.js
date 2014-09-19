/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tuwen.js ~ 2013/11/28 22:35:47
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * tuwen相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.H1');
goog.require('ad.widget.H2');
goog.require('ad.widget.H3');
goog.require('ad.widget.search_box.SearchBox');

goog.include('ad/impl/tuwen.less');

goog.provide('ad.impl.Tuwen');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var tableConfig = {
        "header": "",
        'rows': []
    };
    var tableBody = AD_CONFIG['table']['body'];
    tableConfig['header'] = tableBody[0];
    for (var w = 1; w < tableBody.length; w++) {
        var cols = tableBody[w];
        tableConfig['rows'].push({
            "cols": cols
        });
    }

    var productData = AD_CONFIG['products']['data'];
    for (var i = 0, l = productData.length; i < l; i ++) {
        if(productData[i]['price'] == "") {
            productData[i]['hidden_price_unit'] = false;
        }
    }

    var isShowSearch = AD_CONFIG['search_box']['is_show_search'];
    if ('false' in isShowSearch) {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.H2(AD_CONFIG['products']),
            new ad.widget.H3(tableConfig)
        );
    } else {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.H2(AD_CONFIG['products']),
            new ad.widget.H3(tableConfig),
            new ad.widget.search_box.SearchBox(isShowSearch['true'])
        );
    }

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */
