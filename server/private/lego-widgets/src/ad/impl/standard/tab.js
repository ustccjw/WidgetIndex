/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/tab.js ~ 2013/10/26 20:32:38
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * 高级样式——多TAB展现样式
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.H1');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.standard.TabCont');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/h1.less');
goog.include('ad/impl/standard/tab.less');
goog.include('ad/impl/standard/tab_cont.less');
goog.include('ad/impl/standard/button_group.less');

goog.provide('ad.impl.standard.Tab');

ad.Debug(function(async){
    var head = new ad.widget.H1(AD_CONFIG['head']);
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);

    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    for (var i = 0; i < tabOptions.length; i ++) {
        tabBodies.push(new ad.widget.standard.TabCont(tabOptions[i]));
    }
    tab.setWidgets(tabBodies);

    var widgets = [head, tab, buttons];

    var material = new ad.material.BaseMaterial();
    material.setWidgets(widgets);

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
