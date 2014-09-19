/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: image_cartoon.js 9823 2012-06-19 02:51:16Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_cartoon.js ~ 2012/06/07 22:07:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9823 $
 * @description
 **/

goog.require('ad.fx.Timeline');
goog.require('ad.widget.Widget');
goog.require('ad.dom');

goog.include('ad/widget/image_cartoon.html');
goog.include('ad/widget/image_cartoon.less');

goog.provide('ad.widget.ImageCartoon');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageCartoon = function(data) {
    this._view = 'AD_ad_widget_image_cartoon';

    /**
     * @private
     * @type {number}
     */
    this._length;

    /**
     * 一张图片的移动距离
     * @type {number}
     */
    this._stepWidth;

    /**
     * 容器的宽度一般来说是522，图片的宽度不定.
     * @type {number}
     * @private
     */
    this._INIT_VIEWABLE_COUNT;

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.ImageCartoon, ad.widget.Widget);

/**
 * 如果提供的数据项少于6个，需要复制一下，保证至少有6项数据，才可以有
 * 平滑的滚动效果.
 * 保证DOM节点数目尽可能少，降低server端渲染html的体积，以及默认情况下
 * 的资源请求数量
 * @private
 */
ad.widget.ImageCartoon.prototype._initPool = function() {
    var me = this;
    var originalPool = this.getData('options');
    var originalPoolSize = originalPool.length;

    var viewableCount = this._INIT_VIEWABLE_COUNT;
    var viewablePool = [];

    function init() {
        for (var i = 0; i < originalPoolSize; i++) {
            viewablePool.push(originalPool[i]);
            if (viewablePool.length >= viewableCount) {
                if (originalPoolSize > viewableCount) {
                    me._firstUnConsumedIndex = viewableCount + 1;
                    me._lastUnConsumedIndex = originalPoolSize;
                }
                break;
            }
        }
    }

    init();
    if (!this.getData('disable', false)) {

        // 需要滚动时，DOM不够滚动则复制
        while (viewablePool.length < viewableCount) {
            init();
        }
    }

    this._data['_viewable_pool'] = viewablePool;
};

/**
 * @override
 */
ad.widget.ImageCartoon.prototype.patchData = function() {
    var imageGap = parseInt(this.getData('image_margin', 3), 10);
    var imageWidth = parseInt(this.getData('image_width', 102), 10);
    this._stepWidth = imageWidth + imageGap;
    this._data['image_margin'] = imageGap;

    var itemCount = this.getData('options').length;
    for (var i = 0; i < itemCount; i++) {
        this._data['options'][i]['_width'] = imageWidth + 'px';
        // 模板里面不方便使用@index和_index
        this._data['options'][i]['_origin_index'] = (i + 1);
    }

    var viewableCount = Math.floor(522 / imageWidth) + 1;
    if (itemCount < viewableCount && viewableCount % itemCount !== 0) {
        viewableCount = Math.ceil(viewableCount / itemCount) * itemCount;
    }

    this._INIT_VIEWABLE_COUNT = viewableCount;
    this._initPool();
    this._data['_item_body_width'] = (this._stepWidth *
        Math.max(viewableCount, itemCount)) + 'px';
    this._length = itemCount;
};

/**
 * 判断是否把所有的内容都插入到了DOM了.
 * @private
 * @return {boolean}
 */
ad.widget.ImageCartoon.prototype._hasConsumedAllOriginalPool = function() {
    if (this._yes) {
        return true;
    }

    if (!this._firstUnConsumedIndex || 
        this._firstUnConsumedIndex > this._lastUnConsumedIndex) {
        this._firstElement = null;
        this._lastElement = null;
        return (this._yes = true);
    }

    return false;
};

/**
 * 滚动开始前，处理一些事情
 * 记录第一个元素的位置
 * 向右滚动时：
 *     1. 填充第一个元素
 *        a. 如果originalPool没有用完，且当前第一个标记元素在前面，那么获取剩下
 *           未用的最后一个，填充到第一个标记元素前面，自己记为第一个标记元素.
 *        b. a之外的其他情况，把最后一个放到第一个.
 *     2. 设置`images`的`left`为`-` + this._stepWidth + `px`
 * 开始循环
 * @private
 */
ad.widget.ImageCartoon.prototype._beforeStartOneStep = function(unit) {
    var element = baidu.g(this.getId('images'));
    var tempFirstElement = baidu.dom.first(element);
    var tempLastElement = baidu.dom.last(element);
    var hasConsumedAllOriginalPool = this._hasConsumedAllOriginalPool();

    if (!hasConsumedAllOriginalPool) {
        if (!this._firstElement) {
            // 保存第一个元素的引用
            this._firstElement = tempFirstElement;
            // 保存最后一个元素的引用
            this._lastElement = tempLastElement;
            // 保存第一个元素的位置标识，大于0表示在前面，小于0表示在后面
            this._firstElementIdent = 0;
        }
        this._firstElementIdent += unit;
    }

    // 向右滚动
    if (1 === unit) {
        element.style.left = '-' + this._stepWidth + 'px';
    }
    else {
        return;
    }

    if (!hasConsumedAllOriginalPool) {
        /* 如果第一个元素在前面，则需要继续创建新的DOM节点，并放在最前面，
         * 然后自己标记为第一个元素 */
        if (this._firstElementIdent > 0) {
            var index = this._lastUnConsumedIndex;
            this._lastUnConsumedIndex = index - 1;

            var html = this._getUnConsumedHtml(index);
            element = baidu.dom.insertHTML(baidu.dom.first(element), 'beforeBegin', html).previousSibling;
            this.replayRewrite(element);
            this._firstElement = this._firstElement.previousSibling;
            this._firstElementIdent = 0;

            this.trigger(ui.events.NEW_ELEMENT, this._firstElement);

            return;
        }
    }

    // 把最后一个放最前面去
    baidu.dom.insertBefore(tempLastElement, tempFirstElement);
};

/**
 * 滚动结束之后，处理一些事情
 * 设置`images`的`left`为`0px`
 * 向左滚动时：
 *    a. 那么把第一个元素放到最后.
 *    b. 如果originalPool没有用完，且当前第一个标记元素在后面，那么获取剩下未用
 *       的第一个，填充到最后一个标记元素后面，自己记为最后一个标记元素.
 * @private
 */
ad.widget.ImageCartoon.prototype._afterFinishOneStep = function(unit) {
    var element = baidu.g(this.getId('images'));
    var tempFirstElement = baidu.dom.first(element);

    element.style.left = '0px';

    // 向左滚动
    if (unit === -1) {
        // 把第一个放到最后去
        element.appendChild(tempFirstElement);
    }
    else {
        return;
    }

    /* 如果第一个元素在后面且originalPool没有用完，需要继续创建新的DOM节点，
     * 并放在移到最后一个标记元素后面，然后自己记为最后一个标记元素 */
    if (!this._hasConsumedAllOriginalPool() &&　this._firstElementIdent < 0) {
        var index = this._firstUnConsumedIndex;
        this._firstUnConsumedIndex = index + 1;

        var html = this._getUnConsumedHtml(index);
        element = baidu.dom.insertHTML(this._lastElement, 'afterEnd', html).nextSibling;
        this.replayRewrite(element);
        this._lastElement = this._lastElement.nextSibling;

        this.trigger(ui.events.NEW_ELEMENT, this._lastElement);
    }
};

/**
 * 根据index获取剩下未用的originalPool的数据，生成html字符串
 * @private
 */
ad.widget.ImageCartoon.prototype._getUnConsumedHtml = function(index) {
    var data = this._data['options'][index - 1];
    data['_origin_index'] = index;
    data['image_margin'] = this._data['image_margin'];
    var template = this.tpl('AD_ad_widget_image_cartoon_item');
    var html = ad.render.Template(template, data);
    return html;
};

/**
 * @param {string=} opt_direction 滚动的方向.
 * @private
 */
ad.widget.ImageCartoon.prototype._imageAutoScroll = function(opt_direction) {
    if (this._running) {
        return;
    }

    // 如果duration胡乱被设置了，有可能是NaN
    var duration = parseInt(this.getData('duration', 1500), 10) || 1500;

    var me = this;
    var element = baidu.g(this.getId('images'));
    var steps = this._stepWidth;
    var unit = (opt_direction === 'right') ? 1 : -1;
    var fx = ad.fx.create(element, {
        __type: 'hello',
        duration: duration,
        render: function(schedule) {
            if (1 === unit) {
                element.style.left = (steps * schedule - steps) + 'px';
            }
            else {
                element.style.left = (-1 * steps * schedule) + 'px';
            }
        }
    });
    fx.addEventListener('onbeforestart', function() {
        me._beforeStartOneStep(unit);
    });
    fx.addEventListener('onafterfinish', function() {
        me._running = false;
        me._afterFinishOneStep(unit);
        if (me._continue) {
            // 如果没有其它情况触发，那么就继续滚动
            ad.base.setTimeout(function() {
                me._imageAutoScroll(opt_direction);
            }, 0);
        }
    });
    fx.launch();
    this._running = true;
};

/**
 * FIXME(user) 貌似实现的不对？
 * 展示前一个图片
 * @private
 */
ad.widget.ImageCartoon.prototype._prev = function() {
    this._continue = false;
    this._imageAutoScroll('right');
};

/**
 * 展示下一个图片
 * @private
 */
ad.widget.ImageCartoon.prototype._next = function() {
    this._continue = false;
    this._imageAutoScroll();
};

/**
 * 处理跟滚动相关的事件.
 * @private
 */
ad.widget.ImageCartoon.prototype._bindScrollEvent = function() {
    var me = this;
    var imgWrap = baidu.g(this.getId('images')).parentNode;

    ad.dom.enter(imgWrap, function(opt_evt) {
        me._continue = true;
        me._imageAutoScroll();
    });

    ad.dom.leave(imgWrap, function(opt_evt) {
        me._continue = false;
    });

    ad.dom.on(this.getId('left-arrow'), 'click', function() {
        me._prev();
        if (false !== me.trigger(ui.events.ARROW_LEFT)) {
            me.sendLog('arrowleft', 'arrowleft');
        }
    });

    ad.dom.on(this.getId('right-arrow'), 'click', function() {
        me._next();
        if (false !== me.trigger(ui.events.ARROW_RIGHT)) {
            me.sendLog('arrowright', 'arrowright');
        }
    });
};

/**
 * @override
 */
ad.widget.ImageCartoon.prototype.bindEvent = function() {
    var me = this;

    var featureIsEnabled = (!this._data['disable'] ||
        'false' === this._data['disable']);
    if (featureIsEnabled) {
        this._bindScrollEvent();
    }

    var imagesElement = ad.dom.g(this.getId('images'));
    if (!imagesElement) {
        return;
    }

    ad.dom.on(imagesElement, 'click', function(opt_evt) {
        var evt = opt_evt || window.event;
        var target = evt.target || evt.srcElement;
        if (target.nodeType === 1) {
            var i = 2;
            while ((--i) >= 0 && !baidu.dom.hasClass(target, 'ec-item')) {
                target = target.parentNode;
            }

            if (!baidu.dom.hasClass(target, 'ec-item')) {
                return;
            }
        }

        var index = parseInt(target.getAttribute('data-index'), 10);
        if (index) {
            if (me.trigger(ui.events.CLICK, (index - 1), evt) === false) {
                baidu.event.stop(evt);
            }
        }
    });
};





/* vim: set ts=4 sw=4 sts=4 tw=100: */

