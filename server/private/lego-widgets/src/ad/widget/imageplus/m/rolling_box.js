/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/


/**
 * src/ad/widget/imageplus/m/rolling_box.js ~ 2014/08/15 15:21:56
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 **/

goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.event');
goog.require('ad.fx');
goog.require('ad.widget.imageplus.m.BaseBox');
goog.require('ui.events');

goog.include('ad/widget/imageplus/m/rolling_box.less');
goog.include('ad/widget/imageplus/m/rolling_box.html');

goog.provide('ad.widget.imageplus.m.RollingBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.m.BaseBox}
 */
ad.widget.imageplus.m.RollingBox = function (data) {

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
     * 限定物料的高度
     * @type {number}
     * @private
     */
    this._maxHeight = 0;

    /**
     * 限定物料的高度
     * @type {number}
     * @private
     */
    this._thresholdHeight = 100;

    /**
     * 使用idea_width和idea_height来计算隔离容器的高宽
     * @type {boolean}
     * @private
     */
    this._useIdeaWidthHeight = false;

    ad.widget.imageplus.m.BaseBox.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_m_rolling_box';

    /**
     * 内容区域元素
     * @type {Element}
     */
    this._content = null;
    /**
     * title元素
     * @type {Element}
     */
    this._title = null;
    /**
     * body元素
     * @type {Element}
     */
    this._body = null;

    /**
     * 手指操作过广告（滑动）
     * @type {boolean}
     */
    this._touched = false;
};
baidu.inherits(ad.widget.imageplus.m.RollingBox, ad.widget.imageplus.m.BaseBox);

/** @override */
ad.widget.imageplus.m.RollingBox.prototype.patchData = function () {
    ad.widget.imageplus.m.RollingBox.superClass.patchData.call(this);
    if (!this._data) {
        return;
    }

    this._data['box'] = this._data['box'] || {};
    this._data['box']['box_bg_opacity'] = this.getData('box.box_bg_opacity', 0.75);
    this._positionType = this.getData('box.position_type', 0);
    this._firstShowTime = this.getData('box.first_show_time', 5000);
    var themeClass = this._themeClassMap[this._positionType];
    if (themeClass) {
        this._data['box']['_theme_class'] = 'baiduimageplusm-r-' + themeClass;
    }

    this._useIdeaWidthHeight = this.getData('box.use_idea_width_height', false);
    this._isolatedHostWidth = 0; // 先显示0宽度
    if (!this._useIdeaWidthHeight) {
        this._isolatedHostHeight = this.getData('box.content_height');
    }
    this.notAllLinkIsolated = true;
};

/** @override */
ad.widget.imageplus.m.RollingBox.prototype.enterAd = function (loaderApi) {
    var me = this;
    // 关闭按钮
    var closeBtn = ad.dom.g(me.getId('close'));
    ad.event.on(closeBtn, 'click', function (e) {
        ad.event.preventDefault(e);
        me.closeAd();
    });

    me._content = ad.dom.g(me.getId('content'));
    me._title = ad.dom.g(me.getId('title'));
    me._body = ad.dom.g(me.getId('body'));

    me._bindEvent();
    me.relayout(loaderApi.getImgRect());
    if (me._firstShowTime) {
        // 第一次展现必须在material.show之后，否则日志不能正常发送
        ad.base.setTimeout(function () {
            me.showContent();
            ad.base.setTimeout(me.async(function () {
                if (me._touched) {
                    return;
                }

                if (me.contentShowing || me.contentVisible) {
                    me.hideContent();
                }
            }, me), me._firstShowTime);
        }, 0);
    }
    loaderApi.rendDone(me.getData('box.imageplus_button', false));
};

/**
 * 绑定touch事件
 */
ad.widget.imageplus.m.RollingBox.prototype._bindEvent = function () {
    var me = this;
    // 原始高度
    var originHeight;
    // 是否超过阀值
    var isOverThreshold = false;
    var isAnimating = false;
    var startY;
    var y;
    var removeTransition = function (node) {
        node.style.setProperty('-webkit-transition', 'initial');
        node.style.setProperty('transition', 'initial');
    };
    var restoreTransition = function (node) {
        node.style.removeProperty('-webkit-transition');
        node.style.removeProperty('transition');
    };
    var isPreventedDirection = function (diff) {
        if (me._positionType === 1) {
            return diff * (me.contentVisible ? 1 : -1) < 0;
        }
        else {
            return diff * (me.contentVisible ? -1 : 1) < 0;
        }
    };
    var start = function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.touches && e.touches.length > 1) {
            return;
        }

        me._touched = true;
        ad.event.on(document.body, 'touchmove', move);
        ad.event.on(document.body, 'touchend', end);
        ad.event.on(document.body, 'touchcancel', end);
        startY = y = e.targetTouches[0].clientY;
        isOverThreshold = false;    // reset
        originHeight = me.contentVisible ? me._maxHeight : 0;
        removeTransition(me._title);
        removeTransition(me._content);
    };
    var move = function (e) {
        e.preventDefault();
        y = e.targetTouches[0].clientY;
        if (isAnimating) {
            return;
        }
        isAnimating = true;

        ad.fx.requestAnimationFrame(function () {
            if (!isAnimating) {
                return;
            }
            isAnimating = false;

            var diff = y - startY;
            if (isPreventedDirection(diff)) {
                // 方向不对
                return;
            }

            var changeHeight = Math.abs(diff);
            if (changeHeight > me._maxHeight) {
                // 超过最大高度了
                return;
            }

            isOverThreshold = changeHeight > me._thresholdHeight;
            me._updatePosition(Math.abs(originHeight - changeHeight));
        });
    };
    var end = function (e) {
        e.preventDefault();
        if (e.touches && e.touches.length > 0) {
            return;
        }
        isAnimating = false;
        ad.event.un(document.body, 'touchmove', move);
        ad.event.un(document.body, 'touchend', end);
        ad.event.un(document.body, 'touchcancel', end);
        restoreTransition(me._title);
        restoreTransition(me._content);

        if (y - startY === 0) {
            // preventDefault会阻止click的触发
            // 所以手指没有移动时，要出发toggle
            toggle();
            return;
        }

        if (isOverThreshold) {
            // 超过阀值
            if (me.contentVisible) {
                me.hideContent();
            }
            else {
                me.showContent();
            }
        }
        else {
            // 恢复原样
            me._updatePosition(originHeight);
        }
    };
    /**
     * 切换
     * @param {Object=} opt_e
     */
    var toggle = function (opt_e) {
        if (opt_e) {
            opt_e.preventDefault();
        }

        if (me.contentVisible) {
            me.hideContent();
        }
        else {
            me.showContent();
        }
    };


    ad.event.on(me._title, 'click', toggle);
    ad.event.on(me._title, 'touchstart', start);
};

/** @override */
ad.widget.imageplus.m.RollingBox.prototype.onAdRelease = function (event) {
    ad.widget.imageplus.m.RollingBox.superClass.onAdRelease.call(this, event);

    // 停止touch的操作
    ad.event.un(document.body, 'touchmove');
    ad.event.un(document.body, 'touchend');
    ad.event.un(document.body, 'touchcancel');
};

/** @override */
ad.widget.imageplus.m.RollingBox.prototype.relayout = function (imgRect) {
    var root = this.getRoot();
    var maxWidth = root.offsetWidth;

    if (!this._useIdeaWidthHeight) {
        // 使用广告宽度作为容器宽度
        this.setIsolatedHostWidth(maxWidth);
        this._maxHeight = this._isolatedHostHeight + 30;
    }
    else {
        // 容器宽度不能超过广告宽度
        // 然后等比缩放高度
        var originWidth = this.getData('idea_width');
        var originHeight = this.getData('idea_height');
        var width = Math.min(maxWidth, originWidth);
        var height = (width / originWidth) * originHeight;
        this.setIsolatedHostWidth(width);
        this.setIsolatedHostHeight(height);
        this._maxHeight = Math.min(imgRect['height'] - 32, height + 30);
    }

    if (this._positionType === 1) {
        root.style.top = imgRect['height'] + 'px';
    }

    if (this.contentVisible) {
        this._updatePosition(this._maxHeight);
    }
};

/**
 * 更新位置
 * @param {number} height 物料高度
 */
ad.widget.imageplus.m.RollingBox.prototype._updatePosition = function (height) {
    var top = height;
    this._content.style.height = top + 'px';
    if (this._positionType === 1) {
        this._title.style.bottom = top + 'px';
    }
    else {
        this._title.style.top = top + 'px';
    }
};

/** @override */
ad.widget.imageplus.m.RollingBox.prototype.showContentFx = function (root, done, opt_triggerByWidget) {
    baidu.dom.addClass(root, 'baiduimageplusm-r-hover');
    this._updatePosition(this._maxHeight);
    done(true);
};

/** @override */
ad.widget.imageplus.m.RollingBox.prototype.hideContentFx = function (root, done, opt_triggerByWidget) {
    baidu.dom.removeClass(root, 'baiduimageplusm-r-hover');
    this._updatePosition(0);
    done(true);
};

/** @override */
ad.widget.imageplus.m.RollingBox.prototype.getAdRect = function () {
    var top = 0;
    var left = 0;
    var width = 0;
    var height = 0;

    if (this._title && this._content) {
        var titleRect = ad.dom.getRect(this._title);
        var contentRect = ad.dom.getRect(this._content);

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
