/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/benz_s_class.js ~ 2013/09/16 11:25:39
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * benz_s_class相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Video');
goog.require('ad.widget.VideoTitle');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.ImageLink');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.DependencySelect');
goog.require('ad.widget.Bmap');

goog.include('ad/impl/benz_s_class.less');

goog.provide('ad.impl.BenzSClass');

ad.Debug(function(async) {
    var material = new ad.material.BaseMaterial();
    material.setRender(new ad.render.RecursiveRender());
    var leftVideo = new ad.widget.Video(AD_CONFIG['left_video']);
    var videoTitle = new ad.widget.VideoTitle(AD_CONFIG['video_title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var imgCartoon1 = new ad.widget.ImageCartoon(AD_CONFIG['img_cartoon1']);
    var imgCartoon2 = new ad.widget.ImageCartoon(AD_CONFIG['img_cartoon2']);
    var iframe = new ad.widget.Iframe(AD_CONFIG['iframe']);

    AD_CONFIG['fwc']['material_name'] = 'ec-benz';
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var imageLink = new ad.widget.ImageLink(AD_CONFIG['fwc_imgs']['options'][0]);
    var buttonGroup = new ad.widget.ButtonGroup(AD_CONFIG['buttons']);

    AD_CONFIG['fwc_map']['material_name'] = 'ec-benz-map';
    AD_CONFIG['fwc_map']['id'] = 2;
    var fwcMap = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc_map']);
    var bMap = new ad.widget.Bmap(AD_CONFIG['map']);
    var selectType = new ad.widget.DependencySelect(AD_CONFIG['select_type']);
    var selectPlace = new ad.widget.DependencySelect(AD_CONFIG['province_city']);

    var lastFloatImgIndex = -1;
    var initedMapFWCLog = false;
    var initedFWC = false;

    tabContainer.setWidgets([imgCartoon1, imgCartoon2, iframe]);

    fwc.setWidgets([imageLink]);

    fwcMap.setWidgets(
        [
            selectType,
            selectPlace,
            bMap
        ]
    );

    material.setWidgets(
        [
            [leftVideo, videoTitle],
            smallHead
        ], [tabContainer], [buttonGroup], [fwc], [fwcMap]
    );

    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);

    imgCartoon1.addListener(ui.events.CLICK, function(index, event) {
        if (baidu.event.getTarget(event).tagName.toLowerCase() == 'div') {
            return true;
        }
        leftVideo.sendLog('TAB1-胶片图' + (index + 1) + '-弹出浮层');
        showFWC(index);
        return false;
    });

    iframe.addListener(ui.events.CLICK, function() {
        leftVideo.sendLog('TAB3-floatmapopen', 'floatmapopen');
        showMapFWC();
        return false;
    });

    /**
     * 显示对应的图片浮层
     * @param {number} index 索引
     */

    function showFWC(index) {
        hideMapFWC();
        fwc.show();

        if (lastFloatImgIndex != index) {
            var config = AD_CONFIG['fwc_imgs']['options'][index];
            imageLink.refresh(null, config);
            fwc.rewriteTitle2(null, 'TAB1-胶片图' + (index + 1) + '-浮层关闭', true);
            imageLink.rewriteTitle2(null, 'TAB1-胶片图' + (index + 1) + '-浮层图片点击', true);
        }

        if (!initedFWC) {
            //初始化浮层监测
            // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
            initedFWC = true;
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        }

        lastFloatImgIndex = index;
    }


    /**
     * 处理select type 切换
     * @param {Array} values type select数据
     */

    function changeTypeHandler(values) {
        baidu.array.each(values, function(item, index) {
            bMap.hideMarkersByMgr([0]);
            if (item.selectedIndex === 1) {
                bMap.showMarkersByMgr([0]);
            }
            bMap.moveToChina();
        });
    }
    selectType.addListener(ui.events.CHANGE, function(values) {
        changeTypeHandler(values);
    });
    /**
     * 处理select place 切换
     * @param {Array} values place select数据
     */

    function placeTypeHandler(values) {
        var data = [];
        baidu.array.each(values, function(item, index) {
            if (item.value != "null") {
                data.push(item.value);
            }
        });
        if (data && data.length) {
            bMap.moveToCity(data[data.length - 1]);
        }
    }
    selectPlace.addListener(ui.events.CHANGE, function(values) {
        placeTypeHandler(values);
    });
    /**
     * 显示地图浮层
     */

    function showMapFWC() {
        fwc.hide();
        fwcMap.show();
        if (!initedMapFWCLog) {
            //初始化浮层监测
            // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwcMap.getRoot()), 'id'));
            initedMapFWCLog = true;
            var canvas = baidu.dom.first(fwcMap.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
            }
        }
    }
    /**
     * 隐藏地图浮层
     */

    function hideMapFWC() {
        fwcMap.hide();
    }
});