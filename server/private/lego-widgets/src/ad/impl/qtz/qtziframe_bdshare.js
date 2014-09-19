/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: qtziframe_bdshare.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtziframe_bdshare.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * qtzfloat相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.BaiduShare');

goog.include('ad/impl/qtz/qtziframe_bdshare.less');

goog.provide('ad.impl.qtz.QtziframeBdshare');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    var flash = new ad.widget.Iframe(AD_CONFIG['iframe']);
    material.setWidgets(
        [flash],
        [new ad.widget.BaiduShare(AD_CONFIG['share'])]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.getCMS().init(material.getId());
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
