/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/

/*global setInterval:false, setTimeout:false, clearTimeout:false, clearInterval:false */

/**
 * src/ad/widget/imageplus/flag_box.js ~ 2013/08/27 10:41:16
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * flag_box相关的实现逻辑
 **/

goog.require('ad.widget.WidgetContainer');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.render.ImageplusRender');
goog.require('ad.widget.imageplus.util');
goog.require('ui.events');

goog.include('ad/widget/imageplus/flag_box.less');
goog.include('ad/widget/imageplus/flag_box.html');

goog.provide('ad.widget.imageplus.FlagBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.WidgetContainer}
 */
ad.widget.imageplus.FlagBox = function (data) {
    /**
     * 是否需要更新位置，在初始化和图片高宽变化时
     * @type {boolean}
     * @private
     */
    this._needUpdatePosition = false;

    /**
     * @type {Object}
     * @private
     */
    this._themeClassMap = [
        'left',         // 位置处于上方，默认向左展开
        'right',        // 位置处于上方，向右展开
        'bottom_left'   // 位置处于下方，向左展开
    ];

    ad.widget.WidgetContainer.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_flag_box';

    /**
     * @type {ad.render.ImageplusRender}
     * @private
     */
    this._render = new ad.render.ImageplusRender();

    /**
     * 强制不展现
     * @type {boolean}
     */
    this._forceHiding = false;

    /**
     * @type {boolean}
     * @private
     */
    this._isShowing = false;

    // 初始化widgets，避免报错
    this._widgets = [];

    /**
     * 鼠标hover的时间
     * @type {number}
     * @private
     */
    this._mouseOverTime = 0;

    /**
     * hover的次数
     * @type {number}
     * @private
     */
    this._hoverTimes = 0;

    /**
     * 是否可以点击icon打开链接
     * @type {boolean}
     */
    this._canClick = true;
};
baidu.inherits(ad.widget.imageplus.FlagBox, ad.widget.WidgetContainer);

/** @override */
ad.widget.imageplus.FlagBox.prototype.patchData = function () {
    if (this._data) {
        var fixedTitle = this.getData('box.flag.fixed_title');
        var title = fixedTitle || this.getData('title');
        if (title) {
            // 竖省略号（\u22EE）ie6不支持
            title = ad.base.subByte(title, this.getData('box.title_max_num', 14), '');
            this._data['title'] = title.split('').join('<br/>');
        }
        this._data['box']['stick_clickable'] = this.getData('box.stick_clickable', true);

        var positionType = this.getData('box.position_type', 0);
        var themeClass = this._themeClassMap[positionType];
        if (themeClass) {
            this._data['box']['_theme_class'] = 'ad-widget-imageplus-flag_box-' + themeClass;
        }

        if (positionType === 2) {
            // 如果是处于下方的位置，则需要更新位置了
            this._needUpdatePosition = true;
        }

        ad.widget.imageplus.util.updateRealUrl(this._data);
    }
};

/** @override */
ad.widget.imageplus.FlagBox.prototype.enterDocument = function () {
    ad.widget.imageplus.FlagBox.superClass.enterDocument.call(this);

    var me = this;
    me.setBackgroundOpacity();
    /**
     * 设置content的高度，使IE6下背景可以正常展现
     */
    function setupHeight4IE6() {
        if (baidu.browser.ie && baidu.browser.ie === 6) {
            var content = baidu.g(me.getId('content'));
            if (content) {
                baidu.dom.setBorderBoxHeight(content, content.offsetHeight);
            }
            /*
            me.addListener(ui.events.RESIZE, function (newHeight) {
                var content = baidu.g(me.getId('content'));
                if (content) {
                    content.style.height = newHeight + 'px';
                }
            });
            */
        }
    }

    function show() {
        me.show();
    }

    function hide() {
        me.hide();
    }

    // 设置监控日志
    ad.widget.imageplus.util.setupLog(me, function () {
        return '|' + ((new Date() - me._mouseOverTime) / 1000) + '|' + me._hoverTimes;
    });

    // 绑定关闭按钮的事件
    var closeBtn = baidu.g(me.getId('close'));
    if (closeBtn) {
        baidu.on(closeBtn, 'click', function (e) {
            baidu.event.preventDefault(e);
            me.hideAll();
        });
    }

    if (!COMPILED) {
        var root = me.getRoot();
        if (root) {
            baidu.on(root, 'mouseover', show);
            baidu.on(root, 'mouseleave', hide);
        }
        ad.base.setTimeout(function () {
            me.updatePosition(600);
            setupHeight4IE6();
        }, 0);
        return;
    }

    me.updatePosition();
    setupHeight4IE6();

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = me.getData('api');
    // 第一次展现时的展现时间，默认不展现
    var firstShowTime = me.getData('box.first_show_time', 0);
    // 隐藏广告的定时器
    var showTimeout;
    /**
     * 先展现广告，然后过段时间隐藏
     */
    function showThenHide() {
        if (me._forceHiding || showTimeout) {
            // 已展现或者强制隐藏广告
            return;
        }

        show();
        showTimeout = ad.base.setTimeout(function () {
            hide();
            showTimeout = null;
        }, firstShowTime);
    }

    loaderApi.addListener(ui.events.RESIZE, function (rect) {
        me.updatePosition(rect['height']);
    });

    // 右上角tip按钮点击时，发送acionId为6的日志
    loaderApi.addListener(ui.events.TIP_CLICK, function () {
        me.trigger(ui.events.SEND_LOG, 6);
    });

    // 鼠标hover到图片上时，显示广告
    loaderApi.addListener(ui.events.MOUSE_OVER, show);
    loaderApi.addListener(ui.events.MOUSE_OUT, hide);
    if (firstShowTime) {
        showThenHide();
    }

    loaderApi.rendDone(me.getData('box.imageplus_button', true));
};

/** @override */
ad.widget.imageplus.FlagBox.prototype.show = function () {
    var me = this;
    if (me._forceHiding) {
        return;
    }

    if (me._isShowing) {
        return;
    }

    var content = baidu.g(me.getId('content'));
    if (content) {
        baidu.dom.removeClass(content, 'ad-widget-imageplus-flag_box-ct-hide');
        me._mouseOverTime = new Date().getTime();
        me._isShowing = true;
        me.trigger(ui.events.MOUSE_OVER);
        me.trigger(ui.events.SEND_LOG, 1);
    }
};

/**
 * 隐藏整个物料，并不再展现
 */
ad.widget.imageplus.FlagBox.prototype.hideAll = function () {
    var me = this;
    var root = baidu.g(me.getRoot());
    if (root) {
        baidu.dom.hide(root);
        me._isShowing = false;
        me._forceHiding = true;
        me.trigger(ui.events.CLOSE);
        me.trigger(ui.events.SEND_LOG, 5);
        if (me._mouseOverTime) {
            me._hoverTimes++;
            me.trigger(
                ui.events.SEND_LOG,
                3,
                (new Date() - me._mouseOverTime) / 1000
            );
        }
    }
};

/** @override */
ad.widget.imageplus.FlagBox.prototype.hide = function () {
    var me = this;
    if (!me._isShowing) {
        return;
    }

    var content = baidu.g(me.getId('content'));
    if (content) {
        baidu.dom.addClass(content, 'ad-widget-imageplus-flag_box-ct-hide');
        me._isShowing = false;
        me.trigger(ui.events.MOUSE_OUT);
        if (me._mouseOverTime) {
            me._hoverTimes++;
            me.trigger(
                ui.events.SEND_LOG,
                3,
                (new Date() - me._mouseOverTime) / 1000
            );
        }
    }
};

/**
 * 设置背景的透明度
 *
 * @param {number=} opt_opacity .
 */
ad.widget.imageplus.FlagBox.prototype.setBackgroundOpacity =
    function (opt_opacity) {
        var bg = baidu.g(this.getId('background'));
        if (bg) {
            var opacity = opt_opacity || this.getData('box.box_bg_opacity', 0.75);
            ad.dom.opacity(bg, opacity);
        }
    };

/**
 * 设置背景的透明度
 *
 * @param {number=} opt_imgHeight .
 */
ad.widget.imageplus.FlagBox.prototype.updatePosition =
    function (opt_imgHeight) {
        if (!this._needUpdatePosition) {
            return;
        }

        var root = this.getRoot();
        var stick = baidu.g(this.getId('stick'));
        if (root && stick) {
            var imgHeight;
            var stickHeight = stick.offsetHeight;
            if (!opt_imgHeight) {
                /**
                 * @type {ad.plugin.imageplus.ILoaderApi}
                 */
                var loaderApi = this.getData('api');
                if (loaderApi) {
                    imgHeight = loaderApi.getImgRect()['height'];
                }
            }
            else {
                imgHeight = opt_imgHeight;
            }

            if (imgHeight) {
                baidu.setStyle(root, 'top', (imgHeight - stickHeight) + 'px');
            }
        }
    };





















/* vim: set ts=4 sw=4 sts=4 tw=100  */
