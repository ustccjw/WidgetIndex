/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: time_line.js 2013-09-17 11:40:49Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/widget/baike/time_line.js ~ 2013/09/17 11:40:49
 * @author dingguoliang01
 * @version $Revision: $
 * @description
 * time_line模块
 **/

goog.require('ad.dom');
goog.require('ad.fx.Timeline');
goog.require('ad.widget.Widget');

goog.include('ad/widget/baike/time_line.html');
goog.include('ad/widget/baike/time_line.less');

goog.provide('ad.widget.baike.TimeLine');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.baike.TimeLine = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_baike_time_line';

    /**
     * @private
     * @type {number}
     */
    this._current = 0;

    /**
     * @private
     * @type {boolean}
     */
    this._scrolling = false;
};
baidu.inherits(ad.widget.baike.TimeLine, ad.widget.Widget);

/*
 * @private
 * @param {number} index 要切换的slide索引
 * */
ad.widget.baike.TimeLine.prototype._switch = function(index) {
    if (this._scrolling) {
        return;
    }
    var me = this;
    var element = baidu.g(this.getId('wrapper'));
    var start = Math.abs(parseInt(ad.dom.getStyle(element, 'left'), 10) || 0);
    var steps = (index * 936 - start);
    var fx = ad.fx.create(element, {
        __type: 'hello',
        render: function(schedule) {
            element.style.left = -(start + steps * schedule) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._scrolling = false;
        me._current = index;
    });
    fx.launch();
}

/*
 * @private
 * */
ad.widget.baike.TimeLine.prototype._next = function() {
     if (this._current + 1 < this._total) {
         this._switch(this._current + 1);
     }
}

/*
 * @private
 * */
ad.widget.baike.TimeLine.prototype._prev = function() {
    if (this._current > 0) {
        this._switch(this._current - 1);
    }
}

/*
 * @private
 * @param {Element} item 点击的元素
 * */
ad.widget.baike.TimeLine.prototype._clickItem = function(item) {
    var index = baidu.getAttr(item, 'data-index');
    var option = this.getData('options.'+index);
    if (option) {
        baidu.removeClass(baidu.g(this.getId('mask')), 'ec-hide');
        /*var canvas = baidu.dom.first(this.getRoot());
        console.log(canvas);
        if (canvas && canvas.id) {
            this.trigger(ui.events.NEW_AD_CANVAS, canvas.id);
        }*/
        baidu.g(this.getId('title')).innerHTML = option['title'];
        baidu.g(this.getId('desc')).innerHTML = option['desc'];
        var img = document.createElement('IMG');
        img.src = option['big_img'];
        baidu.g(this.getId('container')).appendChild(img);
    }
}

/**
 * @override
 */
ad.widget.baike.TimeLine.prototype.bindEvent = function() {
    ad.widget.baike.TimeLine.superClass.bindEvent.call(this);
    var me = this;
    baidu.on(baidu.g(this.getId('wrapper')), 'click', function(opt_evt) {
        var evt = opt_evt || window.event;
        var element = evt.target || evt.srcElement;
        while (element.nodeType !== 1 || element.nodeName !== 'A') {
            element = element.parentNode;
        }
        me._clickItem(element);
        baidu.event.preventDefault(evt);
    });

    baidu.on(baidu.g(this.getId('close')), 'click', function() {
        me._hideMask();
    });

    baidu.on(baidu.g(this.getId('next')), 'click', function() {
        me._next();
    });
    baidu.on(baidu.g(this.getId('prev')), 'click', function() {
        me._prev();
    });
};

/*
* 隐藏遮罩
* @private
* */
ad.widget.baike.TimeLine.prototype._hideMask = function() {
    baidu.addClass(baidu.g(this.getId('mask')), 'ec-hide');
    var container = baidu.g(this.getId('container'));
    container.removeChild(container.lastChild);
}

/**
 * @override
 */
ad.widget.baike.TimeLine.prototype.patchData = function() {
    var options = this.getData('options');
    this._total = Math.ceil(options.length / 4);
    this._data['_total_width'] = this._total * 936;
    baidu.each(options, function(option) {
        option['brief'] = baidu.string.subByte(option['desc'], 110, '...');
        option['type'] = option['type'] || 'normal';
        option[option['type']] = true;
    });
};
