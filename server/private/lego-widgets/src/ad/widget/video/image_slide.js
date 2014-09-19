/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/video/image_slide.js ~ 2013/09/26 16:18:29
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * image_slide相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/video/image_slide.less');
goog.include('ad/widget/video/image_slide.html');

goog.provide('ad.widget.video.ImageSlide');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.video.ImageSlide = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_video_image_slide';

    /**
     * @type {number}
     * @private
     */
    this._current = 0;
};
baidu.inherits(ad.widget.video.ImageSlide, ad.widget.Widget);

/** @override */
ad.widget.video.ImageSlide.prototype.bindEvent = function() {
    ad.widget.video.ImageSlide.superClass.bindEvent.call(this);
    if(this._data['show_page_dots']) {
        this._startSlideShow();
    }
};

/** @override */
ad.widget.video.ImageSlide.prototype.patchData = function() {
    var pageCount = this.getData('options').length;
    if(pageCount > 1) {
        this._data['show_page_dots'] = true;
    }
};

/**
 * @private
 */
ad.widget.video.ImageSlide.prototype._startSlideShow = function() {
    var me = this;
    this._timerId = ad.base.setTimeout(function() {
        me._showSlide(me._getNextIndex());
        me._startSlideShow();
    }, (this._data['switch_time'] || 2000));
};

/**
 * @return {number}
 */
ad.widget.video.ImageSlide.prototype._getNextIndex = function() {
    return (this._current + 1) % this._data['options'].length;
};

/**
 * @param {number} index 要显示的slide索引值，从0开始.
 */
ad.widget.video.ImageSlide.prototype._showSlide = function(index) {
    baidu.hide(this.getId('img' + this._current));
    baidu.dom.removeClass(this.getId('dot' + this._current), 'ec-dot-current');

    baidu.show(this.getId('img' + index));
    baidu.dom.addClass(this.getId('dot' + index), 'ec-dot-current');
    this._current = index;
    this.trigger(ui.events.SHOWED_IMAGE_CHANGE, this._current);
};

/**
 * @override
 */
ad.widget.video.ImageSlide.prototype.dispose = function() {
    if (this._timerId) {
        ad.base.clearTimeout(this._timerId);
        this._timerId = null;
    }
    ad.widget.video.ImageSlide.superClass.dispose.call(this);
}
