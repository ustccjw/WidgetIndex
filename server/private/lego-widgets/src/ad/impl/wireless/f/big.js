/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/f/big.js ~ 2013/12/24 18:11:25
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * big相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.OldHead');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/big/old_head.less');
goog.include('ad/impl/wireless/big/colorlist.less');
goog.include('ad/impl/wireless/big/button_list.less');
goog.include('ad/impl/wireless/f/big.less');

goog.provide('ad.impl.wireless.f.Big');

ad.Debug(function(async) {
    if(AD_CONFIG['head'] && AD_CONFIG['head']['logo_middle']) {
        AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_middle'];
    }

    var material = new ad.material.BaseMaterial();
    var head = new ad.widget.wireless.OldHead(AD_CONFIG['head']);
    var colorList = new ad.widget.Colorlist(AD_CONFIG['links']);
    var buttonList = new ad.widget.ButtonList(AD_CONFIG['buttons']);

    var widgetArr = [head, colorList, buttonList];

    if (AD_CONFIG['tel_button'] && AD_CONFIG['tel_button']['button'] && AD_CONFIG['tel_button']['button'].length) {
        var telBtn = new ad.widget.wireless.WideTelButton(AD_CONFIG['tel_button']['button'][0]);
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


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
