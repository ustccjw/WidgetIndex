/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dazong.js 9564 2012-06-06 04:43:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/dazong.js ~ 2012/06/06 11:47:13
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9564 $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.render.DefaultRender');
goog.require('ad.widget.H1');
goog.require('ad.widget.TabCont');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.CardFlash');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Bmap');
goog.require('ui.events');

goog.include('ad/impl/dazong.less');

goog.provide('ad.impl.Dazong');


ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    
    AD_CONFIG['fwc']['material_name'] = 'ec-dazong';
    AD_CONFIG['fwc']['id'] = "left";
    AD_CONFIG['tab_titles']['width'] = 535;
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab_titles']);
    var card_flash = new ad.widget.CardFlash(AD_CONFIG['tab5']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['tab1']);
    AD_CONFIG['fwc']['display_bg_iframe'] = true;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var bMap = new ad.widget.Bmap(AD_CONFIG['map']);
    var select_type = new ad.widget.DependencySelect(AD_CONFIG['select_type']);
    var select_place = new ad.widget.DependencySelect(AD_CONFIG['province_city']);
    fwc.setWidgets(
        [
            select_type, 
            select_place,
            bMap
        ]
    );
    var tab_arr = [];
    
    tab_arr.push(iframe);
    for(var i = 0; i < AD_CONFIG['tab_cons'].length; i++){
        tab_arr.push(new ad.widget.TabCont(AD_CONFIG['tab_cons'][i]));
    }
    tab_arr.push(card_flash);
    tab_container.setWidgets(tab_arr);
    AD_CONFIG['weibo']['weibo_context_length'] = 120;
    material.setWidgets(
        [new ad.widget.H1(AD_CONFIG['head'])],
        [new ad.widget.SmallWeibo(AD_CONFIG['weibo'])],
        [tab_container],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])],
        [fwc]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) 初始化浮层监测
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));

    //百度精算监测
    material.initHMJSMoniter('3acef01d2d7f1347c199ede827c6e9f1');

    iframe.addListener(ui.events.CLICK, function(){
        iframe.sendLog('floatopen', 'floatopen');
        showFWC();
        return false;
    });
    fwc.addListener(ui.events.CLOSE, function(index) {
        hideFWC();
    });
    /**
     * 处理select type 切换
     * @param {Array} values type select数据
     */
    function changeTypeHandler(values){
        baidu.array.each(values, function(item, index){
            bMap.hideMarkersByMgr([0,1]);
            if(item.selectedIndex === 0) {
                bMap.showMarkersByMgr([0,1]);
            }else if(item.selectedIndex === 1){
                bMap.showMarkersByMgr([0]);
            }else if(item.selectedIndex === 2){
                bMap.showMarkersByMgr([1]);
            }
            bMap.moveToChina();
        });
    }
    select_type.addListener(ui.events.CHANGE, function(values){
        changeTypeHandler(values);
    });
    /**
     * 处理select place 切换
     * @param {Array} values place select数据
     */
    function placeTypeHandler(values){
        var data = [];
        baidu.array.each(values, function(item, index){
            if(item.value != "null"){
                data.push(item.value);
            }
        });
        if(data && data.length){
            bMap.moveToCity(data[data.length - 1]);
        }
    }
    select_place.addListener(ui.events.CHANGE, function(values){
        placeTypeHandler(values);
    });
    
    /**
     * 显示对应的浮层
     */
    function showFWC(){
        fwc.show();
    }

    /**
     * 隐藏对应的浮层
     */
    function hideFWC(){
        fwc.hide();
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
