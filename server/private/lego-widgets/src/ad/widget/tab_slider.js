/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/tab_slider.js ~ 2013/04/23 15:13:19
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * tab_slider相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ad.fn');
goog.require('ad.widget.Widget');

goog.include('ad/widget/tab_slider.less');
goog.include('ad/widget/tab_slider.html');

goog.provide('ad.widget.TabSlider');

baidu.event._eventFilter.mouseenter;
baidu.event._eventFilter.mouseleave;

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.TabSlider = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tab_slider';

    /**
     * @private
     * @type {Array.<Element>}
     */
    this._imgs = [];

    /**
     * @private
     * @type {Array.<Element>}
     */
    this._tabs = [];
};
baidu.inherits(ad.widget.TabSlider, ad.widget.Widget);

/** @override */
ad.widget.TabSlider.prototype.enterDocument = function () {
    ad.widget.TabSlider.superClass.enterDocument.call(this);
    var list = this.getId('list');
    var me = this;
    if (list) {
        baidu.array.each(baidu.dom.children(list), function (li, i) {
            var img = baidu.q('ad-widget-tab-slider-panel', li);
            var tab = baidu.q('ad-widget-tab-slider-info', li);
            me._imgs.push(img[0]);
            me._tabs.push(tab[0]);
        });
    }
    me._delay = me._data['delay'];

    // 设置初始显示
    this._init(this._data['first_show_index']);

    // 定时任务
    me._intervalTime = me._data['interval_time'];
    if (me._intervalTime) {
        this.startInterval();
    }
};

/**
 * 初始化显示
 *
 * @param {number} index 需要显示的序号.
 */
ad.widget.TabSlider.prototype._init = function (index) {
    var me = this;
    if (me._index === index) {
        return;
    }
    me._index = index;

    baidu.array.each(me._imgs, function (img , i) {
        var tab = me._tabs[i];
        if (me._index === i) {
            me._showImg(/** @type {Element} */(img));
            me._expandTab(/** @type {Element} */(tab));
        }
        else {
            me._hideImg(/** @type {Element} */(img));
            me._shrinkTab(/** @type {Element} */(tab));
        }
    });
};

/** @override */
ad.widget.TabSlider.prototype.bindEvent = function () {
    ad.widget.TabSlider.superClass.bindEvent.call(this);

    var me = this;
    baidu.array.each(me._tabs, function (tab) {
        // 鼠标操作
        baidu.event.on(
            /** @type {Element} */(tab),
            'mouseenter',
            function mouseenter(e) {
                if (me._timer) {
                    ad.base.clearTimeout(me._timer);
                }
                me._timer = ad.base.setTimeout(function () {
                    var index =
                        parseInt(baidu.getAttr(tab, 'data-index'), 10) - 1;
                    me._show(index);
                }, me._delay);
            }
        );

        // 鼠标悬停时停止定时操作
        baidu.event.on(
            /** @type {Element} */(tab),
            'mouseenter',
            function (e) {
                me.stopInterval();
            }
        );
        baidu.event.on(
            /** @type {Element} */(tab),
            'mouseleave',
            function (e) {
                if (me._intervalTime) {
                    me.startInterval();
                }
            }
        );
    });
};

/** @override */
ad.widget.TabSlider.prototype.patchData = function () {
    if (this._data) {
        this._data['first_show_index'] = this._data['first_show_index'] || 0;
        var firstShowIndex = this._data['first_show_index'];
        var options = this._data['options'];

        if (options && options.length) {
            this._length = options.length;
            var tabGap = this._data['tab_gap'];
            var tabWidth = this._data['tab_width'];
            baidu.array.each(options, function (item, i) {
                if (i === firstShowIndex) {
                    item['is_current'] = true;
                }
                item['_tab_css_left'] = (1 + i) * tabGap + tabWidth * i;
                if (!item['swf']) {
                    delete item['swf'];
                }
            });
        }
    }
};

/**
 * 显示指定序号的slider，显示之前会暂停定时器，结束后重启定时器
 *
 * @param {number} index index.
 * @param {function(boolean)=} opt_callback do when showed.
 */
ad.widget.TabSlider.prototype.setIndex = function (index, opt_callback) {
    var me = this;

    me.stopInterval();
    me._show(index, function (success) {
        if (opt_callback) {
            opt_callback(success);
        }
        if (me._intervalTime) {
            me.startInterval();
        }
    });
};

/**
 * 返回正在显示的图片的index序号
 * 如果一个切换动画正在进行中，那么返回的是切换完成之前的图片序号.
 *
 * @return {number} index.
 */
ad.widget.TabSlider.prototype.getIndex = function () {
    return this._index;
};

/**
 * 判断是否正在执行动画
 *
 * @param {boolean} 执行与否.
 */
ad.widget.TabSlider.prototype.isAnimating = function () {
    return this._isAnimating;
};

/**
 * 显示指定序号的slider，内部使用
 *
 * @param {number} index index 从0开始.
 * @param {function (boolean)=} opt_callback
 *      动画结束时执行，参数为布尔值，表示show操作是否执行成功.
 */
ad.widget.TabSlider.prototype._show = function (index, opt_callback) {
    var me = this;

    // 确保有动画执行时，其余动画入栈以备动画执行结束后开始
    if (me._isAnimating) {
        me._animationQueue = me._animationQueue || [];
        me._animationQueue.push({
            index: index,
            callback: opt_callback
        });
        return;
    }
    me._isAnimating = true;

    index = index % me._length;
    // 避免重复执行
    if (me._index === index) {
        me._isAnimating = false;
        if (opt_callback) {
            opt_callback(false);
        }
        // do queue
        me._animateQueue();
        return;
    }

    me._shrinkTabAnimation(me._tabs[me._index], function () {
        me._expandTabAnimation(me._tabs[index], function () {
            me._hideImgAnimation(me._imgs[me._index], function () {
                me._showImgAnimation(me._imgs[index], function () {
                    me._index = index;
                    me._isAnimating = false;
                    // do callback
                    if (opt_callback) {
                        opt_callback(true);
                    }

                    // do queue
                    me._animateQueue();
                });
            });
        });
    });
};

/**
 * 执行动画队列中的动画效果
 */
ad.widget.TabSlider.prototype._animateQueue = function () {
    var me = this;
    if (me._animationQueue && me._animationQueue.length) {
        var animation = me._animationQueue.shift();
        me._show(animation.index, animation.callback);
    }
};

/**
 * 显示图片的动画操作，用于调用show方法的时候
 *
 * @param {Element} img dom.
 * @param {Function} callback 动画结束后的回调函数.
 */
ad.widget.TabSlider.prototype._showImgAnimation = function (img, callback) {
    this._showImg(img);
    callback();
};

/**
 * 显示图片，用于初始化时。它一定是简单的同步操作，故不设置回调函数
 *
 * @param {Element} img dom.
 */
ad.widget.TabSlider.prototype._showImg = function (img) {
    baidu.dom.show(img);
    // 增加class钩子
    baidu.dom.addClass(img, 'ad-widget-tab-slider-visible');
    baidu.dom.removeClass(img, 'ad-widget-tab-slider-hidden');
};

/**
 * 隐藏图片的动画操作，用于调用show方法的时候
 *
 * @param {Element} img dom.
 * @param {Function} callback 动画结束后的回调函数.
 */
ad.widget.TabSlider.prototype._hideImgAnimation = function (img, callback) {
    this._hideImg(img);
    callback();
};

/**
 * 隐藏图片，用于初始化时。它一定是简单的同步操作，故不设置回调函数
 *
 * @param {Element} img dom.
 */
ad.widget.TabSlider.prototype._hideImg = function (img) {
    baidu.dom.hide(img);
    // 增加class钩子
    baidu.dom.addClass(img, 'ad-widget-tab-slider-hidden');
    baidu.dom.removeClass(img, 'ad-widget-tab-slider-visible');
};

/**
 * 展开tab的动画操作，用于调用show方法的时候
 *
 * @param {Element} tab dom.
 * @param {Function} callback 动画结束后的回调函数.
 */
ad.widget.TabSlider.prototype._expandTabAnimation = function (tab, callback) {
    var me = this;

    // 先做tab整体动画
    me._animateUtil(
        tab,
        { 'height': this._data['tab_height'] },
        function () {
            // 然后划入描述
            me._animateUtil(
                tab.getElementsByTagName('p')[0],
                {
                    'opacity': 1,
                    'left': 0
                },
                function () {
                    me._expandTab(tab);
                    callback();
                },
                {
                    'duration': 50,
                    'setStyle': function (dom, name, value) {
                        baidu.dom.setStyle(
                            dom,
                            name,
                            (name === 'left') ? (value + 'px') : value
                        );
                    },
                    'getStyle': function (dom, name) {
                        var v = ad.dom.getStyle(dom, name);
                        if (name === 'left' && v === 'auto') {
                            v = 0;
                        }
                        return v;
                    }
                }
            );
        },
        {
            'duration': 100,
            'setStyle': function (dom, name, value) {
                // 用setStyle设置
                baidu.dom.setStyle(dom, name, value + 'px');
            }
        }
    );
};

/**
 * 展开tab的动画操作，它一定是简单的同步操作，故不设置回调函数
 *
 * @param {Element} tab dom.
 */
ad.widget.TabSlider.prototype._expandTab = function (tab) {
    baidu.dom.setStyle(tab, 'height', this._data['tab_height'] + 'px');
    // 增加class钩子
    baidu.dom.addClass(tab, 'ad-widget-tab-slider-expand');
    baidu.dom.removeClass(tab, 'ad-widget-tab-slider-shrink');
    var desc = tab.getElementsByTagName('p')[0];
    baidu.dom.setStyle(desc, 'opacity', '1');
    baidu.dom.setStyle(desc, 'left', '0px');
};

/**
 * 收起tab的动画操作，用于调用show方法的时候
 *
 * @param {Element} tab dom.
 * @param {Function} callback 动画结束后的回调函数.
 */
ad.widget.TabSlider.prototype._shrinkTabAnimation = function (tab, callback) {
    var me = this;

    // 先做tab整体动画
    me._animateUtil(
        tab,
        { 'height': this._data['tab_shrink_height'] },
        function () {
            // 然后划出描述
            me._animateUtil(
                tab.getElementsByTagName('p')[0],
                {
                    'opacity': 0,
                    'left': 100
                },
                function () {
                    me._shrinkTab(tab);
                    callback();
                },
                {
                    'duration': 50,
                    'setStyle': function (dom, name, value) {
                        baidu.dom.setStyle(
                            dom,
                            name,
                            (name === 'left') ? (value + 'px') : value
                        );
                    },
                    'getStyle': function (dom, name) {
                        var v = ad.dom.getStyle(dom, name);
                        if (name === 'left' && v === 'auto') {
                            v = 0;
                        }
                        return v;
                    }
                }
            );
        },
        {
            'duration': 100,
            'setStyle': function (dom, name, value) {
                baidu.dom.setStyle(dom, name, value + 'px');
            }
        }
    );
};

/**
 * 收起tab的动画操作，它一定是简单的同步操作，故不设置回调函数
 *
 * @param {Element} tab dom.
 */
ad.widget.TabSlider.prototype._shrinkTab = function (tab) {
    baidu.dom.setStyle(tab, 'height', this._data['tab_shrink_height'] + 'px');
    // 增加class钩子
    baidu.dom.addClass(tab, 'ad-widget-tab-slider-shrink');
    baidu.dom.removeClass(tab, 'ad-widget-tab-slider-expand');
    var desc = tab.getElementsByTagName('p')[0];
    baidu.dom.setStyle(desc, 'opacity', '0');
    baidu.dom.setStyle(desc, 'left', '100px');
};

/**
 * 关闭定时
 *
 */
ad.widget.TabSlider.prototype.stopInterval = function () {
    var me = this;
    if (me._interval) {
        ad.base.clearTimeout(me._interval);
        me._interval = null;
    }
};

/**
 * 开始定时
 */
ad.widget.TabSlider.prototype.startInterval = function () {
    var me = this;
    if (me._interval) {
        return;
    }

    me._interval = ad.base.setTimeout(function () {
        me._show(me._index + 1, function () {
            me._interval = null;
            me.startInterval();
        });
    }, me._intervalTime);
};

/**
 * 简易动画函数
 *
 * @param {Element} dom 需要执行动画的元素.
 * @param {Object} props 例如：{'width': 100}.
 * @param {function (Element)=} opt_complete 「可选」动画结束后的回调函数.
 * @param {Object=} opt_options 配置.
 * @config {number} interval 动画间隔时间
 * @config {function} easing 补间函数
 * @config {number} duration 动画耗时
 * @config {function (Element, string, number|string)} setStyle 设置样式的函数
 * @config {function (Element, string):string} getStyle 获取样式的函数
 *
 * @return {?number} timer 定时器句柄.
 */
ad.widget.TabSlider.prototype._animateUtil =
    function (dom, props, opt_complete, opt_options) {
        // 动画间隔时间
        var interval = (opt_options && opt_options['interval']) || 20;
        // 补间函数
        var easing = (opt_options && opt_options['easing'])
            || function (elapsed) {
                return elapsed * (2 - elapsed);
            };
        // 动画执行时间
        var duration = (opt_options && opt_options['duration']) || 1000;
        // 开始时间
        var startTime = new Date().getTime();
        // CSS属性的结束值
        var endProps = props;
        // CSS属性的开始值
        var startProps = {};

        var getStyle = (opt_options && opt_options['getStyle'])
            || ad.fn.bind(ad.dom.getStyle, ad.dom);
        var setStyle = (opt_options && opt_options['setStyle'])
            || baidu.dom.setStyle;

        // 初始化
        for (var key in props) {
            if (props.hasOwnProperty(key)) {
                if (typeof endProps[key] === 'string') {
                    endProps[key] = parseInt(endProps[key], 10);
                }
                startProps[key] = parseInt(getStyle(dom, key), 10);
            }
        }

        // 执行动画
        var timer;
        var animate = function () {
            var now = new Date().getTime();
            // 计算补间百分比
            var elapsed = (now - startTime) / duration;
            elapsed = elapsed > 1 ? 1 : elapsed;
            var value = easing(elapsed);

            // 计算更新CSS值
            var start;
            var end;
            for (var key in endProps) {
                start = startProps[key];
                end = endProps[key];
                // 更新CSS
                setStyle(dom, key, start + (end - start) * value);
            }

            if (elapsed === 1) {
                // END
                timer = null;
                if (opt_complete) {
                    opt_complete(dom);
                }
            }
            else {
                // NEXT ANIMATION
                timer = ad.base.setTimeout(animate, interval);
            }
        };
        animate();

        return timer;
    };

/**
 * @override
 */
ad.widget.TabSlider.prototype.dispose = function() {
    this.stopInterval();
    ad.widget.TabSlider.superClass.dispose.call(this);
}





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
