/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget_collection.js 15136 2012-12-03 03:09:35Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/widget_collection.js ~ 2012/09/10 16:00:42
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 15136 $
 * @description
 *
 **/
goog.require('ad.test.url');

goog.provide('ad.test.WidgetCollection');

/**
 * Widget的集合
 * @constructor
 */
ad.test.WidgetCollection = function(opt_widgetInfo) {
    // TODO
    this._widgetInfoMap = this._toMap(opt_widgetInfo || [], 'ns');
    this._ignoreNoSchema = !!opt_widgetInfo;
};

/**
 * 获取WidgetCollection的根节点.
 * @return {Element}
 */
ad.test.WidgetCollection.prototype.getRoot = function() {
    var wrapper = document.querySelector('.widget-list');
    return wrapper;
};

ad.test.WidgetCollection.prototype.show = function() {
    if (typeof ER_AD_WIDGET_LIST == 'undefined') {
        return false;
    }

    var wrapper = this.getRoot();
    if (!wrapper) {
        return false;
    }

    baidu.array.each(ER_AD_WIDGET_LIST['page']['result'], function(item) {
        if (item['preview_file']) {
            item['preview_file'] = ad.test.url.getAbsolute(item['preview_file']);
        }
    });

    var tpl = [
        '{{#.}}',
        '<dl>',
            '<dt data-ns="{{ns}}">{{name}}</dt>',
            '<!--<dd><img src="{{preview_file}}" /></dd>-->',
        '</dl>',
        '{{/.}}'
    ].join('');
    var data = [];
    var widgets = ER_AD_WIDGET_LIST.page.result;
    for (var i = 0; i < widgets.length; i++) {
        var ns = widgets[i].ns;
        var wi = this._widgetInfoMap[ns];
        widgets[i].name = wi && wi['name'] ? wi['name'] : ns.replace(/ad\.widget\./, '');
        if (this._ignoreNoSchema) {
            wi && data.push(widgets[i]);
        } else {
            data.push(widgets[i]);
        }
    }
    wrapper.innerHTML = Mustache.render(tpl, data);

    var dls = document.querySelectorAll('.widget-list > dl');
    var ctner = baidu.q('widget-list')[0];
    var replacement = null;
    for (var i = 0; i < dls.length; i++) {
        baidu.dom.draggable(dls[i], {
            'onbeforedragstart': function(target) {
                var pos = baidu.dom.getPosition(target);
                var wh = {
                    width: target.offsetWidth,
                    height: target.offsetHeight
                }
                replacement = target.cloneNode(true);
                target.parentNode.insertBefore(replacement, target);
                document.body.appendChild(target);
                target.style.position = 'absolute';
                target.style.top = pos.top + 'px';
                target.style.left = pos.left + 'px';
                target.style.width = wh.width + 'px';
                target.style.height = wh.height + 'px';
                baidu.dom.addClass(target, 'widget-item-active');
            },
            'ondragstart' : function(target) {
                target.style.zIndex = 99999;

                //ctner.style.overflowX = 'visible';
            },
            'ondragend' : function(target) {
                baidu.dom.removeClass(target, 'widget-item-active');
                replacement.parentNode.insertBefore(target, replacement);
                setTimeout(function() {
                    //XXX: 必须在setTimeout里hide，否则ondrop不会执行(baidu.dom.intersect得不到两元素相交的结果...)
                    baidu.hide(target);
                    target.style.position = 'static';
                    target.style.left = '';
                    target.style.top = '';
                    target.style.width = '';
                    target.style.height = '';
                    target.style.zIndex = '';
                    baidu.show(target);
                    replacement.parentNode.removeChild(replacement);
                    //baidu.dom.removeStyle(ctner, 'overflow');
                }, 100);
            }
        });
    }
};

/**
 * 数组转换为Map
 * @param {Array.<Object>} arr 数组
 * @param {string} key 下标
 * @return {Object.<string, Object>}
 */
ad.test.WidgetCollection.prototype._toMap = function(arr, key) {
    var map = {};
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        map[item[key]] = item;
    }
    return map;
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
