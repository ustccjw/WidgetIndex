/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 18552 2013-03-22 08:02:26Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/widget.js ~ 2012/06/04 14:57:39
 * @author loutongbing
 * @version $Revision: 18552 $
 * @description
 * 每个模块的基类??
 **/
goog.require('ad.base');
goog.require('ad.env');
goog.require('ad.render.Template');
goog.require('base.EventDispatcher');
goog.require('er.template');
goog.require('ui.events');

goog.provide('ad.widget.Widget');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {base.EventDispatcher}
 */
ad.widget.Widget = function(data) {
    base.EventDispatcher.call(this);

    /**
     * 默认配置
     * @type {Object.<string, *>}
     * @protected
     */
    this._default;

    /**
     * 模板的名字
     * @type {string}
     */
    this._view;

    /**
     * 唯一的标识Id.
     * @type {string}
     * @private
     */
    this._id = 'ad-w-' + ad.base.uuid();

    /**
     * 设置widget所处隔离容器的document，
     * 默认为js所加载位置的document。
     * @type {Document}
     */
    this._isolatedDoc = null;

    /**
     * 设置widget所处shadow root，
     * 默认为js所加载位置的shadow root。
     * @type {Element}
     */
    this._shadowRoot = null;

    this.setData(data);
};
baidu.inherits(ad.widget.Widget, base.EventDispatcher);
ad.render.Template.setImpl(function(template, data) {
    return Mustache.render(template, data);
});

/**
 * 有些事件需要延迟触发，解决Mobile Weigou中遇到的统计问题.
 * @param {string} eventType 事件类型.
 * @param {...*} var_args 自定义参数.
 */
ad.widget.Widget.prototype.delayTrigger = function(eventType, var_args) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 0);
    ad.base.setTimeout(function() {
        me.trigger.apply(me, args);
    }, 100);
};

/**
 * @override
 */
ad.widget.Widget.prototype.trigger = function(eventType, var_args) {
    if (!this._listeners[eventType]) {
        return true;
    }

    var i;
    var handlers = this._listeners[eventType];
    var len = handlers.length;
    var args = Array.prototype.slice.call(arguments, 1);
    var result = true;

    for (i = len - 1; i >= 0; i--) {
        var fn = this._listeners[eventType][i];
        if (fn) {
            if (false === fn.apply(this, args)) {
                result = false;
                break;
            }
        }
    }
    return result;
};

/**
 * 渲染，返回HTML即可
 * @expose
 * @return {string} 最终的html代码.
 */
ad.widget.Widget.prototype.getMainHtml = function() {
    if (!this._view || !this._data) {
        throw new Error('Widget\'s view and data can not be undefined.');
    }

    var me = this;
    var template = this.tpl(this._view);
    var data = baidu.extend(this._data, {
        '_id' : function() {
            return function(text, render) {
                return me.getId(text);
            };
        }
    });
    var html = ad.render.Template(template, data);
    return html;
};

/**
 * 数据源更改之后重新渲染Widget，根据不同的Widget实现，可能
 * 需要重新绑定处理事件.
 */
ad.widget.Widget.prototype.render = function() {
    var me = this;
    var root = me.getRoot();
    if (root) {
        var html = me.getMainHtml();
        root.innerHTML = html;
    }
};

/**
 * 初始化阶段.
 * @method
 */
ad.widget.Widget.prototype.init = baidu.fn.blank;

/**
 * 处理DOM节点的展示状态.
 * @method
 */
ad.widget.Widget.prototype.enterDocument = baidu.fn.blank;

/**
 * 绑定事件处理函数.
 * @method
 */
ad.widget.Widget.prototype.bindEvent = baidu.fn.blank;

/**
 * @param {Element} root 根节点.
 */
ad.widget.Widget.prototype.setRoot = function(root) {
    if (root) {
        root.id = this.getId();
    }
};

/**
 * 获取控件数据集合或者部分数据.
 * @param {string=} opt_key 获取某个key的内容.
 * @param {?=} opt_defaultValue 如果key对应的值不存在，返回这个默认值.
 * @return {?} data 数据集合.
 */
ad.widget.Widget.prototype.getData = function(opt_key, opt_defaultValue) {
    if (opt_key) {
        var val = ad.base.getObjectByName(/** @type {string} */(opt_key), this._data);
        if (val == null && typeof opt_defaultValue !== 'undefined') {
            return opt_defaultValue;
        }
        return val;
    }
    else {
        return this._data;
    }
};

/**
 * @param {Object=} data 数据集合.
 */
ad.widget.Widget.prototype.setData = function(data) {
    if (data) {
        this._data = baidu.object.extend(this._default || {}, data);
    }
    this.patchData();
};

/**
 * 修订额外的配置数据，某些widget可能会用到，比如video
 */
ad.widget.Widget.prototype.patchData = function() {
    // TODO
};

/**
 * 获取控件所处的元素根节点.
 * @return {Element} Widget元素的根节点.
 * @expose
 */
ad.widget.Widget.prototype.getRoot = function() {
    return this.getDocument().getElementById(this.getId());
};

ad.widget.Widget.prototype.getShadowRootWrapper = function() {
    var shadowRoot = this._shadowRoot;
    if (!shadowRoot) {
        return null;
    }
    var wrapper = {};
    var attrInShadowRoot = ['getElementById'];
    var attrInDocument = ['createElement', 'createDocumentFragment', 'createTextNode', 'createAttribute'];
    for (var i = 0; i < attrInShadowRoot.length; i++) {
        var key = attrInShadowRoot[i];
        wrapper[key] = baidu.fn.bind(shadowRoot[key], shadowRoot);
    }
    for (var i = 0; i < attrInDocument.length; i++) {
        var key = attrInDocument[i];
        wrapper[key] = baidu.fn.bind(document[key], document);
    }
    return wrapper;
};

/**
 * 获取widget的DOM元素所处document.
 * @return {Document|Object}
 * @expose
 */
ad.widget.Widget.prototype.getDocument = function() {
    return this._isolatedDoc || this.getShadowRootWrapper() || document;
};

/**
 * this.getId('body') -> ad-w-x32df-body
 * @param {string=} opt_suffix Id的后缀.
 * @return {string} 生成的Id.
 * @expose
 */
ad.widget.Widget.prototype.getId = function(opt_suffix) {
    if (opt_suffix) {
        return this._id + '-' + opt_suffix;
    }
    else {
        return this._id;
    }
};

/**
 * 设置id
 * @param {string} id 容器id.
 */
ad.widget.Widget.prototype.setId = function(id) {
    this._id = id;
};

/**
 * @param {string} name 模板名称.
 * @return {string} 模板代码.
 */
ad.widget.Widget.prototype.tpl = function(name) {
    return er.template.get(name);
};

/**
 * 显示Widget
 */
ad.widget.Widget.prototype.show = function() {
    var root = this.getRoot();
    if (root) {
        baidu.show(root);
    }
};

/**
 * 隐藏Widget
 */
ad.widget.Widget.prototype.hide = function() {
    var root = this.getRoot();
    if (root) {
        baidu.hide(root);
    }
};

/**
 * @param {string|Object} title 日志的标识，比如标题，链接，按钮等等.
 * @param {string=} opt_xp XPath，可选，一般来说是用不到的.
 * @expose
 */
ad.widget.Widget.prototype.sendLog = function(title, opt_xp) {
    if (baidu.lang.isString(title)) {
        // 原来老的方案
        this.trigger(ui.events.SEND_LOG, {
            'action': title,
            'xp': opt_xp || title
        });
    }
    else {
        // 新的方案，请参考: ad.impl.plugin.VideoPowerlinkBasic
        // title的类型是Object，可以包含如下的属性：
        // {action: string, __node: Element}
        // 当实现一个plugin的时候，可以监听所有Widget的SEND_LOG事件（不是特别好）
        this.trigger(ui.events.SEND_LOG, /** @type {Object} */(title));
    }
};

/**
 * widget的销毁，某些widget可能会用到
 */
ad.widget.Widget.prototype.dispose = function() {
    var root = this.getRoot();
    if (root) {
        root.innerHTML = '';
        root.parentNode.removeChild(root);
        root = null;
    }
    ad.widget.Widget.superClass.dispose.call(this);
};

/**
 * 清空掉widget的dom内容，但保留root
 */
ad.widget.Widget.prototype.clearRoot = function() {
    var root = this.getRoot();
    if (root) {
        root.innerHTML = '';
        root = null;
    }
};

/**
 * 修订title2，不缓存修改记录，供rewriteTitle2，replayRewrite调用
 * @param {Element} parent 父节点.
 * @param {string} prefix title2前缀或title2.
 * @param {boolean=} opt_isReplace ? 添加前缀或全部替换 false表示添加前缀， true表示全部替换.
 */
ad.widget.Widget.prototype._rewriteTitle2 = function(parent, prefix, opt_isReplace) {
    var as;
    var title2;

    if (parent) {
        if (parent.nodeName === 'A') {
            as = [parent];
        }
        else {
            as = parent.getElementsByTagName('a');
        }
    }
    else {
        as = this.getRoot().getElementsByTagName('a');
    }

    if (as && as.length) {
        for (var i = 0; i < as.length; i++) {
            if (!prefix && opt_isReplace) {
                // 如果prefix为空且opt_isReplace为true，则移除title2
                as[i].removeAttribute('title2');
            }
            else {
                // 否则设置title2
                // * 情况一：本来就存在title2，需要更新
                // * 情况二：原来不存在title2，需要新增
                title2 = baidu.dom.getAttr(as[i], 'title2') || '';
                title2 = opt_isReplace ? prefix : prefix + title2;
                baidu.dom.setAttr(as[i], 'title2', title2);
            }
        }
    }
};

/**
 * 修订title2
 * @param {Element} parent 父节点.
 * @param {string} prefix title2前缀或title2.
 * @param {boolean=} isReplace 添加前缀或全部替换 false表示添加前缀， true表示全部替换.
 */
ad.widget.Widget.prototype.rewriteTitle2 = function(parent, prefix, isReplace) {
    this._rewriteTitle2(parent, prefix, isReplace);

    this.recordRewrite([].slice.call(arguments, 0));
};


/**
 * 记录修订title2的历史
 * @param {Array.<*>} args rewriteTitle2的参数
 */
ad.widget.Widget.prototype.recordRewrite = function(args) {
    if (!this.rewriteQueue) {
        this.rewriteQueue = [];
    }

    this.rewriteQueue.push(args);
};

/**
 * 对指定DOM节点重跑title2的重写过程
 * @param {Element} ele 要重写title2的父节点
 */
ad.widget.Widget.prototype.replayRewrite = function(ele) {
    if (this.rewriteQueue) {

        // 动态数组，需要提前记录数组长度
        var len = this.rewriteQueue.length;
        for (var i = 0; i < len; i++) {
            var args = this.rewriteQueue[i];
            this._rewriteTitle2.apply(this, [ele].concat(args.slice(1)));
        }
    }
};

/**
 * 刷新
 * @param {HTMLElement=} root 根节点.
 * @param {Object=} data 配置数据.
 */
ad.widget.Widget.prototype.refresh = function(root, data) {
    var me = this;
    if (root) {
        me.setRoot(root);
    }
    me.setData(data);
    me.render();
    me.enterDocument();
    me.bindEvent();
};

/**
 * 设置isolated document，用于IsolatedWidgetContainer通知子widget所处的容器
 *
 * @param {Document} doc 根节点.
 */
ad.widget.Widget.prototype.setIsolatedDocument = function (doc) {
    this._isolatedDoc = doc;
};

/**
 * 返回isolated document
 * 如果返回空表示widget不在isolated widget内部
 *
 * @return {Document} doc 根节点.
 */
ad.widget.Widget.prototype.getIsolatedDocument = function () {
    return this._isolatedDoc;
};

/**
 * 设置shadow root，用于IsolatedWidgetContainer通知子widget所处的容器
 *
 * @param {Element} root 根节点.
 */
ad.widget.Widget.prototype.setShadowRoot = function (root) {
    this._shadowRoot = root;
};

/**
 * 返回shadow root
 * 如果返回空表示widget不在shadow root内部
 *
 * @return {Element} root 根节点.
 */
ad.widget.Widget.prototype.getShadowRoot = function () {
    return this._shadowRoot;
};







/* vim: set ts=4 sw=4 sts=4 tw=100 : */
