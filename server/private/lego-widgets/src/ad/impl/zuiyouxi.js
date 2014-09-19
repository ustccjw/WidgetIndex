/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/zuiyouxi.js ~ 2013/10/08 21:29:03
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision$
 * @description
 * 标准样式A
 **/
goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.H1Cpc');
goog.require('ad.widget.Colorlist');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.ImageNormal');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/h1.less');
goog.include('ad/impl/standard/colorlist.less');
goog.include('ad/impl/standard/button_group.less');
goog.include('ad/impl/zuiyouxi.less');

goog.provide('ad.impl.ZuiYouXi');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        new ad.widget.H1Cpc(AD_CONFIG['head']),
        [
            new ad.widget.ImageNormal(AD_CONFIG['products']),
            new ad.widget.Colorlist(AD_CONFIG['list'])
        ],
        new ad.widget.ButtonGroup(AD_CONFIG['buttons'])
    );
    

    if (async === true) {
        return material;
    }

    material.show();
    
    var btnGroup = material.getWidget(2);
    btnGroup.rewriteTitle2(btnGroup.getRoot(), '底部');
});




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
