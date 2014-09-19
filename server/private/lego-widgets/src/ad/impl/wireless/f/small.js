/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/f/small.js ~ 2013/12/24 18:11:35
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * small相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.OldHead');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ButtonList');
goog.require('ad.widget.wireless.WideTelButton');

goog.include('ad/impl/wireless/small/old_head.less');
goog.include('ad/impl/wireless/small/colorlist.less');
goog.include('ad/impl/wireless/small/button_list.less');
goog.include('ad/impl/wireless/small/wide_tel_button.less');
goog.include('ad/impl/wireless/f/small.less');

goog.provide('ad.impl.wireless.f.Small');

ad.Debug(function(async) {
    AD_CONFIG['head']['title'] = ad.base.subByte(AD_CONFIG['head']['title'], 20);
    AD_CONFIG['head']['description'] = ad.base.subByte(AD_CONFIG['head']['description'], 60, '...');
    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_small'];

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
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
