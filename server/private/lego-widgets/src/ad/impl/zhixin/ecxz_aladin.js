/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/zhixin/ecxz_aladin.js ~ 2014/04/14 16:30:49
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * ecxz_aladin相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.zhixin.Baike');
goog.require('ad.widget.zhixin.Aladin');

goog.include('ad/impl/zhixin/ecxz_aladin.less');

goog.provide('ad.impl.zhixin.EcxzAladin');

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

















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
