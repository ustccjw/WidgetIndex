/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: qtzimagefloat.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtzimagefloat.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * qtzfloat相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.ImagePcIpad');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Share');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/qtz/qtzimagefloat.less');

goog.provide('ad.impl.qtz.Qtzimagefloat');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']),
        fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['float']),
        fwcImage = new ad.widget.ImagePcIpad(AD_CONFIG['image']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));

    fwc.setWidgets([fwcImage]);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);
    material.setWidgets(
        [flash],
        [new ad.widget.Share(AD_CONFIG['share'])],
        [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.getCMS().init(material.getId());
    //FIXME(user) 初始化浮层监测
    //material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
    flash.addListener(ui.events.CLICK, function(){
        flash.sendLog('floatopen');
        fwc.show();
        return false;
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
