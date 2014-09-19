/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z dingguoliang01 $
 *
 **************************************************************************/


/**
 * src/ad/widget/gear/roller.js ~ 2013/09/13 15:59:32
 * @author dingguoliang01@baidu.com (dingguoliang01)
 * @version $Revision: 10927 $
 * @description
 * elevator相关的实现逻辑
 * 样式参考：http://animate.baidu.com/view/9636759.htm
 **/

goog.require('ad.dom');
goog.require('ad.fx.Timeline');
goog.require('ad.widget.Widget');

goog.include('ad/widget/gear/roller.less');
goog.include('ad/widget/gear/roller.html');

goog.provide('ad.widget.gear.Roller');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.gear.Roller = function (data) {
    ad.widget.Widget.call(this, data);
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_gear_roller';

    /**
     * @private
     * @type {number}
     */
    this._slideCount = this.getData('cell').length;
    this._current = 0;
    this._interval_time = data['interval_time'] || 4000;
    this._interval = null;
    this._featureIsEnabled = (!this._data['disable'] || 'false' == this._data['disable']);
};
baidu.inherits(ad.widget.gear.Roller, ad.widget.Widget);

/* @override
 */
ad.widget.gear.Roller.prototype.patchData = function () {
    this._data['cell_height'] = this._data['cell_height'] || 68;
    this._data['cell_span'] = this._data['cell_span'] || 6;
    this._data['cell_size'] = this._data['cell_size'] || 2;
    var cell = this._data['cell'],
        size = this._data['cell_size'];
    baidu.each(cell, function(item, index) {
        item['_data_index'] = index + 1;
    });
    if (cell.length) {
        var externSize = size;
        while(externSize) {
            cell.push(cell[size - externSize]);
            externSize --;
        }
    }
    var length = cell.length,
        span = this._data['cell_span'];
    this._data['_wrapper_height'] = size * ( this._data['cell_height'] + span ) - span + size * 2;
    this._data['_content_height'] = length * ( this._data['cell_height'] + span ) - span + length * 2;
};

ad.widget.gear.Roller.prototype._imageAutoScroll = function() {
    if (this._featureIsEnabled && this._interval === null) {
        var me = this;
        this._interval = ad.base.setInterval(function () {
            me._scroll(1);
        }, this._interval_time);
    }
};
ad.widget.gear.Roller.prototype._scroll = function (direction) {
    var me = this;
    var size = this._data['cell_size'];
    var imgWrap = baidu.q('ec-content', me.getRoot())[0];
    var dest = me._current + direction;
    var start;
    var offset;
    var fx = ad.fx.create(imgWrap, {
        __type: 'hello',
        render: function (schedule) {
            baidu.setStyle(imgWrap, 'marginTop', (start - offset * schedule) + 'px');
        }
    });
    fx.addEventListener("onbeforestart", function () {
        var steps = me._data['cell_height'] + 2 + me._data['cell_span'];
        if (dest < 0) {
            dest = me._slideCount - size - 1;
            baidu.setStyle(imgWrap, 'marginTop', (dest + 1) * (- steps) + 'px');
        }
        start = parseInt(ad.dom.getStyle(imgWrap, 'marginTop'));
        offset = start + dest * steps;
    });
    fx.addEventListener('onafterfinish', function () {
        me._current = dest;
        if (me._current >= me._slideCount - size) {
            baidu.setStyle(imgWrap, 'marginTop', '0px');
            me._current = 0;
        }
        me._imageAutoScroll();
    });
    fx.launch();
};
/**
 * 处理跟滚动相关的事件.
 * @override
 */
ad.widget.gear.Roller.prototype.bindEvent = function () {
    ad.widget.gear.Roller.superClass.bindEvent.call(this);
    var me = this;
    baidu.on(this.getRoot(), 'click', function(opt_evt) {
        var evt = opt_evt || window.event;
        var element = evt.target || evt.srcElement;
        if (baidu.dom.hasClass(element, "ec-nav-up")) {
            if (me._featureIsEnabled && me._interval) {
                ad.base.clearInterval(me._interval);
                me._interval = null;
            }
            me._scroll(-1);
        } else if (baidu.dom.hasClass(element, "ec-nav-down")) {
            if (me._featureIsEnabled && me._interval) {
                ad.base.clearInterval(me._interval);
                me._interval = null;
            }
            me._scroll(1);
        } else if("a p span div".indexOf(element.nodeName.toLowerCase()) > -1) {
            var index = parseInt(baidu.dom.getAttr(me.getParentA(element), 'data-index'), 10);
            me.trigger(ui.events.CLICK, index);
        }
    });
    me._imageAutoScroll();
};
ad.widget.gear.Roller.prototype.getParentA = function(dom) {
    while(dom && dom.nodeName.toLowerCase() !== 'a') {
        dom = baidu.dom.getParent(dom);
    }
    return dom;
}
ad.widget.gear.Roller.prototype.dispose = function() {
    ad.widget.gear.Roller.superClass.dispose.call(this);
    if(this._interval) {
        ad.base.clearInterval(this._interval);
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
