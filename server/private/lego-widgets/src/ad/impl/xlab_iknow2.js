/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: xlab_iknow2.js 10804 2012-08-01 03:13:54Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/impl/xlab_iknow2.js ~ 2012/07/11 10:31:03
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 10804 $
 * @description
 *
 **/
goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.xlab.IKnow2');
goog.provide('ad.impl.XLabIknow2');

ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.xlab.IKnow2(AD_CONFIG['iknow'])]
    );
    material.show();

    var ie6 = navigator.userAgent.indexOf('MSIE 6');
    if (ie6 != -1) {
        baidu.addClass(material.getRoot(), 'ie6');
    }
});





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
