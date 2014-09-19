/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: image_show_vertical.js 9564 2012-06-06 04:43:29Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_show_vertical.js ~ 2012/06/04 15:13:54
 * @author loutongbing
 * @version $Revision: 9564 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/image_show_vertical.html');
goog.include('ad/widget/image_show_vertical.less');

goog.provide('ad.widget.ImageShowVertical');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageShowVertical = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_image_show_vertical';

    /**
     * @type {number}
     * @private
     */
    this._current = 0;
};
baidu.inherits(ad.widget.ImageShowVertical, ad.widget.Widget);

/**
 * @override
 */
ad.widget.ImageShowVertical.prototype.bindEvent = function() {
    ad.widget.ImageShowVertical.superClass.bindEvent.call(this);

    var me = this;
    var navs = this.getRoot().getElementsByTagName('li');
    for (var i = 0; i < navs.length; i++) {
        baidu.on(navs[i], 'mouseenter', function() {
            var index = parseInt(this.getAttribute('data-index', 10));
            me._cancelSlideShow();
            me._showSlide(index);
            me._startSlideShow();
        });
    }

    this._startSlideShow();
};

/**
 * @private
 */
ad.widget.ImageShowVertical.prototype._startSlideShow = function() {
    var me = this;
    this._timerId = ad.base.setTimeout(function() {
        me._showSlide(me._getNextIndex());
        me._startSlideShow();
    }, (this._data['switch_time'] || 2000));
};

/**
 * @private
 */
ad.widget.ImageShowVertical.prototype._cancelSlideShow = function() {
    if (this._timerId) {
        ad.base.clearTimeout(this._timerId);
        this._timerId = 0;
    }
};

/**
 * @return {number}
 */
ad.widget.ImageShowVertical.prototype._getNextIndex = function() {
    return (this._current + 1) % this._data['options'].length;
};

/**
 * @param {number} index 要显示的slide索引值，从0开始.
 */
ad.widget.ImageShowVertical.prototype._showSlide = function(index) {
    baidu.hide(this.getId('img' + this._current));
    baidu.dom.removeClass(this.getId('nav' + this._current), 'ec-current');

    baidu.show(this.getId('img' + index));
    baidu.dom.addClass(this.getId('nav' + index), 'ec-current');
    this._current = index;
    this.trigger(ui.events.TAB_CHANGE, this._current);
};

/**
 * @override
 */
ad.widget.ImageShowVertical.prototype.dispose = function() {
    this._cancelSlideShow();
    ad.widget.ImageShowVertical.superClass.dispose.call(this);
}


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
