/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: bmwx1.js 11222 2012-08-20 02:53:59Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/impl/new_custom/bmwx1.js ~ 2013/10/30 14:23:28
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 11222 $
 * @description
 **/

goog.require('ad.Debug');
goog.require('ad.material.BaseMaterial');

goog.require('ad.widget.Title');
goog.require('ad.widget.SmallHead');
goog.require('ad.widget.Image');
goog.require('ad.widget.ImageNormal');
goog.require('ad.widget.Video');
goog.require('ad.widget.MultiVideoThunbnail');
goog.require('ad.widget.FloatWindowContainer');
goog.require('ad.widget.Flash');
goog.include('ad/impl/standard/base.less');
goog.include('ad/impl/standard/video.less');
goog.include('ad/impl/standard/small_head.less');
goog.include('ad/impl/new_custom/bmwx1.less');

goog.provide('ad.impl.new_custom.Bmwx1');

ad.Debug(function(async){
    /**
     * 清楚播放状态
     * @public
     */
    ad.widget.MultiVideoThunbnail.prototype.clearPlayStatus = function(){
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
    ad.widget.MultiVideoThunbnail.prototype.setPlayStatus = function(index){
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
    ad.widget.MultiVideoThunbnail.prototype.bindEvent = function(){
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
    var material = new ad.material.BaseMaterial();
    var title = new ad.widget.Title(AD_CONFIG['title']);
    var smallHead = new ad.widget.SmallHead(AD_CONFIG['small_head']);
    var leftVideo = new ad.widget.Video(AD_CONFIG['video']);
    var fwcVideo = new ad.widget.Video(AD_CONFIG['fwc']['options'][0]);
    var bigImg = new ad.widget.Image(AD_CONFIG['big_img']);
    var buttonConf = AD_CONFIG['img_buttons']['options'];
    baidu.each(buttonConf, function(item){
        item['img_url'] = item['img_url_' + buttonConf.length];
    });
    var imgButtons = new ad.widget.ImageNormal(AD_CONFIG['img_buttons']);
    var datasource = {'width': 100, 'height': 56, 'options': []};
    for (var i = 0; i < AD_CONFIG['fwc']['options'].length; i ++) {
        var item = AD_CONFIG['fwc']['options'][i];
        datasource['options'].push({
            'img_url': item['thumbnail_img_url'],
            'text': item['thumbnail_text'],
            'display_play_button': true
        });
    }
    var lastFWCVideoIndex = -1;
    var multiVideoThunbnail = new ad.widget.MultiVideoThunbnail(datasource);
    AD_CONFIG['fwc']['material_name'] = 'ec-bmwx1';
    AD_CONFIG['fwc']['id'] = 1;
    var fwc = new ad.widget.FloatWindowContainer(AD_CONFIG['fwc']);
    fwc.setWidgets([fwcVideo, multiVideoThunbnail]);
    var app = new ad.widget.Flash(AD_CONFIG['app']);
    var widgets = [
        [title],
        [
            leftVideo,
            smallHead
        ],
        [bigImg],
        [imgButtons],
        [fwc],
        [app]
    ];
    material.setWidgets(widgets);
    if (async === true) {
        return material;
    }
    material.show();
    baidu.hide(app.getRoot());
    bigImg.addListener(ui.events.CLICK, function(){
        baidu.show(app.getRoot());
        bigImg.sendLog("app_float_open", "app_float_open");
        return false;
    });
    var div = baidu.dom.create('div', {"class": "ec-float-close"});
    baidu.g(app.getId('flash')).appendChild(div);
    baidu.on(div, 'click', function(){
        baidu.hide(app.getRoot());
    });
    leftVideo.addListener(ui.events.VIDEO_CLICK, function(){
        showFWC(0);
        leftVideo.pause();
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
