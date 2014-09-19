/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtz_flash_dell.js ~ 2013/12/04 11:00:13
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * qtz_flash_dell相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Title');

goog.include('ad/impl/qtz/qtz_flash_dell.less');

goog.provide('ad.impl.qtz.QtzFlashDell');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    var hoverFlash = new ad.widget.Flash(AD_CONFIG['hover_flash']);
    var title = new ad.widget.Title(AD_CONFIG['title']);

    material.setWidgets(
        [flash, hoverFlash, title]
    );

    if (async === true) {
        return material;
    }
    material.show();

    //material.initMonitor(AD_CONFIG['main_url']);
    //百度精算监测
    //material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    var flashWrap = flash.getRoot();
    var hoverFlashWrap = hoverFlash.getRoot();
    baidu.dom.hide(hoverFlashWrap);

    ad.dom.enter(flashWrap, function() {
        baidu.dom.hide(flashWrap);
        baidu.dom.show(hoverFlashWrap);
    });

    ad.dom.leave(hoverFlashWrap, function() {
        baidu.dom.show(flashWrap);
        baidu.dom.hide(hoverFlashWrap);
    });
    
    return material;
});



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */