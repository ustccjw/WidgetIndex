/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: ImageShowHorizontal.js 9564 2012-06-06 04:43:29Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/ImageShowHorizontal.js ~ 2012/06/04 15:13:54
 * @author loutongbing
 * @version $Revision: 9564 $
 * @description
 *
 **/
goog.require('ad.fx.fadeIn');
goog.require('ad.fx.fadeOut');
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.include('ad/widget/image_show_horizontal.html');
goog.include('ad/widget/image_show_horizontal.less');

goog.provide('ad.widget.ImageShowHorizontal');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageShowHorizontal = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_image_show_horizontal';

    /**
     * @type {number}
     * @private
     */
    this._current = 0;
};
baidu.inherits(ad.widget.ImageShowHorizontal, ad.widget.Widget);

/**
 * @override
 *
 */
ad.widget.ImageShowHorizontal.prototype.bindEvent = function() {
    ad.widget.ImageShowHorizontal.superClass.bindEvent.call(this);

    var me = this;
    var navs = this.getRoot().getElementsByTagName('li');
    //只有存在多个图片时才会有切换的动作
    if(navs && navs.length && navs.length > 1) {
        for (var i = 0; i < navs.length; i++) {
            baidu.on(navs[i], 'click', function() {
                var index = parseInt(this.getAttribute('data-index'), 10);
                if (index != me._current) {
                    me._cancelSlideShow();
                    me._showSlide(index);
                }
            });
        }

        baidu.on(this.getRoot(), 'mouseenter', function() {
            var index = parseInt(this.getAttribute('data-index'), 10);
            me._cancelSlideShow();
        });

        baidu.on(this.getRoot(), 'mouseleave', function() {
            var index = parseInt(this.getAttribute('data-index'), 10);
            me._startSlideShow();
        });

        this._startSlideShow();
    }
};

/**
 * @private
 */
ad.widget.ImageShowHorizontal.prototype._startSlideShow = function() {
    var me = this;
    this._timerId = ad.base.setTimeout(function() {
        me._showSlide(me._getNextIndex());
        me._startSlideShow();
    }, (this._data['switch_time'] || 2000));
};

/**
 * @private
 */
ad.widget.ImageShowHorizontal.prototype._cancelSlideShow = function() {
    if (this._timerId) {
        ad.base.clearTimeout(this._timerId);
        this._timerId = 0;
    }
};

/**
 * @return {number}
 */
ad.widget.ImageShowHorizontal.prototype._getNextIndex = function() {
    return (this._current + 1) % this._data['options'].length;
};

/**
 * @param {number} index 要显示的slide索引值，从0开始.
 */
ad.widget.ImageShowHorizontal.prototype._showSlide = function(index) {
    var me = this;
    
    if(me._data && me._data['display_animation']) {
        if(!me._running) {
            ad.fx.fadeOut(
                baidu.g(me.getId('img' + me._current)),
                {
                    'transition' : function(schedule) {
                        return schedule;
                    },
                    'onafterfinish' : function() {
                        baidu.dom.removeClass(me.getId('nav' + me._current), 'ec-current');
                        baidu.dom.addClass(me.getId('nav' + index), 'ec-current');
                        ad.fx.fadeIn(
                            baidu.g(me.getId('img' + index)),
                            {
                                'transition' : function(schedule) {
                                    return schedule;
                                },
                                'onafterfinish' : function() {
                                    me._current = index;
                                    me._running = false;
                                    me.trigger(ui.events.TAB_CHANGE, me._current);
                                }
                            }
                        );
                    }
                }
            );
            me._running = true;
        }
    }
    else {
        baidu.hide(this.getId('img' + this._current));
        baidu.dom.removeClass(this.getId('nav' + this._current), 'ec-current');

        baidu.show(this.getId('img' + index));
        baidu.dom.addClass(this.getId('nav' + index), 'ec-current');
        this._current = index;
        this.trigger(ui.events.TAB_CHANGE, this._current);
    }
};

/**
 * @override
 */
ad.widget.ImageShowHorizontal.prototype.dispose = function() {
    this._cancelSlideShow();
    ad.widget.ImageShowHorizontal.superClass.dispose.call(this);
};
















/* vim: set ts=4 sw=4 sts=4 tw=100: */
