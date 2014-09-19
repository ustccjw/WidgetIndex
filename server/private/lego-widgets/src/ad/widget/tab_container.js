/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: tab_container.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/tab_container.js ~ 2012/06/09 00:30:31
 * @author fanxueliang liyubei@baidu.com (leeight)
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.WidgetContainer');
goog.require('ui.events');
goog.require('ad.env');

goog.include('ad/widget/tab_container.html');
goog.include('ad/widget/tab_container.less');

goog.provide('ad.widget.TabContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {string=} opt_titlePrefix 监控前缀.
 * @extends {ad.widget.WidgetContainer}
 */
ad.widget.TabContainer = function(data, opt_titlePrefix) {
    this._default = {
        'width': 515,

        /** tab标签的宽度是否随标题字数自动调整 */
        'auto_li_width': false
    };

    ad.widget.WidgetContainer.call(this, data, opt_titlePrefix);

    /**
     * 模板的名字
     * @type {string}
     */
    this._view = 'AD_ad_widget_tab_container';

    this._render = new ad.render.RecursiveRender({
        'block_class': 'ec-tabcon'
    });
};
baidu.inherits(ad.widget.TabContainer, ad.widget.WidgetContainer);

/**
 * @inheritDoc
 */
ad.widget.TabContainer.prototype.patchData = function() {
    var options = this._data['options'];
    var tabCount = options.length;
    var defaultIndex = parseInt(this._data['default_index'], 10) || 0;

    if (this._data['is_show_random']) {
        defaultIndex = Math.floor(Math.random() * tabCount);
    }
    else if (!defaultIndex || defaultIndex < 0 && defaultIndex >= tabCount) {
        defaultIndex = 0;
    }

    // 需要保证服务端渲染的代码也能有：
    // 1. 正确的选中状态（current）
    // 2. 正确的宽度
    var tabWidths = this.calcTabHeadWidth(tabCount);
    for (var i = 0; i < tabCount; i++) {
        if (i === defaultIndex) {
            options[i]['_current'] = true;
        }

        if (tabWidths && tabWidths[i]) {
            options[i]['_width'] = tabWidths[i];
        } else {
            options[i]['_width'] = 'auto';
        }
    }

    // 某次在81的环境出现了0.0
    this.selectedIndex = defaultIndex;
};

/** @override */
ad.widget.TabContainer.prototype.init = function() {
    if (ad.env.isSiva() || FLAGS_auto_decorate) {
        var widget = this.getWidget(this.selectedIndex);
        this._render.attachToElements([widget],
            baidu.g(this.getId('tab-content-' + this.selectedIndex)));
    }
};

/**
 * 为了减少最终投放代码的体积，我们需要生成最精简的HTML结构
 * @override
 */
ad.widget.TabContainer.prototype.getMainHtml = function() {
    var me = this;
    var template = this.tpl(this._view);
    var tabCount = this.getData('options').length;
    var panelHtml = [];
    this.rendered = {};
    for (var i = 0; i < tabCount; i++) {
        if (i === this.selectedIndex) {
            panelHtml.push(this._getTabBodyHtml(i));
            this.rendered[i] = true;
        }
        else {
            panelHtml.push(this._getTabBodyWrap(i));
        }
    }
    var data = baidu.extend(this._data, {
        '_id' : function() {
            return function(text, render) {
                return me.getId(text);
            };
        },
        '_content': panelHtml.join('')
    });
    var html = ad.render.Template(template, data);
    return html;
};

/**
 * 获取TAB面板容器HTML
 * @private
 * @param {number} index 需要显示的Tab索引，从0开始.
 * @return {string}
 */
ad.widget.TabContainer.prototype._getTabBodyWrap = function(index) {
    return '<div id="' + this.getId('tab-content-' + index) +
        '" class="' + this.getTabClassName(index) + '" style="display:none;"></div>';
};

/**
 * 获取TAB标签的CLASS NAME，方便自定义内容.
 * @param {number} index 第N个TAB标签.
 * @return {string}
 */
ad.widget.TabContainer.prototype.getTabClassName = function(index) {
    return 'ec-tab-content-' + index;
};

/**
 * 获取TAB面板内容
 * @private
 * @param {number} index 需要显示的Tab索引，从0开始.
 * @return {string}
 */
ad.widget.TabContainer.prototype._getTabBodyContent = function(index) {
    // 如果this._widgets = [
    //   [a],
    //   [b]
    // ]; -> this.getWidget(index, 0)
    // 如果this._widgets = [
    //   [a, b]
    // ]; -> this.getWidget(0, index)
    var widget = this.getWidget(index);
    var content = this._render.process([widget]);
    return content;
};

/**
 * 获取TAB面板完整HTML
 * @private
 * @param {number} index 需要显示的Tab索引，从0开始.
 * @return {string}
 */
ad.widget.TabContainer.prototype._getTabBodyHtml = function(index) {
    var content = this._getTabBodyContent(index);
    return '<div id="' + this.getId('tab-content-' + index) +
        '" class="' + this.getTabClassName(index) + '">' + content + '</div>';
};

/**
 * 动态的调整Tab头部标签的宽度.
 * @param {number} tabCount Tab的个数.
 * @return {Array.<string>|undefined}
 */
ad.widget.TabContainer.prototype.calcTabHeadWidth = function(tabCount) {
    if (this._data['auto_li_width']) {
        // 不限制宽度，根据字数动态的调整.
        // FIXME(leeight) 不过貌似没有padding-left和padding-right，其实效果不太好看.
        return;
    }

    // 每个标签的宽度
    var itemWidth = this._data['li_width'];
    var leftWidth = 0;
    var gap = this.getData('li_margin', 8);
    var itemBorderWidth = parseInt(this.getData('li_border_width', 1), 10);
    if (!itemWidth) {
        var totalWidth = this._data['width'] - gap * (tabCount + 1);
        itemWidth = Math.floor(totalWidth / tabCount - 2 * itemBorderWidth);
        leftWidth = Math.max(leftWidth, totalWidth - (itemWidth + 2 * itemBorderWidth) * tabCount);
    }

    var tabWidths = [];
    for (var i = 0; i < tabCount; i++) {
        if (i === tabCount - 1 && leftWidth) {
            // 把剩余的宽度追加到最后一个tab.
            tabWidths.push((itemWidth + leftWidth) + 'px');
        }else {
            tabWidths.push(itemWidth + 'px');
        }
    }

    return tabWidths;
};

/**
 * @override
 */
ad.widget.TabContainer.prototype.getWidget = function(var_args) {
    var indexes = Array.prototype.slice.call(arguments);
    if (!indexes.length) {
        return null;
    }
    var index = indexes[0];

    if (this._widgets.length > 1) {
        return this._widgets[index][0];
    } else {
        return this._widgets[0][index];
    }
};

/**
 * 初始化widget的行为和样式
 * @param {number} index 需要初始化的widget索引值，从0开始.
 */
ad.widget.TabContainer.prototype._initWidget = function(index) {
    var widget = this.getWidget(index);
    if (widget) {
        this.handleWidgetEvent(widget);
        widget.enterDocument();
        widget.bindEvent();
        widget.rewriteTitle2(widget.getRoot(), 'TAB' + (index + 1), false);
    }
};

/**
 * 因为不需要遍历所有的_widgets，所以不需要调用superClass.enterDocument
 * @override
 */
ad.widget.TabContainer.prototype.enterDocument = function() {
    this._initWidget(this.selectedIndex);
    var heads = baidu.g(this.getId('tab-head')).getElementsByTagName('li');
    if(this.selectedIndex > 0) {
        baidu.dom.addClass(heads[this.selectedIndex - 1], 'ec-previous-tab');
    }
};

/**
 * 显示到{index}指定的tab的内容.
 * @param {number} index 需要显示的Tab索引，从0开始.
 */
ad.widget.TabContainer.prototype.switchTab = function(index) {
    if (index === this.selectedIndex) {
        return;
    }

    // 修改选中的Tab Head的样式
    var heads = baidu.g(this.getId('tab-head'));
    if (!heads) {
        return;
    }
    heads = heads.getElementsByTagName('li');
    for (var i = 0; i < heads.length; i++) {
        if (index === i) {
            baidu.dom.addClass(heads[i], 'ec-current-tab');
        }
        else {
            baidu.dom.removeClass(heads[i], 'ec-current-tab');
        }
        baidu.dom.removeClass(heads[i], 'ec-previous-tab');
    }

    // 隐藏当前的Tab的内容
    baidu.hide(this.getId('tab-content-' + this.selectedIndex));

    // 设置Body的内容
    var panel = baidu.g(this.getId('tab-content-' + index));
    if (!this.rendered[index]) {
        panel.innerHTML = this._getTabBodyContent(index);
        this.rendered[index] = true;
        this._initWidget(index);
    }
    baidu.show(panel);

    this.selectedIndex = index;
    if(index > 0) {
        baidu.dom.addClass(heads[index - 1], 'ec-previous-tab');
    }
    this.trigger(ui.events.TAB_CHANGE, this.selectedIndex);
};

/**
 * 处理Tab标签的点击事件.
 * @private
 */
ad.widget.TabContainer.prototype._bindClickEvent = function() {
    var me = this;
    baidu.on(this.getId('tab-head'), 'click', function(opt_evt) {
        var evt = opt_evt || window.event;
        var target = evt.target || evt.srcElement;
        if (target.nodeName === 'A') {
            // LI
            target = target.parentNode;
        }

        if (target.nodeName !== 'LI') {
            // IGNORE
            return false;
        }

        var index = parseInt(target.getAttribute('data-index'), 10);
        me.switchTab(index);

        if (me.trigger(ui.events.TAB_CLICK, index) !== false) {
            me.sendLog({'action': '点击',
                'xp': 'TAB' + (index + 1) + '_CLICK'});
        }

        baidu.event.stop(evt);
    });
};

/**
 * @private
 * @param {Element} head Tab的标签DOM元素(li).
 */
ad.widget.TabContainer.prototype._bindAutoSwitchTabEvent = function(head) {
    var hoverTime = this.getData('hover_time', 200);

    var me = this;
    baidu.on(head, 'mouseenter', function() {
        var index = parseInt(head.getAttribute('data-index'), 10);
        me._hoverTimer = ad.base.setTimeout(function() {
            me.cancelSlideShow();
            me.switchTab(index);
        }, hoverTime);
    });

    baidu.on(head, 'mouseleave', function() {
        if (me._hoverTimer) {
            ad.base.clearTimeout(me._hoverTimer);
            me._hoverTimer = 0;
        }
    });
};

/**
 * 处理Mouse Event (mouseover, mouseout)之类的.
 * @private
 */
ad.widget.TabContainer.prototype._bindMouseEvent = function() {
    var heads = baidu.g(this.getId('tab-head')).getElementsByTagName('li');
    for (var i = 0; i < heads.length; i++) {
        this._bindAutoSwitchTabEvent(heads[i]);
    }

    var me = this;
    baidu.on(this.getId('tab-body'), 'mouseenter', function() {
        me.cancelSlideShow();
    });
    baidu.on(this.getId('tab-body'), 'mouseleave', function() {
        me.startSlideShow();
    });
};

/**
 * 获取下一个Tab的索引
 * @private
 * @return {number}
 */
ad.widget.TabContainer.prototype._getNextIndex = function() {
    var tabCount = this.getData('options').length;
    return (this.selectedIndex + 1) % tabCount;
};

/**
 * 开启Tab自动切换的功能.
 */
ad.widget.TabContainer.prototype.startSlideShow = function() {
    var intervalTime = this.getData('interval_time', 4000);
    var me = this;
    this._autoTimer = ad.base.setTimeout(function() {
        me.switchTab(me._getNextIndex());
        me.startSlideShow();
    }, intervalTime);
};

/**
 * 取消Tab自动切换的功能.
 */
ad.widget.TabContainer.prototype.cancelSlideShow = function() {
    if (this._autoTimer) {
        ad.base.clearTimeout(this._autoTimer);
        this._autoTimer = 0;
    }
};

/**
 * 因为不需要遍历所有的_widgets，所以不需要调用superClass.bindEvent
 * @override
 */
ad.widget.TabContainer.prototype.bindEvent = function() {
    this._bindClickEvent();
    this._bindMouseEvent();
    this.startSlideShow();
    this.trigger(ui.events.TAB_CHANGE, this.selectedIndex);
};

/**
 * TAB比较特殊，监控请求里需要带上当前是哪个TAB的信息，重写掉
 * @inheritDoc
 */
ad.widget.TabContainer.prototype.sendLog = function(param) {
    ad.widget.TabContainer.superClass.sendLog.call(this,
        'TAB' + (this.selectedIndex + 1) + param['action'], param['xp']);
};

/**
 * @override
 */
ad.widget.TabContainer.prototype.dispose = function() {
    if (this._hoverTimer) {
        ad.base.clearTimeout(this._hoverTimer);
        this._hoverTimer = null;
    }
    this.cancelSlideShow();
    ad.widget.TabContainer.superClass.dispose.call(this);
};
















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
