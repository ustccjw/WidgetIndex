/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/zuche.js ~ 2013/10/08 21:29:03
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision$
 * @description
 * 标准样式A
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.H1');
goog.require('ad.widget.H3');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ZuChe');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.NormalContainer');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/h1.less');
goog.include('ad/impl/standard/h3.less');
goog.include('ad/impl/standard/tab.less');
goog.include('ad/impl/new_custom/zuche.less');

goog.provide('ad.impl.new_custom.ZuChe');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    
    var tableConf = {"header": "", 'rows': [] };
    tableConf['header'] = AD_CONFIG['table'][0];
    for(var w = 1; w < AD_CONFIG['table'].length; w++) {
        var cols = AD_CONFIG['table'][w];
        tableConf['rows'].push({"cols": cols});
    }
    var tabBodies = [];
    
    tabBodies.push(new ad.widget.ZuChe(AD_CONFIG['tab1']['form']));
    tabBodies.push(new ad.widget.ZuChe(AD_CONFIG['tab2']['form']));
    tabBodies.push(new ad.widget.ZuChe(AD_CONFIG['tab3']['form']));
    var normal = new ad.widget.NormalContainer({});
    normal.setWidgets(
        new ad.widget.ZuChe(AD_CONFIG['tab4']['form']),
        new ad.widget.Colorlist(AD_CONFIG['tab4']['links'])
    );
    tabBodies.push(normal);
    AD_CONFIG['tab']['options'] = [];
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab1']["tab_title"]});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab2']["tab_title"]});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab3']["tab_title"]});
    AD_CONFIG['tab']['options'].push({"tab_title": AD_CONFIG['tab4']["tab_title"]});
    
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab.setWidgets(tabBodies);
    
    material.setWidgets(
        new ad.widget.H1(AD_CONFIG['head']),
        tab,
        new ad.widget.H3(tableConf)
    );
    if (async === true) {
        return material;
    }

    material.show();
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
