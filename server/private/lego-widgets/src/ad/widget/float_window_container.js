/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: float_window_container.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/float_window_container.js ~ 2012/08/27 19:32:08
 * @author wangdawei04@baidu.com (wangdawei) liyubei@baidu.com (leeight)
 * @version $Revision: 10927 $
 * @description
 * float_window_container相关的实现逻辑
 **/
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.WidgetContainer');
goog.require('ui.events');

goog.include('ad/widget/float_window_container.less');
goog.include('ad/widget/float_window_container.html');

goog.provide('ad.widget.FloatWindowContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {string=} opt_titlePrefix 监控前缀.
 * @extends {ad.widget.WidgetContainer}
 */
ad.widget.FloatWindowContainer = function(data, opt_titlePrefix) {
    ad.widget.WidgetContainer.call(this, data, opt_titlePrefix);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_float_window_container';

    this._render = new ad.render.RecursiveRender({
        'block_class': 'ec-fwcon'
    });

    /**
     * 由于浮层容器的特殊性，加入物料的前缀来区别，从而成为浮层class的一部分.
     * @type {string}
     */
    this._materialPrefix;

    /**
     * 浮层是否已经初始化了？
     * @type {boolean}
     * @private
     */
    this._inited = false;
};
baidu.inherits(ad.widget.FloatWindowContainer, ad.widget.WidgetContainer);

/**
 * 由于浮层的特殊性，将不在canvas中的布局中绘制
 * @override
 */
ad.widget.FloatWindowContainer.prototype.getMainHtml = function() {
    return '';
};

/**
 * 重用父类绘制模块逻辑
 * @private
 */
ad.widget.FloatWindowContainer.prototype._getMainHtmlInternal = function() {
    return ad.widget.FloatWindowContainer.superClass.getMainHtml.call(this);
};

/**
 * 隐藏浮层Mask
 */
ad.widget.FloatWindowContainer.prototype.hide= function() {
    ad.widget.FloatWindowContainer.superClass.hide.call(this);

    this._hideMask();
};

/**
 * 关闭浮层
 */
ad.widget.FloatWindowContainer.prototype.close = function() {
    this.hide();
    if (this.trigger(ui.events.CLOSE, this._data['id']) !== false) {
        this.sendLog('关闭浮层', 'closefloat');
    }
};

/** @override */
ad.widget.FloatWindowContainer.prototype.patchData = function() {
    if (this._data) {
        this._materialPrefix = this._data['material_name'] || '';
        // 百度地图加载必须在可视状态下
        this._displayStyle = this._data['is_display'] === true ?
                            'position:absolute;top:-10000px;left:-10000px;' : 'display:none';
        this._data['id'] = this._data['id'] || 1;   // 默认增加id为1,避免出现两个相同id的情况
    }
};


/**
 * 因为浮层的容器现在是自定义的，而不是之前通过render绘制的容器，所以要重写这个方法.
 * @inheritDoc
 */
ad.widget.FloatWindowContainer.prototype.getRoot = function() {
    var id = this.getId(this._data['id']);
    if (!baidu.g(id)) {
        var className = '';
        if (this._materialPrefix) {
            className = this._materialPrefix + '-fwc ' +
                this._materialPrefix + '-fwc-' + this._data['id'];
        }
        var root = baidu.dom.create('DIV', {
            'id': id,
            'class': className,
            'style': this._displayStyle
        });
        document.body.insertBefore(root, document.body.firstChild);
    }
    return baidu.g(id);
};

/**
 * 清除浮层初始化时设置的position：absolute；
 */
ad.widget.FloatWindowContainer.prototype._clearRootPosition = function() {
    baidu.setStyle(this.getRoot(), 'position', 'static');
};

/** @override */
ad.widget.FloatWindowContainer.prototype.enterDocument = function() {
    // 空函数.
};

/** @override */
ad.widget.FloatWindowContainer.prototype.bindEvent = function() {
    // 空函数.
};

/**
 * @private
 */
ad.widget.FloatWindowContainer.prototype._enterDocumentInternal = function() {
    // enterDocument
    var html = this._getMainHtmlInternal();
    this.getRoot().innerHTML = html;

    ad.widget.FloatWindowContainer.superClass.enterDocument.call(this);
};

/**
 * @private
 */
ad.widget.FloatWindowContainer.prototype._bindEventInternal = function() {
    // bindEvent
    var me = this;
    var ele = baidu.g(this.getId('close'));
    if (ele) {
        baidu.on(ele, 'click', function(e) {
            me.close();
        });
    }

    ad.widget.FloatWindowContainer.superClass.bindEvent.call(this);
};

/**
 * 初始化浮层
 * enterDocument
 * bindEvent
 */
ad.widget.FloatWindowContainer.prototype._init = function() {
    if (this._inited) {
        return;
    }

    this._enterDocumentInternal();
    this._bindEventInternal();

    this._inited = true;

    var me = this;
    ad.base.registerUnloadHandler(function(){
        me.dispose();
    });
};

/**
 * 居中显示
 * @inheritDoc
 */
ad.widget.FloatWindowContainer.prototype.show = function() {
    ad.widget.FloatWindowContainer.superClass.show.call(this);
    this._init();
    this._setPosition();
    this._clearRootPosition();
    this._showMask();
};

/**
 * 显示Mask
 */
ad.widget.FloatWindowContainer.prototype._showMask = function() {
    var mask = baidu.g(this.getId('mask'));
    if (mask) {
        baidu.dom.setStyles(mask, {
            'width': baidu.page.getWidth() + 'px',
            'height': baidu.page.getHeight() + 'px'
        });
        document.body.insertBefore(mask, document.body.firstChild);
        baidu.show(mask);
    }
};

/**
 * 显示Mask
 */
ad.widget.FloatWindowContainer.prototype._hideMask = function() {
    var mask = baidu.g(this.getId('mask'));
    if (mask) {
        baidu.hide(mask);
    }
};

/**
 * 获取位置
 * @private
 * @return {Object}
 */
ad.widget.FloatWindowContainer.prototype._getPosition = function() {
    var dom = baidu.g(this.getId('fwc'));

    if (!dom) {
        return {'left': 0, 'top': 0};
    }

    var fwWidth = dom.offsetWidth,
        fwHeight = dom.offsetHeight,
        viewWidth = baidu.page.getViewWidth(),
        viewHeight = baidu.page.getViewHeight(),
        left,
        top;

    if (this._data['left'] !== undefined) {
        left = this._data['left'];
    } else {
        left = (2 * baidu.page.getScrollLeft() + viewWidth - parseInt(fwWidth, 10)) / 2;
    }

    if (this._data['top'] !== undefined) {
        top = this._data['top'];
    } else {
        top = (2 * baidu.page.getScrollTop() + viewHeight - parseInt(fwHeight, 10)) / 2;
    }
    return {'left': left, 'top': top};
};

/**
 * 设置浮层位置
 * @private
 */
ad.widget.FloatWindowContainer.prototype._setPosition = function() {
    var position = this._getPosition(),
        left = position.left,
        top = position.top;
    var dom = baidu.g(this.getId('fwc'));
    baidu.setStyle(dom, 'left', (left < 0 ? 0 : left) + 'px');
    baidu.setStyle(dom, 'top', (top < 0 ? 0 : top) + 'px');
};

/** @inheritDoc */
ad.widget.FloatWindowContainer.prototype.dispose = function() {
    ad.widget.FloatWindowContainer.superClass.dispose.call(this);
    var root = this.getRoot();
    if (root) {
        baidu.dom.remove(root);
    }
    var mask = baidu.g(this.getId('mask'));
    if (mask) {
        baidu.dom.remove(mask);
    }
};













/* vim: set ts=4 sw=4 sts=4 tw=100 : */
