/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: flash.js 14208 2012-11-09 11:56:17Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/flash.js ~ 2012/11/09 19:15:37
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 14208 $
 * @description
 * flash相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Flash');

goog.include('ad/impl/flash.less');

goog.provide('ad.impl.Flash');

ad.Debug(function(){
    var material = new ad.Material(AD_CONFIG['id']);
    // material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [new ad.widget.Flash(AD_CONFIG['flash'])]
    );
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
