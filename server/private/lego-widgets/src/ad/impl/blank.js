/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/blank.js ~ 2014/05/06 16:55:21
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * blank相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.tieba.Blank');

goog.include('ad/impl/blank.less');

goog.provide('ad.impl.Blank');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var height = AD_CONFIG['height'] || 0;
    var blankCont = new ad.widget.tieba.Blank({});

    material.setWidgets(
        [blankCont]
        );
    if (async === true) {
        return material;
    }

    material.show();
    baidu.dom.setBorderBoxHeight(blankCont.getRoot(), height);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
