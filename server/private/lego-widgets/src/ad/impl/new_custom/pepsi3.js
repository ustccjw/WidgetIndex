/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: pepsi3.js 11222 2012-08-20 02:53:59Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/pepsi3.js ~ 2013/10/30 14:23:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Image');
goog.require('ad.widget.Video');

goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.FloatWindowContainer');

goog.include('ad/impl/new_custom/pepsi3.less');

goog.provide('ad.impl.new_custom.Pepsi3');

ad.Debug(function(async){
    var material = new ad.material.BaseMaterial();
    
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
    AD_CONFIG['fwc']['material_name'] = 'ec-nike';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, multiVideoThunbnail]);
    
    var img = new ad.widget.Image(AD_CONFIG['img']);
    var logo = new ad.widget.MultiVideoThunbnail(AD_CONFIG['logo']);
    
    var widgets = [
        [img],
        [logo],
        [fwc]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    
    logo.addListener(ui.events.CLICK, function(){
        showFWC(0);
        logo.sendLog('floatopen', 'floatopen');
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
        logo.resetCurrentIndex();
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
