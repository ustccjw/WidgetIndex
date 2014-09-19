/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/


/**
 * src/ad/widget/full_window_container.js ~ 2013/08/13 16:15:31
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * full_window_container相关的实现逻辑
 **/

goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.WidgetContainer');
goog.require('ui.events');

goog.include('ad/widget/full_window_container.less');
goog.include('ad/widget/full_window_container.html');

goog.provide('ad.widget.FullWindowContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {string=} opt_titlePrefix 监控前缀.
 * @extends {ad.widget.WidgetContainer}
 */
ad.widget.FullWindowContainer = function(data, opt_titlePrefix) {
    ad.widget.WidgetContainer.call(this, data, opt_titlePrefix);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_full_window_container';

    this._render = new ad.render.RecursiveRender({
        'block_class': 'ec-fwccon'
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
baidu.inherits(ad.widget.FullWindowContainer, ad.widget.WidgetContainer);

/**
 * 由于浮层的特殊性，将不在canvas中的布局中绘制
 * @override
 */
ad.widget.FullWindowContainer.prototype.getMainHtml = function() {
    return '';
};

/**
 * 重用父类绘制模块逻辑
 * @private
 */
ad.widget.FullWindowContainer.prototype._getMainHtmlInternal = function() {
    return ad.widget.FullWindowContainer.superClass.getMainHtml.call(this);
};

/** @override */
ad.widget.FullWindowContainer.prototype.enterDocument = function() {
    // 空函数.
};

/** @override */
ad.widget.FullWindowContainer.prototype.bindEvent = function() {
    // 空函数.
};

/**
 * 关闭浮层
 */
ad.widget.FullWindowContainer.prototype.close = function() {
    this.hide();
    this.trigger(ui.events.CLOSE, this._data['id']);
};

/** @override */
ad.widget.FullWindowContainer.prototype.patchData = function() {
    if (this._data) {
        this._materialPrefix = this._data['material_name'] || '';
        this._data['id'] = this._data['id'] || 1;
        this._data['background-color'] = this._data['background-color'] || '#000';
        this._data['opacity'] = this._data['opacity'] || '.5';
        this._data['click_to_close'] = (this._data['click_to_close'] === false) ? false : true;
        this._data['has_close_btn'] = (this._data['has_close_btn'] === false) ? false : true;
    }
};

/**
 * 因为浮层的容器现在是自定义的，而不是之前通过render绘制的容器，所以要重写这个方法.
 * @inheritDoc
 */
ad.widget.FullWindowContainer.prototype.getRoot = function() {
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
            'style': 'display:none'
        });
        document.body.insertBefore(root, document.body.firstChild);
    }
    return baidu.g(id);
};

/**
 * @private
 */
ad.widget.FullWindowContainer.prototype._enterDocumentInternal = function() {
    var html = this._getMainHtmlInternal();
    this.getRoot().innerHTML = html;

    if (!this._data['has_close_btn']) {
        var closeBtn = baidu.g(this.getId('close'));
        if (closeBtn) {
            baidu.setStyle(closeBtn, 'display', 'none');
        }
    }

    ad.widget.FullWindowContainer.superClass.enterDocument.call(this);
}

/**
 * @private
 */
ad.widget.FullWindowContainer.prototype._bindEventInternal = function() {
    var me = this;
    if (this._data['has_close_btn']) {
        var closeBtn = baidu.g(this.getId('close'));
        if (closeBtn) {
            baidu.on(closeBtn, 'click', function(e) {
                me.close();
            });
        }
    }

    if (this._data['click_to_close']) {
        var bg = baidu.g(this.getId('bg'));
        if (bg) {
            baidu.on(bg, 'click', function(e) {
                me.close();
            });
        }
    }

    ad.widget.FullWindowContainer.superClass.bindEvent.call(this);
}

/**
 * @private
 */
ad.widget.FullWindowContainer.prototype._init = function() {
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
}

/**
 * 居中显示
 * @inheritDoc
 */
ad.widget.FullWindowContainer.prototype.show = function() {
    ad.widget.FullWindowContainer.superClass.show.call(this);
    this._init();
    this._setFullStyle();
};

/**
 * 设置浮层位置
 * @private
 */
ad.widget.FullWindowContainer.prototype._setFullStyle = function() {
    var pageHeight = baidu.page.getHeight() + "px";
    var bg = this.getId('bg');
    baidu.setStyles(bg, {
        'height': pageHeight,
        'background-color': this._data['background-color'],
        'opacity': this._data['opacity'],
        'filter': 'alpha(opacity=' + this._data['opacity'] * 100 + ')'
    });
};

/** @inheritDoc */
ad.widget.FullWindowContainer.prototype.dispose = function() {
    ad.widget.FullWindowContainer.superClass.dispose.call(this);
    var root = this.getRoot();
    if (root) {
        baidu.dom.remove(root);
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
