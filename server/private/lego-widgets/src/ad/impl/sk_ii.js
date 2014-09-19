/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: sk_ii.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/sk_ii.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Tab');
goog.require('ad.widget.ButtonGroup');
goog.require('ui.events');

goog.include('ad/impl/sk_ii.less');

goog.provide('ad.impl.SkII');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [new ad.widget.Tab(AD_CONFIG['tabs'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
