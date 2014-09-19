/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/

/*global setInterval:false, setTimeout:false, clearTimeout:false, clearInterval:false */

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
goog.require('ad.fx.blink');
goog.require('ad.fx.fadeOut');
goog.require('ui.events');
goog.require('ad.widget.imageplus.util');

goog.include('ad/widget/imageplus/box.less');
goog.include('ad/widget/imageplus/box.html');

goog.provide('ad.widget.imageplus.Box');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.WidgetContainer}
 */
ad.widget.imageplus.Box = function (data) {
    /**
     * 行业icon的class map
     * @param {Object} map.
     * @private
     */
    this._tradeMap = {
        // 0: 'default',   // trade_id为0或不存在表示默认样式
        1: 'medical',      // 医疗
        2: 'tourism',      // 旅游
        3: 'machine',      // 机械设备
        4: 'photo',        // 婚纱摄影
        5: 'decoration',   // 家装
        6: 'game'          // 游戏
    };

    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_box';

    /**
     * @type {ad.render.ImageplusRender}
     * @private
     */
    this._render = new ad.render.ImageplusRender();

    /**
     * 是否可以点击打开链接
     * @type {boolean}
     */
    this._canClick = false;

    // 初始化widgets，避免报错
    this._widgets = [];
};
baidu.inherits(ad.widget.imageplus.Box, ad.widget.WidgetContainer);

/** @override */
ad.widget.imageplus.Box.prototype.patchData = function () {
    if (this._data) {
        ad.widget.imageplus.util.updateRealUrl(this._data);
        ad.widget.imageplus.util.updateIconConfig(this._data);
        this._data['box']['icon_class'] =
            'ad-widget-imageplus-box-icon-' + this.getData('trade_id');
        this._data['box']['icon_width'] = this.getData('box.icon_width', 38);
        this._data['box']['icon_height'] = this.getData('box.icon_height', 38);
        this._data['box']['icon_clickable'] = this.getData('box.icon_clickable', true);
    }
};

/** @override */
ad.widget.imageplus.Box.prototype.enterDocument = function () {
    ad.widget.imageplus.Box.superClass.enterDocument.call(this);

    var me = this;
    if (!COMPILED) {
        // 线下测试用
        me.updateBoxPosition(null, '', me._data, 600, 400);
        return;
    }

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = me.getData('api');
    var positionType = me.getData('position_type');
    // blink动画
    var blinkFx;
    // 如果icon位置在左上则默认一直展现icon
    var alwaysShowIcon = positionType == 4;
    var showedIcon = alwaysShowIcon;

    var afterHideIcon = function () {
        showedIcon = false;
    };
    /**
     * 取消动画
     */
    var cancelBlinkFx = function () {
        if (blinkFx) {
            blinkFx.cancel();
            // cancel第二次执行时会报错
            blinkFx = null;

            if (!showedIcon) {
                me.hideIcon(afterHideIcon);
            }
            else {
                me.showIcon();
            }
        }
    };
    /**
     * 开始展示动画
     *
     * @param {number=} opt_blinkTime 闪烁次数
     * @param {number=} opt_duration 动画展示时间
     */
    var showBlinkFx = function (opt_blinkTime, opt_duration) {
        if (!blinkFx) {
            var config = {};
            if (opt_blinkTime) {
                config.blinkTime = opt_blinkTime;
            }
            if (opt_duration) {
                config.duration = opt_duration;
            }

            blinkFx = me.blink(
                function () {
                    blinkFx = null;
                    if (!showedIcon) {
                        me.hideIcon(afterHideIcon);
                    }
                    else {
                        me.showIcon();
                    }
                },
                config
            );
        }
    };

    me.addListener(ui.events.MOUSE_OVER, function () {
        cancelBlinkFx();
        var qid = loaderApi.getShareData('qid', true);
        if (qid) {
            baidu.cookie.set(
                'baiduImageplusQid',
                /** @type {string}*/(qid),
                {
                    'path': '/'
                }
            );
        }
    });
    /**
     * 绑定icon的显示隐藏事件
     */
    var bindIconEvent = function () {
        var mouseInImg = function (event) {
            if (!showedIcon) {
                showedIcon = true;
                me.trigger(ui.events.SEND_LOG, 7);
                if (!blinkFx) {
                    me.showIcon();
                }
            }
        };
        loaderApi.addListener(ui.events.MOUSE_MOVE, mouseInImg);
        loaderApi.addListener(ui.events.MOUSE_OVER, mouseInImg);
        loaderApi.addListener(ui.events.MOUSE_OUT, function (event) {
            if (alwaysShowIcon) {
                return;
            }

            showedIcon = false;
            if (!blinkFx) {
                me.hideIcon();
            }
        });
        loaderApi.addListener(ui.events.RELEASE, cancelBlinkFx);
    };

    /**
     * 更新位置
     *
     * @param {string} eventId .
     * @param {Object=} opt_rect .
     */
    var updatePosition = function (eventId, opt_rect) {
        var rect = opt_rect || loaderApi.getImgRect();
        me.updateBoxPosition(
            loaderApi,
            eventId,
            me._data,
            rect['width'],
            rect['height']
        );
        showBlinkFx();
    };
    loaderApi.addListener(ui.events.RESIZE, function (event, rect) {
        // 图片的resize或是重新定位
        updatePosition(event['id'], rect);
    });

    var blinkType = me.getData('box.blink_type', 'in_view');
    if (blinkType === 'in_view') {
        loaderApi.addListener(ui.events.IN_VIEW, function (event) {
            showBlinkFx(1, me.getData('box.blink_time', 2000));
        });
    }
    else if (blinkType === 'mousemove') {
        var mousemoveTimer;
        baidu.on(document.documentElement, 'mousemove', function () {
            if (mousemoveTimer) {
                ad.base.clearTimeout(mousemoveTimer);
            }

            mousemoveTimer = ad.base.setTimeout(function () {
                showBlinkFx(1, me.getData('box.blink_time', 2000));
            }, 250);
        });
        loaderApi.addListener(ui.events.RELEASE, function () {
            baidu.un(document.documentElement, 'mousemove');
        });
    }

    // 更新位置
    updatePosition('INITED');
    bindIconEvent();

    // 右上角tip按钮点击时，发送acionId为6的日志
    loaderApi.addListener(ui.events.TIP_CLICK, function () {
        me.trigger(ui.events.SEND_LOG, 6);
    });

    loaderApi.rendDone(
        (positionType == 4)
            // 当icon位置处于左上角时，隐藏tip
            ? false
            : me.getData('box.imageplus_button', true)
    );
};

/** @override */
ad.widget.imageplus.Box.prototype.bindEvent = function () {
    var me = this;
    ad.widget.imageplus.Box.superClass.bindEvent.call(me);

    var root = this.getRoot();
    if (root) {
        me._setupLog(root);

        // 绑定icon的hover事件
        var icon = baidu.g(me.getId('icon'));
        var content = baidu.g(me.getId('content'));

        // 鼠标是否在box内部
        var mouseInBox = false;
        var isVisible = true;
        var timeout;
        // 隐藏内容
        var hideContent = function () {
            if (isVisible) {
                return;
            }
            if (timeout) {
                ad.base.clearTimeout(timeout);
            }

            timeout = ad.base.setTimeout(function () {
                timeout = null;
                if (!mouseInBox) {
                    baidu.setStyle(content, 'display', 'none');
                    baidu.setStyle(root, 'z-index', 12);
                    isVisible = true;
                    me.trigger(ui.events.MOUSE_OUT);
                }
            }, 250);
        };
        // 显示内容
        var showContent = function () {
            // 因为内容和icon之间有间隙
            // 所以过250ms之后，如果不在box内再隐藏
            if (!isVisible) {
                return;
            }
            if (timeout) {
                ad.base.clearTimeout(timeout);
            }

            baidu.setStyle(content, 'display', 'block');
            baidu.setStyle(root, 'z-index', 13);
            isVisible = false;
            me.trigger(ui.events.MOUSE_OVER);
        };

        baidu.on(icon, 'mouseover', showContent);
        baidu.on(icon, 'mouseout', hideContent);
        baidu.on(content, 'mouseout', hideContent);
        baidu.on(root, 'mouseover', function () {
            mouseInBox = true;
        });
        baidu.on(root, 'mouseout', function (event) {
            mouseInBox = false;
        });

    }
};

/**
 * 设置日志发送相关的事件
 * 如果数据有target_url，则使用发送log；如果没有则使用encry_url为链接地址。
 * 对于这两种情况都需要在后面附加点击事件的相关信息，使用的是attach字段。
 * 格式如下：
 *      &attach=type|stayTime|hoverTimes
 *          type为链接位置，icon的点击为1，其他点击为0
 *          stayTime为在点击动作前在广告上停留的时间
 *          hoverTimes为鼠标hover的次数（不包含点击的那次）
 *              如果是直接点击则它为0
 * 设置icon为mouseover 0.2s之后才可以点击，时间可以通过delay_time来配置
 *
 * @param {Element} root box容器的根元素
 */
ad.widget.imageplus.Box.prototype._setupLog = function (root) {
    var me = this;

    var iconClickable = me.getData('box.icon_clickable');
    var mouseOverTime;
    var hoverTimes = 0;
    var clickableTimeout;
    me.addListener(ui.events.MOUSE_OVER, function () {
        mouseOverTime = new Date();
        // 0.2s后可点击
        clickableTimeout = ad.base.setTimeout(function () {
            me._canClick = true;
        }, me.getData('box.delay_click', 0.2) * 1000);
    });
    me.addListener(ui.events.MOUSE_OUT, function () {
        if (me._canClick) {
            // 鼠标离开时取消可点击
            me._canClick = false;
        }
        ad.base.clearTimeout(clickableTimeout);

        hoverTimes++;
    });

    // icon延迟点击
    baidu.on(
        baidu.g(me.getId('icon')),
        'click',
        function (e) {
            if (!iconClickable || !me._canClick) {
                baidu.event.preventDefault(e);
            }
        }
    );

    ad.widget.imageplus.util.setupLog(me, function () {
        return '|' + ((new Date() - mouseOverTime) / 1000) + '|' + hoverTimes;
    });
};

/**
 * 更新图标和内容区的位置
 *
 * @param {ad.plugin.imageplus.ILoaderApi} loaderApi .
 * @param {string} eventId 激活此次位置更新的eventId.
 * @param {Object} adConfig 广告的配置ad_config.
 * @param {number} imgWidth 图片宽度.
 * @param {number} imgHeight 图片高度.
 */
ad.widget.imageplus.Box.prototype.updateBoxPosition = function (
    loaderApi,
    eventId,
    adConfig,
    imgWidth,
    imgHeight) {

    var root = this.getRoot();

    if (root) {
        // 图标的高宽
        var iconWidth = this.getData('box.icon_width');
        // 减2是因为icon下方都有一定阴影，让下方内容视觉上更贴近icon
        var iconHeight = this.getData('box.icon_height') - 2;

        // 图标位置（相对于图片）
        var iconPos;
        // 图标位置类型
        var positionType;

        if (loaderApi) {
            // 根据位置类型获取icon位置
            positionType = parseInt(adConfig['position_type'], 10);
            iconPos = this._getIconPosition(
                loaderApi,
                eventId,
                adConfig,
                iconWidth,
                iconHeight,
                imgWidth,
                imgHeight
            );
        }
        else {
            // for local mockup
            iconPos = {'left': 10, 'top': 50};
            positionType = 0;
        }

        // 设置ICON位置
        baidu.dom.setStyles(
            root,
            {
                'left': iconPos['left'] + 'px',
                'top': iconPos['top'] + 'px'
            }
        );

        // 计算内容区域的位置
        var left;
        var top;
        var contentPos;
        var contentWidth = this.getData('box.content_width');
        var contentHeight = this.getData('box.content_height');
        var contentPosition = this.getData('box.content_position', 0);
        var content = baidu.g(this.getId('content'));

        if (contentPosition === 1) {
            // 遮住icon的样式
            top = contentHeight ? ((-contentHeight + iconHeight) / 2) : 0;
            left = contentWidth ? ((-contentWidth + iconWidth) / 2) : 0;
            contentPos = this._fixPos(
                iconPos['top'], iconPos['left'],
                top, left,
                imgWidth, imgHeight,
                contentWidth, contentHeight
            );
            top = contentPos['top'];
            left = contentPos['left'];
        }
        else {
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
                    top = iconHeight + 2;
                    left = (-contentWidth / 2) + (iconWidth / 2);

                    if (iconPos['left'] + left < 0) {
                        // 如果靠左没有足够空间
                        // 则内容区与图片左边界对齐
                        left = -iconPos['left'];
                    }
                    break;
            }
        }

        // 设置内容区域的位置
        baidu.setStyles(
            content,
            {
                'top': top + 'px',
                'left': left + 'px',
                'width': contentWidth + 'px',
                'height': contentHeight
                    ? contentHeight + 'px'
                    : 'auto'
            }
        );
    }
};

/**
 * 修复内容区超过图片区域的情况，修正内容区的top和left
 *
 * @param {number} iconTop icon的top值
 * @param {number} iconLeft icon的left值
 * @param {number} contentTop content的top值
 * @param {number} contentLeft content的left值
 * @param {number} imgWidth 图片的宽度
 * @param {number} imgHeight 图片的高度
 * @param {number} contentWidth 内容区宽度
 * @param {number} contentHeight 内容区高度
 * @return {Object} 图片区的top和left
 */
ad.widget.imageplus.Box.prototype._fixPos = function (
    iconTop,
    iconLeft,
    contentTop,
    contentLeft,
    imgWidth,
    imgHeight,
    contentWidth,
    contentHeight) {

    var maxTop = imgHeight - (contentHeight || 0);
    var maxLeft = imgWidth - (contentWidth || 0);
    var trueContentTop = iconTop + contentTop;
    var trueContentLeft = iconLeft + contentLeft;

    if (trueContentTop < 0) {
        contentTop = -iconTop;
    }
    else if (trueContentTop > maxTop) {
        contentTop = maxTop - iconTop;
    }

    if (trueContentLeft < 0) {
        contentLeft = -iconLeft;
    }
    else if (trueContentLeft > maxLeft) {
        contentLeft = maxLeft - iconLeft;
    }

    return {
        'left': contentLeft,
        'top': contentTop
    };
};

/**
 * 计算图标的位置.
 *
 * @param {ad.plugin.imageplus.ILoaderApi} loaderApi .
 * @param {string} eventId 激活此次位置更新的eventId.
 * @param {Object} adConfig 广告的配置ad_config.
 * @param {number} iconWidth 图标宽度.
 * @param {number} iconHeight 图标高度.
 * @param {number} imgWidth 图片宽度.
 * @param {number} imgHeight 图片高度.
 * @return {Object}
 */
ad.widget.imageplus.Box.prototype._getIconPosition = function (
    loaderApi,
    eventId,
    adConfig,
    iconWidth,
    iconHeight,
    imgWidth,
    imgHeight) {

    var positionType = adConfig['position_type'];
    var pos = {
        'left': 0,
        'top': 0
    };
    var img;

    switch (parseInt(positionType, 10)) {
        case 0:
            // 按照配置的位置摆放icon
            var configLeft = adConfig['icon_top_left_x'];
            var configTop = adConfig['icon_top_left_y'];

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
            pos['top'] = this._calcVPos(loaderApi, eventId, iconHeight);
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
            pos['top'] = this._calcVPos(loaderApi, eventId, iconHeight, true);
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
 * @param {ad.plugin.imageplus.ILoaderApi} loaderApi .
 * @param {string} eventId 激活此次位置更新的eventId.
 * @param {number} iconHeight icon高度.
 * @param {boolean=} alignLeft 是否靠右.
 * @return {number} yPos;
 */
ad.widget.imageplus.Box.prototype._calcVPos =
    function (loaderApi, eventId, iconHeight, alignLeft) {
        var key = alignLeft ? 'alignLeft' : '';
        // 根据共享数据，计算y轴上的起始位置，默认为5px
        // 共享位置的key
        var yPosShareKey = '[widget.box]type1YPos' + key;
        // 记录事件id的key，同一次事件内触发的重排才会用相同的共享位置
        // 否则需要重置共享位置
        var eventIdKey = '[widget.box]currentWH' + key;
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
 * icon展示blink效果
 *
 * @param {Function=} opt_callback 动画执行结束的回调函数
 * @param {Object=} opt_config 动画配置
 * @param {number=} opt_config.blinkTime 闪烁次数
 * @param {number=} opt_config.duration 动画持续时间
 * @return {ad.fx.Timeline|Object} blink timeline.
 */
ad.widget.imageplus.Box.prototype.blink = function (opt_callback, opt_config) {
    var icon = baidu.g(this.getId('icon'));
    if (!icon) {
        return null;
    }

    var config = baidu.extend({
        blinkTime: 2,
        duration: 3000
    }, opt_config);

    if (!(baidu.browser.ie <= 6)) {
        // 先等待500ms，避免直接显示动画而太突兀
        var fx = ad.fx.blink(icon, config);

        if (opt_callback) {
            fx.addEventListener('onafterfinish', opt_callback);
        }
        return fx;
    }
    else {
        // ie6 虽然不闪烁，但是也需要模拟2000ms的时间
        // 并且显示icon
        var timer;
        var me = this;
        me.showIcon();
        timer = ad.base.setTimeout(function () {
            if (opt_callback) {
                opt_callback();
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
ad.widget.imageplus.Box.prototype.show = function () {
    var root = this.getRoot();
    if (root) {
        this._contentIsVisible = true;
        baidu.setStyle(root, 'display', 'block');
    }
};

/** @override */
ad.widget.imageplus.Box.prototype.hide = function () {
    var root = this.getRoot();
    if (root) {
        this._contentIsVisible = false;
        baidu.setStyle(root, 'display', 'none');
    }
};

/**
 * 显示icon
 */
ad.widget.imageplus.Box.prototype.showIcon = function () {
    var icon = baidu.g(this.getId('icon'));
    if (icon) {
        baidu.show(icon);
    }
};

/**
 * 隐藏icon
 *
 * @param {Function=} opt_fadeOutCallback fadeOut动画结束的回调函数
 */
ad.widget.imageplus.Box.prototype.hideIcon = function (opt_fadeOutCallback) {
    var icon = baidu.g(this.getId('icon'));
    if (!icon) {
        return;
    }

    if (opt_fadeOutCallback) {
        var fx = ad.fx.fadeOut(icon);
        fx.addEventListener("onafterfinish", opt_fadeOutCallback);
    }
    else {
        baidu.hide(icon);
    }
};

/**
 * 判断是否在可视区域内
 *
 * @param {Object} imgRect 图片的区域
ad.widget.imageplus.Box.prototype._updateIconFixPosition = function (imgRect) {
    var rect = this._iconRect;

    var clientL = baidu.page.getScrollLeft();
    var clientT = baidu.page.getScrollTop();
    var clientR = clientL + baidu.page.getViewWidth();
    var clientB = clientT + baidu.page.getViewHeight();

    var imgL = imgRect['left'];
    var imgT = imgRect['top'];
    var imgR = imgRect['right'];
    var imgB = imgRect['bottom'];

    var top = imgT + rect['top'];
    var left = imgL + rect['left'];
    var bottom = top + rect['height'];
    var right = left + rect['width'];

    var isIconInView = (top > clientT && bottom < clientB)
                    && (left > clientL && right < clientR);
    if (isIconInView) {
        // 如果icon在可视区域内，则不计算
        return;
    }
};
 */






















/* vim: set ts=4 sw=4 sts=4 tw=100  */
