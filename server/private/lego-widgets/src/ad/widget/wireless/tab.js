/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/tab.js ~ 2013/12/13 10:27:26
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * tab相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.env');

goog.include('ad/widget/wireless/tab.less');
goog.include('ad/widget/wireless/tab.html');

goog.provide('ad.widget.wireless.Tab');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.Tab = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_tab';

    this._render = new ad.render.RecursiveRender({
        'block_class': 'ec-tabcon'
    });
};

baidu.inherits(ad.widget.wireless.Tab, ad.widget.WidgetContainer);


/** @override */
ad.widget.wireless.Tab.prototype.patchData = function() {
    var options = this._data['options'];
    var tabCount = options.length;
    var defaultIndex = parseInt(this._data['default_index'], 10) - 1;

    if (defaultIndex < 0 || defaultIndex > tabCount - 1) {
        defaultIndex = 0;
    }

    for (var i = 0; i < tabCount; i++) {
        if (i === defaultIndex) {
            options[i]['_current'] = true;
        }
    }

    this.selectedIndex = defaultIndex;
};


/** @override ?? */
ad.widget.wireless.Tab.prototype.init = function() {
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
ad.widget.wireless.Tab.prototype.getMainHtml = function() {
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
        '_id': function() {
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
ad.widget.wireless.Tab.prototype._getTabBodyWrap = function(index) {
    return '<div id="' + this.getId('tab-content-' + index)
        + '" class="ec-tab-content-' + index + '" style="display:none;"></div>';
};

/**
 * 获取TAB面板内容
 * @private
 * @param {number} index 需要显示的Tab索引，从0开始.
 * @return {string}
 */
ad.widget.wireless.Tab.prototype._getTabBodyContent = function(index) {
    // 如果this._widgets = [
    //   [a],
    //   [b]
    // ]; -> this.getWidget(index, 0)
    // 如果this._widgets = [
    //   [a, b]
    // ]; -> this.getWidget(0, index)
    var widget = this.getWidget(index);
    var content = this._render.process([widget]);
    if (FLAGS_wireless) {
        content = ad.base.removeLinkTarget(content);
    }
    return content;
};

/**
 * 获取TAB面板完整HTML
 * @private
 * @param {number} index 需要显示的Tab索引，从0开始.
 * @return {string}
 */
ad.widget.wireless.Tab.prototype._getTabBodyHtml = function(index) {
    var content = this._getTabBodyContent(index);
    return '<div id="' + this.getId('tab-content-' + index)
        + '" class="ec-tab-content-' + index + '">' + content + '</div>';
};

/**
 * @override
 */
ad.widget.wireless.Tab.prototype.getWidget = function(var_args) {
    var indexes = Array.prototype.slice.call(arguments);
    if (!indexes.length) {
        return null;
    }
    var index = indexes[0];

    if (this._widgets.length > 1) {
        return this._widgets[index][0];
    }
    else {
        return this._widgets[0][index];
    }
};

/**
 * 初始化widget的行为和样式
 * @param {number} index 需要初始化的widget索引值，从0开始.
 */
ad.widget.wireless.Tab.prototype._initWidget = function(index) {
    var widget = this.getWidget(index);
    if (widget) {
        this.handleWidgetEvent(widget);
        widget.enterDocument();
        widget.bindEvent();
        widget.rewriteTitle2(widget.getRoot(), 'TAB' + (index + 1), false);
    }
};

/** @override */
ad.widget.wireless.Tab.prototype.enterDocument = function() {
    this._initWidget(this.selectedIndex);
    var me = this;
    ad.base.fixDeferLinks(function() { //获取linkid统计时，每个tab点击一次
        var options = me.getData('options', []);
        var tabCount = options.length;
        for (var i = 0; i < tabCount; i++) {
            me.switchTab(i);
        }
    });
};

/**
 * 显示到{index}指定的tab的内容.
 * @param {number} index 需要显示的Tab索引，从0开始.
 */
ad.widget.wireless.Tab.prototype.switchTab = function(index) {
    if (index === this.selectedIndex) {
        return;
    }

    // 修改选中的Tab Head的样式
    var heads = baidu.g(this.getId('tab-head')).getElementsByTagName('TD');
    for (var i = 0; i < heads.length; i++) {
        if (index === i) {
            baidu.dom.addClass(heads[i], 'ec-current-tab');
        }
        else {
            baidu.dom.removeClass(heads[i], 'ec-current-tab');
        }
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

    this.trigger(ui.events.TAB_CHANGE, this.selectedIndex);
};

/**
 * 处理Tab标签的点击事件.
 * @private
 */
ad.widget.wireless.Tab.prototype._bindClickEvent = function() {
    var me = this;
    baidu.on(this.getId('tab-head'), 'click', function(opt_evt) {
        var evt = opt_evt || window.event;
        var target = evt.target || evt.srcElement;
        if (target.nodeName === 'A') {
            // TD
            target = target.parentNode;
        }

        if (target.nodeName !== 'TD') {
            // IGNORE
            return false;
        }

        var index = parseInt(target.getAttribute('data-index'), 10);
        me.switchTab(index);

        if (me.trigger(ui.events.TAB_CLICK, index) !== false) {
            me.sendLog({
                'action': '点击',
                'xp': 'TAB' + (index + 1) + '_CLICK'
            });
        }

        baidu.event.stop(evt);
    });
};

/** @override */
ad.widget.wireless.Tab.prototype.bindEvent = function() {
    this._bindClickEvent();
    this.trigger(ui.events.TAB_CHANGE, this.selectedIndex);
};

/**
 * TAB比较特殊，监控请求里需要带上当前是哪个TAB的信息，重写掉
 * @inheritDoc
 */
ad.widget.wireless.Tab.prototype.sendLog = function(param) {
    ad.widget.wireless.Tab.superClass.sendLog.call(this,
        'TAB' + (this.selectedIndex + 1) + param['action'], param['xp']);
};



/* vim: set ts=4 sw=4 sts=4 tw=100 : */
