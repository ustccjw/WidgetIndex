/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: qtzfloat.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/qtz/qtzfloat.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * qtzfloat相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Share');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/qtz/qtzfloat.less');

goog.provide('ad.impl.qtz.Qtzfloat');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']),
        fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['float']),
        fwcVideo = new ad.widget.Video(AD_CONFIG['video']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));

    fwc.setWidgets([fwcVideo]);
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
    // FIXME(user) 初始化浮层监测
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
    flash.addListener(ui.events.CLICK, function(){
        flash.sendLog('floatopen');
        fwc.show();
        // 修复ie6.ie7下视频无法显示的bug
        fwcVideo.refresh();
        return false;
    });
    fwc.addListener(ui.events.CLOSE, function(){
        fwcVideo.getRoot().innerHTML = "";
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
