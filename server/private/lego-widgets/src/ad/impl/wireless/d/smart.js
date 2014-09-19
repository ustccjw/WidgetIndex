/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/d/smart.js ~ 2013/11/28 15:30:57
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * smart相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.OldHead');
goog.require('ad.widget.wireless.ButtonGrid');

goog.include('ad/impl/wireless/smart/old_head.less');
goog.include('ad/impl/wireless/smart/button_grid.less');
goog.include('ad/impl/wireless/d/smart.less');

goog.provide('ad.impl.wireless.d.Smart');

ad.Debug(function(async) {
    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_big'];

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
