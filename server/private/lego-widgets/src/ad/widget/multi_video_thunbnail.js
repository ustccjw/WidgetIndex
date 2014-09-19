/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: multi_video_thunbnail.js 2012-07-16 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/widget/multi_video_thunbnail.js ~ 2012/07/17 22:07:55
 * @author wangdawei
 * @version $Revision: $
 * @description
 * 多区域点击图片
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/multi_video_thunbnail.html');
goog.include('ad/widget/multi_video_thunbnail.less');

goog.provide('ad.widget.MultiVideoThunbnail');
/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.MultiVideoThunbnail = function(data) {
    ad.widget.Widget.call(this, data);
    /**
     * @private
     * @type {number}
     */
    this._currentIndex;
    this._view = 'AD_ad_widget_multi_video_thunbnail';
};
baidu.inherits(ad.widget.MultiVideoThunbnail, ad.widget.Widget);

/**
 * @override
 */
ad.widget.MultiVideoThunbnail.prototype.patchData = function(){
    if(this._data && typeof this._data['display_playing_tip'] === 'undefined') {
        this._data['display_playing_tip'] = true;
    }
    if(this._data && !this._data['play_btn_text']) {
        this._data['play_btn_text'] = "播放";
    }
}

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
    
    if(baidu.g(me.getId('title' + index))) {
        baidu.hide(me.getId('title' + index));
    }
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
 * 重置当前播放位置
 * @public
 */
ad.widget.MultiVideoThunbnail.prototype.resetCurrentIndex = function(){
    this._currentIndex = null;
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
            if(baidu.g(me.getId('title' + i))) {
                baidu.hide(me.getId('title' + i));
            }
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
                    if(baidu.g(me.getId('title' + i))) {
                        baidu.show(me.getId('title' + i));
                    }
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
                if(baidu.g(me.getId('title' + i))) {
                    baidu.hide(me.getId('title' + i));
                }
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














/* vim: set ts=4 sw=4 sts=4 tw=100: */
