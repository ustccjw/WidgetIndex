/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: bmws2.js 11222 2012-08-20 02:53:59Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/bmws2.js ~ 2013/10/30 14:23:28
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.SmallWeibo');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.standard.TabCont');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.Video');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/standard/tab_cont.less');
goog.include('ad/impl/new_custom/bmws2.less');

goog.provide('ad.impl.new_custom.BMWS2');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var imgs = new ad.widget.MultiVideoThunbnail(AD_CONFIG['products']);
    var lastFWCVideoIndex = -1;
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['options'][0]);
    var datasource = {'width': 100, 'height': 56, 'options': []};
    for (var i = 0; i < AD_CONFIG['fwc']['options'].length; i ++) {
        var item = AD_CONFIG['fwc']['options'][i];
        datasource['options'].push({
            'img_url': item['thumbnail_img_url'],
            'text': item['thumbnail_text'],
            'display_play_button': true
        });
    }
    var multiVideoThunbnail = new ad.widget.MultiVideoThunbnail(datasource);
    /**
     * 清楚播放状态
     * @public
     */
    multiVideoThunbnail.clearPlayStatus = function(){
        var me = this;
        if(baidu.g(me.getId('item-bg' + me._currentIndex))) {
            baidu.hide(me.getId('item-bg' + me._currentIndex));
        }
        if(baidu.g(me.getId('tip' + me._currentIndex))) {
            baidu.hide(me.getId('tip' + me._currentIndex));
        }
        if(baidu.g(me.getId('title' + me._currentIndex))) {
            baidu.removeClass(me.getId('title' + me._currentIndex), 'ec-blue');
        }
        if(baidu.g(me.getId('video-icon' + me._currentIndex))) {
            baidu.show(baidu.g(me.getId('video-icon' + me._currentIndex)));
        }
        me._currentIndex = null;
    }
    /**
     * 设置播放状态
     * @public
     * @param {number} index
     */
    multiVideoThunbnail.setPlayStatus = function(index){
        var me = this;
        me.clearPlayStatus();
        me._currentIndex = index;
        if(baidu.g(me.getId('button' + index))) {
            baidu.hide(me.getId('button' + index));
        }
        if(this._data['display_playing_tip']) {
            if(baidu.g(me.getId('video-icon' + index))) {
                baidu.hide(baidu.g(me.getId('video-icon' + index)));
            }
            if(baidu.g(me.getId('tip' + index))) {
                baidu.show(me.getId('tip' + index));
            }
            if(baidu.g(me.getId('title' + index))) {
                baidu.addClass(me.getId('title' + index), 'ec-blue');
            }
            baidu.show(me.getId('item-bg' + index));
        }
        else {
            if(baidu.g(me.getId('video-icon' + index))) {
                baidu.show(baidu.g(me.getId('video-icon' + index)));
            }
            if(baidu.g(me.getId('tip' + index))) {
                baidu.hide(me.getId('tip' + index));
            }

            baidu.hide(me.getId('item-bg' + index));
        }
    }
    /**
     * @override
     */
    multiVideoThunbnail.bindEvent = function(){
        var me = this;
        var items = [];
        var as = baidu.g(this.getId('thunbnail-cont')).getElementsByTagName('div');
        if(as && as.length){
            for (var i = 0; i < as.length; i++){
                if(baidu.dom.hasClass(as[i], "ec-item")) {
                    items.push(as[i]);
                }
            }
        }

        if(items.length){
            baidu.array.each(items,function(item, i){
                baidu.hide(me.getId('item-bg' + i));
                if(baidu.g(me.getId('button' + i))) {
                    baidu.hide(me.getId('button' + i));
                }
                if(baidu.g(me.getId('tip' + i))) {
                    baidu.hide(me.getId('tip' + i));
                }
                baidu.on(item,"mouseenter",function(e){
                    //fix ie6 hover bug
                    baidu.dom.addClass(item, 'ec-hover');
                    if(i !== me._currentIndex) {
                        baidu.show(me.getId('item-bg' + i));
                        if(baidu.g(me.getId('button' + i))) {
                            baidu.show(me.getId('button' + i));
                        }
                        if(baidu.g(me.getId('video-icon' + i))) {
                            baidu.hide(baidu.g(me.getId('video-icon' + i)));
                        }
                    }
                    me.trigger(ui.events.MOUSE_OVER, i);
                });
                baidu.on(item,"mouseleave",function(e){
                    //fix ie6 hover bug
                    baidu.dom.removeClass(item, 'ec-hover');

                    if(baidu.g(me.getId('button' + i))) {
                        baidu.hide(me.getId('button' + i));
                    }
                    if(i !== me._currentIndex) {
                        baidu.hide(me.getId('item-bg' + i));
                        if(baidu.g(me.getId('video-icon' + i))) {
                            baidu.show(baidu.g(me.getId('video-icon' + i)));
                        }
                    }
                    me.trigger(ui.events.MOUSE_OUT, i);
                });
                baidu.on(item, "click", function(e){
                    if(i !== me._currentIndex) {
                        me.setPlayStatus(i);
                        me.trigger(ui.events.CLICK, i);
                    }
                });

            })
        }
    }
    AD_CONFIG['fwc']['material_name'] = 'ec-bmws2';
    AD_CONFIG['fwc']['id'] = 1;

    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, multiVideoThunbnail]);
    
    
    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    var tabLength = tabOptions.length;
    for (var i = 0; i < tabLength; i++) {
        tabOptions[i]['tab_title'] = '&nbsp;';
        tabBodies.push(new ad.widget.standard.TabCont(tabOptions[i]));
    }
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab.setWidgets(tabBodies);
    
    var widgets = [
        [title],
        [leftVideo, smallHead, imgs],
        [tab],
        [fwc]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    
    var tabHeads = baidu.g(tab.getId('tab-head')).getElementsByTagName('A');
    if(tabHeads && tabHeads.length) {
        baidu.each(tabHeads, function(item, index){
            var defaultUrl = tabOptions[index]['tab_bg' + tabHeads.length];
            var hoverUrl = tabOptions[index]['tab_hov_bg' + tabHeads.length];
            baidu.setStyle(item, "background-image", "url("+ hoverUrl +")");
            baidu.setStyle(item.parentNode, "background-image", "url("+ defaultUrl +")");
        });
        var defaultIndex = AD_CONFIG['tab']['default_index'];
        if(tabHeads[defaultIndex]) {
            baidu.dom.addClass(tabHeads[defaultIndex], 'ec-show');
        }
    }
    tab.addListener(ui.events.TAB_CHANGE, function(index){
        if(tabHeads && tabHeads.length) {
            baidu.each(tabHeads, function(item){
                baidu.dom.removeClass(item, 'ec-show');
            });
            if(tabHeads[index]) {
                baidu.dom.addClass(tabHeads[index], 'ec-show');
            }
        }
    });
    leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC(0);
        leftVideo.sendLog('floatopen', 'floatopen');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_START, function(){
        leftVideo.sendLog('leftvideostart');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_FINISH, function(){
        leftVideo.sendLog('leftvideofinish');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_PAUSE, function(){
        leftVideo.sendLog('leftvideopause');
        return false;
    });
    leftVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
        leftVideo.sendLog('leftvideocontinue');
        return false;
    });
    imgs.addListener(ui.events.CLICK, function(index){
        showFWC(index + 1);
        imgs.sendLog('img' + (index + 1) + 'floatopen');
    });
    fwcVideo.addListener(ui.events.VIDEO_START, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'start');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_FINISH, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'finish');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_PAUSE, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'pause');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CONTINUE, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'continue');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_AUTO, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'auto');
        return false;
    });
    fwcVideo.addListener(ui.events.VIDEO_CLICK, function(){
        fwcVideo.sendLog('floatvideo' + lastFWCVideoIndex + 'click');
        return false;
    });
    multiVideoThunbnail.addListener(ui.events.CLICK, function(index){
        fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
        lastFWCVideoIndex = index + 1;
    });
    fwc.addListener(ui.events.CLOSE, function() {
        imgs.resetCurrentIndex();
        hideFWC();
    });
    var fwcRenderd = false;
    
    /**
     * 显示对应的视频浮层
     * @param {number} index 索引.
     */
    function showFWC(index) {
        if(!fwc) {
            return;
        }
        fwc.show();
        if(multiVideoThunbnail) {
            multiVideoThunbnail.refresh();
        }
        multiVideoThunbnail.setPlayStatus(index);
        if(fwcVideo) {
            fwcVideo.refresh(null, AD_CONFIG['fwc']['options'][index]);
        }
        lastFWCVideoIndex = index + 1;
        if (!fwcRenderd) {
            var canvas = baidu.dom.first(fwc.getRoot());
            if (canvas && canvas.id) {
                material.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
                //material.getCMS().init(canvas.id);
                fwcRenderd = true;
            }
        }
    }
    
    /**
     * 隐藏视频浮层
     */
    function hideFWC() {
        if(fwcVideo) {
            fwcVideo.clearRoot();
        }
        multiVideoThunbnail.clearPlayStatus();
        fwc.hide();
    }
    return material;
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
