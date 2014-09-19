/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: bmw2.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/bmw2.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
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
goog.include('ad/impl/new_custom/bmw2.less');

goog.provide('ad.impl.new_custom.BMW2');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial(AD_CONFIG['id']);
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
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
    AD_CONFIG['fwc']['material_name'] = 'ec-bmw1';
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
        [leftVideo, smallHead],
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
