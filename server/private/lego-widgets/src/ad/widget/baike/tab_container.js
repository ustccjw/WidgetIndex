/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: tab_container.js 2013-09-16 16:39:29Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/widget/baike/tab_container.js ~ 2013/09/16 16:39:29
 * @author dingguoliang01
 * @version $Revision: $
 * @description
 * tab_container模块
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/baike/tab_container.html');
goog.include('ad/widget/baike/tab_container.less');

goog.provide('ad.widget.baike.TabContainer');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.baike.TabContainer = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_baike_tab_container';
};
baidu.inherits(ad.widget.baike.TabContainer, ad.widget.Widget);

/**
 * @private
 * @param {Element} element 被选中的元素
 */
ad.widget.baike.TabContainer.prototype._switchItem = function(element) {
    if (this._lastElement !== null) {
        baidu.dom.removeClass(this._lastElement, "ec-focus");
    }
    baidu.dom.addClass(element, "ec-focus");
    element.appendChild(baidu.g(this.getId('attach')));
    this._lastElement = element;
    var optionIndex = baidu.getAttr(element, 'data-option-index'),
        itemIndex = baidu.getAttr(element, 'data-item-index'),
        item = this.getData('options.'+optionIndex+'.items.'+itemIndex);
    if (item) {
        baidu.g(this.getId('title')).innerHTML = item['title'];
        baidu.g(this.getId('img')).src = item['img'];
        var desc = '';
        baidu.each(item['desc'], function(item) {
            desc += '<p>' + item['p'] + '</p>';
        });
        baidu.g(this.getId('desc')).innerHTML = desc;
    }
};

/**
 * @private
 * @param {Element} element 被展开的元素
 */
ad.widget.baike.TabContainer.prototype._expandItem = function(element) {
    var currentItem = baidu.q('ec-show', baidu.g(this.getId('tab')))[0];
    baidu.removeClass(currentItem, 'ec-show');
    baidu.addClass(element, 'ec-show');
};

/**
 * @override
 */
ad.widget.baike.TabContainer.prototype.bindEvent = function() {
    ad.widget.baike.TabContainer.superClass.bindEvent.call(this);
    var me = this,
        tab = baidu.g(this.getId('tab'));

    baidu.on(tab, 'click', function(opt_evt) {
        var evt = opt_evt || window.event,
            element = evt.target || evt.srcElement;
        if (element.nodeType === 1 && element.nodeName === 'H4') {
            me._expandItem(baidu.dom.next(element));
        }
        baidu.event.preventDefault(evt);
    });

    baidu.on(tab, 'mouseover', function(opt_evt) {
        var evt = opt_evt || window.event;
        var element = evt.target || evt.srcElement;
        if (element.nodeType === 1 && element.nodeName === 'A') {
            me._switchItem(element);
        }
    });
};

/**
 * @override
 */
ad.widget.baike.TabContainer.prototype.patchData = function() {
    this._lastElement = null;
    baidu.each(this.getData('options'), function(option, optionIndex) {
        baidu.each(option['items'], function(item, itemIndex) {
            item['_option_index'] = optionIndex;
            item['_item_index'] = itemIndex;
        });
    });
};
