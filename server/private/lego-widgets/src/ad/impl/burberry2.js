/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: burberry2.js 11222 2012-08-20 02:53:59Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/burberry2.js ~ 2012/08/27 14:30:04
 * @author fanxueliang@baidu.com
 * @version $Revision: 11222 $
 * @description
 * burberry相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');
goog.require('ad.widget.Title');
goog.require('ad.widget.Video');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.Map');
goog.require('ad.widget.Flash');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/burberry2.less');

goog.provide('ad.impl.Burberry2');

ad.Debug(function(async){
    var lastFWCIndex = -1; //最后显示的浮窗索引
    AD_CONFIG['fwc']['material_name'] = 'ec-burberry'; //便于定制每个浮层的样式，以物料名作限定以避免样式冲突
    AD_CONFIG['fwc']['id'] = 1;
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    window[AD_CONFIG['video_left']['click_proxy']] = function(){};
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    var fwcFlash = [];
    var fwcRenderd = [false, false, false, false];
    var leftVideo = new ad.widget.Video(AD_CONFIG['video_left']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['video_fwc']);
    var map = new ad.widget.Map(AD_CONFIG['map']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    
    fwc.setWidgets([fwcVideo,map]);
    if(AD_CONFIG['flash'] && AD_CONFIG['flash']['options'] && AD_CONFIG['flash']['options'].length){
        var flashCount = AD_CONFIG['flash']['options'].length;
        for(var i = 0;i < flashCount; i ++){
            AD_CONFIG['fwc']['id'] = (i + 2);
            var fwcflash = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
            fwcflash.setWidgets([
                new ad.widget.Flash(AD_CONFIG['flash']['options'][i])
            ]);
            fwcFlash.push(fwcflash);
        }
    }
    material.setWidgets(
        [title],
        [leftVideo, smallHead],
        [new ad.widget.Iframe(AD_CONFIG['form'])],
        [new ad.widget.ButtonGroup(AD_CONFIG['button_group_foot'])],
        [fwc],
        fwcFlash
    );
    if (async === true) {
        return material;
    }
    material.show();

    leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC(0);
        leftVideo.pause();
        leftVideo.sendLog('float1open');
        return false;
    });

    leftVideo.addListener(ui.events.VIDEO_FINISH, function(){
        leftVideo.sendLog('video1complete');
        return false;
    });
    if(fwcFlash && fwcFlash.length){
        smallHead.addListener(ui.events.CLICK, function(index, me) {
            showFWC(index + 1);
            smallHead.sendLog("float" + (index + 2) + "open");
            return false;
         });
    }
    fwc.addListener(ui.events.CLOSE, function(index) {
        hideFWC(0);
     });

    if(fwcFlash && fwcFlash.length){
        baidu.array.each(fwcFlash,function(item, i){
            item.addListener(ui.events.CLOSE, function() {
                hideFWC(i + 1);
             });
        });
    }

    fwcVideo.addListener(ui.events.VIDEO_START, function(){
        fwcVideo.sendLog('float1video1start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
        fwcVideo.sendLog('float1video1jump');
        //在ipad下手动跳转
        if(fwcVideo._data['is_ipad']){
            fwcVideo.redirect();
        }
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function(){
        fwcVideo.sendLog('float1video1complete');
        return false;
    });

    //监听map模块的事件
    map.addListener(ui.events.MAP_CLICK,function(i){
        map.sendLog('float1btn' + (i + 1));
        return false;
    });

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
            if(index == 0){
                return fwc;
            }
            else{
                return fwcFlash[index - 1];
            }
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
        if(index == 0){
            //重绘浮层视频
            if(fwcVideo){
                ad.base.setTimeout(function(){
                    fwcVideo.refresh();
                },10);
                targetFWC.show();
            }
        }
        else{
            targetFWC.show();
        }
        if (fwcRenderd.length && !fwcRenderd[index]) {
            var canvas = baidu.dom.first(targetFWC.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                fwcRenderd[index] = true;
            }
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
        if(index == 0){
            if(fwcVideo){
                fwcVideo.clearRoot();
            }
        }
        targetFWC.hide();
        lastFWCIndex = -1;
    }

    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
