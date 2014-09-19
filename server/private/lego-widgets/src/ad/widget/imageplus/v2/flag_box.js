/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/


/**
 * src/ad/widget/imageplus/v2/flag_box.js ~ 2014/08/11 10:41:16
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 **/

goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.event');
goog.require('ad.widget.imageplus.v2.BaseBox');
goog.require('ui.events');

goog.include('ad/widget/imageplus/v2/flag_box.less');
goog.include('ad/widget/imageplus/v2/flag_box.html');

goog.provide('ad.widget.imageplus.v2.FlagBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseBox}
 */
ad.widget.imageplus.v2.FlagBox = function (data) {
    /**
     * 是否需要更新位置，在初始化和图片高宽变化时
     * @type {boolean}
     * @private
     */
    this._needUpdatePosition = false;

    /**
     * 位置类型
     * @type {number}
     * @private
     */
    this._positionType = 0;

    /**
     * @type {Object}
     * @private
     */
    this._themeClassMap = [
        'left',         // 位置处于上方，默认向左展开
        'right',        // 位置处于上方，向右展开
        'bottom_left'   // 位置处于下方，向左展开
    ];

    /**
     * 鼠标是否在图片上
     * @type {boolean}
     * @private
     */
    this._mouseOnImg = false;

    ad.widget.imageplus.v2.BaseBox.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_flag_box';
};
baidu.inherits(ad.widget.imageplus.v2.FlagBox, ad.widget.imageplus.v2.BaseBox);

/** @override */
ad.widget.imageplus.v2.FlagBox.prototype.patchData = function () {
    ad.widget.imageplus.v2.FlagBox.superClass.patchData.call(this);
    if (!this._data) {
        return;
    }

    this._data['box']['stick_clickable'] = this.getData('box.stick_clickable', false);

    var fixedTitle = this.getData('box.flag.fixed_title');
    var title = fixedTitle || this.getData('title');
    if (title) {
        // 竖省略号（\u22EE）ie6不支持
        title = ad.base.subByte(title, this.getData('box.title_max_num', 14), '');
        this._data['title'] = title.split('').join('<br/>');
    }

    this._positionType = this.getData('box.position_type', 2);
    var themeClass = this._themeClassMap[this._positionType];
    if (themeClass) {
        this._data['box']['_theme_class'] = 'baiduimageplus-f-' + themeClass;
    }

    if (this._positionType === 2) {
        // 如果是处于下方的位置，则需要更新位置了
        this._needUpdatePosition = true;
    }
};

/** @override */
ad.widget.imageplus.v2.FlagBox.prototype.enterAdOnLoad = function (loaderApi, isolatedRoot) {
    var me = this;
    // 设置背景透明度
    var bg = ad.dom.g(me.getId('background'));
    if (bg) {
        var opacity = me.getData('box.box_bg_opacity', 0.75);
        ad.dom.opacity(bg, opacity);
    }

    // 关闭按钮
    var closeBtn = ad.dom.g(me.getId('close'));
    ad.event.on(closeBtn, 'click', function (e) {
        ad.event.preventDefault(e);
        me.closeAd();
    });

    if (baidu.browser.ie && baidu.browser.ie === 6) {
        // IE6 必须要设置父元素的高度，才能使子元素的100%正确Work
        var content = ad.dom.g(me.getId('content'));
        if (content) {
            baidu.dom.setBorderBoxHeight(content, content.offsetHeight);
        }
    }

    if (!COMPILED) {
        ad.base.setTimeout(function () {
            me.relayout({
                'width': 500,
                'height': 300
            });
            me.showContent();
        }, 100);
        return;
    }

    // 设置展现与隐藏
    me.relayout(loaderApi.getImgRect());
    var show = me.async(function () {
        me._mouseOnImg = true;
        me.showContent();
    }, me);
    var hide = me.async(function () {
        me._mouseOnImg = false;
        me.hideContent();
    }, me);
    var firstShowTime = me.getData('box.first_show_time', 5000);
    if (firstShowTime) {
        // 第一次展现必须在material.show之后，否则日志不能正常发送
        ad.base.setTimeout(function () {
            me.showContent();
            ad.base.setTimeout(me.async(function () {
                if (!me._mouseOnImg) {
                    me.hideContent();
                }
            }, me), firstShowTime);
        }, 0);
    }

    loaderApi.addListener(ui.events.MOUSE_MOVE, show);
    loaderApi.addListener(ui.events.MOUSE_OVER, show);
    loaderApi.addListener(ui.events.MOUSE_OUT, hide);
    loaderApi.rendDone(me.getData('box.imageplus_button', true));
};

/** @override */
ad.widget.imageplus.v2.FlagBox.prototype.relayout = function (imgRect) {
    if (!this._needUpdatePosition) {
        return;
    }

    var root = this.getRoot();
    var stick = ad.dom.g(this.getId('stick'));
    if (root && stick) {
        var imgHeight = imgRect['height'];
        var stickHeight = stick.offsetHeight;
        root.style.top = (imgHeight - stickHeight) + 'px';
    }
};

/** @override */
ad.widget.imageplus.v2.FlagBox.prototype.showContentFx = function (root, done, opt_triggerByWidget) {
    var content = ad.dom.g(this.getId('content'));
    if (content) {
        baidu.dom.removeClass(content, 'baiduimageplus-f-ct-hide');
    }
    done(true);
};

/** @override */
ad.widget.imageplus.v2.FlagBox.prototype.hideContentFx = function (root, done, opt_triggerByWidget) {
    var content = ad.dom.g(this.getId('content'));
    if (content) {
        baidu.dom.addClass(content, 'baiduimageplus-f-ct-hide');
    }
    done(true);
};

/** @override */
ad.widget.imageplus.v2.FlagBox.prototype.getAdRect = function () {
    var top = 0;
    var left = 0;
    var width = 0;
    var height = 0;
    var stick = ad.dom.g(this.getId('stick'));
    var content = ad.dom.g(this.getId('content'));

    if (stick && content) {
        var stickRect = ad.dom.getRect(stick);
        var contentRect = ad.dom.getRect(content);

        top = this._positionType === 2
            ? Math.min(stickRect['top'], contentRect['top'])
            : contentRect['top'];
        left = Math.min(stickRect['left'], contentRect['left']);
        height = Math.max(stickRect['height'], contentRect['height']);
        width = stickRect['width'] + contentRect['width'];
    }

    return {
        'width': width,
        'height': height,
        'top': top,
        'left': left
    };
};
























/* vim: set ts=4 sw=4 sts=4 tw=100  */
