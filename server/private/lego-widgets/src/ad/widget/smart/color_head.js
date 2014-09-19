/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/smart/color_head.js ~ 2013/11/13 15:47:27
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * color_head相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/smart/color_head.less');
goog.include('ad/widget/smart/color_head.html');

goog.provide('ad.widget.smart.ColorHead');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.smart.ColorHead = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_smart_color_head';
};
baidu.inherits(ad.widget.smart.ColorHead, ad.widget.Widget);

/** @override */
ad.widget.smart.ColorHead.prototype.bindEvent = function() {
    ad.widget.smart.ColorHead.superClass.bindEvent.call(this);
    var me = this;
    if (this._data['_show_expand']) {
        var elmExpand = baidu.g(me.getId('expand'));
        elmExpand.onclick = function(evt) {
            baidu.g(me.getId('colors')).innerHTML = baidu.encodeHTML(me._data['origin_colors']);
            elmExpand.onclick = null;
            baidu.hide(elmExpand);
            me.trigger(ui.events.CLICK, elmExpand);
            baidu.event.preventDefault(evt || window.event);
        };
    }
};

/** @override */
ad.widget.smart.ColorHead.prototype.patchData = function() {
    if (this._data) {
        var colors = [];
        for (var i = 0, len = this._data['colors'].length; i < len; i++) {
            colors.push(this._data['colors'][i]['color']);
        }
        this._data['origin_colors'] = colors.join('、');
        var colorText = this._data['origin_colors'];
        var maxLength = this._data['max_length'] || 74;
        if (baidu.string.getByteLength(colorText) >= maxLength) {
            colorText = baidu.string.subByte(colorText, maxLength - 10);
            this._data['_show_expand'] = true;
            colorText += '...';
        }
        this._data['color_text'] = colorText;
    }
}









/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
