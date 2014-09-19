/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * src/ad/widget/imageplus/v2/base_box.js ~ 2014/07/22 16:46:00
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * box相关的实现逻辑
 **/

goog.require('ad.widget.IsolatedWidgetContainer');
goog.require('ad.plugin.imageplus.ILoaderApi');
goog.require('ad.render.ImageplusRender');
goog.require('ui.events');
goog.require('ad.widget.imageplus.v2.util');

goog.provide('ad.widget.imageplus.v2.BaseBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.IsolatedWidgetContainer}
 */
ad.widget.imageplus.v2.BaseBox = function (data) {
    ad.widget.IsolatedWidgetContainer.call(this, data);

    /**
     * @type {ad.render.ImageplusRender}
     * @private
     */
    this._render = new ad.render.ImageplusRender();

    // 初始化widgets，避免报错
    this._widgets = [];

    /**
     * 不是所有的链接都在隔离区域内，用于绑定日志时
     * @type {boolean}
     */
    this.notAllLinkIsolated = false;

    /**
     * 最近一次显示广告的时间点
     * @type {number}
     */
    this.latestShowTime = new Date().getTime();

    /**
     * 隐藏广告的次数
     * @type {number}
     */
    this.hidedCount = 0;

    /**
     * 标志位，用于判断广告是否被释放了
     * 在一些异步操作里面判断操作是否有执行的必要
     * @type {boolean}
     */
    this.released = false;

    /**
     * 内容区是否已显示
     * @type {boolean}
     */
    this.contentVisible = false;

    /**
     * 内容区是否正在显示中
     * @type {boolean}
     */
    this.contentShowing = false;

    /**
     * 内容区是否正在隐藏中
     * @type {boolean}
     */
    this.contentHiding = false;

    /**
     * 是否隐藏广告
     * @type {boolean}
     */
    this.forceHiding = false;
};
baidu.inherits(ad.widget.imageplus.v2.BaseBox, ad.widget.IsolatedWidgetContainer);

/** @override */
ad.widget.imageplus.v2.BaseBox.prototype.patchData = function () {
    if (this._data) {
        ad.widget.imageplus.v2.util.updateRealUrl(this._data);
        ad.widget.imageplus.v2.util.updateTradeId(this._data);
        this._thirdPartyContent = this.getData('box.third_party_content', false);
    }
};

/**
 * 获取loaderApi，工具方法
 *
 * @return {ad.plugin.imageplus.ILoaderApi}
 */
ad.widget.imageplus.v2.BaseBox.prototype.getLoaderApi = function () {
    return /** @type {ad.plugin.imageplus.ILoaderApi} */(this.getData('api'));
};

/**
 * 异步操作的语法糖，确保异步操作在广告释放后就不用执行了，避免bug
 * 使用方法和baidu.fn.bind类似
 *
 * @param {Function} action 要绑定的函数，或者一个在作用域下可用的函数名.
 * @param {Object} scope 执行运行时this，如果不传入则运行时this为函数本身.
 * @param {...*} var_args 一些额外的参数需要传递给func.
 */
ad.widget.imageplus.v2.BaseBox.prototype.async = function (action, scope, var_args) {
    var me = this;
    var args = (typeof var_args !== 'undefined') ? [].slice.call(arguments, 2) : null;

    return function () {
        if (me.released || me.forceHiding) {
            // 如果广告释放了，或者被强制隐藏了。就不用继续执行了
            return;
        }

        var a;
        if (args) {
            a = args.concat([].slice.call(arguments, 0));
        }
        else {
            a = arguments;
        }

        return action.apply(scope, a);
    };
};


/** @override */
ad.widget.imageplus.v2.BaseBox.prototype.enterDocument = function () {
    ad.widget.imageplus.v2.BaseBox.superClass.enterDocument.call(this);
    var me = this;

    if (me.released || me.forceHiding) {
        return;
    }

    var loaderApi = me.getLoaderApi();
    if (loaderApi) {
        // 将loaderApi的事件处理绑定到对应函数，确保它们会被实现而不是忽略
        loaderApi.addListener(ui.events.RELEASE, baidu.fn.bind(me.onAdRelease, me));
        loaderApi.addListener(ui.events.HIDE, me.async(me.onAdHide, me));
        loaderApi.addListener(ui.events.SHOW, me.async(me.onAdShow, me));
        loaderApi.addListener(ui.events.RESIZE, me.async(me.onAdResize, me));
    }

    // 监听子widget的事件，这些事件可以让子widget来控制box的内容区显示隐藏，广告整体关闭和最大化最小化
    me.forEach(function (widget) {
        widget.addListener(ui.events.BOX_HIDE, baidu.fn.bind(me.hideContent, me, null, true));
        widget.addListener(ui.events.BOX_SHOW, baidu.fn.bind(me.showContent, me, null, true));
        widget.addListener(ui.events.BOX_CLOSE, baidu.fn.bind(me.closeAd, me, null, true));
        widget.addListener(ui.events.BOX_MINIMIZE, baidu.fn.bind(me.minimizeAd, me, null, true));
        widget.addListener(ui.events.BOX_MAXIMIZE, baidu.fn.bind(me.maximizeAd, me, null, true));
    });

    // 执行enterAd和enterAdOnLoad
    me.enterAd(loaderApi);
    me.afterLoaded(me.async(me.enterAdOnLoad, me, loaderApi));

    // 绑定日志记录
    // 必须在执行完enterAd和enterAdOnLoad之后，避免这两个方法中有新增a链接的操作
    ad.widget.imageplus.v2.util.setupLog(
        me,
        /** @type {function (): string} */(baidu.fn.bind(me.calcLinkQuery, me)),
        me.notAllLinkIsolated
    );
};

/**
 * dom准备完成后执行，子类可以覆盖之
 *
 * @param {ad.plugin.imageplus.ILoaderApi} loaderApi
 */
ad.widget.imageplus.v2.BaseBox.prototype.enterAd = function (loaderApi) {};

/**
 * 隔离容器内部的dom准备完成后执行，子类可以覆盖之
 * 函数执行时广告的内容区（隔离容器）已经准备完成
 *
 * @param {ad.plugin.imageplus.ILoaderApi} loaderApi
 * @param {Element} isolatedRoot
 */
ad.widget.imageplus.v2.BaseBox.prototype.enterAdOnLoad = function (loaderApi, isolatedRoot) {};

/**
 * 处理广告位置布局的函数，它默认会被onAdResize，onAdShow调用
 * 也通常会被enterAdOnLoad或enterAd调用来初始化广告布局，具体什么时候调用，
 * 依赖于布局操作是否需要广告内容区的高度信息
 *
 * @param {Object} imgRect 图片的位置和高宽信息
 */
ad.widget.imageplus.v2.BaseBox.prototype.relayout = function (imgRect) {
    throw new Error('`relayout` method must be implemented.');
};

/**
 * 计算广告点击中的日志query
 *
 * @return {string} 日志链接地址后缀query，被ad.widget.imageplus.v2.util.setupLog方法使用
 */
ad.widget.imageplus.v2.BaseBox.prototype.calcLinkQuery = function () {
    return '|' + ((new Date() - this.latestShowTime) / 1000) + '|' + this.hidedCount;
};

/**
 * 在广告展现时执行
 * @param {Object} event 事件对象，例子：
 *          {
 *              'imgIndex': 1,
 *              'id': ad.base.uuid(),
 *              'type': 'show'
 *          }
 */
ad.widget.imageplus.v2.BaseBox.prototype.onAdShow = function (event) {
    // 如果在display none的时候显示广告，那么广告内部高宽计算可能会出错
    // 所以必须在show的时候重新计算下位置
    var me = this;
    var update = function () {
        me.updateIsolatedContainerSize();
        me.relayout(me.getLoaderApi().getImgRect());
    };
    if (ad.browser.ie && ad.browser.ie < 8) {
        setTimeout(update, 0);
    }
    else {
        update();
    }
};

/**
 * 在广告隐藏时执行
 * @param {Object} event 事件对象，例子：
 *          {
 *              'imgIndex': 1,
 *              'id': ad.base.uuid(),
 *              'type': 'hide'
 *          }
 */
ad.widget.imageplus.v2.BaseBox.prototype.onAdHide = function (event) {};

/**
 * 在广告释放（删除）前执行，有些资源需要释放
 * @param {Object} event 事件对象，例子：
 *          {
 *              'imgIndex': 1,
 *              'id': ad.base.uuid(),
 *              'type': 'release'
 *          }
 */
ad.widget.imageplus.v2.BaseBox.prototype.onAdRelease = function (event) {
    this.released = true;
};

/**
 * 在广告位置高宽改变时执行
 * @param {Object} event 事件对象，例子：
 *          {
 *              'imgIndex': 1,
 *              'id': ad.base.uuid(),
 *              'type': 'resize'
 *          }
 * @param {Object} imgRect 高宽及位置，例子：
 *          {
 *              'width': 300,
 *              'height': 200,
 *              'top': 100,
 *              'left': 200
 *          }
 */
ad.widget.imageplus.v2.BaseBox.prototype.onAdResize = function (event, imgRect) {
    this.relayout(imgRect);
};

/**
 * 关闭广告，一旦关闭不再可以显示。如果想要再次显示，使用最小化。
 *
 * @param {function(boolean)=} opt_done 动画操作结束后的回调函数，参数表示是否成功
 * @param {boolean=} opt_triggerByWidget 是否由子widget通过事件触发
 */
ad.widget.imageplus.v2.BaseBox.prototype.closeAd = function (opt_done, opt_triggerByWidget) {
    var me = this;
    me.forceHiding = true;
    // 修改为异步，为了确保代码能够在广告消失前发送热力图日志
    // 而热力图日志需要调用getAdRect
    // getAdRect是需要物料展现才能正确拿到广告的位置高宽的
    // 所以必须异步
    ad.base.setTimeout(function () {
        me.hide();
        me.trigger(ui.events.SEND_LOG, 5);

        if (opt_done) {
            opt_done(true);
        }
    }, 0);
};

/**
 * 最小化广告，需要被继承实现
 *
 * @param {function(boolean)=} opt_done 动画操作结束后的回调函数，参数表示是否成功
 * @param {boolean=} opt_triggerByWidget 是否由子widget通过事件触发
 */
ad.widget.imageplus.v2.BaseBox.prototype.minimizeAd = function (opt_done, opt_triggerByWidget) {};

/**
 * 最大化广告，需要被继承实现
 *
 * @param {function(boolean)=} opt_done 动画操作结束后的回调函数，参数表示是否成功
 * @param {boolean=} opt_triggerByWidget 是否由子widget通过事件触发
 */
ad.widget.imageplus.v2.BaseBox.prototype.maximizeAd = function (opt_done, opt_triggerByWidget) {};

/**
 * 展现广告内容区
 *
 * @param {function(boolean)=} opt_done 动画操作结束后的回调函数，参数表示是否成功
 * @param {boolean=} opt_triggerByWidget 是否由子widget通过事件触发
 */
ad.widget.imageplus.v2.BaseBox.prototype.hideContent = function (opt_done, opt_triggerByWidget) {
    var me = this;
    var root = me.getRoot();
    if (!root || !me.contentVisible || me.contentHiding) {
        return;
    }
    me.contentHiding = true;
    me.contentShowing = false;

    me.hideContentFx(root, me.async(function (success) {
        if (success) {
            me.contentVisible = false;
            me.hidedCount++;
            me.trigger(
                ui.events.SEND_LOG,
                {
                    'actionid': 3,
                    'attach': (new Date() - me.latestShowTime) / 1000
                }
            );
        }
        me.contentHiding = false;

        if (opt_done) {
            opt_done(success);
        }
    }, me), opt_triggerByWidget);
};

/**
 * 隐藏广告内容区的实际操作，一般包含一些动画效果
 *
 * @param {Element} root 根元素
 * @param {function(boolean)} done 动画操作结束后的回调函数，参数表示是否成功
 * @param {boolean=} opt_triggerByWidget 是否由子widget通过事件触发
 */
ad.widget.imageplus.v2.BaseBox.prototype.hideContentFx = function (root, done, opt_triggerByWidget) {
    throw new Error('`hideContentFx` must be implemented.');
};

/**
 * 展现广告内容区
 *
 * @param {function(boolean)=} opt_done 动画操作结束后的回调函数，参数表示是否成功
 * @param {boolean=} opt_triggerByWidget 是否由子widget通过事件触发
 */
ad.widget.imageplus.v2.BaseBox.prototype.showContent = function (opt_done, opt_triggerByWidget) {
    var me = this;
    var root = me.getRoot();
    if (!root || me.contentVisible || me.contentShowing) {
        return;
    }
    me.contentShowing = true;
    me.contentHiding = false;

    me.showContentFx(root, me.async(function (success) {
        if (success) {
            // 设置qid，每次广告内容区域展现后都重新写入qid到cookie中
            var loaderApi = me.getLoaderApi();
            if (loaderApi) {
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
            }

            me.contentVisible = true;
            me.latestShowTime = new Date().getTime();
            me.trigger(ui.events.SEND_LOG, 1);
        }
        me.contentShowing = false;

        if (opt_done) {
            opt_done(success);
        }
    }, null), opt_triggerByWidget);
};

/**
 * 展现广告内容区的实际操作，一般包含一些动画效果
 *
 * @param {Element} root 根元素
 * @param {function(boolean)} done 动画操作结束后的回调函数，参数表示是否成功
 * @param {boolean=} opt_triggerByWidget 是否由子widget通过事件触发
 */
ad.widget.imageplus.v2.BaseBox.prototype.showContentFx = function (root, done, opt_triggerByWidget) {
    throw new Error('`showContentFx` must be implemented.');
};

/**
 * 获取广告可视部分的位置高宽
 *
 * @return {Object} 位置高宽，例如：
 *     {
 *         'top': 0,
 *         'left': 0,
 *         'width': 700,
 *         'height': 75
 *     }
 */
ad.widget.imageplus.v2.BaseBox.prototype.getAdRect = function () {
    throw new Error('`getAdRect` must be implemented');
};
