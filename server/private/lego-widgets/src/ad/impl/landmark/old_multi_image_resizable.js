/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/landmark/old_multi_image_resizable.js ~ 2013/12/04 23:05:54
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * old_multi_image_resizable相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.landmark.MultiImageResizable');

goog.include('ad/impl/landmark/old_multi_image_resizable.less');

goog.provide('ad.impl.landmark.OldMultiImageResizable');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();

    var multiImage = new ad.widget.landmark.MultiImageResizable(AD_CONFIG['multi_image']);
    material.setWidgets(multiImage);

    if (async === true) {
        return material;
    }
    material.show();
});

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
