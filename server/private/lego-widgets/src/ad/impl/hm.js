/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/hm.js ~ 2012/08/27 14:30:04
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 11222 $
 * @description
 * burberry相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Map');
goog.require('ad.widget.ImageShowArrow');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/hm.less');

goog.provide('ad.impl.Hm');

ad.Debug(function(async){
    var lastFWCIndex = -1; //最后显示的浮窗索引
    AD_CONFIG['fwc']['material_name'] = 'ec-hm'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    var fwcImageArr = []; //smalltitle3个产品图点击弹开浮层2~4
    var imagesArr = [];
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var floatVideo = new ad.widget.Video(AD_CONFIG['video_fwc_con']['video']);
    var floatLink = new ad.widget.Map(AD_CONFIG['video_fwc_con']['float']);
    
    fwc.setWidgets([
        floatVideo,
        floatLink
    ]);
    if(AD_CONFIG['float_cons'] && AD_CONFIG['float_cons'].length){
        var floatCount = AD_CONFIG['float_cons'].length;
        for(var i = 0;i < floatCount; i ++){
            AD_CONFIG['fwc']['id'] = (i + 2);
            var fwcImage = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
            AD_CONFIG['float_cons'][i]['switch_time'] = 500000000;
            var img = new ad.widget.ImageShowArrow(AD_CONFIG['float_cons'][i])
            fwcImage.setWidgets([
                img
            ]);
            imagesArr.push(img);
            fwcImageArr.push(fwcImage);
        }
    }
    // material.setRender(new ad.render.RecursiveRender());
    tab_container.setWidgets([
        new ad.widget.SmallWeibo(AD_CONFIG['small_weibo'])
    ]);
    material.setWidgets(
        [leftVideo,smallHead],
        [tab_container],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group_foot'])],
        [fwc],
        fwcImageArr
    );
    if (async === true) {
        return material;
    }

    material.show();

    // FIXME(user) 微博的透明背景
    //var bg = baidu.dom.create('div',{'class':'ec-weibo-bg'});
    //tab_container.getRoot().appendChild(bg);

    material.initMonitor(AD_CONFIG['main_url']);
    
    // FIXME(user) 初始化浮层监测
    // material.getCMS().init(baidu.getAttr(baidu.dom.first(fwc.getRoot()), 'id'));
    /*
    if(fwcImageArr && fwcImageArr.length){
        baidu.array.each(fwcImageArr, function(item, i){
            material.getCMS().init(baidu.getAttr(baidu.dom.first(item.getRoot()), 'id'));
        });
    }
    */
    //百度精算监测
    material.initHMJSMoniter(AD_CONFIG['hmjs_id']);

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        if(index == 0){
            leftVideo.pause();
        }
        showFWC(index + 2);
        smallHead.sendLog("float" + (index + 2) + "open");
        return false;
     });
     
    leftVideo.addListener(ui.events.VIDEO_CLICK, function() {
        showFWC(1);
        floatVideo.refresh();
        leftVideo.pause();
        leftVideo.sendLog('float1open');
        return false;
    });
    
    floatVideo.addListener(
        ui.events.VIDEO_START, 
        function() {
            floatVideo.sendLog('float1videostart');
            return false;
        }
    );
    floatVideo.addListener(
        ui.events.VIDEO_CLICK, 
        function() {
            floatVideo.sendLog('float1videojump');
            //在ipad下手动跳转
            if(floatVideo._data['is_ipad']) {
                floatVideo.redirect();
            }
            return false;
        }
    );
    floatVideo.addListener(
        ui.events.VIDEO_FINISH, 
        function() {
            floatVideo.sendLog('float1videocomplete');
            return false;
        }
    );

    fwc.addListener(ui.events.CLOSE, function() {
        floatVideo.getRoot().innerHTML = "";
        hideFWC(1);
    });

    if (async !== true) {
        if(fwcImageArr && fwcImageArr.length){
            baidu.array.each(fwcImageArr,function(item, i){
                item.addListener(ui.events.CLOSE, function() {
                    hideFWC(i + 2);
                });
            });
        }
        if(imagesArr && imagesArr.length) {
            baidu.array.each(
                imagesArr, function(item, i) {
                    // FIXME(user) item.rewriteTitle2
                    /*
                    item.rewriteTitle2(
                        item.getRoot(),
                        "float" + (i + 2) + "-",
                        false
                    );
                    */
                    item.addListener(ui.events.ARROW_RIGHT, function() {
                        item.sendLog("float" + (i + 2) + "-arrow-right");
                    });
                    item.addListener(ui.events.ARROW_LEFT, function() {
                        item.sendLog("float" + (i + 2) + "-arrow-left");
                    });
                }
            );
        }
    }
    floatLink.addListener(
        ui.events.MAP_CLICK, 
        function(j) {
            floatLink.sendLog('float2-link' + (j + 1));
            return false;
        }
    );
    floatLink.addListener(
        ui.events.MAP_ALL_CLICK, 
        function(j) {
            floatLink.sendLog('float2-jump');
            return false;
        }
    );

    /**
     * 获取对应索引的浮层实例
     * @param {number} index 索引.
     * @return {Object} 对应的浮层实例.
     */
    function getFWCByIndex(index){
        if(index == 1){
            return fwc;
        }else if(index < 2 || index > 4){
            return null;
        }else{
            return fwcImageArr[index - 2];
        }
    }

    /**
     * 显示对应的浮层
     * @param {number} index 索引.
     */
    function showFWC(index){
        if(lastFWCIndex == index){
            return;
        }
        hideFWC(lastFWCIndex);
        var targetFWC = getFWCByIndex(index);
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
        var targetFWC = getFWCByIndex(index);
        if(!targetFWC)
            return;
        targetFWC.hide();
        lastFWCIndex = -1;
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
