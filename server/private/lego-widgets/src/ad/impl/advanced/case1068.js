/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/advanced/case1068.js ~ 2013/11/28 20:58:23
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * case1068相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/advanced/case1068.less');

goog.provide('ad.impl.advanced.Case1068');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var h1 = new ad.widget.H1(AD_CONFIG['h1']);
    AD_CONFIG['tab']['width'] = 540;
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var tabBodies = [];
    for (var i = 0; i < AD_CONFIG['tab']['options'].length; i++) {
        tabBodies.push(new ad.widget.TabCont(AD_CONFIG['tab']['options'][i]));
    }
    tab.setWidgets(tabBodies);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);

    material.setWidgets(
        [h1], [tab], [buttons]
    );

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */