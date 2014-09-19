/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/widget/gear/Slider.js ~ 2013/09/13 15:59:32
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 10927 $
 * @description
 * elevator相关的实现逻辑
 * 样式参考：http://animate.baidu.com/view/9636759.htm
 **/

goog.require('ad.dom');
goog.require('ad.fx.Timeline');
goog.require('ad.widget.Widget');

goog.include('ad/widget/gear/slider.less');
goog.include('ad/widget/gear/slider.html');

goog.provide('ad.widget.gear.Slider');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gear.Slider = function (data) {
    ad.widget.Widget.call(this, data);
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gear_slider';

    /**
     * @private
     * @type {number}
     */
    this._slideCount = this.getData('cell').length;
    this._current = 0;
    this._interval_time = data['interval_time'] || 3000;
    this._interval = null;
    this._featureIsEnabled = (!this._data['disable'] || 'false' == this._data['disable']);
};
baidu.inherits(ad.widget.gear.Slider, ad.widget.Widget);

/* @override
 */
ad.widget.gear.Slider.prototype.patchData = function () {
    var cell = this._data['cell'];
    baidu.each(cell, function(item, index) {
        item['_data_index'] = index;
    });
    if (cell.length > 1) {
        cell.push(cell[0]);
    } else {
        this._data['_single_page'] = true;
    }
    var length = cell.length;
    this._data['circle_width'] = this._data['circle_width'] || 20;
    this._data['cell_width'] = this._data['cell_width'] || 518;
    this._data['_content_width'] = length * this._data['cell_width'];
    this._data['_circle_width'] = (length - 1) * this._data['circle_width'] + 5;
    this._data['_span'] = (this._data['circle_width'] - 10) / 2;
};

ad.widget.gear.Slider.prototype._imageAutoScroll = function() {
    if (this._featureIsEnabled && this._interval === null) {
        var me = this;
        this._interval = ad.base.setInterval(function () {
            me._scroll(1);
        }, this._interval_time);
    }
}
ad.widget.gear.Slider.prototype._scroll = function (direction, isIndex) {
    var me = this;
    var imgWrap = me.getRoot().getElementsByTagName('ul')[0];
    if(!isIndex) {
       var dest = me._current + direction;
    } else {
       var dest = direction;
    }
    var start;
    var offset;
    var fx = ad.fx.create(imgWrap, {
        __type: 'hello',
        render: function (schedule) {
            baidu.setStyle(imgWrap, 'marginLeft', (start - offset * schedule) + 'px');
        }
    });
    fx.addEventListener("onbeforestart", function () {
        var steps = me._data['cell_width'];
        if (dest < 0) {
            dest = me._slideCount - 2;
            baidu.setStyle(imgWrap, 'marginLeft', (dest + 1)  * (- steps) + 'px');
        }
        if (dest >= me._slideCount - 1) {
            me.setHoverClass(0);
        } else {
            me.setHoverClass(dest);
        }
        start = parseInt(ad.dom.getStyle(imgWrap, 'marginLeft'));
        offset = start + dest * steps;
    });
    fx.addEventListener('onafterfinish', function () {
        me._current = dest;
        if (me._current >= me._slideCount - 1) {
            baidu.setStyle(imgWrap, 'marginLeft', '0px');
            me._current = 0;
        }
        if (!isIndex) {
            me._imageAutoScroll();
        }
    });
    fx.launch();
}
ad.widget.gear.Slider.prototype.setHoverClass = function(current) {
    var circle = baidu.q('ec-circle', this.getRoot())[0];
    var as = circle.getElementsByTagName('a');
    baidu.each(as, function(a, index) {
        if (index === current) {
            baidu.addClass(a, 'ec-current');
        } else {
            baidu.removeClass(a, 'ec-current');
        }
    });
}
/**
 * 处理跟滚动相关的事件.
 * @override
 */
ad.widget.gear.Slider.prototype.bindEvent = function () {
    ad.widget.gear.Slider.superClass.bindEvent.call(this);
    var me = this;
    var root = baidu.q('ad-widget-gear-slider', this.getRoot())[0];
    if (!this._data['_single_page']) {
        ad.dom.hover(root, function() {
            baidu.each(baidu.q('ec-nav', root), function(item) {
                baidu.addClass(item, 'ec-hover');
            });
        }, function() {
            baidu.each(baidu.q('ec-nav', root), function(item) {
                baidu.removeClass(item, 'ec-hover');
            });
        });
        var circle = baidu.q('ec-circle', this.getRoot())[0];
        baidu.on(circle, 'mouseover', function(opt_evt) {
            var evt = opt_evt || window.event;
            var element = evt.target || evt.srcElement;
            if (element.nodeName.toLowerCase() === 'a') {
                var index = parseInt(baidu.dom.getAttr(element, 'data-index'), 10);
                if (me._featureIsEnabled && me._interval) {
                    ad.base.clearInterval(me._interval);
                    me._interval = null;
                }
                me._scroll(index, true);
            }
        });
        baidu.on(circle, 'mouseout', function(opt_evt) {
            var evt = opt_evt || window.event;
            var element = evt.target || evt.srcElement;
            if(element.nodeName.toLowerCase() === 'a') {
                me._imageAutoScroll();
            }
        });
        baidu.on(root, 'click', function(opt_evt) {
            var evt = opt_evt || window.event;
            var element = evt.target || evt.srcElement;
            if (baidu.dom.hasClass(element, "ec-nav-left")) {
                if (me._featureIsEnabled && me._interval) {
                    ad.base.clearInterval(me._interval);
                    me._interval = null;
                }
                me._scroll(-1);
            } else if (baidu.dom.hasClass(element, "ec-nav-right")) {
                if (me._featureIsEnabled && me._interval) {
                    ad.base.clearInterval(me._interval);
                    me._interval = null;
                }
                me._scroll(1);
            }
        });
        me._imageAutoScroll();
    }
};
ad.widget.gear.Slider.prototype.dispose = function() {
    ad.widget.gear.Slider.superClass.dispose.call(this);
    if(this._interval) {
        ad.base.clearInterval(this._interval);
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
