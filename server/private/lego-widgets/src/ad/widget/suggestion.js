/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: suggestion.js 2012-07-16 10:25:19Z wangdawei $
 *
 **************************************************************************/



/**
 * src/ad/widget/suggestion.js ~ 2012/06/07 22:07:55
 * @author wangdawei
 * @version $Revision: $
 * @description
 * 栏目模块
 **/
goog.require('ad.dom');
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/suggestion.html');
goog.include('ad/widget/suggestion.less');

goog.provide('ad.widget.Suggestion');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Suggestion = function (data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_suggestion';
};
baidu.inherits(ad.widget.Suggestion, ad.widget.Widget);

/**
 * 获取suggestion数据
 *
 * @param {string} str 输入框的字符
 * @return {Object} suggestion数据
 */
ad.widget.Suggestion.prototype.getSuggestionData = function (str) {
    var me = this;
    var result = [];
    if (str && me._data && me._data['items'] && me._data['items'].length) {
        var items = me._data['items'];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item) {
                if (item['label'] && item['label'].indexOf(str) !== -1) {
                    item['innerHTML'] = item['label'].replace(
                        str,
                        '<em>' + str + '</em>'
                    );
                    result.push(item);
                }
                else {
                    item['innerHTML'] = item['label'];
                }

                if (item['value'] && item['value'].indexOf(str) !== -1) {
                    result.push(item);
                }
            }
        }
        return result;
    }
    else {
        return result;
    }
};

/**
 * 获取当前hover 的suggestion选项
 *
 * @return {Object} {index: 1, item: element,len: 12}
 */
ad.widget.Suggestion.prototype.getCurrentItem = function () {
    var me = this;
    var suggestionItemId = me.getId(me._data['name'] + '-suggestion-items');
    var suggestionItems = baidu.g(suggestionItemId);
    var children = baidu.dom.children(suggestionItems);
    var result = null;
    baidu.array.each(children, function (item, index) {
        if (baidu.dom.hasClass(item, 'ec-item-hover')) {
            result = {
                'index': index,
                'item':item,
                'len':children.length
            };
        }
    });
    return result;
};

/**
 * 去除所有suggestion选项hover的class
 */
ad.widget.Suggestion.prototype.removeHoverClass = function () {
    var me = this;
    var suggestionItemId = me.getId(me._data['name'] + '-suggestion-items');
    var suggestionItems = baidu.g(suggestionItemId);
    var children = baidu.dom.children(suggestionItems);
    baidu.array.each(children, function (item, index) {
        baidu.dom.removeClass(item, 'ec-item-hover');
    });
};

/**
 * 获取suggestion显示状态
 * @return {boolean} 显示：true，隐藏：false
 */
ad.widget.Suggestion.prototype.isVisible = function () {
    var me = this;
    var suggestionItemId = me.getId(me._data['name'] + '-suggestion-items');
    var suggestionItems = baidu.g(suggestionItemId);
    return ad.dom.getStyle(suggestionItems, 'display') !== 'none';
};

/**
 * 关闭Suggestion选项
 */
ad.widget.Suggestion.prototype.closeSuggestion = function () {
    var me = this;
    var suggestionItemId = me.getId(me._data['name'] + '-suggestion-items');
    var suggestionItems = baidu.g(suggestionItemId);
    baidu.dom.setStyles(suggestionItems, {'display':'none'});
};

/**
 * 创建Suggestion选项
 * @param {Object} data suggestion数据
 */
ad.widget.Suggestion.prototype.createSuggestion = function (data) {
    var me = this;
    var suggestionItemId = me.getId(me._data['name'] + '-suggestion-items');
    var suggestionItems = baidu.g(suggestionItemId);
    suggestionItems.innerHTML = '';
    if (data && data.length) {
        var d;
        for (var i =0; i < data.length; i++) {
            d = data[i];
            if (d['label'] && d['value']) {
                var item = baidu.dom.create('li', {
                    'class': 'ec-item',
                    'data-value': d['value'],
                    'data-label': d['label']
                });
                item.innerHTML = d['innerHTML'] || d['label'];
                suggestionItems.appendChild(item);
                /* jshint ignore:start */
                baidu.on(item, 'click', (function () {
                    var _item = item;
                    return function () {
                        var name = me._data['name'];
                        baidu.g(me.getId(name)).value =
                            baidu.dom.getAttr(_item, 'data-value');
                        baidu.g(me.getId(name + '_suggestion')).value =
                            baidu.dom.getAttr(_item, 'data-label');
                        baidu.dom.setStyles(suggestionItems, {
                            'display':'none'
                        });
                    };
                })());
                baidu.on(item, 'mouseover', (function () {
                    var _item = item;
                    return function () {
                        baidu.dom.addClass(_item, 'ec-item-hover');
                    };
                })());
                baidu.on(item, 'mouseout', (function () {
                    var _item = item;
                    return function () {
                        baidu.dom.removeClass(_item, 'ec-item-hover');
                    };
                })());
                /* jshint ignore:end */
            }
        }
        baidu.dom.setStyles(suggestionItems, {
            'display': 'block'
        });
    }
    else {
        baidu.dom.setStyles(suggestionItems, {
            'display': 'none'
        });
    }
};

/**
 * 事件处理
 * @override
 */
ad.widget.Suggestion.prototype.bindEvent = function () {
    var me = this;
    var name = me._data['name'];
    var suggestionId = me.getId(name + '-suggestion');
    var suggestionItemsId = me.getId(name + '-suggestion-items');

    baidu.on(baidu.g(suggestionId), 'keyup', function (e) {
        var keyCode = baidu.event.getKeyCode(e);
        if (keyCode === 38 || keyCode === 40 || keyCode === 13) {
            if (me.isVisible()) {
                var current = me.getCurrentItem();
                if (current) {
                    if (keyCode === 38) {
                        me.removeHoverClass();
                        if (current['index'] <= 0) {
                            baidu.dom.addClass(
                                baidu.dom.last(suggestionItemsId),
                                'ec-item-hover'
                            );
                        }
                        else {
                            baidu.dom.addClass(
                                baidu.dom.prev(current['item']),
                                'ec-item-hover'
                            );
                        }
                    }
                    else if (keyCode === 40 ) {
                        me.removeHoverClass();
                        if (current['index'] >= current['len'] - 1) {
                            baidu.dom.addClass(
                                baidu.dom.first(suggestionItemsId),
                                'ec-item-hover'
                            );
                        }
                        else {
                            baidu.dom.addClass(
                                baidu.dom.next(current['item']),
                                'ec-item-hover'
                            );
                        }
                    }
                    else if (keyCode === 13) {
                        baidu.g(me.getId(name)).value = baidu.dom.getAttr(
                            current['item'],
                            'data-value'
                        );
                        baidu.g(suggestionId).value =
                            baidu.dom.getAttr(current['item'], 'data-label');
                        me.closeSuggestion();
                    }
                }
                else {
                    if (keyCode === 38) {
                        baidu.dom.addClass(
                            baidu.dom.last(suggestionItemsId),
                            'ec-item-hover'
                        );
                    }
                    else if (keyCode === 40 ) {
                        baidu.dom.addClass(
                            baidu.dom.first(suggestionItemsId),
                            'ec-item-hover'
                        );
                    }
                }
                baidu.g(suggestionId).focus();
            }
        }
        else {
            var inputStr = ad.string.trim(baidu.g(suggestionId).value);
            var suggestionData = me.getSuggestionData(inputStr);
            me.createSuggestion(suggestionData);
        }
    });
};









