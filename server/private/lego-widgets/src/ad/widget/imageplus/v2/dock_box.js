/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/dock_box.js ~ 2014/06/25 14:04:13
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * dock_box相关的实现逻辑
 **/

goog.require('ad.fx.Timeline');
goog.require('ad.widget.IsolatedWidgetContainer');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.render.ImageplusRender');
goog.require('ad.widget.imageplus.v2.util');
goog.require('ui.events');
goog.require('ad.dom');

goog.include('ad/widget/imageplus/v2/dock_box.less');
goog.include('ad/widget/imageplus/v2/dock_box.html');

goog.provide('ad.widget.imageplus.v2.DockBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * // extends {ad.widget.WidgetContainer}
 * @extends {ad.widget.IsolatedWidgetContainer}
 */
ad.widget.imageplus.v2.DockBox = function(data) {
    /**
     * @type {Date}
     * @private
     */
    this._mouseoverTime = null;
    /**
     * @type {number}
     * @private
     */
    this._hoverTimes = 0;

    /**
     * @type {Object}
     * @private
     */
    this._themeClassMap = [
        '' // 默认主题
    ];

    /**
     * 停靠位置
     * @type {string}
     */
    this.position = ''; // XXX: 目前仅支持bottom，其他后续需要的时候再支持

    /**
     * 固定高度情况下的高度值（动画有效）
     * @type {number}
     */
    this.contentHeight = 0;

    /**
     * 固定高度情况下的高度值（可被子widget更新）
     * @type {number}
     */
    this.fixedHeight = 0;

    /**
     * 是否由盒子来展示移入移出特效
     * @type {boolean}
     */
    this.boxAnimate = false;

    // ad.widget.WidgetContainer.call(this, data);
    ad.widget.IsolatedWidgetContainer.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_dock_box';

    /**
     * @type {ad.render.ImageplusRender}
     * @private
     */
    this._render = new ad.render.ImageplusRender();

    /**
     * 是否可以点击打开链接
     * @type {boolean}
     * @private
     */
    this._canClick = false;

    /**
     * @type {boolean}
     * @private
     */
    this._isShowing = false;

    /**
     * @type {boolean}
     * @private
     */
    this._forceHiding = false;

    // 初始化widgets，避免报错
    this._widgets = [];

    /**
     * @type {?number}
     */
    this.showTimer = null;
};
// baidu.inherits(ad.widget.imageplus.v2.DockBox, ad.widget.WidgetContainer);
baidu.inherits(ad.widget.imageplus.v2.DockBox, ad.widget.IsolatedWidgetContainer);

/** @override */
ad.widget.imageplus.v2.DockBox.prototype.patchData = function() {
    ad.widget.imageplus.v2.DockBox.superClass.patchData.apply(this, arguments);
    if (this._data) {
        ad.widget.imageplus.v2.util.updateRealUrl(this._data);
        ad.widget.imageplus.v2.util.updateTradeId(this._data);
        this._data['box'] = this._data['box'] || {};
        this._data['box']['_dock_position_class'] = 'baiduimageplus-d-pos-' + this.getData('box.position', 'bottom');
    }
    // 停靠位置
    this.position = this.getData('box.position', 'bottom');

    this.fixedHeight = this.getData('box.fixed_height');
    this.contentHeight = this.getData('box.content_height');

    // 是否需要box来展示移入移出特效
    this.boxAnimate = this.fixedHeight == null;
};

/** @override */
ad.widget.imageplus.v2.DockBox.prototype.enterDocument = function() {
    var me = this;

    this.addListener(ui.events.LOAD, function() {
        // 显示背景透明度
        me.setBackgroundOpacity();

        if (me.fixedHeight) {
            baidu.dom.setStyles(me.getIsolatedRootCanvas(), {
                'height': me.fixedHeight + 'px',
                'position': 'relative'
            });
            me.updateIsolatedContainerSize();
            me.adjustWrapperHeight(me.fixedHeight);
        }

        // 绑定各种事件
        me.initEvent();

        // 监听子widget事件
        me.listenToWidgets();

        if (!COMPILED) {
            me.showBox();
            me.adjustDockPoint({
                'width': 500,
                'height': 400
            });
            var showHeight = me.getShowHeight();
            me.adjustWrapperHeight(showHeight);
            return;
        }

        // 初次展现时间点
        var firstShowTime = this.getData('box.first_show_time', 5000);
        var showBox = baidu.fn.bind(me.showBox, me);
        var showThenHide = baidu.fn.bind(me.showThenHide, me);
        // 之所以使用setTimeout是为了确保触发send_log事件时，
        // 父容器已经可以接收send_log事件了,
        // 因为父容器是在bindEvent里面接受send_log事件，
        // 而enterDocument是先执行，然后才执行bindEvent
        // showThenHide之所以要setTimeout，是为了确保子widget可以收到SHOW_THEN_HIDE事件
        ad.base.setTimeout(firstShowTime ? showThenHide : showBox, 0);
    });

    ad.widget.imageplus.v2.DockBox.superClass.enterDocument.call(this);

    if (!COMPILED) {
        return;
    }

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = me.getData('api');

    // 初始化
    if (loaderApi) {
        // 底图尺寸变化
        loaderApi.addListener(ui.events.RESIZE, function (event, rect) {
            me.adjustDockPoint(rect);
        });

        loaderApi.addListener(ui.events.SHOW, function () {
            me.adjustDockPoint(rect);

            var showHeight = me.getShowHeight();
            me.adjustWrapperHeight(showHeight);
        });

        var rect = loaderApi.getImgRect();
        me.adjustDockPoint(rect);

        loaderApi.rendDone(me.getData('box.imageplus_button', true));
    }
};

/**
 * 监听子Widget的事件
 */
ad.widget.imageplus.v2.DockBox.prototype.listenToWidgets = function() {
    var me = this;
    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = me.getData('api');
    if (loaderApi) {
        var forceHidingShareKey = '[impl.sticker]forceHiding';
        me._forceHiding =
            /** @type {boolean} */(loaderApi.getShareData(forceHidingShareKey, true)) || false;
    }

    me.forEach(function(widget) {
        // DockBox 中打开和关闭动作由BOX来实现，但是触发是子Widget触发
        widget.addListener(ui.events.BOX_HIDE, function(opt_logSilent) {
            if (me._forceHiding) {
                return;
            }
            me.hideBox(true, opt_logSilent);
        });
        widget.addListener(ui.events.BOX_SHOW, function(opt_logSilent) {
            me.showBox(true, opt_logSilent);
        });
        widget.addListener(ui.events.BOX_CLOSE, function() {
            me.hideBox(); // 关闭时，整个box隐藏

            me._forceHiding = true;
            if (loaderApi) {
                loaderApi.setShareData(forceHidingShareKey, true);
            }

            // 日志：关闭广告
            me.trigger(ui.events.SEND_LOG, 5);
        });
        widget.addListener(ui.events.BOX_REOPEN, function() {
            me._forceHiding = false;

            me.showBox();
        });
        widget.addListener(ui.events.BOX_FIXED_HEIGHT_UPDATED, function(fixedHeight) {
            me.fixedHeight = fixedHeight;
            // 更新inner-canvas
            baidu.dom.setStyles(me.getIsolatedRootCanvas(), {
                'height': fixedHeight + 'px'
            });
            // 更新iframe高度
            me.updateIsolatedContainerSize();
            // 更新wrapper高度
            me.adjustWrapperHeight(fixedHeight);
        });
    });
};

/**
 * 绑定各种事件
 */
ad.widget.imageplus.v2.DockBox.prototype.initEvent = function() {
    var me = this;

    ad.widget.imageplus.v2.util.setupLog(me, function () {
        return '|' + ((new Date() - me._mouseoverTime) / 1000) + '|' + me._hoverTimes;
    });

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = me.getData('api');
    var showBox = baidu.fn.bind(me.showBox, me);
    var hideBox = baidu.fn.bind(me.hideBox, me);

    // 是否一直展现广告
    var alwaysShow = me.getData('box.always_show', false);
    // 进入可视区域后的展现时间
    var showInViewTime = me.getData('box.show_in_view', 0);
    if (!loaderApi) {
        return;
    }

    if (alwaysShow) {
        loaderApi.addListener(ui.events.MOUSE_OVER, function() {
            me.forEach(function(widget) {
                widget.trigger(ui.events.BOX_MOUSE_OVER);
            });
        });
        loaderApi.addListener(ui.events.MOUSE_MOVE, function() {
            me.forEach(function(widget) {
                widget.trigger(ui.events.BOX_MOUSE_MOVE);
            });
        });
        loaderApi.addListener(ui.events.MOUSE_OUT, function() {
            me.forEach(function(widget) {
                widget.trigger(ui.events.BOX_MOUSE_OUT);
            });
        });
        loaderApi.addListener(ui.events.RESIZE, function(event, rect) {
            me.forEach(function(widget) {
                widget.trigger(ui.events.BOX_RESIZE, rect);
            });
        });
    }
    else {
        loaderApi.addListener(ui.events.MOUSE_OVER, showBox);
        loaderApi.addListener(ui.events.MOUSE_MOVE, showBox);
        loaderApi.addListener(ui.events.MOUSE_OUT, hideBox);
    }

    // 进入可视区域后展现广告
    if (showInViewTime) {
        var showThenHide = baidu.fn.bind(me.showThenHide, me);
        loaderApi.addListener(ui.events.INTO_VIEW, showThenHide);
    }
};

/**
 * 展现box
 * @param {boolean=} opt_triggerByWidget 是否由子widget触发
 * @param {boolean=} opt_logSilent 是否不发送日志
 */
ad.widget.imageplus.v2.DockBox.prototype.showBox = function(opt_triggerByWidget, opt_logSilent) {
    var triggerByWidget = opt_triggerByWidget === true;
    if (this._forceHiding) {
        return;
    }

    if (this.showTimer) {
        // 如果之前因为scroll展现过，则删除定时隐藏的定时器
        // 并展现广告
        ad.base.clearTimeout(this.showTimer);
        this.showTimer = null;
        this._isShowing = false;
    }

    if (this._isShowing) {
        return;
    }

    if (!triggerByWidget) {
        this.show();
    }
    else {
        this._isShowing = true;
    }

    var innerEle = this.getIsolatedRootCanvas();
    baidu.dom.addClass(innerEle, 'visible');
    this._mouseoverTime = new Date();
    if (opt_logSilent !== true) {
        this.trigger(ui.events.SEND_LOG, 1);
    }
};

/**
 * 隐藏box
 * @param {boolean=} opt_triggerByWidget 是否由子widget触发
 * @param {boolean=} opt_logSilent 是否不发送日志
 */
ad.widget.imageplus.v2.DockBox.prototype.hideBox = function(opt_triggerByWidget, opt_logSilent) {
    var triggerByWidget = opt_triggerByWidget === true;
    if (this._forceHiding) {
        return;
    }

    if (!triggerByWidget) {
        this.hide();
    }
    else {
        this._isShowing = false;
    }

    var innerEle = this.getIsolatedRootCanvas();
    baidu.dom.removeClass(innerEle, 'visible');
    if (this._mouseoverTime) {
        this._hoverTimes++;
        if (opt_logSilent !== true) {
            this.trigger(
                ui.events.SEND_LOG,
                3,
                (new Date() - this._mouseoverTime) / 1000
            );
        }
    }
};

/**
 * 先展现广告，然后过段时间隐藏
 * @param {Object=} opt_event 事件对象
 */
ad.widget.imageplus.v2.DockBox.prototype.showThenHide = function(opt_event) {
    var me = this;
    // 第一次展现时的展现时间
    var firstShowTime = this.getData('box.first_show_time', 5000);
    // 进入可视区域后的展现时间
    var showInViewTime = me.getData('box.show_in_view', 0);
    if (this._forceHiding) {
        // 强制隐藏广告
        return;
    }

    if (this.getData('box.always_show', false)) {
        me.forEach(function(widget) {
            widget.trigger(ui.events.SHOW_THEN_HIDE, (opt_event ? showInViewTime : firstShowTime));
        });
        return;
    }

    if (this.showTimer) {
        // 已展现广告
        return;
    }
    this.showBox();
    this.showTimer = ad.base.setTimeout(
        function () {
            me.hideBox();
            me.showTimer = null;
        },
        (opt_event ? showInViewTime : firstShowTime)
    );
};

/**
 * 调整box的停靠位置
 * @param {Object} rect 底图尺寸
 */
ad.widget.imageplus.v2.DockBox.prototype.adjustDockPoint = function(rect) {
    var root = this.getRoot();
    baidu.dom.setStyle(root, 'top', rect['height'] + 'px');
    var wrapper = baidu.g(this.getId('wrapper'));
    if (this.position === 'top' || this.position === 'bottom') {
        baidu.dom.setStyle(wrapper, 'width', rect['width'] + 'px');
    }
    else {
        baidu.dom.setStyle(wrapper, 'height', rect['height'] + 'px');
    }
};

/**
 * 获取显示高度(有contentHeight时使用contentHeight，没有时计算实际高度)
 * @return {number}
 */
ad.widget.imageplus.v2.DockBox.prototype.getShowHeight = function() {
    if (this.contentHeight) {
        return this.contentHeight;
    }
    else {
        return this.getIsolatedRootCanvas().offsetHeight;
    }
};

/**
 * 调整box内isolated内容的尺寸
 */
ad.widget.imageplus.v2.DockBox.prototype.adjustWrapperHeight = function(showHeight) {
    this.showHeight = this.getShowHeight();
    if (this.boxAnimate) {
        this.heightEffect(showHeight);
    }
    else {
        var wrapper = baidu.g(this.getId('wrapper'));
        wrapper.style.height = showHeight + 'px';
    }
};

/**
 * 设置背景的透明度
 *
 * @param {number=} opt_opacity .
 */
ad.widget.imageplus.v2.DockBox.prototype.setBackgroundOpacity = function (opt_opacity) {
    if (!this.getData('box.has_background', true)) {
        return;
    }

    var opacity = opt_opacity || this.getData('box.box_bg_opacity', 0.75);
    var bgEle = ad.dom.g(this.getId('bg'));
    if (bgEle) {
        bgEle.style.background = '#000';
        ad.dom.opacity(bgEle, opacity);
    }
};

/** @override */
ad.widget.imageplus.v2.DockBox.prototype.show = function () {
    this._isShowing = true;
    var showHeight = this.getShowHeight();
    this.adjustWrapperHeight(showHeight);
};

/**
 * 高度变化特效
 * @param {number} targetHeight 目标高度
 */
ad.widget.imageplus.v2.DockBox.prototype.heightEffect = function(targetHeight) {
    var me = this;
    var element = baidu.g(this.getId('wrapper'));
    var from = element.offsetHeight;
    var to = targetHeight;
    if (from === to) {
        return;
    }
    var duration = Math.min(500, Math.max(100, Math.abs(to - from) * 10));
    if (this._running) {
        this._fx.cancel();
        me._running = false;
    }
    var fx = ad.fx.create(element, {
        __type: 'height-change',
        duration: duration,
        render: function(schedule) {
            element.style.height = (from + (to - from) * schedule) + 'px';
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._running = false;
    });
    fx.launch();
    this._fx = fx;
    this._running = true;
};

/**
 * @override
 */
ad.widget.imageplus.v2.DockBox.prototype.hide = function () {
    this.adjustWrapperHeight(0);
    this._isShowing = false;
};

/**
 * 获取广告可视部分的位置高宽
 *
 * @return {Object} 位置高宽
 */
ad.widget.imageplus.v2.DockBox.prototype.getAdRect = function () {
    var wrapper = baidu.g(this.getId('wrapper'));
    return ad.dom.getRect(wrapper);
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
