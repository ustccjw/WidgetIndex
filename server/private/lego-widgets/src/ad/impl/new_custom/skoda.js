/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: skoda.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/skoda.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.TabContainer');
goog.require('ad.widget.standard.TabCont');
goog.require('ad.widget.ImageCartoon');
goog.require('ad.widget.Iframe');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.Video');
goog.require('ad.widget.ButtonGroup');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/standard/tab_cont.less');
goog.include('ad/impl/new_custom/skoda.less');

goog.provide('ad.impl.new_custom.Skoda');

ad.Debug(function(async){
    var imageCartoons = [];
    function createWidget(cfg, index) {
        var widgetConfig = cfg['tab_content'];
        if ('image_cartoon' in widgetConfig) {
            var img_cartoon =  new ad.widget.ImageCartoon(widgetConfig['image_cartoon']);
            imageCartoons.push({
                "index": 'TAB'+ (index + 1),
                "item": img_cartoon
            });
            return img_cartoon;
        }
        else if ('tab_form' in widgetConfig) {
            return new ad.widget.Iframe(widgetConfig['tab_form']);
        }
        else if ('tab_cont' in widgetConfig) {
            return new ad.widget.standard.TabCont(widgetConfig['tab_cont']);
        }
    }
    
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
    AD_CONFIG['fwc']['material_name'] = 'ec-skoda';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, multiVideoThunbnail]);
    
    
    var tabOptions = AD_CONFIG['tab']['options'];
    var tabBodies = [];
    var tabLength = tabOptions.length;
    for (var i = 0; i < tabLength; i++) {
        tabBodies.push(createWidget(tabOptions[i], i));
    }
    var tab = new ad.widget.TabContainer(AD_CONFIG['tab']);
    tab.setWidgets(tabBodies);
    
    var widgets = [
        [title],
        [leftVideo, smallHead, imgs],
        [tab],
        [new ad.widget.ButtonGroup(AD_CONFIG['buttons'])],
        [fwc]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    
    baidu.each(imageCartoons, function(item, index){
        item['item'].addListener(ui.events.NEW_ELEMENT, function(elm){
            var link = elm.getElementsByTagName('A')[0];
            baidu.dom.setAttr(link, 'title2', item['index'] + baidu.dom.getAttr(link, 'title2'));
        });
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
