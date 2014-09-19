/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/h2/smart.js ~ 2014/01/16 12:07:55
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * smart相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Head');
goog.require('ad.widget.wireless.Tab');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.wireless.HttpForm');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/smart/head.less');
goog.include('ad/impl/wireless/smart/product_list.less');
goog.include('ad/impl/wireless/smart/button_list.less');
goog.include('ad/impl/wireless/h/smart.less');

goog.provide('ad.impl.wireless.h2.Smart');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    
    if(AD_CONFIG['head'] && AD_CONFIG['head']['logo_big']) {
        AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_big'];
    }
    if(AD_CONFIG['tab1'] && AD_CONFIG['tab1']['options']) {
        baidu.each(AD_CONFIG['tab1']['options'], function(item){
            item['image'] = item['image_big'];
        });
    }
    if(AD_CONFIG['tab2'] && AD_CONFIG['tab2']['options']) {
        baidu.each(AD_CONFIG['tab2']['options'], function(item){
            item['image'] = item['image_big'];
        });
    }
    var tab1 = new ad.widget.wireless.ProductList(AD_CONFIG['tab1']);
    var tab2 = new ad.widget.wireless.ProductList(AD_CONFIG['tab2']);
    var tab3 = new ad.widget.wireless.HttpForm(AD_CONFIG['tab3']['form_obj']);
    if(AD_CONFIG['tab']) {
        AD_CONFIG['tab']['options'] = [];
        AD_CONFIG['tab']['options'].push({'tab_title': AD_CONFIG['tab1']['tab_title']});
        AD_CONFIG['tab']['options'].push({'tab_title': AD_CONFIG['tab2']['tab_title']});
        AD_CONFIG['tab']['options'].push({'tab_title': AD_CONFIG['tab3']['tab_title']});
    }
    var tabContainer = new ad.widget.wireless.Tab(AD_CONFIG['tab']);
    tabContainer.setWidgets([tab1, tab2, tab3]);

    var widgetArr = [
        new ad.widget.wireless.Head(AD_CONFIG['head']),
        tabContainer,
        new ad.widget.ButtonList(AD_CONFIG['button_group'])
    ]

    if (AD_CONFIG['client_tel'] && AD_CONFIG['client_tel']['button'] && AD_CONFIG['client_tel']['button'].length) {
        var telBtn = new ad.widget.wireless.WideTelButton(AD_CONFIG['client_tel']['button'][0]);
        widgetArr.push(telBtn);
    }

    material.setWidgets.apply(material, widgetArr);

    if (async === true) {
        return material;
    }
    material.show();

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
