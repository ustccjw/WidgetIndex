/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/ad/widget/widget_container.js
 * desc:    容器Widget基类
 * author:  songao(songao@baidu.com), leeight(liyubei@baidu.com)
 * version: $Revision$
 * date:    $Date: 2012/08/21 11:37:03$
 */

goog.require('ad.base');
goog.require('ad.render.RecursiveRender');
goog.require('ad.widget.Widget');

goog.provide('ad.widget.WidgetContainer');

/**
 * @param {Object} data 数据集合.
 * @param {string=} opt_titlePrefix 监控title前缀.
 * @extends {ad.widget.Widget}
 * @constructor
 */
ad.widget.WidgetContainer = function(data, opt_titlePrefix) {
    ad.widget.Widget.call(this, data);

    /**
     * @type {ad.render.Render}
     */
    this._render = new ad.render.RecursiveRender({
        'block_class': 'ad-block'
    });

    /**
     * @type {!Array.<ad.widget.Widget>}
     */
    this._widgets = [];

    /**
     * @type {string}
     * @private
     */
    this._titlePrefix = opt_titlePrefix || '';
};
baidu.inherits(ad.widget.WidgetContainer, ad.widget.Widget);

/**
 * @param {ad.render.Render} render 渲染器.
 */
ad.widget.WidgetContainer.prototype.setRender = function(render) {
    this._render = render;
};


/**
 * @expose
 * @param {...!(Array.<ad.widget.Widget>|ad.widget.Widget)} var_args Zero or more sets, as arrays.
 */
ad.widget.WidgetContainer.prototype.setWidgets = function(var_args) {
    this._widgets = [].slice.call(arguments);
};

/**
 * @param {...number} var_args 索引序列.
 * @return {?ad.widget.Widget}
 */
ad.widget.WidgetContainer.prototype.getWidget = function(var_args) {
    var indexes = Array.prototype.slice.call(arguments);
    if (!indexes.length) {
        return null;
    }

    var cur_object = this._widgets[indexes[0]];
    if (!cur_object) {
        return null;
    }

    for (var i = 1; i < indexes.length; i++) {
        cur_object = cur_object[indexes[i]];
        if (cur_object == null) {
            return null;
        }
    }
    return /** @type {ad.widget.Widget} */ (cur_object);
};

/**
 * @inheritDoc
 */
ad.widget.WidgetContainer.prototype.getMainHtml = function() {
    this._data['_content'] = this._render.process(this._widgets);
    return ad.widget.WidgetContainer.superClass.getMainHtml.call(this);
};

/**
 * 遍历所有的widgets，执行回调函数.
 * @param {function(ad.widget.Widget)} callback widget的回调函数.
 */
ad.widget.WidgetContainer.prototype.forEach = function(callback) {
    ad.base.forEach(this._widgets, callback);
};

/**
 * 给指定widget绑定发送日志事件
 * @param {ad.widget.Widget} widget 目标widget.
 */
ad.widget.WidgetContainer.prototype.handleWidgetEvent = function(widget) {
    var me = this;
    widget.addListener(ui.events.SEND_LOG, function(params) {
        params['action'] = (me._titlePrefix || '') + params['action'];
        me.sendLog(params);
    });
};

/**
 * @inheritDoc
 */
ad.widget.WidgetContainer.prototype.init = function() {
    this.forEach(function(widget){
        widget.init();
    });
};

/**
 * @inheritDoc
 */
ad.widget.WidgetContainer.prototype.enterDocument = function() {
    this.forEach(function(widget) {
        widget.enterDocument();
    });
};

/**
 * @inheritDoc
 */
ad.widget.WidgetContainer.prototype.bindEvent = function() {
    this.forEach(function(widget) {
        widget.bindEvent();
    });

    // XXX: 动态添加的widget，需要自己手动调用bindWidgetLogEvent
    var me = this;
    this.forEach(function(widget) {
        me.handleWidgetEvent(widget);
    });
};

/** @inheritDoc */
ad.widget.WidgetContainer.prototype.dispose = function() {
    this.forEach(function(widget){
        widget.dispose();
    });
}

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
