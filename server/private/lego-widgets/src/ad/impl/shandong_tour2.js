/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/shandong_tour2.js ~ 2013/06/18 14:38:43
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * shandong_tour2相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Map');

goog.include('ad/impl/shandong_tour2.less');

goog.provide('ad.impl.ShandongTour2');

ad.Debug(function(async) {
    // 便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['float_window_container']['material_name'] = 'shandong_tour2';
    // 二维码同一外链
    AD_CONFIG['bar_code']['pro_rcv_url'] = AD_CONFIG['bar_code']['des_title_rcv_url'] = AD_CONFIG['bar_code']['des_text_rcv_url'] = AD_CONFIG['bar_code']['bar_url'];

    var material = new ad.material.BaseMaterial();
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var smallWeibo = new ad.widget.SmallWeibo(AD_CONFIG['small_weibo']);
    var barCode = new ad.widget.TabCont(AD_CONFIG['bar_code']);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['button_group']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['float_window_container']);
    var fwcRenderd = false;
    var map = new ad.widget.Map(AD_CONFIG['map']);

    // tab0,tab2内容不同, 为优化spec格式将它们分出.
    AD_CONFIG['tab']['options'].unshift(AD_CONFIG['tab2']);
    AD_CONFIG['tab']['options'].unshift(AD_CONFIG['tab0']);
    var temp = AD_CONFIG['tab']['options'][1];
    AD_CONFIG['tab']['options'][1] = AD_CONFIG['tab']['options'][2];
    AD_CONFIG['tab']['options'][2] = temp;
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var tabContArr = [];

    for (var i = 0, tab; i < AD_CONFIG['tab']['options'].length; i++) {
        tab = new ad.widget.TabCont(AD_CONFIG['tab']['options'][i]['tab_cont']);
        tabContArr.push(tab);
    }
    tabContainer.setWidgets(tabContArr);
    fwc.setWidgets([map]);

    material.setRender(new ad.render.RecursiveRender());
    material.setWidgets(
        [
            leftVideo, [
                [smallHead],
                [barCode]
            ]
        ], [tabContainer], [buttonGroup], [fwc]
    );
    if (async === true) {
        return material;
    }
    material.show();

    // 百度精算监测
    // material.initHMJSMoniter(AD_CONFIG['hmjs_id']);
    // material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) material.getCMS().init
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));

    buttonGroup.addListener(ui.events.CLICK, function(idx) {
        if (0 != idx) {
            return;
        }
        fwc && fwc.show();
        buttonGroup.sendLog('float1open');
        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                fwcRenderd = true;
            }
        }
        return false;
    });
});