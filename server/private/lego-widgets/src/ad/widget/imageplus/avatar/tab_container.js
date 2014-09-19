/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/avatar/tab_container.js ~ 2014/05/21 20:37:24
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * tab_container相关的实现逻辑
 **/

goog.require('ad.render.ImageplusRender');
goog.require('ad.widget.WidgetContainer');
goog.require('ui.events');

goog.include('ad/widget/imageplus/avatar/tab_container.html');
goog.include('ad/widget/imageplus/avatar/tab_container.less');

goog.provide('ad.widget.imageplus.avatar.TabContainer');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.WidgetContainer}
 */
ad.widget.imageplus.avatar.TabContainer = function(data) {
    /**
     * 模板的名字
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_avatar_tab_container';

    ad.widget.WidgetContainer.call(this, data);
    /**
     * @type {ad.render.ImageplusRender}
     * @private
     */
    this._render = new ad.render.ImageplusRender();
};
baidu.inherits(ad.widget.imageplus.avatar.TabContainer, ad.widget.WidgetContainer);

/**
 * @inheritDoc
 */
ad.widget.imageplus.avatar.TabContainer.prototype.patchData = function() {
    this.selectedIndex = -1;
};

/** @override */
ad.widget.imageplus.avatar.TabContainer.prototype.init = function() {
    if (FLAGS_auto_decorate) {
        var widget = this.getWidget(this.selectedIndex);
        this._render.attachToElements([widget],
            baidu.g(this.getId('tab-content-' + this.selectedIndex)));
    }
};

/**
 * 为了减少最终投放代码的体积，我们需要生成最精简的HTML结构
 * @override
 */
ad.widget.imageplus.avatar.TabContainer.prototype.getMainHtml = function() {
    var me = this;
    var template = this.tpl(this._view);
    var tabCount = this.getData('options').length;
    var panelHtml = [];
    this.rendered = {};
    for (var i = 0; i < tabCount; i++) {
        if (i == this.selectedIndex) {
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
            }
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
ad.widget.imageplus.avatar.TabContainer.prototype._getTabBodyWrap = function(index) {
    return '<div id="' + this.getId('tab-content-' + index) + '" style="display:none;"></div>';
};

/**
 * 获取TAB面板内容
 * @private
 * @param {number} index 需要显示的Tab索引，从0开始.
 * @return {string}
 */
ad.widget.imageplus.avatar.TabContainer.prototype._getTabBodyContent = function(index) {
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
ad.widget.imageplus.avatar.TabContainer.prototype._getTabBodyHtml = function(index) {
    var content = this._getTabBodyContent(index);
    return '<div id="' + this.getId('tab-content-' + index) + '">' + content + '</div>';
};

/**
 * @override
 */
ad.widget.imageplus.avatar.TabContainer.prototype.getWidget = function(var_args) {
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
ad.widget.imageplus.avatar.TabContainer.prototype._initWidget = function(index) {
    var widget = this.getWidget(index);
    if (widget) {
        this.handleWidgetEvent(widget);
        widget.enterDocument();
        widget.bindEvent();
    }
};

/**
 * 因为不需要遍历所有的_widgets，所以不需要调用superClass.enterDocument
 * @override
 */
ad.widget.imageplus.avatar.TabContainer.prototype.enterDocument = function() {
    if (this.selectedIndex > -1) {
        this._initWidget(this.selectedIndex);
    }
    else {
        baidu.hide(this.getId('tab-body'));
    }
};

/**
 * 显示到{index}指定的tab的内容.
 * @param {number} index 需要显示的Tab索引，从0开始.
 */
ad.widget.imageplus.avatar.TabContainer.prototype.switchTab = function(index) {
    if (index === this.selectedIndex) {
        return;
    }

    // 修改选中的Tab Head的样式
    var heads = baidu.g(this.getId('tab-head'));
    if (!heads) {
        return;
    }
    heads = baidu.q('ec-tab-li', heads);
    for (var i = 0, len = heads.length; i < len; i++) {
        if (index === i) {
            baidu.dom.addClass(heads[i], 'ec-current-tab');
        }
        else if (this.selectedIndex == i){
            baidu.dom.removeClass(heads[i], 'ec-current-tab');
        }
    }

    // 隐藏当前的Tab的内容
    if (this.selectedIndex > -1) {
        baidu.hide(this.getId('tab-content-' + this.selectedIndex));
    }
    else {
        baidu.show(this.getId('tab-body'));
    }

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

ad.widget.imageplus.avatar.TabContainer.prototype._hideTabBody = function () {
    baidu.hide(this.getId('tab-content-' + this.selectedIndex));
    baidu.hide(this.getId('tab-body'));
    var currentLi = baidu.q('ec-tab-li', this.getId('tab-head'))[this.selectedIndex];
    baidu.dom.removeClass(currentLi, 'ec-current-tab');
    this.selectedIndex = -1;
};

/**
 * @private
 * @param {Element} head Tab的标签DOM元素(li).
 */
ad.widget.imageplus.avatar.TabContainer.prototype._bindHoverTab = function(head) {
    var hoverTime = 200;

    var me = this;
    baidu.on(head, 'mouseenter', function() {
        var index = parseInt(head.getAttribute('data-index'), 10);
        me.trigger(ui.events.SEND_LOG, {
            "actionid": 9,
            "attach": me.getData('hmid') + '/TAB' + (index + 1) + '展开'
        });
        ad.base.clearTimeout(me._hoverTimer);
        me._hoverTimer = 0;
        me.switchTab(index);
    });

    baidu.on(head, 'mouseleave', function() {
        me._hoverTimer = ad.base.setTimeout(
            baidu.fn.bind(me._hideTabBody, me),
            hoverTime
        );
    });
};

/**
 * 处理Mouse Event (mouseenter, mouseleave)之类的.
 * @private
 */
ad.widget.imageplus.avatar.TabContainer.prototype._bindMouseEvent = function() {
    var heads = baidu.q('ec-tab-li', this.getId('tab-head'));
    for (var i = 0, len; i < heads.length; i++) {
        this._bindHoverTab(heads[i]);
    }

    var me = this;
    var tbody = baidu.q('ec-tabbody-ctn', this.getId('tab-body'))[0];
    baidu.on(tbody, 'mouseenter', function() {
        ad.base.clearTimeout(me._hoverTimer);
        me._hoverTimer = 0;
    });

    baidu.on(tbody, 'mouseleave', function() {
        me._hideTabBody();
    });
};

/**
 * 因为不需要遍历所有的_widgets，所以不需要调用superClass.bindEvent
 * @override
 */
ad.widget.imageplus.avatar.TabContainer.prototype.bindEvent = function() {
    this._bindMouseEvent();
    this.trigger(ui.events.TAB_CHANGE, this.selectedIndex);
};

/**
 * TAB比较特殊，监控请求里需要带上当前是哪个TAB的信息，重写掉
 * @inheritDoc
 */
ad.widget.imageplus.avatar.TabContainer.prototype.sendLog = function(param) {
    param['attach'] =  this.getData('hmid') + '/TAB' + (this.selectedIndex + 1) + param['attach'];
    this.trigger(ui.events.SEND_LOG, param);
};

/**
 * @override
 */
ad.widget.imageplus.avatar.TabContainer.prototype.dispose = function() {
    if (this._hoverTimer) {
        ad.base.clearTimeout(this._hoverTimer);
        this._hoverTimer = null;
    }
    ad.widget.imageplus.avatar.TabContainer.superClass.dispose.call(this);
};
















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
