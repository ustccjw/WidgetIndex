/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_wise/detail_container.js ~ 2013/12/17 11:37:54
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * detail_container相关的实现逻辑
 **/

goog.require('ad.base');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.WidgetContainer');
goog.require('ui.events');

goog.include('ad/widget/zhidao_wise/detail_container.less');
goog.include('ad/widget/zhidao_wise/detail_container.html');

goog.provide('ad.widget.zhidao_wise.DetailContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_wise.DetailContainer = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_wise_detail_container';


    /**
     * @type {!Array.<ad.widget.Widget>}
     */
    this._detailWidgets = [];
    /** 
     * 详情页渲染器
     */
    this._detailPageRender = new ad.render.RecursiveRender({
        'block_class': 'ec-detail-cont'
    });

    /** 
     * 子页面渲染器
     */
    this._subPageRender = new ad.render.RecursiveRender({
        'block_class': 'ec-page-cont'
    });
};
baidu.inherits(ad.widget.zhidao_wise.DetailContainer, ad.widget.WidgetContainer);


/** @override */
ad.widget.zhidao_wise.DetailContainer.prototype.patchData = function() {
    //默认显示详情页，页面索引设为-1，简介子页面按序号从0开始设置索引
    this.selectedIndex = -1;
    if (this._data) {
        //设置一些默认值
        ad.base.extend(this._data, {
            'back_icon_src': 'http://ecma.bdimg.com/adtest/left.png',
            'back_icon_width': '19',
            'back_icon_height': '18',
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
 * 默认显示详情页
 * @override
 */
ad.widget.zhidao_wise.DetailContainer.prototype.getMainHtml = function() {
    var me = this;
    var template = this.tpl(this._view);
    var subPageCount = (baidu.lang.isArray(this._widgets[0])) ? this._widgets[0].length : this._widgets.length;
    var panelHtml = [];
    this.rendered = {}; //已经渲染了的子页面

    var detailPage = this._getDetailPage();
    panelHtml.push(detailPage);

    for (var i = 0; i < subPageCount; i++) {
        panelHtml.push(this._getSubPageWrap(i));
    }

    var data = baidu.extend(this._data, {
        '_id': function() {
            return function(text, render) {
                return me.getId(text);
            }
        },
        '_content': panelHtml.join('')
    });
    var html = ad.render.Template(template, data);
    return html;
};

/**
 * 获取详情页面
 * @private
 * @return {string}
 */
ad.widget.zhidao_wise.DetailContainer.prototype._getDetailPage = function() {
    if (!this._detailWidgets) {
        return null;
    }
    var detailPageHTML = this._detailPageRender.process(this._detailWidgets);
    return '<div id="' + this.getId('page-content-detail') +
        '" class="ec-page-content-detail">' + detailPageHTML + '</div>';
};

/**
 * 获取子页面简介容器HTML
 * @private
 * @return {string}
 */
ad.widget.zhidao_wise.DetailContainer.prototype._getSubPageWrap = function(index) {
    return '<div id="' + this.getId('page-content-' + index) +
        '" class="ec-page-content-' + index + '" style="display:none;"></div>';
};

/**
 * 获取子页面简介内容
 * @private
 * @param {number} index 需要显示的子页面索引，从0开始.
 * @return {string}
 */
ad.widget.zhidao_wise.DetailContainer.prototype._getSubPageContent = function(index) {
    var widget = this.getWidget(index);
    var content = this._subPageRender.process([widget]);
    return content;
};

/**
 * 设置详情页面的widget
 * @return {string}
 */
ad.widget.zhidao_wise.DetailContainer.prototype.setDetailWidgets = function(var_args) {
    this._detailWidgets = [].slice.call(arguments);
};


/**
 * @override
 *
 */
ad.widget.zhidao_wise.DetailContainer.prototype.getWidget = function(var_args, isDetailWidget) {
    var widgets = this._widgets;
    if (isDetailWidget) {
        widgets = this._detailWidgets;
    }
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
ad.widget.zhidao_wise.DetailContainer.prototype._initDetailWidgets = function() {
    var me = this;
    ad.base.forEach(this._detailWidgets, function(widget) {
        me.handleWidgetEvent(widget);
        widget.enterDocument();
        widget.bindEvent();
        widget.rewriteTitle2(widget.getRoot(), '详情页面', false);
    });
};

/**
 * 初始化子页面widget的行为和样式
 * @param {number} index 需要初始化的widget索引值，从0开始.
 */
ad.widget.zhidao_wise.DetailContainer.prototype._initWidget = function(index) {
    var widget = this.getWidget(index);
    if (widget) {
        this.handleWidgetEvent(widget);
        widget.enterDocument();
        widget.bindEvent();
        widget.rewriteTitle2(widget.getRoot(), '子页面' + (index + 1), false);
    }
};

/**
 * 判断页面是否支持position为fixed布局，若不支持使用absolute替代，页面头部跟尾部不再相对viewport固定
 * @private
 */
ad.widget.zhidao_wise.DetailContainer.prototype._checkSupportFixed = function() {
    if ("undefined" !== typeof this._isSupportFixed) {
        return this._isSupportFixed;
    }
    var div = document.createElement('div');
    div.style.cssText = 'display:none;position:fixed;';
    document.body.appendChild(div);
    this._isSupportFixed = (baidu.dom.getComputedStyle(div, 'position') == 'fixed');
    document.body.removeChild(div);
    return this._isSupportFixed;
}

/** @override */
ad.widget.zhidao_wise.DetailContainer.prototype.enterDocument = function() {
    //存一些dom对象
    this._headDom = baidu.g(this.getId('detail-head'));
    this._backBtn = baidu.g(this.getId('detail-back'));
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
    baidu.dom.hide(this._backBtn);
};


/**
 * 在页面不支持fixed定位时，判断页面内容高度是否没有视窗高度高，
 * 如果没有就设为视窗高度，以使得底部banner在最下面。
 */
ad.widget.zhidao_wise.DetailContainer.prototype.checkViewport = function() {
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
ad.widget.zhidao_wise.DetailContainer.prototype._showingMoreItem = function() {
    return baidu.dom.hasClass(this._moreWrap, 'ec-more-item-show');
};

/**
 * 隐藏子页面选项菜单
 * @private
 */
ad.widget.zhidao_wise.DetailContainer.prototype._hideMoreItem = function() {
    if (this._showingMoreItem()) {
        baidu.dom.removeClass(this._moreWrap, 'ec-more-item-show');
    }
};

/**
 * 显示子页面选项菜单
 * @private
 */
ad.widget.zhidao_wise.DetailContainer.prototype._showMoreItem = function() {
    if (!this._showingMoreItem()) {
        baidu.dom.addClass(this._moreWrap, 'ec-more-item-show');
    }
};


/**
 * 处理更多按键和链接按键的点击事件.
 * @private
 */
ad.widget.zhidao_wise.DetailContainer.prototype._bindClickEvent = function() {
    var me = this;

    baidu.on(this._backBtn, ui.events.CLICK, function() {
        me.switchPage(-1);
    });

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

        baidu.on(this._moreItemDom, ui.events.CLICK, function(opt_evt) {
            var evt = opt_evt || window.event;
            var target = evt.target || evt.srcElement;
            if ('SPAN' === target.nodeName) {
                target = target.parentNode;
            }
            if ('A' !== target.nodeName) {
                return false;
            }

            var index = parseInt(target.getAttribute('data-index'), 10);
            me.switchPage(index);
            me._hideMoreItem();

            if (me.trigger('page_change', index) !== false) {
                me.sendLog({
                    'action': '跳转到子页面',
                    'xp': '跳转到子页面' + (index + 1)
                });
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

/** @override */
ad.widget.zhidao_wise.DetailContainer.prototype.bindEvent = function() {
    this._bindClickEvent();

};

/**
 * 显示到{index}指定的子页面的内容.
 * @param {number} index 需要显示的页面索引，从0开始. -1为返回到详情页
 */
ad.widget.zhidao_wise.DetailContainer.prototype.switchPage = function(index) {
    var selIdx = this.selectedIndex;
    var toDetail = (-1 === index);
    var fromDetail = (-1 === selIdx);
    if (index === selIdx) {
        return;
    }

    var fromIndexStr = fromDetail ? 'detail' : selIdx;
    var toIndexStr = toDetail ? 'detail' : index;

    // 隐藏当前的页面的内容
    baidu.dom.hide(this.getId('page-content-' + fromIndexStr));

    // 设置Body的内容
    var panel = baidu.g(this.getId('page-content-' + toIndexStr));
    if (toDetail) {
        baidu.dom.hide(this._backBtn);
        this._titleDom.innerText = this._data['title'];
    } else {
        if (!this.rendered[index]) {
            panel.innerHTML = this._getSubPageContent(index);
            this.rendered[index] = true;
            this._initWidget(index);
        }
        baidu.dom.show(this._backBtn);
        this._titleDom.innerText = this._data['options'][index]['button_title'];
    }

    baidu.show(panel);

    this.checkViewport();

    this.selectedIndex = index;

    this.trigger('page_change', this.selectedIndex);
};

/**
 * @inheritDoc
 */
ad.widget.zhidao_wise.DetailContainer.prototype.dispose = function() {
    ad.widget.zhidao_wise.DetailContainer.superClass.dispose.call(this);

    if (this._clickHandler) {
        baidu.un(document, ui.events.CLICK, this._clickHandler);
    }
    if (this._resizeHandler) {
        baidu.un(window, ui.events.RESIZE, this._resizeHandler);
    }
};



/* vim: set ts=4 sw=4 sts=4 tw=100 : */
