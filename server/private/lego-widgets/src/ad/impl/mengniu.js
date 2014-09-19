/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: mengniu.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/mengniu.js ~ 2013/03/18 13:45:50
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * lv2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Section');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ui.events');

goog.include('ad/impl/mengniu.less');

goog.provide('ad.impl.MengNiu');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var logo = new ad.widget.Image(AD_CONFIG['left_img']);
    material.setWidgets(
        [
            [logo],
            [new ad.widget.SmallHead(AD_CONFIG['head']), new ad.widget.Section(AD_CONFIG['section'])]
        ],
        [new ad.widget.Image(AD_CONFIG['bottom_img'])]
    );
    if (async === true) {
        return material;
    }

    material.show();
    
    //material.initMonitor(AD_CONFIG['main_url']);
    logo.rewriteTitle2(logo.getRoot(), 'LOGO', true);
});

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
