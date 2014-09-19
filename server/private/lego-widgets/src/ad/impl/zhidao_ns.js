/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: zhidao_ns.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhidao_ns.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.NSZhidao');
goog.require('ui.events');

goog.include('ad/impl/zhidao_ns.less');

goog.provide('ad.impl.ZhidaoNS');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        new ad.widget.H1(AD_CONFIG['head']),
        new ad.widget.NSZhidao(AD_CONFIG['zhidao'])
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
