/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: shandong_tour.js 150523 2013/04/16 15:07:09Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/shandong_tour.js ~ 2013/04/16 15:07:09
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * shandong_tour相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Title');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.Section');
goog.require('ad.widget.H1');
goog.require('ad.widget.Table');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Map');

goog.include('ad/impl/shandong_tour.less');

goog.provide('ad.impl.ShandongTour');

ad.Debug(function(async){
    var material = new ad.Material(AD_CONFIG['id']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var image_nor = new ad.widget.ImageNormal(AD_CONFIG['image_nor']);
    var small_hd = new ad.widget.SmallHead(AD_CONFIG['small_hd']);
    var image_cart = new ad.widget.ImageCartoon(AD_CONFIG['image_cart']);
    var section = new ad.widget.Section(AD_CONFIG['section']);
    var h1 = new ad.widget.H1(AD_CONFIG['h1']);
    var table = new ad.widget.Table(AD_CONFIG['table']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['float_window_container']);
    var map = new ad.widget.Map(AD_CONFIG['map']);

    fwc.setWidgets([map]);

    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [title],
        [
            image_nor,
            [
                [small_hd],
                [image_cart]
            ]
        ],
        [section],
        [h1],
        [table],
        [fwc]
    );
    if (async === true) {
        return material;
    }

    material.show();

    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) material.getCMS().init
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));

    image_nor.addListener(ui.events.CLICK, function () {
        fwc&&fwc.show();
        image_nor.sendLog('floatopen');
        return false;
    });

    fwc.addListener(ui.events.CLOSE, function() {
        fwc.sendLog('floatclose');
    });
});