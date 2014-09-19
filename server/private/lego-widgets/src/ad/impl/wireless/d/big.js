/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/wireless/d/big.js ~ 2013/11/29 14:17:07
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * big相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.wireless.OldHead');
goog.require('ad.widget.wireless.ButtonGrid');

goog.include('ad/impl/wireless/big/old_head.less');
goog.include('ad/impl/wireless/big/button_grid.less');
goog.include('ad/impl/wireless/d/big.less');

goog.provide('ad.impl.wireless.d.Big');

ad.Debug(function(async) {
    AD_CONFIG['head']['logo'] = AD_CONFIG['head']['logo_middle'];

    var material = new ad.material.BaseMaterial();

    var head = new ad.widget.wireless.OldHead(AD_CONFIG['head']);
    var buttons = new ad.widget.wireless.ButtonGrid(AD_CONFIG['buttons']);
    material.setWidgets(head, buttons);

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


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
