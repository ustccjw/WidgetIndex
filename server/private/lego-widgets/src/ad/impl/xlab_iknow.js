/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: xlab_iknow.js 10166 2012-07-11 09:43:46Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/xlab_iknow.js ~ 2012/07/06 14:41:33
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 10166 $
 * @description
 * 掘金实验物料
 **/
goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.Material');
goog.require('ad.widget.xlab.IKnow');

goog.include('ad/impl/xlab_iknow.less');

goog.provide('ad.impl.XLabIknow');

ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [new ad.widget.xlab.IKnow(AD_CONFIG['iknow'])]
    );
    material.show();

    var ie6 = navigator.userAgent.indexOf('MSIE 6');
    if (ie6 != -1) {
        baidu.addClass(material.getRoot(), 'ie6');
    }
});





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
