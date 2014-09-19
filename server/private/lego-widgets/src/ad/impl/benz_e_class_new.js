/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: benz_e_class_new.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/benz_e_class_new.js ~ 2012/09/27 14:17:21
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 * encore相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Table');
goog.require('ad.widget.Flash');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.NormalContainer');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Bmap');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/benz_e_class_new.less');

goog.provide('ad.impl.BenzEClassNew');

ad.Debug(function(async) {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    AD_CONFIG['fwc_map']['material_name'] = 'ec-benz-e-class-map';
    AD_CONFIG['fwc_map']['id'] = 1;
    var fwcMap = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc_map']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['tab_con4']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var arrTabCont = [];
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var bMap = new ad.widget.Bmap(AD_CONFIG['map']);
    var selectType = new ad.widget.DependencySelect(AD_CONFIG['select_type']);
    var selectPlace = new ad.widget.DependencySelect(AD_CONFIG['province_city']);
    var flash = new ad.widget.Flash(AD_CONFIG['tab_con1']);
    var imageCartoon = new ad.widget.ImageCartoon(AD_CONFIG['tab_con2']);
    var normalContainer = new ad.widget.NormalContainer({});
    var table1 = new ad.widget.Table(AD_CONFIG['tab_con3'][0]);
    var table2 = new ad.widget.Table(AD_CONFIG['tab_con3'][1]);
    
    normalContainer.setWidgets([table1, table2]);

    fwcMap.setWidgets(
        [
            selectType, 
            selectPlace,
            bMap
        ]
    );
    arrTabCont.push(flash);
    arrTabCont.push(imageCartoon);
    arrTabCont.push(normalContainer);
    arrTabCont.push(iframe);
    tabContainer.setWidgets(arrTabCont);
    
    material.setWidgets(
        [
            [leftVideo, new ad.widget.VideoTitle(AD_CONFIG['video_title'])],
            [smallHead]
        ],
        [tabContainer],
        [fwcMap]
    );
    if (async === true) {
        return material;
    }

    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    // FIXME(user) 初始化地图浮层监测
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwcMap.getRoot()), 'id'));

    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    // FIXME(user) selectType.initByVal
    // selectType.initByVal(AD_CONFIG['select_type']['data'][1]['value']);

    iframe.addListener(ui.events.CLICK, function(){
        iframe.sendLog('floatmapopen', 'floatmapopen');
        showMapFWC();
        return false;
    });
    fwcMap.addListener(ui.events.CLOSE, function(index) {
        hideMapFWC();
    });
    flash.addListener('FLASH_track', function(no){
        flash.sendLog(no, no);
    });
    /**
     * 处理select type 切换
     * @param {Array} values type select数据
     */
    function changeTypeHandler(values){
        baidu.array.each(values, function(item, index){
            bMap.hideMarkersByMgr([0]);
            if(item.selectedIndex === 1){
                bMap.showMarkersByMgr([0]);
            }
            bMap.moveToChina();
        });
    }
    selectType.addListener(ui.events.CHANGE, function(values){
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
    selectPlace.addListener(ui.events.CHANGE, function(values){
        placeTypeHandler(values);
    });
    
    /**
     * 显示地图浮层
     */
    function showMapFWC() {
        fwcMap.show();
    }
    /**
     * 隐藏地图浮层
     */
    function hideMapFWC() {
        fwcMap.hide();
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
