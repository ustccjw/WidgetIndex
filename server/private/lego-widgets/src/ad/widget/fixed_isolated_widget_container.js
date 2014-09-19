/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/widget/fixed_isolated_widget_container.js
 * desc:    宽和高固定的隔离容器，widget会被绘制的shadow dom或iframe中
 * author:  zhouminming01@baidu.com
 * version: $Revision$
 * date:    $Date: 2014/03/26 11:37:03$
 */

goog.require('ui.events');
goog.require('ad.url');
goog.require('ad.dom');
goog.require('ad.widget.WidgetContainer');
goog.require('ad.widget.Widget');

goog.provide('ad.widget.FixedIsolatedWidgetContainer');

/**
 * 提供隔离环境（iframe/shadow dom）的容器，iframe的宽度和高度固定
 * 需要预先设置_isolatedHostWidth和_isolatedHostHeight
 * 推荐继承后使用
 * 可以更新隔离容器宽和高
 *
 * @param {Object} data 数据集合.
 * @param {string=} opt_titlePrefix 监控title前缀.
 * @extends {ad.widget.WidgetContainer}
 * @constructor
 */
ad.widget.FixedIsolatedWidgetContainer = function(data, opt_titlePrefix) {
    /**
     * host容器的高度
     * @type {number}
     */
    this._isolatedHostHeight = 0;

    /**
     * host容器的宽度
     * @type {number}
     */
    this._isolatedHostWidth = 0;
    /**
     * 子widget的html是否是第三方页面
     * @type {boolean}
     */
    this._thirdPartyContent = false;

    ad.widget.WidgetContainer.apply(this, arguments);

    /**
     * 隔离容器是否已经加载完成
     * @type {boolean}
     */
    this._isolatedLoaded = false;

    /**
     * iframe容器的id
     * @type {string}
     */
    this._isolatedHostId = this.getId('widget-isolated-host');

    /**
     * host元素
     * @type {Element}
     */
    this._isolatedHost = null;

    /**
     * 用于创建隔离环境的iframe元素
     * @type {Element?}
     */
    this._isolatedIframe = null;

    /**
     * iframe的document
     * @type {Element}
     */
    this._isolatedRoot = null;

    /**
     * widgets的html
     * @type {string}
     */
    this._widgetsHTML = '';
};
baidu.inherits(ad.widget.FixedIsolatedWidgetContainer, ad.widget.WidgetContainer);

/**
 * 获取isolatedRoot
 *
 * @return {Element}
 */
ad.widget.FixedIsolatedWidgetContainer.prototype.getIsolatedRoot = function() {
    return this._isolatedRoot;
};

/**
 * @inheritDoc
 */
ad.widget.FixedIsolatedWidgetContainer.prototype.getMainHtml = function() {
    this._widgetsHTML = this._render.process(this._widgets);
    this._data['_content'] = ''
        + '<div id="' + this._isolatedHostId + '"'
        +     'style="width:' + this._isolatedHostWidth + 'px;'
        +         'height:' + this._isolatedHostHeight + 'px;'
        +         'overflow:hidden;box-sizing:content-box;position:static;'
        +         'display:block;padding:0;margin:0;border:none;"'
        + '></div>';

    // NOTE: 调用父元素的父元素的getMainHtml方法
    return ad.widget.Widget.prototype.getMainHtml.call(this);
};

/**
 * @inheritDoc
 */
ad.widget.FixedIsolatedWidgetContainer.prototype.enterDocument = function () {
    var me = this;
    var styleHtml = '';

    me._isolatedHost = ad.dom.g(me._isolatedHostId);

    if (me._thirdPartyContent) {
        me._writeIntoIsolatedContainer(styleHtml);
        return;
    }

    styleHtml = '<style>body {margin:0;background:transparent;}</style>';
    // 获取样式
    // NOTE：直接抓取所有的样式放到iframe中
    if (!COMPILED) {
        var loadedCount = 0;
        /**
         * @param {XMLHttpRequest} xhr
         * @param {string=} opt_css
         */
        var concatCSS = function (xhr, opt_css) {
            styleHtml += '<style>' + opt_css + '</style>';
            loadedCount++;
            if (loadedCount === goog.asyncStyles.length) {
                me._writeIntoIsolatedContainer(styleHtml);
            }
        };

        for (var i = 0; i < goog.asyncStyles.length; i++) {
            var url = goog.asyncStyles[i];
            if (url.indexOf('http://') === -1) {
                url = ad.url.dirname(location.href.replace(/\?.*/, '')) + url;
            }
            url = ad.url.realpath(url);
            url = url.replace(/http:\/\/([^\/]+)\//g, '/');
            url = '/combine/all.css?uris='
                + encodeURIComponent(url)
                + '&.timestamp=' + Math.random();
            baidu.ajax.get(url, concatCSS);
        }
    }
    else {
        styleHtml += '<style>'
            + AD_STYLE_CONTENT.replace(/#canvas/g, '#' + this.getId('isolated-canvas'))
            + '</style>';
        me._writeIntoIsolatedContainer(styleHtml);
    }
};

/**
 * 创建隔离容器，并将html写入到隔离容器中
 * @private
 * @param {string} styleHtml
 */
ad.widget.FixedIsolatedWidgetContainer.prototype._writeIntoIsolatedContainer = function (styleHtml) {
    var me = this;
    var shadowRoot;
    if (!me._thirdPartyContent && (shadowRoot = me._createShadowRoot(me._isolatedHost))) {
        me._isolatedRoot = shadowRoot;
        me.forEach(function (widget) {
            // 更新子widget的document(此处为shadowRoot)
            widget.setShadowRoot(shadowRoot);
        });
        shadowRoot.innerHTML = [
            // 加这个div是为了保证impl里的样式能正确应用到物料上
            // 加这个div是为了让能在此容器上添加一些class，能在其他地方控制容器的样式
            '<div id="' + me.getId('inner-canvas') + '">',
            '<div id="' + me.getId('isolated-canvas') + '">',
            styleHtml,
            me._widgetsHTML,
            '</div>',
            '</div>'
        ].join('');
        // 触发load事件，通知子类shadowDom内部渲染完成
        me._isolatedLoaded = true;
        me.trigger(ui.events.LOAD, me._isolatedRoot);
        ad.widget.FixedIsolatedWidgetContainer.superClass.enterDocument.call(me);
    }
    else {
        me._isolatedHost.innerHTML = ''
            + '<iframe frameborder="0" allowTransparency="true" scrolling="no" vspace="0" hspace="0"'
            +     'style="'
            +     'width:' + me._isolatedHostWidth + 'px;'
            +     'height:' + me._isolatedHostHeight + 'px;'
            +     'position:static;display:block;padding:0;margin:0;border:none;vertical-align:baseline;"'
            + '></iframe>';
        var iframe = me._isolatedIframe = baidu.dom.first(me._isolatedHost);
        // 写入iframe
        var html = me._thirdPartyContent
            ? me._widgetsHTML
            : ''
                + '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>'
                + '<body id="' + me.getId('isolated-canvas') + '" style="'
                +     'width:' + me._isolatedHostWidth + 'px;'
                +     'height:' + me._isolatedHostHeight + 'px;'
                + '">'
                + '<div id="' + me.getId('inner-canvas') + '">'
                + styleHtml + me._widgetsHTML
                + '</div>'
                + '</body></html>';

        ad.dom.writeIntoIframe(iframe, html, function (win, doc) {
            me.forEach(function (widget) {
                // 更新子widget的document
                widget.setIsolatedDocument(doc);
            });

            me._isolatedRoot = doc.body;
            // 触发load事件，通知子类iframe内部重新加载了
            me._isolatedLoaded = true;
            me.trigger(ui.events.LOAD, me._isolatedRoot);
            // 第一次load之后，再调用子widget的enterDocument
            ad.widget.FixedIsolatedWidgetContainer.superClass.enterDocument.call(me);
        });
    }
};

/**
 * 语法糖函数，解决了load事件即可能是同步又可能是异步的问题
 *
 * 1. 在DEBUG时，load事件的触发是异步的；
 * 2. 在编译后，如果使用iframe实现隔离环境，则load事件是异步的；
 * 3. 在编译后，如果使用shadow dom实现隔离环境，则load事件是同步的；
 *
 * 此函数注册回调函数，确保了回调一定在load完成后执行，如果已经完成则立即执行
 *
 * @param {Function} callback
 */
ad.widget.FixedIsolatedWidgetContainer.prototype.afterLoaded = function (callback) {
    this.addListener(ui.events.LOAD, callback);
    if (this._isolatedLoaded) {
        callback.call(this, this._isolatedRoot);
    }
};

/**
 * 设置隔离容器的高度
 * @param {number} height 隔离容器的高度
 */
ad.widget.FixedIsolatedWidgetContainer.prototype.setIsolatedHostHeight = function (height) {
    this._isolatedHostHeight = height;
    this._isolatedHost.style.height = height + 'px';
    if (this._isolatedIframe) {
        this._isolatedIframe.style.height = height + 'px';
        this._isolatedRoot.style.height = height + 'px';
    }
};

/**
 * 设置隔离容器的宽度
 * @param {number} width 隔离容器的高度
 */
ad.widget.FixedIsolatedWidgetContainer.prototype.setIsolatedHostWidth = function (width) {
    this._isolatedHostWidth = width;
    this._isolatedHost.style.width = width + 'px';
    if (this._isolatedIframe) {
        this._isolatedIframe.style.width = width + 'px';
        this._isolatedRoot.style.width = width + 'px';
    }
};

/**
 * 在host元素上创建shadow root
 *
 * NOTE: shadow dom中不支持link标签，而在开发模式下，无法同步获取样式。
 * 故暂时不支持shadow dom
 *
 * @param {Element} host .
 * @return {Element} root .
 */
ad.widget.FixedIsolatedWidgetContainer.prototype._createShadowRoot = function (host) {
    var prefixs = ['', 'webkit', 'moz', 'ms'];
    var prefix;
    var root;

    for (var i = 0, l = prefixs.length; i < l; i++) {
        prefix = prefixs[i];
        var methodName = 'CreateShadowRoot';
        var rootName = 'ShadowRoot';

        if (prefix) {
            methodName = prefix + methodName;
            rootName = prefix + rootName;
        }
        else {
            methodName = 'createShadowRoot';
            rootName = 'shadowRoot';
        }

        if (typeof host[methodName] === 'function') {
            root = host[rootName];
            if (root) {
                root.innerHTML = '';
                return root;
            }
            root = host[methodName]();
            root.resetStyleInheritance = true;
            return root;
        }
    }

    return null;
};

/**
 * 获取容器canvas元素
 * @return {Element}
 */
ad.widget.FixedIsolatedWidgetContainer.prototype.getIsolatedRootCanvas = function() {
    if (this._thirdPartyContent) {
        // 如果是第三方内容则直接返回iframe的document.body
        // 即返回值和getIsolatedRoot一致
        return this._isolatedRoot;
    }

    if (this._isolatedIframe) {
        var doc = this._isolatedIframe.contentDocument || this._isolatedIframe.contentWindow.document;
        return doc.getElementById(this.getId('inner-canvas'));
    }
    else {
        return this._isolatedRoot.getElementById(this.getId('inner-canvas'));
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100 : */
