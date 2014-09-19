/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/widget/animate/elevator.js ~ 2013/09/13 15:59:32
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 10927 $
 * @description
 * elevator相关的实现逻辑
 * 样式参考：http://animate.baidu.com/view/9636759.htm
 **/

goog.require('ad.dom');
goog.require('ad.fx.Timeline');
goog.require('ad.widget.Widget');

goog.include('ad/widget/animate/elevator.less');
goog.include('ad/widget/animate/elevator.html');

goog.provide('ad.widget.animate.Elevator');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.animate.Elevator = function (data) {
    this._navDefault = {
        width: 12,
        margin: 10
    };
    ad.widget.Widget.call(this, data);
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_animate_elevator';

    /**
     * @private
     * @type {number}
     */
    this._current = 0;

    /**
     * 图文的数量.
     * @private
     * @type {number}
     */
    this._slideCount = this.getData('imgs').length;
    this._interval_time = data['interval_time'] || 4000;
    this._interval;
    this._featureIsEnabled = (!this._data['disable'] || 'false' == this._data['disable']);

};
baidu.inherits(ad.widget.animate.Elevator, ad.widget.Widget);

/* @override
 */
ad.widget.animate.Elevator.prototype.patchData = function () {
    var items = this.getData('items'),
        cellWidth = this.getData('cell_width'),
        width = this.getData('width'),
        margin = this.getData('margin'),
        spacing = Math.floor((width - cellWidth * items.length - margin * 2) / (items.length - 1)),
        imgs = this.getData('imgs'),
        length = imgs.length;
    imgs.push(imgs[0]);
    this._data['_bar_width'] = length * this._navDefault.width + (length + 1) * this._navDefault.margin;
    this._data['_width'] = (length + 1) * width;
    this._data['_left'] = (width - this._data['_bar_width']) / 2;
    var index, l;
    for (index = 0, l = items.length - 1; index < l; index++) {
        items[index].left = index * (cellWidth + spacing) + margin;
    }
    items[index].left = width - cellWidth - margin;
};
ad.widget.animate.Elevator.prototype._imageAutoScroll = function() {
    if (this._featureIsEnabled) {
        var me = this;
        this._interval = ad.base.setInterval(function () {
            me._scroll();
        }, this._interval_time);
    }
}
ad.widget.animate.Elevator.prototype._scroll = function (dest) {
    var me = this;
    var imgWrap = baidu.q('ec-wrapper', me.getRoot())[0];
    if (dest === undefined) {
        dest = me._current + 1;
    }
    var start = parseInt(ad.dom.getStyle(imgWrap, 'marginLeft'));
    var steps = me._data['width'];
    var offset = start + dest * steps;
    var next = dest % (me._slideCount - 1);
    var fx = ad.fx.create(imgWrap, {
        __type: 'hello',
        render: function (schedule) {
            baidu.setStyle(imgWrap, 'marginLeft', (start - offset * schedule) + 'px');
        }
    });
    fx.addEventListener('onbeforestart', function () {
        var nav = baidu.q('ec-nav', me.getRoot())[0];
        baidu.each(nav.children, function(el, i) {
            if (i !== next) {
                baidu.removeClass(el, 'ec-nav-current');
            } else
            {
                baidu.addClass(el, 'ec-nav-current');
            }
        });
    });

    fx.addEventListener('onafterfinish', function () {
        me._current = dest % me._slideCount;
        if (me._current >= me._slideCount - 1) {
            var imgWrap = baidu.q('ec-wrapper', me.getRoot())[0];
            baidu.setStyle(imgWrap, 'marginLeft', '0px');
            me._current = 0;
        }
    });
    fx.launch();
}

/**
 * 处理跟滚动相关的事件.
 * @private
 */
ad.widget.animate.Elevator.prototype._bindScrollEvent = function () {
    var me = this;
    var nav = baidu.q('ec-nav', this.getRoot())[0];
    baidu.on(nav, 'mouseover', function (opt_evt) {
        var evt = opt_evt || window.event;
        var element = evt.target || evt.srcElement;
        if (element.nodeName.toLowerCase() === 'li') {
            var index = parseInt(baidu.getAttr(element, 'data-index'));
            if (me._featureIsEnabled && me._interval) {
                ad.base.clearInterval(me._interval);
            }
            me._scroll(index);
        }
    });
    baidu.on(nav, 'mouseout', function (opt_evt) {
        var evt = opt_evt || window.event;
        var element = evt.target || evt.srcElement;
        if (element.nodeName.toLowerCase() === 'li') {
            me._imageAutoScroll();
        }
    });
    me._imageAutoScroll();
}

/**
 * @override
 */
ad.widget.animate.Elevator.prototype.bindEvent = function () {
    ad.widget.animate.Elevator.superClass.bindEvent.call(this);
    this._bindScrollEvent();
    var me = this;
    baidu.each(baidu.q("ec-outer", this.getRoot()), function (el) {
        ad.dom.hover(el, function (evt, element) {
            var height = Math.abs(parseInt(ad.dom.getStyle(element, 'height'), 10) || 0);
            var steps = (me._data['cell_height'] - height);
            var fx = ad.fx.create(element, {
                __type: 'single',
                duration: Math.abs(steps * 6),
                render: function (schedule) {
                    element.style.height = (height + steps * schedule) + 'px';
                }
            });
            fx.addEventListener('onbeforestart', function() {
                baidu.removeClass(element.getElementsByTagName('div')[0], 'ec-index');
            });
            fx.launch();
        }, function (evt, element) {
            var height = Math.abs(parseInt(ad.dom.getStyle(element, 'height'), 10) || 0);
            var steps = (me._data['init_height'] - height);
            var fx = ad.fx.create(element, {
                __type: 'single',
                duration: Math.abs(steps * 6),
                render: function (schedule) {
                    element.style.height = (height + steps * schedule) + 'px';
                }
            });
            fx.addEventListener('onafterfinish', function() {
                baidu.addClass(element.getElementsByTagName('div')[0], 'ec-index');
            });
            fx.launch();
        });
    });
};

ad.widget.animate.Elevator.prototype.dispose = function() {
    ad.widget.animate.Elevator.superClass.dispose.call(this);
    if(this._interval) {
        ad.base.clearInterval(this._interval);
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
