/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: ImageShowArrow.js 9564 2012-06-06 04:43:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_show_arrow.js ~ 2012/06/04 15:13:54
 * @author loutongbing
 * @version $Revision: 9564 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/image_show_arrow.html');
goog.include('ad/widget/image_show_arrow.less');

goog.provide('ad.widget.ImageShowArrow');


/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageShowArrow = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_image_show_arrow';

    /**
     * @private
     * @type {number}
     */
    this._index = 0;

    /**
     * @private
     * @type {number}
     */
    this._slideCount = this._data['options'].length;
};
baidu.inherits(ad.widget.ImageShowArrow, ad.widget.Widget);

/**
 * @override
 */
ad.widget.ImageShowArrow.prototype.bindEvent = function() {
    ad.widget.ImageShowArrow.superClass.bindEvent.call(this);

    var me = this;

    baidu.on(this.getId('link-right'), 'click', function() {
        me.sendLog('下一张', 'next');
        me._nextSlide();
        me.trigger(ui.events.ARROW_RIGHT, me._index);
    });
    baidu.on(this.getId('link-left'), 'click', function() {
        me.sendLog('上一张','previous');
        me._prevSlide();
        me.trigger(ui.events.ARROW_LEFT, me._index);
    });

    baidu.on(this.getRoot(), 'mouseenter', function() {
        me._cancelSlideShow();
    });

    baidu.on(this.getRoot(), 'mouseleave', function() {
        me._startSlideShow();
    });

    this._startSlideShow();
};

/**
 * @private
 */
ad.widget.ImageShowArrow.prototype._startSlideShow = function() {
    var switchTime = this._data['switch_time'];
    if (!switchTime) {
        // 如果没有switch_time则不自动轮播
        return;
    }

    var me = this;
    this._timerId = ad.base.setTimeout(function(){
        me._gotoSlide((me._index + 1) % me._slideCount);
        me._startSlideShow();
    }, switchTime);
}

/**
 * @private
 */
ad.widget.ImageShowArrow.prototype._cancelSlideShow = function() {
    if (this._timerId) {
        ad.base.clearTimeout(this._timerId);
        this._timerId = 0;
    }
}

/**
 * @private
 */
ad.widget.ImageShowArrow.prototype._nextSlide = function() {
    if (this._index >= this._slideCount - 1) {
        return;
    }
    this._gotoSlide(this._index + 1);
}

/**
 * @private
 */
ad.widget.ImageShowArrow.prototype._prevSlide = function() {
    if (this._index <= 0) {
        return;
    }
    this._gotoSlide(this._index - 1);
}

/**
 * @private
 * @param {number} index 要切换到的slide索引，从0开始.
 */
ad.widget.ImageShowArrow.prototype._gotoSlide = function(index) {
    baidu.hide(this.getId('img-' + this._index));
    baidu.show(this.getId('img-' + index));
    this._index = index;
    this.trigger(ui.events.SHOWED_IMAGE_CHANGE, index);
};

/**
 * @override
 */
ad.widget.ImageShowArrow.prototype.dispose = function() {
    this._cancelSlideShow();
    ad.widget.ImageShowArrow.superClass.dispose.call(this);
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
