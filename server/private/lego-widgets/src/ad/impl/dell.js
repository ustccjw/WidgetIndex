/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dell.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/dell.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.H1');
goog.require('ad.widget.Tab');
goog.require('ad.widget.Table');
goog.require('ui.events');

goog.include('ad/impl/dell.less');

goog.provide('ad.impl.Dell');


ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [new ad.widget.Tab(AD_CONFIG['tabs'])],
        [new ad.widget.Table(AD_CONFIG['table'])]
    );
    material.show();

    material.initMonitor(AD_CONFIG['main_url']);

});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
