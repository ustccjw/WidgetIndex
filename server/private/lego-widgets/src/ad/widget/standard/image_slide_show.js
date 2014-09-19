/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/standard/image_slide_show.js ~ 2013/10/28 10:11:05
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * 左侧图片轮播的模块.
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/standard/image_slide_show.less');
goog.include('ad/widget/standard/image_slide_show.html');

goog.provide('ad.widget.standard.ImageSlideShow');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.standard.ImageSlideShow = function(data) {
    /**
     * @private
     * @type {number}
     */
    this._currentIndex = 0;

    /**
     * @private
     * @type {number}
     */
    this._imageCount;

    /**
     * @private
     * @type {number}
     */
    this._timer;

    /**
     * @private
     * @type {boolean}
     */
    this._enableAutoSlide = true;

    /**
     * 自动播放的间隔
     * @private
     * @type {number}
     */
    this._autoSlideDuration = 5000;

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_standard_image_slide_show';

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.standard.ImageSlideShow, ad.widget.Widget);

/** @override */
ad.widget.standard.ImageSlideShow.prototype.bindEvent = function() {
    ad.widget.standard.ImageSlideShow.superClass.bindEvent.call(this);

    var me = this;
    ad.dom.on(this.getRoot(), 'click', function(opt_evt){
        var evt = opt_evt || window.event;
        var element = evt.target || evt.srcElement;
        if (element.nodeType === 1 && element.nodeName === 'LI') {
            var index = parseInt(element.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                me.sendLog('轮播图切换' + (index + 1), (index + 1) + '-slide');
                me._switchTo(index);
            }
        }
    });

    ad.dom.on(baidu.g(this.getId('left')), 'click', function(){
        me._prevSlide();
    });

    ad.dom.on(baidu.g(this.getId('right')), 'click', function(){
        me._nextSlide();
    });

    if (this._imageCount > 1) {
        ad.dom.enter(this.getId('main'), function(){
            // 显示左右箭头
            baidu.addClass(me.getId('main'), 'ec-hover');
            me._cancelAutoSlide();
        });

        ad.dom.leave(this.getId('main'), function(){
            // 隐藏左右箭头
            baidu.removeClass(me.getId('main'), 'ec-hover');
            me._startAutoSlide();
        });
    }
    else {
        // 只有一张图片，那么把底部的导航也隐藏掉吧
    }

    me._startAutoSlide();
};

/**
 * 启动图片的自动切换
 */
ad.widget.standard.ImageSlideShow.prototype._startAutoSlide = function() {
    if (!this._enableAutoSlide) {
        return;
    }

    var me = this;
    me._timer = ad.base.setTimeout(function(){
        me._switchTo((me._currentIndex + 1) % me._imageCount);
        me._startAutoSlide();
    }, me._autoSlideDuration);
};

/**
 * 取消图片的自动切换
 */
ad.widget.standard.ImageSlideShow.prototype._cancelAutoSlide = function() {
    if (this._timer) {
        ad.base.clearTimeout(this._timer);
        this._timer = 0;
    }
};

/**
 * @return {boolean}
 */
ad.widget.standard.ImageSlideShow.prototype._isFirstSlide = function() {
    return this._currentIndex <= 0;
};

/**
 * @return {boolean}
 */
ad.widget.standard.ImageSlideShow.prototype._isLastSlide = function() {
    return (this._currentIndex + 1) >= this._imageCount;
};

/**
 * 前一张图片
 */
ad.widget.standard.ImageSlideShow.prototype._prevSlide = function() {
    if (this._isFirstSlide()) {
        return;
    }
    this.sendLog('轮播图上一张', 'prev-slide');
    this._switchTo(this._currentIndex - 1);
};

/**
 * 后一张图片
 */
ad.widget.standard.ImageSlideShow.prototype._nextSlide = function() {
    if (this._isLastSlide()) {
        return;
    }
    this.sendLog('轮播图下一张', 'next-slide');
    this._switchTo(this._currentIndex + 1);
};

/**
 * @param {number} index 要切换的图片索引值.
 */
ad.widget.standard.ImageSlideShow.prototype._switchTo = function(index) {
    if (index === this._currentIndex) {
        return;
    }

    var ul = baidu.g(this.getId('navs'));
    if (!ul) {return;}
    var list = ul.childNodes[this._currentIndex];
    if (list) {
        baidu.removeClass(list, 'ec-active');
    }

    // 更新active的状态.
    list = ul.childNodes[index];
    if (list) {
        baidu.addClass(list, 'ec-active');
    }

    // 显示新的图片
    var option = this._data['options'][index];
    var img = baidu.g(this.getId('img'));
    var anchor = img.parentNode;
    img.src = option['img_src'];
    if (option['img_rcv_url']) {
        anchor.href = option['img_rcv_url'];
        anchor.setAttribute('title2', '轮播图' + (index + 1));
    }
    else {
        anchor.removeAttribute('href');
    }

    this._currentIndex = index;
};

/** @override */
ad.widget.standard.ImageSlideShow.prototype.patchData = function() {
    if (this._data) {
        this._imageCount = this._data['options'].length;
        // 如果只有1张，还播放个毛~~~
        this._enableAutoSlide = (this._imageCount > 1);
        if ('auto_slide_duration' in this._data) {
            // 默认是开启自动播放的，如果想关闭的话，把
            // auto_slide_duration设置为0即可
            var autoSlideDuration = parseInt(this._data['auto_slide_duration'], 10);
            this._enableAutoSlide = (autoSlideDuration > 0);
            if (this._enableAutoSlide) {
                this._autoSlideDuration = autoSlideDuration;
            }
        }

        var option = this._data['options'][this._currentIndex];
        this._data['img_src'] = option['img_src'];
        this._data['img_rcv_url'] = option['img_rcv_url'] || null;
        this._data['_hide_navs'] = (this._imageCount <= 1);
    }
};

/**
 * @override
 */
ad.widget.standard.ImageSlideShow.prototype.dispose = function() {
    this._cancelAutoSlide();
    ad.widget.standard.ImageSlideShow.superClass.dispose.call(this);
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
