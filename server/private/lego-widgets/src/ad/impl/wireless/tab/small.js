/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/tab/small.js ~ 2013/12/09 17:50:09
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * small相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Head');
goog.require('ad.widget.wireless.Tab');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/small/head.less');
goog.include('ad/impl/wireless/small/product_list.less');
goog.include('ad/impl/wireless/small/button_list.less');
goog.include('ad/impl/wireless/small/wide_tel_button.less');
goog.include('ad/impl/wireless/tab/small.less');

goog.provide('ad.impl.wireless.tab.Small');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_small'];
    AD_CONFIG['head']['title'] = ad.base.subByte(AD_CONFIG['head']['title'], 20);
    AD_CONFIG['head']['description'] = ad.base.subByte(AD_CONFIG['head']['description'], 60, '...');

    var title = new ad.widget.wireless.Head(AD_CONFIG['head']);
    var buttons = new ad.widget.ButtonList(AD_CONFIG['buttons']);
    var productConfig = AD_CONFIG['tab']['tab1']['cont'];
    baidu.each(productConfig['options'], function(item) {
        item['title'] = ad.base.subByte(item['title'], 24, '...');
        item['image'] = item['image_small'];
    });
    var productList = new ad.widget.wireless.ProductList(productConfig);

    var widgetArr = [
        [title],
        [productList],
        [buttons]
    ];

    if (AD_CONFIG['tel_button'] && AD_CONFIG['tel_button']['button'] && AD_CONFIG['tel_button']['button'].length) {
        var btnConfig = AD_CONFIG['tel_button']['button'][0];
        ad.base.extend(btnConfig, {
            'tel_icon_src': 'http://bs.baidu.com/adtest/3781c71321f3c9889b7363d8b5c5eabb.png',
            'tel_icon_width': 14,
            'tel_icon_height': 14
        }, true);
        var telBtn = new ad.widget.wireless.WideTelButton(btnConfig);
        widgetArr.push(telBtn);
    }

    material.setWidgets.apply(material, widgetArr);

    if (async === true) {
        return material;
    }
    material.show();

    if (!AD_CONFIG['tel_button']) {
        baidu.dom.setStyle(buttons.getRoot(), 'border-bottom', '1px solid #e1e1e1');
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */