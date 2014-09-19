/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/


/**
 * src/ad/widget/imageplus/v2/rolling_box.js ~ 2014/08/15 15:21:56
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 **/

goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.event');
goog.require('ad.widget.imageplus.v2.BaseBox');
goog.require('ui.events');

goog.include('ad/widget/imageplus/v2/rolling_box.less');
goog.include('ad/widget/imageplus/v2/rolling_box.html');

goog.provide('ad.widget.imageplus.v2.RollingBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseBox}
 */
ad.widget.imageplus.v2.RollingBox = function (data) {

    /**
     * 位置类型
     * @type {number}
     * @private
     */
    this._positionType = 0;

    /**
     * 第一次展现时保持最大高度的时间
     * @type {number}
     */
    this._firstShowTime = 0;

    /**
     * @type {Object}
     * @private
     */
    this._themeClassMap = [
        'top',          // 位置处于上方，默认向左展开
        'bottom'        // 位置处于下方，向右展开
    ];

    /**
     * @type {Object}
     * @private
     */
    this._imgRect = null;

    ad.widget.imageplus.v2.BaseBox.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_rolling_box';
};
baidu.inherits(ad.widget.imageplus.v2.RollingBox, ad.widget.imageplus.v2.BaseBox);

/** @override */
ad.widget.imageplus.v2.RollingBox.prototype.patchData = function () {
    ad.widget.imageplus.v2.RollingBox.superClass.patchData.call(this);
    if (!this._data) {
        return;
    }

    this._data['box'] = this._data['box'] || {};
    this._positionType = this.getData('box.position_type', 0);
    this._firstShowTime = this.getData('box.first_show_time', 5000);
    var themeClass = this._themeClassMap[this._positionType];
    if (themeClass) {
        this._data['box']['_theme_class'] = 'baiduimageplus-r-' + themeClass;
    }
};

/** @override */
ad.widget.imageplus.v2.RollingBox.prototype.enterAdOnLoad = function (loaderApi, isolatedRoot) {
    var me = this;
    // 设置背景透明度
    var bg = ad.dom.g(me.getId('background'));
    var opacity = me.getData('box.box_bg_opacity', 0.75);
    ad.dom.opacity(bg, opacity);

    // 关闭按钮
    var closeBtn = ad.dom.g(me.getId('close'));
    ad.event.on(closeBtn, 'click', function (e) {
        ad.event.preventDefault(e);
        me.closeAd();
    });

    // 绑定展现和隐藏事件
    var root = me.getRoot();
    var content = ad.dom.g(this.getId('content'));
    var mouseOnAd = false;
    // 显示广告
    var show = function () {
        mouseOnAd = true;
        me.showContent();
    };
    /**
     * 隐藏广告
     * @param {number=} opt_delay
     */
    var hideAfter = function (opt_delay) {
        mouseOnAd = false;
        ad.base.setTimeout(me.async(function () {
            if (mouseOnAd) {
                return;
            }
            me.hideContent();
        }, me), opt_delay || 2000);
    };
    ad.event.on(root, 'mouseover', show);
    ad.event.on(root, 'mouseout', function (e) {
        if (e.srcElement && e.toElement && loaderApi
            && ((content === e.srcElement) || ad.dom.contains(content, e.srcElement))
            && (e.toElement === loaderApi.getImg())) {
            // IE8浏览器（IE7、6不会有这问题），在鼠标进入iframe透明部分的时候
            // 会触发mouseout事件，这会导致事件触发的bug
            return;
        }

        hideAfter();
    });

    if (!COMPILED) {
        ad.base.setTimeout(function () {
            me.relayout({
                'width': 500,
                'height': 300
            });
        }, 100);
        return;
    }

    me.relayout(loaderApi.getImgRect());
    // 有的时候，root的mouseout不能正常触发。这个作为最后手段
    loaderApi.addListener(ui.events.MOUSE_OUT, baidu.fn.bind(hideAfter, null, 0));
    if (me._firstShowTime) {
        // 第一次展现必须在material.show之后，否则日志不能正常发送
        ad.base.setTimeout(function () {
            me.showContent();
            hideAfter(me._firstShowTime);
        }, 0);
    }
    loaderApi.rendDone(me.getData('box.imageplus_button', false));
};

/** @override */
ad.widget.imageplus.v2.RollingBox.prototype.relayout = function (imgRect) {
    this._imgRect = imgRect;
    if (this._positionType === 1) {
        var root = this.getRoot();
        if (root) {
            root.style.top = imgRect['height'] + 'px';
        }
    }

    if (this.contentVisible) {
        this._updatePosition(imgRect['height']);
    }
};

/**
 * 更新位置
 * @param {number} height 图片高度
 */
ad.widget.imageplus.v2.RollingBox.prototype._updatePosition = function (height) {
    var content = ad.dom.g(this.getId('content'));
    var title = ad.dom.g(this.getId('title'));
    var body = ad.dom.g(this.getId('body'));
    var top = height === 0 ? 0 : height - 32;
    var isolatedContainerHeight = this.getIsolatedContainerHeight();
    content.style.height = top + 'px';
    if (this._positionType === 1) {
        title.style.bottom = top + 'px';
    }
    else {
        title.style.top = top + 'px';
    }
    body.style.top = ((top - isolatedContainerHeight) / 2) + 'px';
};

/** @override */
ad.widget.imageplus.v2.RollingBox.prototype.showContentFx = function (root, done, opt_triggerByWidget) {
    baidu.dom.addClass(root, 'baiduimageplus-r-hover');
    this._updatePosition(this._imgRect['height']);
    done(true);
};

/** @override */
ad.widget.imageplus.v2.RollingBox.prototype.hideContentFx = function (root, done, opt_triggerByWidget) {
    baidu.dom.removeClass(root, 'baiduimageplus-r-hover');
    this._updatePosition(0);
    done(true);
};

/** @override */
ad.widget.imageplus.v2.RollingBox.prototype.getAdRect = function () {
    var top = 0;
    var left = 0;
    var width = 0;
    var height = 0;
    var content = ad.dom.g(this.getId('content'));
    var title = ad.dom.g(this.getId('title'));

    if (title && content) {
        var titleRect = ad.dom.getRect(title);
        var contentRect = ad.dom.getRect(content);

        top = Math.min(titleRect['top'], contentRect['top']);
        left = titleRect['left'];
        height = titleRect['height'] + contentRect['height'];
        width = titleRect['width'];
    }

    return {
        'width': width,
        'height': height,
        'top': top,
        'left': left
    };
};
























/* vim: set ts=4 sw=4 sts=4 tw=100  */
