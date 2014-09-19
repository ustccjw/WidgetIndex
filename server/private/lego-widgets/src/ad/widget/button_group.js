/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: button_group.js 9823 2012-06-19 02:51:16Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/button_group.js ~ 2012/06/07 22:07:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: 9823 $
 * @description
 * 头部小微博效果
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/button_group.html');
goog.include('ad/widget/button_group.less');

goog.provide('ad.widget.ButtonGroup');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ButtonGroup = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_button_group';
};
baidu.inherits(ad.widget.ButtonGroup, ad.widget.Widget);

/** @private */
ad.widget.ButtonGroup.prototype.patchData = function() {
    var isauto = this.getData('inside.isauto', false);
    if (!isauto) {
        var itemCount = this.getData('options').length;
        var cellWidth = (100 / itemCount) + '%';
        for (var i = 0; i < itemCount; i ++) {
            this._data['options'][i]['_td_width'] = this.getData('td_width', cellWidth);
        }
        this._data['_table_width'] = '100%';
    }
};

/** @override */
ad.widget.ButtonGroup.prototype.bindEvent = function() {
    var me = this;
    if (baidu.g(me.getId('table'))) {
        var links = baidu.g(me.getId('table')).getElementsByTagName('A');
        if (links.length) {
            for (var i = 0, l = links.length; i < l; i++) {
                var key = links[i];
                var index = i;
                baidu.on(key, 'click', (function() {
                    var _index = index;
                    return function(e) {
                        if(me.trigger(ui.events.CLICK, _index, me) === false){
                            baidu.event.preventDefault(e);
                        };
                    };
                })());
            }
        }
    }
};
