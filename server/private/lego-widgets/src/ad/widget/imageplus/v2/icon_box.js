/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * src/ad/widget/imageplus/v2/icon_box.js ~ 2014/06/13 16:46:00
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * box相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ad.event');
goog.require('ad.fx.blink');
goog.require('ad.fx.fadeOut');
goog.require('ad.widget.imageplus.v2.BaseBox');
goog.require('ui.events');

goog.include('ad/widget/imageplus/v2/icon_box.less');
goog.include('ad/widget/imageplus/v2/icon_box.html');

goog.provide('ad.widget.imageplus.v2.IconBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseBox}
 */
ad.widget.imageplus.v2.IconBox = function (data) {
    /**
     * 是否一直展现icon
     * @type {boolean}
     */
    this._alwaysShowIcon = false;

    /**
     * icon是否展现中
     * @type {boolean?}
     */
    this._showedIcon = null;

    /**
     * icon是否在动画展现完成后显示icon
     * @type {boolean}
     */
    this._showedIconAfterFx = false;

    /**
     * 内容区的宽度
     *
     * @type {number}
     */
    this._contentWidth = 0;

    /**
     * 内容区的高度
     *
     * @type {number}
     */
    this._contentHeight = 0;

    ad.widget.imageplus.v2.BaseBox.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_icon_box';

    /**
     * resize事件
     * @type {string}
     */
    this._latestResizeEventId = '';

    /**
     * icon的blink动画对象
     * @type {ad.fx.Timeline|Object}
     */
    this._iconFx = null;

    /**
     * icon的隐藏动画对象
     * @type {ad.fx.Timeline|Object}
     */
    this._iconHideFx = null;

    /**
     * @override
     */
    this.notAllLinkIsolated = true;

    /**
     * icon的位置高宽
     *
     * @type {Object}
     */
    this._iconRect = null;

    /**
     * 鼠标的位置，相对于
     * @type {Object}
     */
    this._mousePos = null;

    /**
     * 图片的高宽位置
     * @type {Object}
     */
    this._imgRect = null;
};
baidu.inherits(ad.widget.imageplus.v2.IconBox, ad.widget.imageplus.v2.BaseBox);

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.patchData = function () {
    ad.widget.imageplus.v2.IconBox.superClass.patchData.call(this);
    if (this._data) {
        this._data['box']['icon_class'] =
            'baiduimageplus-i-icon-' + this.getData('trade_id');
        this._data['box']['icon_width'] = this.getData('box.icon_width', 38);
        this._data['box']['icon_height'] = this.getData('box.icon_height', 38);
        this._data['box']['icon_clickable'] = this.getData('box.icon_clickable', true);
        this._data['position_type'] = parseInt(this.getData('position_type'), 10);
        // 如果icon位置在左上则默认一直展现icon
        this._alwaysShowIcon = this.getData('position_type') === 4;
        this._showedIconAfterFx = this._alwaysShowIcon;
        var extraWidth = this.getData('box.extra_width', null);
        var ideaWidth = parseInt(this.getData('idea_width'), 10);
        if ((extraWidth != null) && ideaWidth) {
            // extraWidth是指除idea_width之外的宽度
            // 默认优先使用extraWidth + ideaWidth
            this._contentWidth = ideaWidth + extraWidth;
        }
        else {
            this._contentWidth = this.getData('box.content_width');
        }
    }
};

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.enterAd = function (loaderApi) {
    var me = this;
    me._bindShowAndHide();
    if (!COMPILED) {
        // 线下测试用
        me.relayout({
            'width': 600,
            'height': 400
        });
        me.showIcon();
        return;
    }

    var mouseInImg = me.async(me.showIcon, me, null);
    loaderApi.addListener(ui.events.MOUSE_MOVE, mouseInImg);
    loaderApi.addListener(ui.events.MOUSE_OVER, mouseInImg);
    loaderApi.addListener(ui.events.MOUSE_OUT, me.async(me.hideIcon, me, null));
    if (me.getData('box.blink_type', 'in_view') === 'in_view') {
        loaderApi.addListener(
            ui.events.IN_VIEW,
            me.async(me.blinkIconFx, me, 1, me.getData('box.blink_time', 2000))
        );
    }

    me._imgRect = loaderApi.getImgRect();
    me.relayout(me._imgRect);

    loaderApi.rendDone(
        (me.getData('position_type') === 4)
            // 当icon位置处于左上角时，隐藏tip
            ? false
            : me.getData('box.imageplus_button', true)
    );
};

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.enterAdOnLoad = function (loaderApi, isolatedRoot) {
    this._contentHeight = this.getIsolatedContainerHeight();
};

/**
 * 绑定内容区域的展现和隐藏事件
 */
ad.widget.imageplus.v2.IconBox.prototype._bindShowAndHide = function () {
    var me = this;
    var root = me.getRoot();
    if (!root) {
        return;
    }

    // 绑定icon的hover事件
    var icon = document.getElementById(me.getId('icon'));
    var content = document.getElementById(me.getId('content'));
    // 鼠标是否在box内部或是可展现广告的区域内
    var mouseInBox = false;
    var timeout;
    // 隐藏内容
    var hideContent = function () {
        if (timeout) {
            ad.base.clearTimeout(timeout);
        }

        timeout = ad.base.setTimeout(function tryHide() {
            timeout = null;
            if (!mouseInBox) {
                if (me._isLeavingAd()) {
                    me.hideContent();
                }
                else {
                    // 250ms后再次尝试
                    timeout = ad.base.setTimeout(tryHide, 250);
                }
            }
        }, 250);
    };
    // 显示内容
    var showContent = function () {
        // 因为内容和icon之间有间隙
        // 所以过250ms之后，如果不在box内再隐藏
        if (timeout) {
            ad.base.clearTimeout(timeout);
        }

        me.showContent();
    };

    ad.event.on(icon, 'mouseover', showContent);
    ad.event.on(icon, 'mouseout', hideContent);
    ad.event.on(content, 'mouseout', hideContent);
    ad.event.on(root, 'mouseover', function () {
        mouseInBox = true;
    });
    ad.event.on(root, 'mouseout', function (event) {
        mouseInBox = false;
    });
    var positionType = me.getData('position_type');
    if (positionType !== 1
        && positionType !== 4
        && me.getData('box.humanity_trigger')) {
        // 使用更为人性化的方法来判断是否需要隐藏
        ad.event.on(document.body, 'mousemove', function (event) {
            if (!me.contentVisible) {
                return;
            }
            me._mousePos = {
                'x': event.clientX,
                'y': event.clientY
            };
        });
    }

    if (!me.getData('box.icon_clickable', true)) {
        ad.event.on(icon, 'click', function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        });
    }
};

/**
 * 根据鼠标位置判断，是否要离开区域
 *
 * @return {boolean}
 */
ad.widget.imageplus.v2.IconBox.prototype._isLeavingAd = function () {
    if (!this._mousePos) {
        return true;
    }

    var x = this._mousePos['x'] + baidu.page.getScrollLeft();
    var y = this._mousePos['y'] + baidu.page.getScrollTop();
    var height = this._iconRect['height'];
    var width = this._contentWidth;
    var tmp = (width - this._iconRect['width']) / 2;
    var top = this._imgRect['top'] + this._iconRect['top'];
    var left = this._imgRect['left'] + this._iconRect['left'] - tmp;
    var bottom = top + height;
    var right = left + width;
    return x < left || x > right || y < top || y > bottom;
};

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.onAdResize = function (event, imgRect) {
    this._latestResizeEventId = event['id'];
    this._imgRect = imgRect;
    ad.widget.imageplus.v2.IconBox.superClass.onAdResize.apply(this, arguments);
};

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.onAdRelease = function (event) {
    ad.widget.imageplus.v2.IconBox.superClass.onAdRelease.apply(this, arguments);

    if (this._iconFx) {
        this._iconFx.cancel();
        this._iconFx = null;
    }

    if (this._iconHideFx) {
        this._iconHideFx.cancel();
        this._iconHideFx = null;
    }
};

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.relayout = function (imgRect) {
    var root = this.getRoot();
    var imgWidth = imgRect['width'];
    var imgHeight = imgRect['height'];

    if (!root) {
        return;
    }
    // 图标的高宽
    var iconWidth = this.getData('box.icon_width');
    var iconHeight = this.getData('box.icon_height');

    // 图标位置（相对于图片）
    var iconPos;
    // 图标位置类型
    var positionType;

    if (COMPILED) {
        // 根据位置类型获取icon位置
        positionType = this.getData('position_type');
        iconPos = this._getIconPosition(iconWidth, iconHeight, imgWidth, imgHeight);
    }
    else {
        // for local mockup
        iconPos = { 'left': 10, 'top': 50 };
        positionType = 0;
    }

    // 设置ICON位置
    baidu.dom.setStyles(root, {
        'left': iconPos['left'] + 'px',
        'top': iconPos['top'] + 'px'
    });

    // 计算内容区域的位置
    var left;
    var top;
    var contentWidth = this._contentWidth;
    var content = document.getElementById(this.getId('content'));

    // 普通样式
    switch (positionType) {
        case 1:
            // 如果是靠左竖排，则内容区为在其左边
            left = -contentWidth - 2;
            top = 0;
            break;
        case 4:
            // 如果是靠右竖排，则内容区为在其右边
            left = iconWidth + 2;
            top = 0;
            break;
        default:
            // 其他请看，内容区为在其正下方（居中）
            top = iconHeight;
            left = (-contentWidth / 2) + (iconWidth / 2);

            if (iconPos['left'] + left < 0) {
                // 如果靠左没有足够空间
                // 则内容区与图片左边界对齐
                left = -iconPos['left'];
            }
            break;
    }

    // 设置内容区域的位置
    baidu.setStyles(content, {
        'top': top + 'px',
        'left': left + 'px',
        'width': contentWidth + 'px'
    });

    this.blinkIconFx();
};

/**
 * 计算图标的位置.
 *
 * @param {number} iconWidth 图标宽度.
 * @param {number} iconHeight 图标高度.
 * @param {number} imgWidth 图片宽度.
 * @param {number} imgHeight 图片高度.
 * @return {Object}
 */
ad.widget.imageplus.v2.IconBox.prototype._getIconPosition =
    function (iconWidth, iconHeight, imgWidth, imgHeight) {
        var positionType = this.getData('position_type');
        var pos = {
            'left': 0,
            'top': 0
        };

        switch (positionType) {
            case 0:
                // 按照配置的位置摆放icon
                var configLeft = this.getData('icon_top_left_x');
                var configTop = this.getData('icon_top_left_y');

                pos['left'] = parseInt(configLeft, 10) || 0;
                if (typeof configLeft === 'string'
                    && configLeft.charAt(configLeft.length - 1) === '%') {
                    pos['left'] = pos['left'] * imgWidth / 100;
                }

                pos['top'] = parseInt(configTop, 10) || 0;
                if (typeof configTop === 'string'
                   && configTop.charAt(configTop.length - 1) === '%') {
                    pos['top'] = pos['top'] * imgHeight / 100;
                }
                break;
            case 1:
                // 在右侧依次摆放
                pos['left'] = imgWidth - iconWidth;
                pos['top'] = this._calcVPos(iconHeight);
                break;
            case 2:
                // x轴位置为宽度的1/3
                // y轴位置为高度的1/2
                pos['left'] = imgWidth / 3;
                pos['top'] = imgHeight / 2;
                break;
            case 3:
                // x轴位置为宽度的2/3
                // y轴位置为高度的1/2
                pos['left'] = imgWidth * 2 / 3;
                pos['top'] = imgHeight / 2;
                break;
            case 4:
                // 在左侧依次摆放
                pos['top'] = this._calcVPos(iconHeight, true);
                break;
            default:
                break;
        }

        pos['width'] = iconWidth;
        pos['height'] = iconHeight;
        this._iconRect = pos;
        return pos;
    };

/**
 * 计算垂直摆放时的icon位置，可选靠左或靠右
 *
 * @param {number} iconHeight icon高度.
 * @param {boolean=} alignLeft 是否靠右.
 * @return {number} yPos;
 */
ad.widget.imageplus.v2.IconBox.prototype._calcVPos = function (iconHeight, alignLeft) {
    var loaderApi = this.getLoaderApi();
    var eventId = this._latestResizeEventId;
    var key = alignLeft ? 'alignLeft' : '';
    // 根据共享数据，计算y轴上的起始位置，默认为5px
    // 共享位置的key
    var yPosShareKey = '[icon_box]type1YPos' + key;
    // 记录事件id的key，同一次事件内触发的重排才会用相同的共享位置
    // 否则需要重置共享位置
    var eventIdKey = '[icon_box]currentWH' + key;
    var sharePos;
    if (loaderApi.getShareData(eventIdKey) !== eventId) {
        // 事件不同，故需要重设起始位置
        loaderApi.setShareData(eventIdKey, eventId);
        // icon初始位置在图片右上角（距离顶部5像素）由上到下定位
        loaderApi.setShareData(yPosShareKey, 5);
        sharePos = 5;
    }
    else {
        // 事件相同，则直接获取已记录的起始位置
        sharePos = /** @type {number} */ (loaderApi.getShareData(yPosShareKey));
    }

    // 更新起始位置为当前icon之下
    loaderApi.setShareData(yPosShareKey, sharePos + iconHeight);

    return sharePos;
};

/**
 * icon的blink效果
 *
 * @param {Element} icon 展现动画的dom元素
 * @param {Function=} opt_callback 动画执行结束的回调函数
 * @param {Object=} opt_config 动画配置
 * @param {number=} opt_config.blinkTime 闪烁次数
 * @param {number=} opt_config.duration 动画持续时间
 * @return {ad.fx.Timeline|Object} blink timeline.
 */
ad.widget.imageplus.v2.IconBox.prototype._blinkFx = function (icon, opt_callback, opt_config) {
    var me = this;
    var config = baidu.extend({
        blinkTime: 2,
        duration: 3000
    }, opt_config);

    if (!(baidu.browser.ie <= 6)) { // jshint ignore:line
        var fx = ad.fx.blink(icon, config);

        if (opt_callback) {
            fx.addEventListener('onafterfinish', me.async(opt_callback, me));
        }
        return fx;
    }
    else {
        // ie6 虽然不闪烁，但是也需要模拟2000ms的时间
        // 并且显示icon
        var timer;
        baidu.show(icon);
        timer = ad.base.setTimeout(function () {
            if (opt_callback) {
                me.async(opt_callback, me)();
            }
            timer = null;
        }, config.duration);

        return {
            cancel: function () {
                if (timer) {
                    ad.base.clearTimeout(timer);
                    timer = null;
                }
            }
        };
    }
};

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.showContentFx = function (root, done, opt_triggerByWidget) {
    this.cancelBlinkIconFx();
    baidu.addClass(root, 'baiduimageplus-i-show_bd');
    done(true);
};

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.hideContentFx = function (root, done, opt_triggerByWidget) {
    baidu.removeClass(root, 'baiduimageplus-i-show_bd');
    done(true);
};

/**
 * 显示icon
 * @param {Element=} opt_icon
 */
ad.widget.imageplus.v2.IconBox.prototype.showIcon = function (opt_icon) {
    if (this._showedIcon && this._showedIcon != null) {
        return;
    }

    this._showedIconAfterFx = true;
    if (this._iconFx) {
        // 如果正在blink动画过程中，则先不隐藏
        return;
    }

    if (this._iconHideFx) {
        // 如果正在隐藏动画过程中，则先不隐藏
        this._iconHideFx.cancel();
        this._iconHideFx = null;
        return;
    }

    this.trigger(ui.events.SEND_LOG, 7);
    var icon = opt_icon || document.getElementById(this.getId('icon'));
    if (icon) {
        this._showedIcon = true;
        baidu.show(icon);
    }
};

/**
 * 隐藏icon
 * @param {Element=} opt_icon
 */
ad.widget.imageplus.v2.IconBox.prototype.hideIcon = function (opt_icon) {
    if (this._alwaysShowIcon || (!this._showedIcon && this._showedIcon != null)) {
        // 如果一直展现icon或已经隐藏
        return;
    }

    this._showedIconAfterFx = false;
    if (this._iconFx || this._iconHideFx) {
        // 如果正在动画过程中，则先不隐藏
        return;
    }

    var icon = opt_icon || document.getElementById(this.getId('icon'));
    if (!icon) {
        return;
    }

    this._showedIcon = false;
    baidu.hide(icon);
};

/**
 * 取消动画
 */
ad.widget.imageplus.v2.IconBox.prototype.cancelBlinkIconFx = function () {
    var me = this;
    if (!me._iconFx) {
        return;
    }

    me._iconFx.cancel();
    // cancel第二次执行时会报错
    me._iconFx = null;

    if (me._showedIconAfterFx) {
        me.showIcon();
    }
    else {
        me._hideIconFx(document.getElementById(me.getId('icon')));
    }
};

/**
 * 开始展示blink动画
 *
 * @param {number=} opt_blinkTime 闪烁次数
 * @param {number=} opt_duration 动画时长
 */
ad.widget.imageplus.v2.IconBox.prototype.blinkIconFx = function (opt_blinkTime, opt_duration) {
    var me = this;
    var blinkTime = opt_blinkTime || 2;
    var duration = opt_duration || 3000;
    if (me._iconFx) {
        return;
    }

    var icon = document.getElementById(me.getId('icon'));
    me._iconFx = me._blinkFx(
        icon,
        function () {
            me._iconFx = null;
            if (me._showedIconAfterFx) {
                me.showIcon(icon);
            }
            else {
                me._hideIconFx(icon);
            }
        },
        {
            blinkTime: blinkTime,
            duration: duration
        }
    );
};

/**
 * 隐藏icon的动画
 *
 * @param {Element} icon
 */
ad.widget.imageplus.v2.IconBox.prototype._hideIconFx = function (icon) {
    var me = this;
    if (ad.dom.getStyle(icon, 'display') === 'none') {
        // 如果已经是隐藏状态了，则不在展现fadeOut动画
        me.hideIcon(icon);
        return;
    }

    me._iconHideFx = ad.fx.fadeOut(icon);
    me._iconHideFx.addEventListener('onafterfinish', me.async(function () {
        me._iconHideFx = null;

        if (me._showedIconAfterFx) {
            me.showIcon(icon);
        }
        else {
            me.hideIcon(icon);
        }
    }, me));
};

/** @override */
ad.widget.imageplus.v2.IconBox.prototype.getAdRect = function () {
    var positionType = this.getData('position_type');
    var iconRect = this._iconRect;
    var contentHeight = this._contentHeight;
    var contentWidth = this._contentWidth;
    var top;
    var left;
    var width;
    var height;

    switch (positionType) {
        case 1:
            top = iconRect['top'];
            left = iconRect['left'] - contentWidth - 2;
            width = contentWidth + iconRect['width'] + 2;
            height = contentHeight;
            break;
        case 4:
            top = iconRect['top'];
            left = iconRect['left'];
            width = contentWidth + iconRect['width'] + 2;
            height = contentHeight;
            break;
        default:
            top = iconRect['top'];
            left = iconRect['left'] - (contentWidth / 2 - iconRect['width'] / 2);
            width = contentWidth;
            height = contentHeight + iconRect['height'];

            if (left < 0) {
                // 如果靠左没有足够空间
                // 则内容区与图片左边界对齐
                left = 0;
            }
            break;
    }

    if (this._imgRect) {
        top += this._imgRect['top'];
        left += this._imgRect['left'];
    }

    return {
        'top': top,
        'left': left,
        'width': width,
        'height': height
    };
};






















