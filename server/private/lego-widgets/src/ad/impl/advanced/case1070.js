/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1070.js ~ 2013/11/28 19:32:55
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * case1070相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.ImageShowHorizontal');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Table');

goog.include('ad/impl/advanced/case1070.less');

goog.provide('ad.impl.advanced.Case1070');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var imgs = AD_CONFIG['image_show']['options'];
    if (imgs && imgs.length && imgs.length > 1) {
        for (var i = 0; i < imgs.length; i++) {
            imgs[i]['title'] = i + 1;
        }
    }
    var tableConfig = {
        "head": [],
        'body': []
    };
    tableConfig['head'] = AD_CONFIG['table'][0];
    for (var w = 1; w < AD_CONFIG['table'].length; w++) {
        var cols = AD_CONFIG['table'][w];
        tableConfig['body'].push({
            "tr": cols
        });
    }

    var imageShow = new ad.widget.ImageShowHorizontal(AD_CONFIG['image_show']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var table = new ad.widget.Table(tableConfig);

    material.setWidgets(
        [imageShow, smallHead], [table]
    );

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */