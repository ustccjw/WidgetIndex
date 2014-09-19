/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * src/ad/widget/imageplus/v2/flip_box.js ~ 2014/07/09 16:46:00
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * box相关的实现逻辑
 **/

goog.require('ad.dom');
goog.require('ad.widget.IsolatedWidgetContainer');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.render.ImageplusRender');
goog.require('ad.fx.fadeOut');
goog.require('ad.fx.fadeIn');
goog.require('ui.events');
goog.require('ad.widget.imageplus.v2.util');

goog.include('ad/widget/imageplus/v2/flip_box.less');
goog.include('ad/widget/imageplus/v2/flip_box.html');

goog.provide('ad.widget.imageplus.v2.FlipBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.IsolatedWidgetContainer}
 */
ad.widget.imageplus.v2.FlipBox = function (data) {
    ad.widget.IsolatedWidgetContainer.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_flip_box';

    /**
     * @type {ad.render.ImageplusRender}
     * @private
     */
    this._render = new ad.render.ImageplusRender();

    /**
     * 最近一次显示广告的时间点
     * @type {number}
     * @private
     */
    this._showTime = 0;

    /**
     * 显示广告的序号（从0开始）
     * @type {number}
     * @private
     */
    this._showTimes = 0;

    /**
     * 广告是否已显示
     * @type {boolean}
     * @private
     */
    this._contentIsVisible = false;

    /**
     * 广告是否正在显示中
     * @type {boolean}
     * @private
     */
    this._contentIsShowing = false;

    /**
     * 广告是否正在隐藏中
     * @type {boolean}
     * @private
     */
    this._contentIsHiding = false;

    /**
     * 内容的高度
     * @type {number}
     * @private
     */
    this._contentHeight = 0;

    /**
     * 封面元素，包含假图片
     * @type {Element}
     * @private
     */
    this._frontElement = null;

    /**
     * 内层元素，包含广告内容
     * @type {Element}
     * @private
     */
    this._backElement = null;

    /**
     * 伪图片
     * @type {Element}
     * @private
     */
    this._fakeImg = null;

    // 初始化widgets，避免报错
    this._widgets = [];
};
baidu.inherits(ad.widget.imageplus.v2.FlipBox, ad.widget.IsolatedWidgetContainer);

/** @override */
ad.widget.imageplus.v2.FlipBox.prototype.patchData = function () {
    if (this._data) {
        ad.widget.imageplus.v2.util.updateRealUrl(this._data);
        ad.widget.imageplus.v2.util.updateTradeId(this._data);
    }
};

/** @override */
ad.widget.imageplus.v2.FlipBox.prototype.enterDocument = function () {
    var me = this;
    var imgSrc = me.getData('image');
    me._bindShowAndHide();
    me._backElement = baidu.g(this.getId('back'));
    me._frontElement = baidu.g(this.getId('front'));
    // 设置root的背景色
    var backgroundColor = document.body.style.backgroundColor;
    me.getRoot().style.background =
        (backgroundColor === 'transparent' || backgroundColor === '') ? '#FFF' : backgroundColor;

    if (!COMPILED) {
        me.addListener(ui.events.LOAD, function () {
            me._prepareImg(imgSrc, 180, function () {
                me._updateContentHeight(180);
                me.show();
            });
        });
        ad.widget.imageplus.v2.FlipBox.superClass.enterDocument.call(this);
        return;
    }

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = me.getData('api');
    var rect = loaderApi.getImgRect();
    var count = 0;
    var done = function () {
        if (++count <= 1) {
            return;
        }
        me._updateContentHeight(rect['height']);
        loaderApi.addListener(ui.events.RESIZE, function (event, rect) {
            me._updateContentHeight(rect['height']);
        });

        var endAnimation = baidu.fn.bind(me._endAnimation, me);
        loaderApi.addListener(ui.events.RELEASE, endAnimation);
        loaderApi.addListener(ui.events.HIDE, endAnimation);

        loaderApi.rendDone(me.getData('box.imageplus_button', false));
    };
    // 等待隔离环境加载完成
    me.addListener(ui.events.LOAD, done);
    // 等待伪图片准备完成
    me._prepareImg(imgSrc, rect['height'], done);

    ad.widget.imageplus.v2.FlipBox.superClass.enterDocument.call(this);
};

/**
 * 更新内容高度
 *
 * @param {number} height .
 */
ad.widget.imageplus.v2.FlipBox.prototype._updateContentHeight = function (height) {
    this._contentHeight = height;
    if (this._contentIsVisible) {
        this._backElement.style.height = height + 'px';
    }
    this.getIsolatedRootCanvas().style.height = height + 'px';
    // 更新iframe高度
    this.updateIsolatedContainerSize();

    this._fakeImg.style.height = height + 'px';
};

/**
 * 增加伪图片
 *
 * @param {string} src 图片地址
 * @param {number} height 图片高度
 * @param {Function} callback 回调函数
 */
ad.widget.imageplus.v2.FlipBox.prototype._prepareImg = function (src, height, callback) {
    var img = document.createElement('img');
    var front = baidu.g(this.getId('front'));
    this._fakeImg = img;
    img.src = src;
    img.style.cssText = 'height:' + height + 'px;';
    front.appendChild(img);
    if (img.complete) {
        callback();
    }
    else {
        img.onload = img.onerror = callback;
    }
};

/**
 * 绑定内容区域的展现和隐藏事件
 */
ad.widget.imageplus.v2.FlipBox.prototype._bindShowAndHide = function () {
    var me = this;
    var root = me.getRoot();
    if (root) {
        ad.widget.imageplus.v2.util.setupLog(me, function () {
            return '|' + ((new Date() - me._showTime) / 1000) + '|' + me._showTimes;
        });

        // 绑定icon的hover事件
        baidu.on(root, 'click', function (e) {
            var target = baidu.event.getTarget(e);
            while (target && target.nodeName !== 'A') {
                target = target.parentNode;
                if (target === root) {
                    return;
                }
            }

            var action = baidu.getAttr(target, 'data-action');
            if (!action) {
                return;
            }

            baidu.event.preventDefault(e);
            if (action === 'show') {
                me.show();
            }
            else {
                me.hide();
            }
        });
    }
};

/**
 * 翻转动画
 *
 * @param {string} cssTransformName transform的css属性名
 * @param {string} style “show”还是“hide”动画
 * @param {Function} callback 回调函数
 */
ad.widget.imageplus.v2.FlipBox.prototype._flip = function (cssTransformName, style, callback) {
    var me = this;
    var root = me.getRoot();
    var isShow = style === 'show';
    var front = isShow ? me._frontElement : me._backElement;
    var back = isShow ? me._backElement : me._frontElement;
    var from = 0;
    var to = 180;
    var hidedFront = false;

    front.style.display = 'block';
    back.style.display = 'none';
    root.style.height = this._contentHeight + 'px';

    var fx = ad.fx.create(front, {
        __type: 'imageplus-flip',
        duration: 1000,
        transition: function (percent) {
            return (-Math.cos(percent * Math.PI) / 2) + 0.5;
        },
        render: function (schedule) {
            var deg = from + (to - from) * schedule;
            if (schedule < 0.5) {
                front.style[cssTransformName] = 'rotateY(' + deg + 'deg)';
            }
            else {
                if (!hidedFront) {
                    front.style.display = 'none';
                    back.style.display = 'block';
                    hidedFront = true;
                }
                deg += 180;
                back.style[cssTransformName] = 'rotateY(' + deg + 'deg)';
            }
        }
    });
    fx.addEventListener('onafterfinish', function() {
        me._fx = null;
        root.style.height = 0;
        callback();
    });
    fx.launch();
    me._fx = fx;
};

/**
 * 翻转动画
 *
 * @param {string} style 表示展现(show)还是隐藏(hide)动画
 * @param {Function} callback 回调函数
 */
ad.widget.imageplus.v2.FlipBox.prototype._startAnimation = function (style, callback) {
    var me = this;
    var cssTransformName = ad.dom.supportCSS('transform', 'rotateY(45deg)');
    if (cssTransformName) {
        me._flip(cssTransformName, style, callback);
    }
    else {
        var animate = style === 'show' ? ad.fx.fadeOut : ad.fx.fadeIn;
        me._fx = animate(me._frontElement);

        me._fx.addEventListener('onafterfinish', function() {
            me._fx = null;
            callback();
        });
    }
};

/**
 * 结束动画
 */
ad.widget.imageplus.v2.FlipBox.prototype._endAnimation = function () {
    if (this._fx) {
        this._fx.end();
    }
};

/** @override */
ad.widget.imageplus.v2.FlipBox.prototype.show = function () {
    var me = this;
    var root = me.getRoot();
    if (!root || me._contentIsVisible || me._contentIsShowing) {
        return;
    }
    me._contentIsShowing = true;
    me._contentIsHiding = false;

    me._fakeImg.style.display = 'block';
    me._backElement.style.height = me._contentHeight + 'px';
    me._startAnimation('show', function () {
        me._frontElement.style.zIndex = 9;
        me._contentIsVisible = true;
    });

    me._showTime = new Date().getTime();
    me.trigger(ui.events.SEND_LOG, 1);
};

/** @override */
ad.widget.imageplus.v2.FlipBox.prototype.hide = function () {
    var me = this;
    var root = me.getRoot();
    if (!root || !me._contentIsVisible || me._contentIsHiding) {
        return;
    }
    me._contentIsHiding = true;
    me._contentIsShowing = false;

    me._frontElement.style.zIndex = 11;
    me._startAnimation('hide', function () {
        me._backElement.style.height = 0;
        me._fakeImg.style.display = 'none';
        me._contentIsVisible = false;
    });

    this._showTimes++;
    this.trigger(
        ui.events.SEND_LOG,
        {
            'actionid': 3,
            'attach': (new Date() - this._showTime) / 1000
        }
    );
};























/* vim: set ts=4 sw=4 sts=4 tw=100  */
