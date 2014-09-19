/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/video/multi_image_slide.js ~ 2013/09/26 17:35:03
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * multi_image_slide相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/video/multi_image_slide.less');
goog.include('ad/widget/video/multi_image_slide.html');

goog.provide('ad.widget.video.MultiImageSlide');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.video.MultiImageSlide = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_video_multi_image_slide';

    /**
     * @type {number}
     * @private
     */
    this._current = 0;
};
baidu.inherits(ad.widget.video.MultiImageSlide, ad.widget.Widget);


/** @override */
ad.widget.video.MultiImageSlide.prototype.bindEvent = function() {
    ad.widget.video.MultiImageSlide.superClass.bindEvent.call(this);

    var me = this;
    var optionLen = this._data['options'].length;
    if(optionLen <= 1) {
        return;
    }
    baidu.on(this.getId('page-prev'), 'click', function() {
        var index = me._getNextIndex('left');
        me._showSlide(index);
        if (false !== me.trigger(ui.events.ARROW_LEFT)) {
            me.sendLog('arrowleft', 'arrowleft');
        }
    });

    baidu.on(this.getId('page-next'), 'click', function() {
        var index =  me._getNextIndex('right');
        me._showSlide(index);
        if (false !== me.trigger(ui.events.ARROW_RIGHT)) {
            me.sendLog('arrowright', 'arrowright');
        }
    });
};

/** @override */
ad.widget.video.MultiImageSlide.prototype.patchData = function() {
    var optionValues = this.getData('options');
    var optionLen = optionValues.length;
    if(optionLen > 1) {
        this._data['show_page_dots'] = true;
    }
    for (var i = optionValues.length - 1; i >= 0; i--) {
        this._data['options'][i]['page_index'] = i + 1;
    }
}

/**
 * @return {number}
 */
ad.widget.video.MultiImageSlide.prototype._getNextIndex = function(direction) {
    var optionLen = this._data['options'].length;
    var plus = ('left' == direction) ? (optionLen - 1) : 1
    return (this._current + plus) % optionLen;
};

/**
 * @param {number} index 要显示的slide索引值，从0开始.
 */
ad.widget.video.MultiImageSlide.prototype._showSlide = function(index) {
    baidu.hide(this.getId('img' + this._current));
    baidu.dom.removeClass(this.getId('dot' + this._current), 'ec-dot-current');

    baidu.show(this.getId('img' + index));
    baidu.dom.addClass(this.getId('dot' + index), 'ec-dot-current');
    this._current = index;
    this.trigger(ui.events.SHOWED_IMAGE_CHANGE, this._current);
};
