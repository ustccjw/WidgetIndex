/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1098.js ~ 2013/11/01 17:21:46
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * case1073相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.Table');
goog.require('ui.events');

goog.include('ad/impl/advanced/case1098.less');

goog.provide('ad.impl.advanced.Case1098');

ad.Debug(function(async) {

    var material = new ad.material.BaseMaterial();
    var tableConf = {"head": [], 'body': [] };
    tableConf['head'] = AD_CONFIG['table'][0];
    for(var w = 1; w < AD_CONFIG['table'].length; w++) {
        var cols = AD_CONFIG['table'][w];
        tableConf['body'].push({"tr": cols});
    }
    var section1 = new ad.widget.Section(AD_CONFIG['section1']);
    var section2 = new ad.widget.Section(AD_CONFIG['section2']);
    
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['h1'])],
        [section1],
        [new ad.widget.ImageCartoon(AD_CONFIG['img_card'])],
        [section2],
        [new ad.widget.Table(tableConf)]
    );
    if (async === true) {
        return material;
    }
    material.show();
    
    section1.rewriteTitle2(section1.getRoot(), "top-");
    section2.rewriteTitle2(section2.getRoot(), "bottom-");
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
