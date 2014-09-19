/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/dell2.js ~ 2013/11/25 16:14:59
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * dell2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.TabContainer');

goog.include('ad/impl/dell2.less');

goog.provide('ad.impl.Dell2');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.H1(AD_CONFIG['title']);
    var leftImage = new ad.widget.ImageLink(AD_CONFIG['left_image']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var imageButtons = new ad.widget.ImageNormal(AD_CONFIG['image_buttons']);
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var imageLinks = [];
    var tabOptions = ad.base.getObjectByName('tab.options', AD_CONFIG);

    if (tabOptions && tabOptions.length) {
        for (var i = 0, len = tabOptions.length; i < len; i++) {
            imageLinks.push(new ad.widget.ImageLink(tabOptions[i]));
        }
    }
    tab.setWidgets(imageLinks);

    material.setWidgets(
        [title],
        [leftImage, [smallHead, section]],
        [imageButtons],
        [tab]
    );

    if (async === true) {
        return material;
    }

    material.show();
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */