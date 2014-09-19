/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/widget/isolated_widget_container.js
 * desc:    隔离的容器，widget会被绘制的shadow dom或iframe中
 * author:  zhouminming01@baidu.com
 * version: $Revision$
 * date:    $Date: 2014/03/26 11:37:03$
 */

goog.require('ui.events');
goog.require('ad.url');
goog.require('ad.dom');
goog.require('ad.widget.WidgetContainer');
goog.require('ad.widget.Widget');

goog.provide('ad.widget.IsolatedWidgetContainer');

/**
 * 提供隔离环境（iframe）的容器，iframe的宽度自适应父元素宽度
 * 高度自适应内容高度.
 *
 * @param {Object} data 数据集合.
 * @param {string=} opt_titlePrefix 监控title前缀.
 * @extends {ad.widget.WidgetContainer}
 * @constructor
 */
ad.widget.IsolatedWidgetContainer = function(data, opt_titlePrefix) {
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
     * host容器的高度
     * @type {number}
     */
    this._isolatedHostHeight = 0;

    /**
     * widgets的html
     * @type {string}
     */
    this._widgetsHTML = '';
};
baidu.inherits(ad.widget.IsolatedWidgetContainer, ad.widget.WidgetContainer);

/**
 * 获取isolatedRoot
 *
 * @return {Element}
 */
ad.widget.IsolatedWidgetContainer.prototype.getIsolatedRoot = function() {
    return this._isolatedRoot;
};

/**
 * @inheritDoc
 */
ad.widget.IsolatedWidgetContainer.prototype.getMainHtml = function() {
    this._widgetsHTML = this._render.process(this._widgets);
    this._data['_content'] = ''
        + '<div id="' + this._isolatedHostId + '"'
        +     'style="width:100%;height:auto;overflow:hidden;box-sizing:content-box;position:static;'
        +         'display:block;padding:0;margin:0;border:none;"'
        + '></div>';

    // NOTE: 调用父元素的父元素的getMainHtml方法
    return ad.widget.Widget.prototype.getMainHtml.call(this);
};

/**
 * @inheritDoc
 */
ad.widget.IsolatedWidgetContainer.prototype.enterDocument = function () {
    var me = this;
    var styleHtml = '';
    var enterDocument = function () {
        me._isolatedHost = baidu.g(me._isolatedHostId);
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
            ad.widget.IsolatedWidgetContainer.superClass.enterDocument.call(me);
        }
        else {
            me._isolatedHost.innerHTML = ''
                + '<iframe '
                +     'frameborder="0" allowTransparency="true" scrolling="no" vspace="0" hspace="0"'
                +     'style="width:100%;height:1px;position:static;'
                +         'display:block;padding:0;margin:0;border:none;vertical-align:baseline;"'
                + '></iframe>';
            var iframe = me._isolatedIframe = baidu.dom.first(me._isolatedHost);
            // 写入iframe
            var html = me._thirdPartyContent
                ? me._widgetsHTML
                : ''
                    + '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>'
                    + '<body id="' + me.getId('isolated-canvas') + '">'
                    + '<div id="' + me.getId('inner-canvas') + '">'
                    + styleHtml + me._widgetsHTML
                    + '</div>'
                    + '</body></html>';

            ad.dom.writeIntoIframe(iframe, html, function (win, doc) {
                me.forEach(function (widget) {
                    // 更新子widget的document
                    widget.setIsolatedDocument(doc);
                    // 监控子元素的resize事件
                    widget.addListener(ui.events.RESIZE, function () {
                        me.updateIsolatedContainerSize();
                    });
                });

                me._isolatedRoot = doc.body;
                // 因为IE6会在iframe高度改变时，load事件可能会触发
                // 所以这里有多次执行的风险
                // 但同时如果子widget有可能重写iframe，所以可能是真的onload了
                me.updateIsolatedContainerSize();
                // 触发load事件，通知子类iframe内部重新加载了
                me._isolatedLoaded = true;
                me.trigger(ui.events.LOAD, me._isolatedRoot);
                // 第一次load之后，再调用子widget的enterDocument
                ad.widget.IsolatedWidgetContainer.superClass.enterDocument.call(me);
            });
        }
    };

    if (me._thirdPartyContent) {
        enterDocument();
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
                enterDocument();
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
        enterDocument();
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
ad.widget.IsolatedWidgetContainer.prototype.afterLoaded = function (callback) {
    this.addListener(ui.events.LOAD, callback);
    if (this._isolatedLoaded) {
        callback.call(this, this._isolatedRoot);
    }
};

/**
 * 更新隔离容器的高度和宽度，注意被隐藏时，高度计算iframe内部高度是不准确的。
 */
ad.widget.IsolatedWidgetContainer.prototype.updateIsolatedContainerSize = function () {
    var iframe = this._isolatedIframe;
    if (!iframe) {
        return;
    }
    var doc = iframe.contentDocument || iframe.contentWindow.document;
    // 在移动浏览器中，iframe中的内容会无视iframe的高宽并撑开iframe
    // 故需要设置body的宽度为host的宽度，确保iframe的宽度为host的宽度
    doc.body.style.width = this._isolatedHost.offsetWidth + 'px';

    // 强制设置高度为0，方便计算合适的高度
    iframe.style.height = 0;

    // 自适应iframe高度，确保没有纵向滚动条
    // iphone、ipad等移动浏览会器忽略width/height自适应高度
    // NOTE: 没有支持Quirks mode
    this._isolatedHostHeight = Math.max(
        // 其他浏览器
        doc.body.scrollHeight,
        // IE7
        doc.documentElement.scrollHeight
    );
    iframe.style.height = this._isolatedHostHeight + 'px';
};

/**
 * 获取隔离容器的高度，必须在load之后调用。
 * 如果没加载完成则一率返回0
 *
 * @return {number} 隔离容器的高度
 */
ad.widget.IsolatedWidgetContainer.prototype.getIsolatedContainerHeight = function () {
    if (!this._isolatedLoaded) {
        return 0;
    }

    if (this._isolatedIframe) {
        return this._isolatedHostHeight;
    }
    else {
        return this._isolatedHost.offsetHeight;
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
ad.widget.IsolatedWidgetContainer.prototype._createShadowRoot = function (host) {
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
ad.widget.IsolatedWidgetContainer.prototype.getIsolatedRootCanvas = function() {
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
