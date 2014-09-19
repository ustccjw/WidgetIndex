/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_wise/detail_container_a.js ~ 2014/02/17 16:55:31
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * detail_container_a相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.WidgetContainer');
goog.require('ui.events');

goog.include('ad/widget/zhidao_wise/detail_container.less');
goog.include('ad/widget/zhidao_wise/detail_container.html');

goog.provide('ad.widget.zhidao_wise.DetailContainerA');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_wise.DetailContainerA = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_wise_detail_container';

    /** 
     * 详情页渲染器
     */
    this._detailPageRender = new ad.render.RecursiveRender({
        'block_class': 'ec-detail-cont'
    });
};
baidu.inherits(ad.widget.zhidao_wise.DetailContainerA, ad.widget.WidgetContainer);

/** @override */
ad.widget.zhidao_wise.DetailContainerA.prototype.patchData = function() {
    if (this._data) {
        //设置一些默认值
        ad.base.extend(this._data, {
            'tel_icon_src': 'http://ecma.bdimg.com/adtest/call.png',
            'tel_icon_width': '15.5',
            'tel_icon_height': '16',
            'tel_name': '电话咨询',
            'has_more_options': true,
            'more_title': '更多信息'
        });
    }
};

/**
 * 显示详情页
 * @override
 */
ad.widget.zhidao_wise.DetailContainerA.prototype.getMainHtml = function() {
    var me = this;
    var template = this.tpl(this._view);
    var detailPage = this._getDetailPage();

    var data = baidu.extend(this._data, {
        '_id': function() {
            return function(text, render) {
                return me.getId(text);
            }
        },
        '_content': detailPage
    });
    var html = ad.render.Template(template, data);
    return html;
};

/**
 * 获取详情页面
 * @private
 * @return {string}
 */
ad.widget.zhidao_wise.DetailContainerA.prototype._getDetailPage = function() {
    if (!this._widgets) {
        return null;
    }
    var detailPageHTML = this._detailPageRender.process(this._widgets);
    return '<div id="' + this.getId('page-content-detail') +
        '" class="ec-page-content-detail">' + detailPageHTML + '</div>';
};

/**
 * @override
 *
 */
ad.widget.zhidao_wise.DetailContainerA.prototype.getWidget = function(var_args) {
    var widgets = this._widgets;

    var indexes = Array.prototype.slice.call(arguments);
    if (!indexes.length) {
        return null;
    }
    var index = indexes[0];

    if (widgets.length > 1) {
        return [index][0];
    } else {
        return widgets[0][index];
    }
};

/**
 * 初始化详情页widgets
 * @private
 */
ad.widget.zhidao_wise.DetailContainerA.prototype._initDetailWidgets = function() {
    var me = this;
    ad.base.forEach(this._widgets, function(widget) {
        me.handleWidgetEvent(widget);
        widget.enterDocument();
        widget.bindEvent();
    });
};

/**
 * 判断页面是否支持position为fixed布局，若不支持使用absolute替代，页面头部跟尾部不再相对viewport固定
 * @private
 */
ad.widget.zhidao_wise.DetailContainerA.prototype._checkSupportFixed = function() {
    if ("undefined" !== typeof this._isSupportFixed) {
        return this._isSupportFixed;
    }
    var div = document.createElement('div');
    div.style.cssText = 'display:none;position:fixed;';
    document.body.appendChild(div);
    this._isSupportFixed = (baidu.dom.getComputedStyle(div, 'position') == 'fixed');
    document.body.removeChild(div);
    return this._isSupportFixed;
};

/** @override */
ad.widget.zhidao_wise.DetailContainerA.prototype.enterDocument = function() {
    //存一些dom对象
    this._headDom = baidu.g(this.getId('detail-head'));
    this._titleDom = baidu.g(this.getId('detail-title'));
    this._footDom = baidu.g(this.getId('detail-foot'));
    this._moreWrap = baidu.g(this.getId('detail-more'));
    this._moreTitleDom = baidu.g(this.getId('detail-more-title'));
    this._moreItemDom = baidu.g(this.getId('detail-more-item'));
    this._containerDom = this._headDom.parentNode;
    this._contentDom = baidu.g(this.getId('detail-content'));
    this._initDetailWidgets();
    if (!this._checkSupportFixed()) {
        baidu.dom.setStyle(this._containerDom, 'position', 'relative');
        baidu.dom.setStyle(this._headDom, 'position', 'absolute');
        baidu.dom.setStyle(this._footDom, 'position', 'absolute');
    }
};

/**
 * 在页面不支持fixed定位时，判断页面内容高度是否没有视窗高度高，
 * 如果没有就设为视窗高度，以使得底部banner在最下面。
 */
ad.widget.zhidao_wise.DetailContainerA.prototype.checkViewport = function() {
    if (this._checkSupportFixed()) {
        return null;
    }
    var wrapHeight = this._containerDom.offsetHeight;
    var contentHeight = this._contentDom.offsetHeight;
    var viewportHeight = baidu.page.getViewHeight();

    if (parseInt(wrapHeight) < viewportHeight || parseInt(contentHeight) < viewportHeight) {
        baidu.dom.setStyle(this._containerDom, 'height', viewportHeight);
    }

};

/**
 * 判断子页面选项菜单是否显示
 * @private
 */
ad.widget.zhidao_wise.DetailContainerA.prototype._showingMoreItem = function() {
    return baidu.dom.hasClass(this._moreWrap, 'ec-more-item-show');
};

/**
 * 隐藏子页面选项菜单
 * @private
 */
ad.widget.zhidao_wise.DetailContainerA.prototype._hideMoreItem = function() {
    if (this._showingMoreItem()) {
        baidu.dom.removeClass(this._moreWrap, 'ec-more-item-show');
    }
};

/**
 * 显示子页面选项菜单
 * @private
 */
ad.widget.zhidao_wise.DetailContainerA.prototype._showMoreItem = function() {
    if (!this._showingMoreItem()) {
        baidu.dom.addClass(this._moreWrap, 'ec-more-item-show');
    }
};

/** @override */
ad.widget.zhidao_wise.DetailContainerA.prototype.bindEvent = function() {
    var me = this;

    if(me._moreTitleDom) {
        baidu.on(this._moreTitleDom, ui.events.CLICK, function(opt_evt) {
            var evt = opt_evt || window.event;
            if (me._showingMoreItem()) {
                me._hideMoreItem();
            } else {
                me._showMoreItem();
            }
            baidu.event.stop(evt);
        });
        
        me._clickHandler = function() {
            me._hideMoreItem();
        };
        baidu.on(document, ui.events.CLICK, me._clickHandler);
    }

    me._resizeHandler = function() {
        me.checkViewport();
    };
    baidu.on(window, ui.events.RESIZE, me._resizeHandler);
};

/**
 * @inheritDoc
 */
ad.widget.zhidao_wise.DetailContainerA.prototype.dispose = function() {
    ad.widget.zhidao_wise.DetailContainerA.superClass.dispose.call(this);

    if (this._clickHandler) {
        baidu.un(document, ui.events.CLICK, this._clickHandler);
    }
    if (this._resizeHandler) {
        baidu.un(window, ui.events.RESIZE, this._resizeHandler);
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */