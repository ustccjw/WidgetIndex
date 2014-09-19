/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/rejoice.js ~ 2013/12/06 16:02:45
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 11222 $
 * @description
 * rejoice相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.TabContainer');

goog.include('ad/impl/rejoice.less');

goog.provide('ad.impl.Rejoice');

ad.Debug(function(async) {
    var h1 = new ad.widget.H1(AD_CONFIG['h1']);
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var fwcCount = AD_CONFIG['fwc'].length;
    var arrSection = [];
    var arrFwc = [];
    var arrFwcOpened = [];

    for (var i = 0; i < fwcCount; i++) {
        AD_CONFIG['fwc'][i]['id'] = i + 1;
        arrSection.push(new ad.widget.Section(AD_CONFIG['section'][i]));
        arrFwc.push(new ad.widget.FloatWindowContainer(AD_CONFIG['fwc'][i]));
        arrFwcOpened[i] = false;
    }
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tabs']);
    tabContainer.setWidgets(arrSection);

    var material = new ad.material.BaseMaterial();
    material.setWidgets(
        [h1], [imageNormal], [tabContainer],
        arrFwc
    );

    if (async === true) {
        return material;
    }
    material.show();
    // material.initMonitor(AD_CONFIG['main_url']);

    imageNormal.addListener(ui.events.MOUSE_OVER, function(imgIndex) {
        tabContainer.switchTab(imgIndex);
        tabContainer.cancelSlideShow();
    });
    imageNormal.addListener(ui.events.MOUSE_OUT, function(imgIndex) {
        tabContainer.startSlideShow();
    });

    imageNormal.addListener(ui.events.CLICK, function(imgIndex) {
        showFWC(imgIndex);
        this.sendLog('图片点击' + (imgIndex + 1));
        return false;
    });

    baidu.array.each(arrFwc, function(item, i) {
        item.addListener(ui.events.CLOSE, function() {
            hideFWC(i);
        })
    });

    var lastFWCIndex = -1;

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if (lastFWCIndex == index) {
            return;
        }
        hideFWC(lastFWCIndex);
        var fwc = arrFwc[index];
        if (fwc) {
            fwc.show();
            lastFWCIndex = index;
            // 浮层NEW_AD_CANVAS事件
            if (!arrFwcOpened[index]) {
                var canvas = baidu.dom.first(fwc.getRoot());
                if (canvas && canvas.id) {
                    material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                    arrFwcOpened[index] = true;
                }
            }
        }
    }

    /**
     * 隐藏对应的浮层
     * @param {number} index 索引.
     */
    function hideFWC(index) {
        var fwc = arrFwc[index];
        if (fwc) {
            fwc.hide();
            lastFWCIndex = -1;
        }
    }


});



/* vim: set ts=4 sw=4 sts=4 tw=100: */