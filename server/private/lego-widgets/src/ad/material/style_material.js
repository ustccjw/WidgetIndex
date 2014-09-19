/***************************************************************************
 * 
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/material/style_material.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2012/11/26 15:40:59$
 */
goog.require('base.EventDispatcher');
goog.require('ui.events');
goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.render.StyleRender');
goog.require('ad.plugin.BackgroundImage');
goog.require('ad.plugin.Speedup');
goog.require('ad.material.AbstractStyleMaterial');
goog.require('ad.env');

goog.provide('ad.StyleMaterial');

/**
 * @param {string} canvasId 画布的Id.
 * @param {ad.LayoutType} layout 布局数据.
 * @param {Object} adConfig 配置数据
 * @extends {base.EventDispatcher}
 * @implements {ad.material.AbstractStyleMaterial}
 * @constructor
 */
ad.StyleMaterial = function(canvasId, layout, adConfig) {
    base.EventDispatcher.call(this);

    /**
     * @private
     * @type {string}
     */
    this._canvasId = canvasId;

    /**
     * @private
     * @type {Object}
     */
    this._layout = layout;

    /**
     * @private
     * @type {Object}
     */
    this._adConfig = adConfig;

    /**
     * style唯一的标识Id.
     * @type {string}
     * @private
     */
    this._styleId = 'ad-style-' + canvasId;

    /**
     * @private
     * @type {Object.<string, ad.plugin.Plugin>}
     */
    this._plugins = {};

    // 给物料绑定插件
    this.registerAllPlugins();

    /**
     * @private
     * @type {ad.render.Render}
     */
    this._render = new ad.render.StyleRender(layout);

    /**
     * @private
     * @type {Object.<string, ad.widget.Widget>}
     */
    this._widgets = this._createWidgets(layout, adConfig);

    /**
     * 事件调用历史
     * @private
     * @type {Object.<string, Array>}
     */
    this._eventHistory = {};

    /**
     * widget 要通过 material 代理出去的事件
     */
    this.delegateEvents = (this.delegateEvents || []).concat([ui.events.NEW_AD_CANVAS]);
};
baidu.inherits(ad.StyleMaterial, base.EventDispatcher);

/**
 * 调用示例：
 * inst.getWidget(0, 1)
 * 或
 * inst.getWidget('r0c1')
 *
 * @override
 * @expose
 * @param {...(string|number)} var_args 索引序列
 * @return {?ad.widget.Widget} 
 */
ad.StyleMaterial.prototype.getWidget = function(var_args) {
    var key = '';
    if (!baidu.lang.isString(var_args)) {
        var indexes = Array.prototype.slice.call(arguments);
        if (!indexes.length) {
            return null;
        }
        for (var i = 0; i < indexes.length; i++) {
            if (i % 2) {
                key += 'c' + indexes[i];
            }
            else {
                key += 'r' + indexes[i];
            }
        }
    }
    else {
        key = /** @type {string} */ (var_args);
    }

    return this._widgets[key] || null;
};

/**
 * 获取画布元素.
 * @expose
 * @return {!Element} 画布所处的DOM元素.
 */
ad.StyleMaterial.prototype.getRoot = function() {
    var root = null;
    if (COMPILED) {
        /* jshint ignore:start */
        if (!ad.dom.g(this._canvasId)) {
            document.write('<div id="' + this._canvasId + '"></div>');
        }
        /* jshint ignore:end */
        root = ad.dom.g(this._canvasId);
    }
    else {
        root = ad.dom.g('canvas');
    }

    return /** @type {Element} */(root);
};

/**
 * 获取画布元素的Id.
 * @expose
 * @return {string} 画布元素的Id.
 */
ad.StyleMaterial.prototype.getId = function() {
    return (COMPILED ? this._canvasId : 'canvas');
};

/**
 * 遍历所有的widgets，执行回调函数.
 * @expose
 * @param {function(ad.widget.Widget, string)} callback widget的回调函数.
 */
ad.StyleMaterial.prototype.forEach = function(callback) {
    if (!this._widgets) {
        return;
    }
    baidu.object.each(this._widgets, function(item, key) {
        callback(/** @type {ad.widget.Widget} */(item), key);
    });
};

/**
 * 创建物料的样式，这个函数应该只需要被调用一次.
 * @private
 */
ad.StyleMaterial.prototype._createStyles = function() {
    // 无线中物料的css由广告位去创建<style>标签，所以不需要在这里创建
    // 但是无线广告在SDK预览(window['IS_PREVIEW'] == true)中没有上面的逻辑，仍然需要创建style标签
    if (!FLAGS_wireless || window['IS_PREVIEW']) {
        if (COMPILED && typeof AD_STYLE_CONTENT !== 'undefined') {
            if (!ad.dom.g(this._styleId)) {
                var styles = AD_STYLE_CONTENT.replace(/#canvas/g, '#' + this._canvasId);
                ad.dom.createStyles(styles, this._styleId, this.getRoot());
            }
        }
    }
};

/**
 * 物料显示前运行的函数
 * @expose
 */
ad.StyleMaterial.prototype.beforeShow = function() {
    try {
        this.trigger(ui.events.BEFORE_MATERIAL_SHOW);
    }
    catch (ex) {
        // TODO(user) Catch the error message.
    }
};

/**
 * 物料显示前运行的函数
 * @private
 */
ad.StyleMaterial.prototype.afterShow = function() {
    try {
        this.trigger(ui.events.AFTER_MATERIAL_SHOW);
    }
    catch (ex) {
        // TODO(user) Catch the error message.
    }
};

/**
 * @expose
 * @return {string}
 */
ad.StyleMaterial.prototype.getMainHtml = function() {
    var html = this._render.process(this._widgets);
    var readerTime = '';
    if (FLAGS_wireless) {
        html = ad.base.removeLinkTarget(html);
    }
    if (COMPILED && typeof document.getElementById !== 'function') {
        readerTime = ' data-time="' + (new Date() - 0) + '"';
    }
    return html;
};

/**
 * 物料的初始化
 */
ad.StyleMaterial.prototype.init = function() {
    var me = this;
    this.forEach(function(widget) {
        baidu.each(me.delegateEvents, function(eventName) {
            widget.addListener(eventName, function() {
                var args = [].slice.call(arguments, 0);
                args.unshift(eventName);

                me.trigger.apply(me, args);
            });
        });
    });
    var root = this.getRoot();
    if (root) {
        if (ad.env.isSiva() || FLAGS_auto_decorate) {
            try {
                // #canvas ->
                //   ad-material-wrapper ->
                //     ad-material-inside ->
                //       layout block
                var wrapper = root.children[0];
                wrapper = wrapper && wrapper.children[0];
                this._render.attachToElements(this._widgets, wrapper);
            }
            catch (e) {
                // 如果失败了，走正常的逻辑
                root.innerHTML = this.getMainHtml();
            }
        }
        else {
            root.innerHTML = this.getMainHtml();
        }

        // 这个属性是一个标识，QA用来识别物料是否渲染完毕
        root.setAttribute('data-rendered', 'true');
    }
};

/**
 * 展示物料，这个函数应该只会被调用一次.
 * @expose
 */
ad.StyleMaterial.prototype.show = function() {
    this.beforeShow();

    this._createStyles();

    // init
    this.init();
    this.forEach(function(widget, key) {
        widget.init();
    });

    // trigger enterDocument event
    this.forEach(function(widget, key) {
        widget.enterDocument();
    });

    // trigger bindEvent event
    this.forEach(function(widget, key) {
        widget.bindEvent();
    });

    baidu.show(this.getId());

    // 显示背景图
    this.afterShow();

    // PS-IS项目中，异步模式下翻页的时候，会调用所有相关的handler，把资源释放掉
    var me = this;
    ad.base.registerUnloadHandler(function() {
        me.dispose();
    });
};

/**
 * 用layout和数据创建Widget
 * @param {ad.LayoutType} layout 布局数据.
 * @param {Object} adConfig 配置数据
 * @return {Object.<string, ad.widget.Widget>}
 */
ad.StyleMaterial.prototype._createWidgets = function(layout, adConfig) {
    var that = this;
    var widgets = {};
    this._layoutWalker(layout, function(info, key) {
        var Clazz;
        // 兼容 {..., 'ns': 'ad.widget.H1'} 和 {..., 'ns': ad.widget.H1} 两种情况
        if (baidu.lang.isString(info['ns'])) {
            Clazz = ad.base.getObjectByName(info['ns']);
        }
        else {
            Clazz = info['ns'];
        }
        var data = adConfig[info['index']];
        if (Clazz && data) {
            widgets[key] = new /** @type {Function} */ (Clazz)(data);
            widgets[key].setId(that.getId() + '-' + key);
        }
    });
    return widgets;
};

/**
 * 给物料绑定插件
 * @private
 */
ad.StyleMaterial.prototype.registerAllPlugins = function() {
    if (typeof RT_CONFIG !== 'undefined') {
        var plugins = /** @type {Array.<ad.plugin.Plugin>} */ (RT_CONFIG['__plugins']);
        if (plugins && plugins.length) {
            for (var i = 0; i < plugins.length; i++) {
                plugins[i].attachTo(this);
            }
        }
    }
};

/**
 * 遍历layout
 * @private
 * @param {ad.LayoutType} layout 布局数据.
 * @param {function(Object, string)} callback 回调
 */
ad.StyleMaterial.prototype._layoutWalker = function(layout, callback) {
    /**
     * 遍历单元格
     * @param {ad.LayoutType|ad.LayoutCellType} cell 布局单元格.
     * @param {string} key 单元格key
     */
    function walk(cell, key) {
        if ((!cell['rows'] || cell['rows'].length === 0)
            && (!cell['cols'] || cell['cols'].length === 0)
            && cell['ns']
        ) {
            callback(cell, key);
        }
        if (cell['rows']) {
            var rows = cell['rows'];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var rowId = key + 'r' + i;
                walk(row, rowId);
            }
        }
        if (cell['cols']) {
            var cols = cell['cols'];
            for (var j = 0; j < cols.length; j++) {
                var col = cols[j];
                var colId = key + 'c' + j;
                walk(col, colId);
            }
        }
    }

    walk(layout, '');
};

/**
 * @inheritDoc
 */
ad.StyleMaterial.prototype.trigger = function(eventType, var_args) {
    var args = [].slice.call(arguments, 0);
    this._eventHistory = this._eventHistory || {};

    // XXX: 这个一定要在superClass的trigger之前进行，否则会导致已加载的异步插件的事件不会触发
    if (!this._eventHistory[eventType]) {
        this._eventHistory[eventType] = [];
    }
    this._eventHistory[eventType].push(args.slice(1));

    var result = ad.StyleMaterial.superClass.trigger.apply(this, args);
    return result;
};

/**
 * 获取指定事件的调用历史
 * @param {string} eventType 事件类型
 * @return {Array} 事件调用历史
 */
ad.StyleMaterial.prototype.getEventHistory = function(eventType) {
    this._eventHistory = this._eventHistory || {};

    return this._eventHistory[eventType] || [];
};

/**
 * 添加监听器
 * @param {string} eventType 事件类型.
 * @param {Function} listener 监听器.
 * @param {boolean} opt_isRunMissingEvent 是否运行错过了的事件
 */
ad.StyleMaterial.prototype.addListener = function(eventType, listener, opt_isRunMissingEvent) {
    ad.StyleMaterial.superClass.addListener.call(this, eventType, listener);

    var isRunMissingEvent = !!opt_isRunMissingEvent;
    if (isRunMissingEvent) {
        this.replayEvent(eventType, listener);
    }
};

/**
 * 对已经触发过的事件，跑一遍指定的响应函数
 * @param {string} eventType 事件类型.
 * @param {Function} listener 监听器.
 */
ad.StyleMaterial.prototype.replayEvent = function(eventType, listener) {
    var history = this.getEventHistory(eventType);
    for (var i = 0; i < history.length; i++) {
        listener.apply(this, history[i]);
    }
};

/**
 * 物料销毁的工作.
 */
ad.StyleMaterial.prototype.dispose = function() {
    this.forEach(function(widget, key) {
        widget.dispose();
    });

    var root = ad.dom.g(this.getId());
    if (root) {
        // trigger dispose event
        root.innerHTML = '';
    }

    root = null;
    this._eventHistory = null;

    ad.StyleMaterial.superClass.dispose.call(this);
};

/* jshint ignore:start */
if (!COMPILED) {
    if (!ad.dom.g('canvas')) {
        document.write('<div id="canvas" style="display:none"></div>');
    }
}
/* jshint ignore:end */

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
