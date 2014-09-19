/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/a/big.js ~ 2013/11/29 14:17:07
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * big相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.Head');
goog.require('ad.widget.wireless.ProductList');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/big/head.less');
goog.include('ad/impl/wireless/big/product_list.less');
goog.include('ad/impl/wireless/big/button_list.less');
goog.include('ad/impl/wireless/h/big.less');

goog.provide('ad.impl.wireless.h.Big');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    
    if(AD_CONFIG['head'] && AD_CONFIG['head']['logo_middle']) {
        AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_middle'];
    }
    if(AD_CONFIG['tab1'] && AD_CONFIG['tab1']['options']) {
        baidu.each(AD_CONFIG['tab1']['options'], function(item){
            item['image'] = item['image_middle'];
        });
    }

    var widgetArr = [
        new ad.widget.wireless.Head(AD_CONFIG['head']),
        new ad.widget.wireless.ProductList(AD_CONFIG['tab1']),
        new ad.widget.ButtonList(AD_CONFIG['button_group'])
    ]

    if (AD_CONFIG['client_tel'] && AD_CONFIG['client_tel']['button'] && AD_CONFIG['client_tel']['button'].length) {
        var telConfig = AD_CONFIG['client_tel']['button'][0];
        telConfig['tel_icon_width'] = 20;
        telConfig['tel_icon_height'] = 20;
        var telBtn = new ad.widget.wireless.WideTelButton(telConfig);
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
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
