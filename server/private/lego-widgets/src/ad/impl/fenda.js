/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: fenda.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/fenda.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com (fanxueliang)
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
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/fenda.less');

goog.provide('ad.impl.Fenda');

ad.Debug(function(async){
    var lastFWCIndex = -1; //最后显示的浮窗索引
    AD_CONFIG['fwc']['material_name'] = 'ec-fenda'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    var material = new ad.Material(AD_CONFIG['id']);
    material.setRender(new ad.render.RecursiveRender({'block_class': 'ad-block'}));
    var fwcFlash = []; //smalltitle3个产品图点击弹开浮层2~4
    var tab_container = new ad.widget.TabContainer(AD_CONFIG['tab']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
        
    if(AD_CONFIG['flash'] && AD_CONFIG['flash']['options'] && AD_CONFIG['flash']['options'].length){
        var flashCount = AD_CONFIG['flash']['options'].length;
        for(var i = 0;i < flashCount; i ++){
            AD_CONFIG['fwc']['id'] = (i + 1);
            var fwcflash = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
            fwcflash.setWidgets([
                new ad.widget.Flash(AD_CONFIG['flash']['options'][i])
            ]);
            fwcFlash.push(fwcflash);
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
        fwcFlash
    );
    if (async === true) {
        return material;
    }
    material.show();
    material.initMonitor(AD_CONFIG['main_url']);

    // FIXME(user) material.getCMS
    /*
    if(fwcFlash && fwcFlash.length){
        baidu.array.each(fwcFlash, function(item, i){
            material.getCMS().init(baidu.getAttr(baidu.dom.first(item.getRoot()), 'id'));
        });
    }
    */

    smallHead.addListener(ui.events.CLICK, function(index, me) {
        showFWC(index);
        smallHead.sendLog("float" + (index + 1) + "open");
        return false;
     });


    if(fwcFlash && fwcFlash.length){
        baidu.array.each(fwcFlash,function(item, i){
            item.addListener(ui.events.CLOSE, function() {
                hideFWC(i + 1);
             });
        });
    }

    /**
     * 获取对应索引的浮层实例
     * @param {number} index 索引.
     * @return {Object} 对应的浮层实例.
     */
    function getFWCByIndex(index){
        if(index == -1){
            return null;
        }
        else{
            return fwcFlash[index];
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
        else{
            targetFWC.show();
        }
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
