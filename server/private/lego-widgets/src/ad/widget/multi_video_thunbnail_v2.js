/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: multi_video_thunbnail_v2.js 2012-07-16 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/widget/multi_video_thunbnail_v2.js ~ 2014/07/28 19:53:01
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: $
 * @description
 * 多区域点击图片
 *
 * 修改自 ad.widget.MultiVideoThunbnail，把 JS 操纵 .ec-item 隐藏、显示的
 * 功能改成了使用 CSS 控制，使得样式编写更加灵活
 *
 * 注：使用 jQuery 代替 baidu.q 方法，app.html 需要引入 jQuery
 * 
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/multi_video_thunbnail_v2.html');
goog.include('ad/widget/multi_video_thunbnail_v2.less');

goog.provide('ad.widget.MultiVideoThunbnailV2');
/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.MultiVideoThunbnailV2 = function(data) {
    ad.widget.Widget.call(this, data);
    /**
     * @private
     * @type {number}
     */
    this._currentIndex;
    this._view = 'AD_ad_widget_multi_video_thunbnail_v2';
};
baidu.inherits(ad.widget.MultiVideoThunbnailV2, ad.widget.Widget);

/**
 * @override
 */
ad.widget.MultiVideoThunbnailV2.prototype.patchData = function(){
    if(this._data && typeof this._data['display_playing_tip'] === 'undefined') {
        this._data['display_playing_tip'] = true;
    }
    if(this._data && !this._data['play_btn_text']) {
        this._data['play_btn_text'] = '播放';
    }
};

/**
 * 清楚播放状态
 * @public
 */
ad.widget.MultiVideoThunbnailV2.prototype.clearPlayStatus = function(){
    var me = this;

    jQuery('#' + me.getId('thunbnail-cont')).children('.ec-item')
        .removeClass('ec-item-playing');

    me._currentIndex = null;
};
/**
 * 设置播放状态
 * @public
 * @param {number} index
 */
ad.widget.MultiVideoThunbnailV2.prototype.setPlayStatus = function(index){
    var me = this;
    me.clearPlayStatus();
    me._currentIndex = index;

    jQuery('#' + me.getId('thunbnail-cont')).children('.ec-item')
        .eq(index).addClass('ec-item-playing');
    
};
/**
 * 重置当前播放位置
 * @public
 */
ad.widget.MultiVideoThunbnailV2.prototype.resetCurrentIndex = function(){
    this._currentIndex = null;
};
/**
 * @override
 */
ad.widget.MultiVideoThunbnailV2.prototype.bindEvent = function(){
    var me = this;
    var items = [];
    var as = baidu.g(this.getId('thunbnail-cont')).getElementsByTagName('div');
    if(as && as.length){
        for (var i = 0; i < as.length; i++){
            if(baidu.dom.hasClass(as[i], 'ec-item')) {
                items.push(as[i]);
            }
        }
    }
    
    if(items.length){
        baidu.array.each(items,function(item, i){
            
            baidu.on(item,'mouseenter',function(e){
                baidu.dom.addClass(item, 'ec-hover');
                me.trigger(ui.events.MOUSE_OVER, i);
            });
            baidu.on(item,'mouseleave',function(e){
                baidu.dom.removeClass(item, 'ec-hover');
                me.trigger(ui.events.MOUSE_OUT, i);
            });
            baidu.on(item, 'click', function(e){
                if(i !== me._currentIndex) {
                    me.setPlayStatus(i);
                    me.trigger(ui.events.CLICK, i);
                }
            });
            
        });
    }
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
