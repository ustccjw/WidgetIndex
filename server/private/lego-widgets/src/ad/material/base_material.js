/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: base.js 18382 2013-03-14 14:44:55Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/material/base.js ~ 2012/06/04 21:53:40
 * @author songao(songao@baidu.com)
 * @version $Revision: 18382 $
 * @description
 * 物料的基类
 **/
goog.require('ad.lego');
goog.require('ad.dom');
goog.require('ad.base');
goog.require('ad.plugin.Plugin');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.WidgetContainer');
goog.require('ad.plugin.BackgroundImage');
goog.require('ad.plugin.Speedup');
goog.require('ad.material.AbstractStyleMaterial');
goog.require('ui.events');
goog.require('ad.env');

goog.provide('ad.material.BaseMaterial');

/**
 * 广告物料的展示入口, 主要角色如下:
 * <pre>
 * 1. 定位不同的Widget(可以设置自己的布局)
 * 2. 处理Widget的事件
 * </pre>
 * @param {string=} opt_canvasId 物料的容器Id.
 * @extends {ad.widget.WidgetContainer}
 * @implements {ad.material.AbstractStyleMaterial}
 * @constructor
 */
ad.material.BaseMaterial = function(opt_canvasId) {
    ad.widget.WidgetContainer.call(this, {});

    /**
     * @type {ad.render.RecursiveRender}
     */
    this._render = new ad.render.RecursiveRender({
        'block_class': 'ad-block'
    });

    /**
     * @private
     * @type {string}
     */
    this._canvasId = opt_canvasId || ad.lego.getId();

    /**
     * style唯一的标识Id.
     * @type {string}
     * @private
     */
    this._styleId = 'ad-style-' + this._canvasId;

    /**
     * 事件调用历史
     * @private
     * @type {Object.<string, Array>}
     */
    this._eventHistory = {};

    // 给物料绑定插件
    this.registerAllPlugins();

    /**
     * widget 要通过 material 代理出去的事件
     */
    this.delegateEvents = (this.delegateEvents || []).concat([ui.events.NEW_AD_CANVAS]);
};
baidu.inherits(ad.material.BaseMaterial, ad.widget.WidgetContainer);

/**
 * 获取画布元素.
 * @return {!Element} 画布所处的DOM元素.
 */
ad.material.BaseMaterial.prototype.getRoot = function() {
    if (COMPILED) {
        /* jshint ignore:start */
        if (!baidu.g(this._canvasId)) {
            document.write('<div id="' + this._canvasId + '"></div>');
        }
        /* jshint ignore:end */
        return baidu.g(this._canvasId);
    } else {
        return baidu.g('canvas');
    }
};

/**
 * 获取画布元素的Id.
 * @return {string} 画布元素的Id.
 */
ad.material.BaseMaterial.prototype.getId = function() {
    return (COMPILED ? this._canvasId : 'canvas');
};

/**
 * 创建物料的样式，这个函数应该只需要被调用一次.
 * @private
 */
ad.material.BaseMaterial.prototype._createStyles = function() {
    // 无线中物料的css由广告位去创建<style>标签，所以不需要在这里创建
    // 但是无线广告在SDK预览(window['IS_PREVIEW'] == true)中没有上面的逻辑，仍然需要创建style标签
    if (!FLAGS_wireless || window['IS_PREVIEW']) {
        if (COMPILED && typeof AD_STYLE_CONTENT !== 'undefined') {
            if (!baidu.g(this._styleId)) {
                var styles = AD_STYLE_CONTENT.replace(/#canvas/g, '#' + this._canvasId);
                ad.dom.createStyles(styles, this._styleId, this.getRoot());
            }
        }
    }
};

/** @inheritDoc */
ad.material.BaseMaterial.prototype.getMainHtml = function() {
    var html = this._render.process(this._widgets);
    var readerTime = '';
    if (FLAGS_wireless) {
        html = ad.base.removeLinkTarget(html);
    }
    if (COMPILED && typeof document.getElementById !== 'function') {
        readerTime = ' data-time="' + (new Date() - 0) + '"';
    }
    return '<div class="layout"' + readerTime + '>' + html + '</div>';
};

/**
 * 物料显示前运行的函数
 * @private
 */
ad.material.BaseMaterial.prototype.beforeShow = function() {
    try {
        this.trigger(ui.events.BEFORE_MATERIAL_SHOW);
    } catch (ex){}
};

/**
 * 物料显示前运行的函数
 * @private
 */
ad.material.BaseMaterial.prototype.afterShow = function() {
    try {
        this.trigger(ui.events.AFTER_MATERIAL_SHOW);
    } catch (ex){}
};

/** @override */
ad.material.BaseMaterial.prototype.init = function() {
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
                // canvas ->
                //   layout ->
                //     layout block
                this._render.attachToElements(this._widgets, root.children[0]);
            } catch(e) {
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

    ad.material.BaseMaterial.superClass.init.call(this);
};

/**
 * 展示物料，这个函数应该只会被调用一次.
 * @expose
 */
ad.material.BaseMaterial.prototype.show = function() {
    this.beforeShow();

    this._createStyles();

    this.init();
    this.enterDocument();
    this.bindEvent();

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
 * 给物料绑定插件
 * @private
 */
ad.material.BaseMaterial.prototype.registerAllPlugins = function() {
    if (typeof RT_CONFIG !== 'undefined') {
        var plugins = /** @type {Array.<ad.plugin.Plugin>} */ (RT_CONFIG['__plugins']);
        if (plugins && plugins.length) {
            for(var i = 0; i < plugins.length; i ++) {
                var plugin = /** @type {ad.plugin.Plugin} */(plugins[i]);
                plugin.attachTo(this);
            }
        }
    }
};

/**
 * @inheritDoc
 */
ad.material.BaseMaterial.prototype.trigger = function(eventType, var_args) {
    var args = [].slice.call(arguments, 0);
    this._eventHistory = this._eventHistory || {};

    // XXX: 这个一定要在superClass的trigger之前进行，否则会导致已加载的异步插件的事件不会触发
    if (!this._eventHistory[eventType]) {
        this._eventHistory[eventType] = [];
    }
    this._eventHistory[eventType].push(args.slice(1));

    var result = ad.material.BaseMaterial.superClass.trigger.apply(this, args);
    return result;
};

/**
 * 获取指定事件的调用历史
 * @param {string} eventType 事件类型
 * @return {Array} 事件调用历史
 */
ad.material.BaseMaterial.prototype.getEventHistory = function(eventType) {
    this._eventHistory = this._eventHistory || {};

    return this._eventHistory[eventType] || [];
};

/**
 * 添加监听器
 * @param {string} eventType 事件类型.
 * @param {Function} listener 监听器.
 * @param {boolean=} opt_isRunMissingEvent 是否运行错过了事件
 * @override
 */
ad.material.BaseMaterial.prototype.addListener = function(eventType, listener, opt_isRunMissingEvent) {
    ad.material.BaseMaterial.superClass.addListener.call(this, eventType, listener);

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
ad.material.BaseMaterial.prototype.replayEvent = function(eventType, listener) {
    var history = this.getEventHistory(eventType);
    for (var i = 0; i < history.length; i++) {
        listener.apply(this, history[i]);
    }
};

/**
 * 物料销毁的工作.
 * @expose
 */
ad.material.BaseMaterial.prototype.dispose = function() {
    ad.material.BaseMaterial.superClass.dispose.call(this);

    var root = baidu.g(this.getId());
    if (root) {
        // trigger dispose event
        root.innerHTML = '';
    }

    root = null;
    this._eventHistory = null;
};

/* jshint ignore:start */
if (!COMPILED) {
    if (!baidu.g('canvas')) {
        document.write('<div id="canvas" style="display:none"></div>');
    }
}
/* jshint ignore:end */














/* vim: set ts=4 sw=4 sts=4 tw=100: */
