/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/standard/old/iframe.js ~ 2013/12/26 16:30:36
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 11222 $
 * @description
 * 右侧擎天柱捷径样式
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Iframe');

goog.include('ad/impl/standard/old/iframe.less');

goog.provide('ad.impl.standard.old.Iframe');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);
    material.setWidgets(iframe);
    if (async === true) {
        return material;
    }
    material.show();
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
