/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/eczx_plus.js ~ 2013/09/30 18:00:43
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * eczx_plus相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhixin.Baike');
goog.require('ad.widget.zhixin.Aladin');

goog.include('ad/impl/zhixin/eczx_plus.less');

goog.provide('ad.impl.zhixin.EczxPlus');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var widgets = [];
    if (AD_CONFIG['baike']) {
        widgets.push(new ad.widget.zhixin.Baike(AD_CONFIG['baike']));
    }
    if (AD_CONFIG['aladin']) {
        widgets.push(new ad.widget.zhixin.Aladin(AD_CONFIG['aladin']));
    }

    material.setWidgets(
        [widgets]
    );
    if (async === true) {
        return material;
    };
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);
});



/* vim: set ts=4 sw=4 sts=4 tw=100: */