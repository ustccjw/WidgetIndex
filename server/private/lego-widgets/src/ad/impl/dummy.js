/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/dummy.js ~ 2013/11/06 11:52:33
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * dummy相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.include('ad/impl/dummy.less');

goog.provide('ad.impl.Dummy');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setWidgets();

    if (async === true) {
        return material;
    }

    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
