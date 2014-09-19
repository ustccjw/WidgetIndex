/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/bmw_x5.js ~ 2013/09/24 15:17:30
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * bmw_x5相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.H1');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Section');
goog.require('ad.widget.ButtonGroup');

goog.include('ad/impl/bmw_x5.less');

goog.provide('ad.impl.BmwX5');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender());
    var title = new ad.widget.H1(AD_CONFIG['title']);
    var leftImg = new ad.widget.ImageLink(AD_CONFIG['left_img']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var imgList = new ad.widget.ImageNormal(AD_CONFIG['img_list']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var buttons = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);

    material.setWidgets(
        [title],
        [leftImg, smallHead],
        [imgList],
        [section],
        [buttons]
    );

    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    var imgTitleDom = baidu.dom.create('div', {'class': 'ec-img-list-title'});
    imgTitleDom.innerHTML = AD_CONFIG['img_list']['title'];
    imgList.getRoot().appendChild(imgTitleDom);
});