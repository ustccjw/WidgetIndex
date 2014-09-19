/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/tab/big.js ~ 2013/12/09 17:49:55
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * big相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Head');
goog.require('ad.widget.wireless.Tab');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/big/head.less');
goog.include('ad/impl/wireless/big/product_list.less');
goog.include('ad/impl/wireless/big/button_list.less');
goog.include('ad/impl/wireless/tab/big.less');

goog.provide('ad.impl.wireless.tab.Big');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_middle'];

    var title = new ad.widget.wireless.Head(AD_CONFIG['head']);
    var buttons = new ad.widget.ButtonList(AD_CONFIG['buttons']);

    var productConfig = AD_CONFIG['tab']['tab1']['cont'];
    baidu.each(productConfig['options'], function(item) {
        item['image'] = item['image_middle'];
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
            'tel_icon_src': 'http://bs.baidu.com/adtest/01930793b841d00601223d40dbb92d0d.png',
            'tel_icon_width': 20,
            'tel_icon_height': 20
        }, true);
        var telBtn = new ad.widget.wireless.WideTelButton(btnConfig);
        widgetArr.push(telBtn);
    }

    material.setWidgets.apply(material, widgetArr);

    if (async === true) {
        return material;
    }
    material.show();

    /*fix 极速版(utouch)无左右边距问题*/
    var canvasDom = material.getRoot();
    var canvasWrap = baidu.dom.getAncestorByClass(canvasDom, 'ec_wise_utouch');

    if(canvasWrap) {
        baidu.dom.setStyle(canvasDom, 'margin', '0 10px');
    }

    if (!AD_CONFIG['tel_button']) {
        baidu.dom.setStyle(buttons.getRoot(), 'border-bottom', '1px solid #e1e1e1');
    }
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */