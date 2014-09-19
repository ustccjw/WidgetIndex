/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/tuwen_rcres1.js ~ 2013/11/28 22:35:47
 * @author shaojunjie@baidu.com (shaojunjie) fanxueliang@baidu.com(fanxueliang)
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

goog.include('ad/impl/tuwen_rcres1.less');

goog.provide('ad.impl.TuwenRcres1');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var tableConfig = {
        "header": "",
        'rows': []
    };
    tableConfig['header'] = AD_CONFIG['table']['tableValue'][0];
    for (var w = 1; w < AD_CONFIG['table']['tableValue'].length; w++) {
        var cols = AD_CONFIG['table']['tableValue'][w];
        tableConfig['rows'].push({
            "cols": cols
        });
    }

    if ( 'true' in AD_CONFIG['search_box']['is_show_search']) {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.H2(AD_CONFIG['products']),
            new ad.widget.H3(tableConfig),
            new ad.widget.search_box.SearchBox(AD_CONFIG['search_box']['is_show_search']['true'])
        );
    } else {
        material.setWidgets(
            new ad.widget.H1(AD_CONFIG['head']),
            new ad.widget.H2(AD_CONFIG['products']),
            new ad.widget.H3(tableConfig)
        );
    }

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */