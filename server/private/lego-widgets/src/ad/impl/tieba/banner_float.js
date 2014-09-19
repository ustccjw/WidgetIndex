/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: banner_float.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/banner_float.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * qtzfloat相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Image');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/tieba/banner_float.less');

goog.provide('ad.impl.tieba.BannerFloat');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    AD_CONFIG['float']['material_name'] = 'tieba-banner'
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['float']);
    var banner_img = new ad.widget.Image(AD_CONFIG['image']);

    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    fwc.setWidgets([flash]);

    material.setWidgets(
        [banner_img],
        [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.getCMS().init(material.getId());
    // FIXME(user) 初始化浮层监测
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));

    banner_img.addListener(ui.events.CLICK, function(){
        banner_img.sendLog('floatopen');
        fwc.show();
        return false;
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
