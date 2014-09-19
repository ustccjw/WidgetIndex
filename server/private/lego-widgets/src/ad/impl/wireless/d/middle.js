/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/d/middle.js ~ 2013/11/29 14:17:07
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * middle相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.OldHead');
goog.require('ad.widget.wireless.ButtonGrid');

goog.include('ad/impl/wireless/middle/old_head.less');
goog.include('ad/impl/wireless/middle/button_grid.less');
goog.include('ad/impl/wireless/d/middle.less');

goog.provide('ad.impl.wireless.d.Middle');

ad.Debug(function(async) {
    AD_CONFIG['head']['title'] = ad.base.subByte(AD_CONFIG['head']['title'], 24);
    AD_CONFIG['head']['description'] = ad.base.subByte(AD_CONFIG['head']['description'], 60, '...');
    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_small'];

    var material = new ad.material.BaseMaterial();

    var head = new ad.widget.wireless.OldHead(AD_CONFIG['head']);
    var buttons = new ad.widget.wireless.ButtonGrid(AD_CONFIG['buttons']);
    material.setWidgets(head, buttons);

    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
