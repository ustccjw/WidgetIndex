/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/baike/simple_head.js ~ 2013/09/13 15:59:32
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * simple_head相关的实现逻辑
 * 样式参考：http://baike.baidu.com/view/9636759.htm
 **/

goog.require('ad.dom');
goog.require('ad.fx.Timeline');
goog.require('ad.widget.Widget');

goog.include('ad/widget/baike/simple_head.less');
goog.include('ad/widget/baike/simple_head.html');

goog.provide('ad.widget.baike.SimpleHead');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.baike.SimpleHead = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_baike_simple_head';

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
    this._slideCount = this.getData('options').length;

    /**
     * @type {boolean}
     * @private
     */
    this._running = false;
};
baidu.inherits(ad.widget.baike.SimpleHead, ad.widget.Widget);

/** @override */
ad.widget.baike.SimpleHead.prototype.patchData = function() {
    var options = this.getData('options');
    this._data['_total_width'] = options.length * 550;
};

/** @override */
ad.widget.baike.SimpleHead.prototype.bindEvent = function() {
    ad.widget.baike.SimpleHead.superClass.bindEvent.call(this);

    var me = this;
    baidu.on(this.getId('left'), 'click', function() {
        me._prevSlide();
    });

    baidu.on(this.getId('right'), 'click', function() {
        me._nextSlide();
    });

    var nav = baidu.g(this.getId('nav'));
    baidu.on(nav, 'click', function(opt_evt) {
        var evt = opt_evt || window.event;
        var element = evt.target || evt.srcElement;
        if (element.nodeType === 1 && element.nodeName === 'LI') {
            var index = parseInt(element.getAttribute('data-index'), 10);
            me._switchSlide(index);
        }
    });
};

/**
 * @private
 * @param {number} index 要切换的slide索引.
 */
ad.widget.baike.SimpleHead.prototype._switchSlide = function(index) {
    if (this._running) {
        return;
    }

    var me = this;
    var nav = baidu.g(this.getId('nav'));
    var element = baidu.g(this.getId('wrapper'));
    var start = Math.abs(parseInt(ad.dom.getStyle(element, 'left'), 10) || 0);
    var steps = (index * 550 - start);
    var fx = ad.fx.create(element, {
        __type: 'hello',
        render: function(schedule) {
            element.style.left = -(start + steps * schedule) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._running = false;
        me._current = index;

        baidu.each(nav.getElementsByTagName('li'), function(item, i) {
            if (index === i) {
                item.className = 'ec-current';
            } else {
                item.className = '';
            }
        });
    });
    fx.launch();
    this._running = true;
};

/**
 * 展示上一个图文的信息
 * @private
 */
ad.widget.baike.SimpleHead.prototype._prevSlide = function() {
    if (this._current <= 0) {
        return;
    }
    this._switchSlide(this._current - 1);
};

/**
 * 展示下一个图文的信息
 * @private
 */
ad.widget.baike.SimpleHead.prototype._nextSlide = function() {
    if ((this._current + 1) >= this._slideCount) {
        return;
    }
    this._switchSlide(this._current + 1);
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
