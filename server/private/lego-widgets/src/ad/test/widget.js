/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 12776 2012-10-15 03:08:37Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/widget.js ~ 2012/09/10 15:22:12
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 12776 $
 * @description
 *
 **/
goog.require('ad.test.ui');
goog.require('ad.test.url');
goog.require('app.event.EventTarget');

goog.provide('ad.test.Widget');


/**
 * @constructor
 * @param {string} name Widget的名字，不需要ad.widget的前缀.
 * @param {string} styles cssText的内容.
 * @param {string=} opt_ns 模块的命名空间，也可以通过name推导出来.
 * @extends {app.event.EventTarget}
 */
ad.test.Widget = function(name, styles, opt_ns) {
    app.event.EventTarget.call(this);

    /**
     * 标题栏上面的名字
     * @private
     * @type {string}
     */
    this._name = name;

    /**
     * 真正的命名空间
     * @private
     * @type {string}
     */
    this._ns = opt_ns || ('ad.widget.' + name);

    /**
     * @private
     * @type {string}
     */
    this._styles = styles;

    /**
     * @private
     * @type {Element}
     */
    this._root;

    /**
     * 模块标题(拖拽手把)
     * @private
     * @type {Element}
     */
    this._title;

    /**
     * @private
     * @type {Element}
     */
    this._canvas;

    /**
     * @private
     * @type {Element}
     */
    this._iframe;

    this._resizableHandler;

    this._draggableHandler;
};
baidu.inherits(ad.test.Widget, app.event.EventTarget);

/**
 * @param {string} ns the widget's namespace.
 * @return {?Object} widget's config info.
 */
ad.test.Widget.getInfo = function(ns) {
    for (var i = 0, result = ER_AD_WIDGET_LIST['page']['result'];
        i < result.length; i++) {
        var item = result[i];
        if (item['ns'] == ns) {
            return item;
        }
    }

    return null;
}

/**
 * 重新定位，对齐到网格
 * @param {Element} target Widget的root节点.
 * @param {number=} opt_gridSize 网格的大小，默认是10px.
 */
ad.test.Widget.snap = function(target, opt_gridSize) {
    var gridSize = parseInt(opt_gridSize || 10, 10);
    var half = gridSize >> 1;

    if (!baidu.g('snap-to-grid').checked) {
        return false;
    }

    var x1 = parseInt(target.style.left, 10);
    var y1 = parseInt(target.style.top, 10);

    var x2 = parseInt((x1 + half) / gridSize) * gridSize;
    var y2 = parseInt((y1 + half) / gridSize) * gridSize;

    target.style.left = x2 + 'px';
    target.style.top = y2 + 'px';
};

/**
 * @return {Element}
 */
ad.test.Widget.prototype.getRoot = function() {
    if (!this._root) {
        var html = this.toString();
        var dummy = document.createElement('DIV');
        dummy.innerHTML = html;

        this._root = dummy.firstChild;
    }

    return this._root;
};

/**
 * 获取模块对应的命名空间.
 * @return {string}
 */
ad.test.Widget.prototype.getNS = function() {
    return this._ns;
};

/**
 * Get the widget's name on the title bar.
 * @return {string}
 */
ad.test.Widget.prototype.getName = function() {
    return this._name;
};

ad.test.Widget.prototype.getTitle = function() {
    if (!this._title) {
        this._title = this._root.querySelector('h2');
    }

    return this._title;
};

/**
 * 聚焦的时候提升z-index
 */
ad.test.Widget.prototype.focus = function() {
    baidu.dom.setStyle(this.getRoot(), 'z-index', ad.test.ui.getNextZIndex());
    this.trigger(ui.events.FOCUS);
};

ad.test.Widget.prototype.toString = function() {
    return [
        '<div data-name="' + this._name + '" class="widget" style="', this._styles, '">',
        '<h2><span>', this._name, '</span>',
        '<a herf="###"><i class="icon-remove"></i></a>',
        //'<a herf="wp.app.html?widget=', this._name, '" target="_blank"><i class="icon-share"></i></a>',
        '</h2></div>'].join('');
};

/**
 * 绑定模块事件
 */
ad.test.Widget.prototype.bindEvent = function() {
    var me = this,
        root = me.getRoot();

    //为了能更直观的编辑模块，hover到widget上显示title，leave时隐藏title
    baidu.on(root, 'mouseenter', function(e) {
        setTimeout(function() {
            me._title.style.display = 'block';
        },50);
    });

    baidu.on(root, 'mouseleave', function(e) {
        setTimeout(function() {
            me._title.style.display = 'none';
        },50);
    });

    baidu.on(root, 'click', function(e) {
        me.focus();
    });

    baidu.on(me._title.querySelector('.icon-remove'), 'click', function(e) {
        me.dispose();
    });

    baidu.on(root, 'mousedown', function(e) {
        if (me._canvas) {
            me._canvas._curWidget = me;
            me._canvas.setWidgetPropertyByRender(me);
        }
    });
};

/**
 * 设置模块关联的画布
 */
ad.test.Widget.prototype.setCanvas = function(canvas) {
    this._canvas = canvas;
    this.setParentEventTarget(canvas);
};

/**
 * 获取模块宽度
 */
ad.test.Widget.prototype.getWidth = function(canvas) {
    return this._root.offsetWidth;
};

/**
 * 获取模块高度
 */
ad.test.Widget.prototype.getHeight = function(canvas) {
    return this._root.offsetHeight;
};

/**
 * 获取模块距离画布的左边距
 */
ad.test.Widget.prototype.getLeft = function(canvas) {
    return this._root.offsetLeft;
};

/**
 * 获取模块距离画布的上边距
 */
ad.test.Widget.prototype.getTop = function(canvas) {
    return this._root.offsetTop;
};

/**
 * 根据模块属性设置面板的输入重绘模块样式
 * @param {string} cssText 样式字符串.
 */
ad.test.Widget.prototype.setStyle = function(cssText) {
    this._root.style.cssText += cssText;
};

/**
 * 模块预览
 */
ad.test.Widget.prototype.preview = function() {
    var me = this;
    var root = me._root,
        args = {},
        url = me.getFileName();
    if (!url) {
        return false;
    }

    me._iframe = root.querySelector('iframe');
    if (me._iframe) {
        root.removeChild(me._iframe);
    }
    args['src'] = url;
    args['frameborder'] = '0';
    args['width'] = me.getWidth();
    args['height'] = me.getHeight();
    args['scrolling'] = 'no';
    me._iframe = baidu.dom.create('iframe', args);
    root.appendChild(me._iframe);
    baidu.on(me._iframe, 'load', function() {
        // 不知道为什么iframe里的body总是有8px的margin
        me._iframe.contentWindow.document.body.style.margin = '0px';
        me._iframe.contentWindow.document.body.style.backgroundColor = '#fff';
    });
};

/**
 * @param {string} styles new style.
 */
ad.test.Widget.prototype.refreshStyles = function(styles) {
    var iframe = this._iframe,
        doc = iframe.contentWindow.document;
    if (doc) {
        var style = doc.getElementById('new-style');
        if (!style) {
            style = doc.createElement('style');
            style.type = 'text/css';
            style.id = 'new-style';
            doc.getElementsByTagName('head')[0].appendChild(style);
        }
        if (style) {
            style.innerHTML = styles;
        }
    }
};

/**
 * 监测是否运行再Fserver环境下面
 * @type {?boolean}
 */
ad.test.Widget._RUNING_ON_FSERVER = null;

/**
 * 获取模块预览文件名
 * @return {string} app file的路径.
 */
ad.test.Widget.prototype.getFileName = function() {
    if (null === ad.test.Widget._RUNING_ON_FSERVER) {
        var rv = false;
        var links = document.querySelectorAll('link');
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.indexOf('/combine/all.css') != -1) {
                rv = true;
                break;
            }
        }
        ad.test.Widget._RUNING_ON_FSERVER = rv;
    }

    var params = '';
    if (false === ad.test.Widget._RUNING_ON_FSERVER) {
        params = '?nc=1';
    }

    var ns = this.getNS();
    for (var i = 0, result = ER_AD_WIDGET_LIST['page']['result'];
        i < result.length; i++) {
        var item = result[i];
        if (item['ns'] == ns) {
            return ad.test.url.getAbsolute(item['app_file'] + params);
        }
    }
    return null;
};

/**
 * 模块预览自适应
 */
ad.test.Widget.prototype.adpPreview = function() {
    if (this._iframe) {
        baidu.setAttrs(this._iframe, {'width': this.getWidth(), 'height': this.getHeight()});
    }
};

/*
 * 隐藏模块预览，提高在拖拽和拉伸时的性能
 */
ad.test.Widget.prototype.hidePreview = function() {
    if (this._iframe) {
        baidu.setStyle(this._iframe, 'display', 'none');
    }
};

/*
 * 显示模块预览
 */
ad.test.Widget.prototype.showPreview = function() {
    this.adpPreview();
    if (this._iframe) {
        baidu.setStyle(this._iframe, 'display', 'block');
    }
};

/*
 * 从画布中删除模块
 */
ad.test.Widget.prototype.dispose = function() {
    if (this._resizableHandler) {
        this._resizableHandler.cancel();
    }
    if (this._draggableHandler) {
        this._draggableHandler.cancel();
    }

    var root = this._root;
    if (root) {
        baidu.un(root, 'mouseenter');
        baidu.un(root, 'mouseleave');
        baidu.un(root, 'mousedown');
        baidu.un(root, 'click');
    }

    if (this._canvas) {
        this._canvas.removeWidget(this);
    }

    baidu.dom.remove(root);
};



/* vim: set ts=4 sw=4 sts=4 tw=100: */
