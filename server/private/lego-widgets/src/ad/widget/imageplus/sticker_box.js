/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/

/**
 * src/ad/widget/imageplus/box.js ~ 2013/08/27 10:41:16
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * box相关的实现逻辑
 **/

goog.require('ad.widget.WidgetContainer');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.render.ImageplusRender');
goog.require('ad.widget.imageplus.util');
goog.require('ui.events');

goog.include('ad/widget/imageplus/sticker_box.less');
goog.include('ad/widget/imageplus/sticker_box.html');

goog.provide('ad.widget.imageplus.StickerBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.WidgetContainer}
 */
ad.widget.imageplus.StickerBox = function (data) {
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
        '',                 // 默认主题
        'white',            // 白色背景主题
        'none',             // 无主题
        'none-white',       // 无主题，关闭按钮X为白色
        'none-white-2'      // 无主题，关闭按钮在外面
    ];

    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_box';

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
     * 显示close按钮定时器
     * @type {?number}
     */
    this.showCloseTimer = null;
};
baidu.inherits(ad.widget.imageplus.StickerBox, ad.widget.WidgetContainer);

/** @override */
ad.widget.imageplus.StickerBox.prototype.patchData = function () {
    if (this._data) {
        ad.widget.imageplus.util.updateRealUrl(this._data);
        var themeClass = this._themeClassMap[this.getData('box.theme', 0)];
        if (themeClass) {
            this._data['box']['_theme_class'] = 'ad-widget-imageplus-sticker-theme-' + themeClass;
        }
    }
};

/**
 * 关闭贴片之后显示的一个提示信息，可再次点开
 */
ad.widget.imageplus.StickerBox.prototype.showThumbnail = function() {
    var thumbnail = baidu.g(this.getId('thumbnail'));
    if (thumbnail) {
        baidu.show(thumbnail);
    }
};

/**
 * 关闭贴片之后显示的一个提示信息，可再次点开
 */
ad.widget.imageplus.StickerBox.prototype.hideThumbnail = function() {
    var thumbnail = baidu.g(this.getId('thumbnail'));
    if (thumbnail) {
        baidu.hide(thumbnail);
    }
};

/** @override */
ad.widget.imageplus.StickerBox.prototype.enterDocument = function () {
    ad.widget.imageplus.StickerBox.superClass.enterDocument.call(this);

    var me = this;
    var root = me.getRoot();
    if (me.getData('box.is_cut_show')) {
        baidu.dom.addClass(root, 'ad-widget-imageplus-sticker-cut');
        baidu.dom.setStyle(root, 'height', me.getData('box.cut_height', 75));
    }

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = me.getData('api');
    me.setBackgroundOpacity();
    // 监控子widgets的RESIZE事件，并更新自己的位置
    me.forEach(function(widget) {
        widget.addListener(ui.events.RESIZE, function () {
            me.updatePosition(loaderApi.getImgRect()['height']);
        });
        // 检测iframe的加载
        widget.addListener(ui.events.LOAD, function () {
            me.trigger(ui.events.LOAD);
        });
    });

    var closeBtn;
    var hideCloseBtn = me.getData('box.hide_close_btn', false);
    if (hideCloseBtn) {
        // 默认隐藏关闭按钮
        closeBtn = baidu.g(me.getId('close'));
        baidu.hide(closeBtn);
    }

    if (hideCloseBtn) {
        // 在鼠标over和out时，展现和关闭关闭按钮
        var showCloseBtn = function () {
            baidu.show(closeBtn);
        };
        loaderApi.addListener(ui.events.MOUSE_OVER, showCloseBtn);
        loaderApi.addListener(ui.events.MOUSE_MOVE, showCloseBtn);
        loaderApi.addListener(ui.events.MOUSE_OUT, function () {
            baidu.hide(closeBtn);
        });
    }

    var forceHidingShareKey = '[impl.sticker]forceHiding';
    me._forceHiding =
        /** @type {boolean} */(loaderApi.getShareData(forceHidingShareKey, true)) || false;

    loaderApi.addListener(ui.events.RESIZE, function (event, rect) {
        // TODO 这是个bug，应该去掉这个条件。但是不敢改啊，万一ctr下降...
        if (me._isShowing) {
            me.updatePosition(rect['height']);
        }
    });

    // 关闭之后是否显示thumbnail
    var showThumbnail = me.getData('box.show_thumbnail', false);
    me.addListener(ui.events.CLOSE, function () {
        me._forceHiding = true;
        if (showThumbnail) {
            me.showThumbnail();
        }
        loaderApi.setShareData(forceHidingShareKey, true);

        me.trigger(
            ui.events.SEND_LOG,
            3,
            (new Date() - me._mouseoverTime) / 1000
        );

        me.trigger(ui.events.SEND_LOG, 5);
    });

    // 是否一直展现广告
    var alwaysShow = me.getData('box.always_show', false);
    // 第一次展现时的展现时间
    var firstShowTime = me.getData('box.first_show_time', 5000);
    // 进入可视区域后的展现时间
    var showInViewTime = me.getData('box.show_in_view', 0);
    // 隐藏广告的定时器
    var showTimeout;
    /**
     * 展现box
     */
    function showBox() {
        if (me._forceHiding) {
            return;
        }

        if (showTimeout) {
            // 如果之前因为scroll展现过，则删除定时隐藏的定时器
            // 并展现广告
            ad.base.clearTimeout(showTimeout);
            showTimeout = null;
            me._isShowing = false;
        }

        if (me._isShowing) {
            return;
        }

        me.show();
        me._mouseoverTime = new Date();
        me.trigger(ui.events.SEND_LOG, 1);
    }
    /**
     * 隐藏box
     */
    function hideBox() {
        if (me._forceHiding) {
            return;
        }

        me.hide();
        if (me._mouseoverTime) {
            me._hoverTimes++;
            me.trigger(
                ui.events.SEND_LOG,
                3,
                (new Date() - me._mouseoverTime) / 1000
            );
        }
    }
    /**
     * 先展现广告，然后过段时间隐藏
     * @param {Object=} opt_event 事件对象
     */
    function showThenHide(opt_event) {
        if (me._forceHiding || showTimeout) {
            // 已展现或者强制隐藏广告
            return;
        }

        me.show();
        showTimeout = ad.base.setTimeout(function () {
            me.hide();
            showTimeout = null;
        }, (opt_event ? showInViewTime : firstShowTime));
    }

    if (alwaysShow) {
        // 默认一直展现，直到用户关闭
        // 之所以使用setTimeout是为了确保触发send_log事件时，
        // 父容器已经可以接收send_log事件了,
        // 因为父容器是在bindEvent里面接受send_log事件，
        // 而enterDocument是先执行，然后才执行bindEvent
        setTimeout(showBox, 0);
    }
    else {
        loaderApi.addListener(ui.events.MOUSE_OVER, showBox);
        loaderApi.addListener(ui.events.MOUSE_MOVE, showBox);
        loaderApi.addListener(ui.events.MOUSE_OUT, hideBox);
        // 进入可视区域后展现广告
        if (showInViewTime) {
            loaderApi.addListener(ui.events.INTO_VIEW, showThenHide);
        }
        // 默认展现
        showThenHide();
    }

    loaderApi.rendDone(me.getData('box.imageplus_button', true));
};

/** @override */
ad.widget.imageplus.StickerBox.prototype.bindEvent = function () {
    var me = this;
    ad.widget.imageplus.StickerBox.superClass.bindEvent.call(me);

    ad.widget.imageplus.util.setupLog(me, function () {
        return '|' + ((new Date() - me._mouseoverTime) / 1000) + '|' + me._hoverTimes;
    });

    var closeBtn = baidu.g(me.getId('close'));
    if (closeBtn) {
        baidu.on(closeBtn, 'click', function (e) {
            baidu.event.preventDefault(e || window.event);
            baidu.hide(closeBtn);
            me.hide(true);
            me.trigger(ui.events.CLOSE);
        });
    }

    var showThumbnail = me.getData('box.show_thumbnail', false);
    if (showThumbnail) {
        var thumbnail = baidu.g(this.getId('thumbnail'));
        if (thumbnail) {
            baidu.on(thumbnail, 'click', function(e) {
                me._forceHiding = false;
                me.trigger(ui.events.SEND_LOG, 1);
                baidu.event.preventDefault(e);
                me.show();
                me.hideThumbnail();
            });
        }
    }
};

/**
 * 获取容器(不一定是root)
 */
ad.widget.imageplus.StickerBox.prototype.getWrapper = function() {
    var wrapper = baidu.g(this.getId('wrapper'));
    var root = this.getRoot();
    return wrapper || root;
};

/** @override */
ad.widget.imageplus.StickerBox.prototype.show = function () {
    var root = this.getRoot();
    if (root) {
        /**
         * @type {ad.plugin.imageplus.ILoaderApi}
         */
        var loaderApi = this.getData('api');
        if (loaderApi) {
            this.updatePosition(loaderApi.getImgRect()['height']);
        }
        var me = this;
        var hideCloseBtn = me.getData('box.hide_close_btn', false);
        if (!hideCloseBtn) {
            if (this.showCloseTimer) {
                ad.base.clearTimeout(this.showCloseTimer);
            }
            this.showCloseTimer = ad.base.setTimeout(function() {
                var closeBtn = baidu.g(me.getId('close'));
                closeBtn && baidu.show(closeBtn);
                this.showCloseTimer = null;
            }, 500);
        }
        this._isShowing = true;
    }
};

/**
 * @param {boolean=} opt_forceHide 是否强制隐藏
 * @override
 */
ad.widget.imageplus.StickerBox.prototype.hide = function (opt_forceHide) {
    var forceHide = opt_forceHide === true;
    var wrapper = this.getWrapper();
    if (wrapper) {
        /**
         * @type {ad.plugin.imageplus.ILoaderApi}
         */
        var loaderApi = this.getData('api');
        var visualHeight = this.getData('box.visual_height', 0);
        var cutHeight = this.getData('box.cut_height', 75);
        if (forceHide) {
            visualHeight = 0;
        }
        if (loaderApi) {
            if (this.getData('box.is_cut_show')) {
                baidu.setStyle(wrapper, 'top', (cutHeight - visualHeight) + 'px');
            }
            else {
                baidu.setStyle(wrapper, 'top', (loaderApi.getImgRect()['height'] - visualHeight) + 'px');
            }
        }
        baidu.setStyle(wrapper, 'height', visualHeight + 'px');
        if (visualHeight <= 0) {
            if (baidu.browser.ie && (baidu.browser.ie < 10)) {
                wrapper.style.cssText = '';
            }
        }
        if (this.showCloseTimer) {
            ad.base.clearTimeout(this.showCloseTimer);
        }
        var closeBtn = baidu.g(this.getId('close'));
        closeBtn && baidu.hide(closeBtn);
        this._isShowing = false;
    }
};

/**
 * update position of this widget.
 *
 * @param {number} imgHeight .
 */
ad.widget.imageplus.StickerBox.prototype.updatePosition = function (imgHeight) {
    var root = this.getRoot();
    var wrapper = this.getWrapper();
    if (this.getData('box.is_cut_show')) {
        var cutHeight = this.getData('box.cut_height', 75);
        if (wrapper) {
            wrapper.style.cssText = 'clip:rect(0px,0px,0px,0px);display:block;height:0;top:' + imgHeight + 'px;';
            var body = baidu.g(this.getId('body'));
            var bodyHeight = body.offsetHeight;
            wrapper.style.cssText = 'display:block;'
                + 'top:' + (cutHeight - bodyHeight) + 'px;'
                + 'height:' + bodyHeight + 'px;';
        }
        if (root && this.getData('box.is_cut_show')) {
            root.style.cssText = 'display:block;'
                + 'top:' + (imgHeight - cutHeight) + 'px;'
                + 'height:' + cutHeight + 'px;';
        }
    }
    else {
        if (wrapper) {
            wrapper.style.cssText = 'clip:rect(0px,0px,0px,0px);display:block;height:0;top:' + imgHeight + 'px;';
            var body = baidu.g(this.getId('body'));
            var bodyHeight = body.offsetHeight;
            wrapper.style.cssText = 'display:block;'
                + 'top:' + (imgHeight - bodyHeight) + 'px;'
                + 'height:' + bodyHeight + 'px;';
        }
    }

    var thumbnail = baidu.g(this.getId('thumbnail'));
    if (thumbnail) {
        thumbnail.style.top = (imgHeight - 20) + 'px';
    }
};

/**
 * 设置背景的透明度
 *
 * @param {number=} opt_opacity .
 */
ad.widget.imageplus.StickerBox.prototype.setBackgroundOpacity =
    function (opt_opacity) {
        var bg = baidu.g(this.getId('background'));
        if (bg) {
            var opacity = opt_opacity || this.getData('box.box_bg_opacity', 0.75);
            ad.dom.opacity(bg, opacity);
        }
    };





















/* vim: set ts=4 sw=4 sts=4 tw=100 */
