/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: olay.js  2012-07-18 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/impl/olay.js ~ 2012/07/18 11:47:13
 * @author wangdawei
 * @version $Revision: $
 * @description
 *
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.H1');
goog.require('ad.widget.Section');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.TabContainer');
goog.include('ad/impl/olay_novideo.less');

goog.provide('ad.impl.OlayNovideo');

ad.Debug(function(async) {
    var h1 = new ad.widget.H1(AD_CONFIG['h1']);
    var imageNormal = new ad.widget.ImageNormal(AD_CONFIG['image_normal']);
    var fwcCount = AD_CONFIG['fwc'].length;
    var arrSection = [],  arrFWC = [];
    for(var i = 0; i < fwcCount; i ++){
        AD_CONFIG['fwc'][i]['material_name'] = 'olay-novideo'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
        AD_CONFIG['fwc'][i]['id'] = i + 1;
        arrSection.push(new ad.widget.Section(AD_CONFIG['section'][i]));
        arrFWC.push(new ad.widget.FloatWindowContainer(AD_CONFIG['fwc'][i]));

    }
    var tabContainer = new ad.widget.TabContainer(AD_CONFIG['tabs']);
    tabContainer.setWidgets(arrSection);

    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [h1],
        [imageNormal],
        [tabContainer],
        arrFWC
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    imageNormal.addListener(ui.events.MOUSE_OVER, function(imgIndex){
        tabContainer.switchTab(imgIndex);
        tabContainer.cancelSlideShow();
    });
    imageNormal.addListener(ui.events.MOUSE_OUT, function(imgIndex){
        tabContainer.startSlideShow();
    });

    imageNormal.addListener(ui.events.CLICK, function(imgIndex){
        showFWC(imgIndex);
        this.sendLog('图片链接' + (imgIndex + 1));
        return false;
    });

    baidu.array.each(arrFWC, function(item, i){
        item.addListener(ui.events.CLOSE,function(){
            hideFWC(i);
        })
        // FIXME(user) material.getCMS().init
        // material.getCMS().init(baidu.getAttr(baidu.dom.first(item.getRoot()), 'id'));
    });

    var lastFWCIndex = -1;

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index){
        if(lastFWCIndex == index){
            return;
        }
        hideFWC(lastFWCIndex);
        var targetFWC = arrFWC[index];
        if(!targetFWC)
            return;
        targetFWC.show();
        lastFWCIndex = index;
    }

    /**
     * 隐藏对应的浮层
     * @param {number} index 索引.
     */
    function hideFWC(index){
        var targetFWC = arrFWC[index];
        if(!targetFWC)
            return;
        targetFWC.hide();
        lastFWCIndex = -1;
    }
    
    
});

/* vim: set ts=4 sw=4 sts=4 tw=100: */
