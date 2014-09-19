/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/smart/model.js ~ 2013/12/23 20:57:49
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * model相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.smart.StyleHead');

goog.include('ad/impl/smart/model.less');

goog.provide('ad.impl.smart.Model');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        new ad.widget.smart.StyleHead(AD_CONFIG['main'])
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
