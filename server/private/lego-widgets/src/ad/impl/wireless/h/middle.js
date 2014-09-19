/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/h/middle.js ~ 2013/11/29 14:17:07
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * middle相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Head');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/middle/head.less');
goog.include('ad/impl/wireless/middle/product_list.less');
goog.include('ad/impl/wireless/middle/button_list.less');
goog.include('ad/impl/wireless/middle/wide_tel_button.less');
goog.include('ad/impl/wireless/h/middle.less');

goog.provide('ad.impl.wireless.h.Middle');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    
    if(AD_CONFIG['head'] && AD_CONFIG['head']['logo_small']) {
        AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_small'];
    }

    if(AD_CONFIG['tab1'] && AD_CONFIG['tab1']['options']) {
        baidu.each(AD_CONFIG['tab1']['options'], function(item){
            item['image'] = item['image_small'];
        });
    }
    
    var widgetArr = [
        new ad.widget.wireless.Head(AD_CONFIG['head']),
        new ad.widget.wireless.ProductList(AD_CONFIG['tab1']),
        new ad.widget.ButtonList(AD_CONFIG['button_group'])
    ];

    if (AD_CONFIG['client_tel'] && AD_CONFIG['client_tel']['button'] && AD_CONFIG['client_tel']['button'].length) {
        var telConfig = AD_CONFIG['client_tel']['button'][0];
        AD_CONFIG['client_tel']['tel_icon_width'] = 14;
        AD_CONFIG['client_tel']['tel_icon_height'] = 14;
        var telBtn = new ad.widget.wireless.WideTelButton(telConfig);
        widgetArr.push(telBtn);
    }

    material.setWidgets.apply(material, widgetArr);
    

    if (async === true) {
        return material;
    }
    material.show();

});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
