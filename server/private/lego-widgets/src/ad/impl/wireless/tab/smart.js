/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/tab/smart.js ~ 2013/12/09 14:36:59
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * smart相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Head');
goog.require('ad.widget.wireless.Tab');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/smart/head.less');
goog.include('ad/impl/wireless/smart/product_list.less');
goog.include('ad/impl/wireless/smart/button_list.less');
goog.include('ad/impl/wireless/tab/smart.less');

goog.provide('ad.impl.wireless.tab.Smart');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_big'];
    var title = new ad.widget.wireless.Head(AD_CONFIG['head']);
    var buttons = new ad.widget.ButtonList(AD_CONFIG['buttons']);

    var tabTitles = [];
    var tabPanels = [];
    var tabConfig = AD_CONFIG['tab'];
    var tabs = [AD_CONFIG['tab']['tab1'], AD_CONFIG['tab']['tab2'], AD_CONFIG['tab']['tab3']];

    baidu.each(tabs, function(tab) {
        var productConfig = tab['cont'];
        tabTitles.push({
            'tab_title': tab['title']
        });
        baidu.each(productConfig['options'], function(item) {
            item['image'] = item['image_big'];
        });
        tabPanels.push(new ad.widget.wireless.ProductList(productConfig));
    });

    tabConfig['options'] = tabTitles;
    var tab = new ad.widget.wireless.Tab(tabConfig);
    tab.setWidgets(tabPanels);

    var widgetArr = [
        [title],
        [tab],
        [buttons]
    ];

    if (AD_CONFIG['tel_button'] && AD_CONFIG['tel_button']['button'] && AD_CONFIG['tel_button']['button'].length) {
        var telBtn = new ad.widget.wireless.WideTelButton(AD_CONFIG['tel_button']['button'][0]);
        widgetArr.push(telBtn);
    }

    material.setWidgets.apply(material, widgetArr);

    if (async === true) {
        return material;
    }
    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */