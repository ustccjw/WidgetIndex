/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: button_float.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/tieba/button_float.js ~ 2013/06/05 11:13:05
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * button_float相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Image');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/tieba/button_float.less');

goog.provide('ad.impl.tieba.ButtonFloat');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var buttonImg = new ad.widget.Image(AD_CONFIG['image']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['float']);
    var flash = new ad.widget.Flash(AD_CONFIG['flash']);

    fwc.setWidgets([flash]);

    material.setWidgets(
        [buttonImg],
        [fwc]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.getCMS().init(material.getId());
    // FIXME(user) 初始化浮层监测
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));

    buttonImg.addListener(ui.events.CLICK, function() {
        buttonImg.sendLog('float1open');
        fwc.show();
        return false;
    });
});
