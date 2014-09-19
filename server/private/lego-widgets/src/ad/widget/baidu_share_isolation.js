/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/baidu_share_isolation.js ~ 2014/08/25 12:59:48
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * baidu_share_isolation相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/baidu_share_isolation.less');
goog.include('ad/widget/baidu_share_isolation.html');

goog.provide('ad.widget.BaiduShareIsolation');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.BaiduShareIsolation = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_baidu_share_isolation';
};
baidu.inherits(ad.widget.BaiduShareIsolation, ad.widget.Widget);

/** @override */
ad.widget.BaiduShareIsolation.prototype.enterDocument = function() {
    ad.widget.BaiduShareIsolation.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.BaiduShareIsolation.prototype.bindEvent = function() {
    ad.widget.BaiduShareIsolation.superClass.bindEvent.call(this);

    var me = this;
    var icons = getByClass('ec-icon-qrcode', 'div', baidu.g(this.getId('icons')));
    if (icons && icons.length) {
        baidu.array.each(icons, function(icon, i) {
            baidu.on(icon, 'click', function(evt) {
                baidu.event.stop(evt);
                var target = evt.target || evt.srcElement;
                if (target.className.indexOf('ec-icon-link') >= 0) {
                    baidu.array.each(icons, function(icon, i) {
                        baidu.dom.removeClass(icon, 'ec-icon-qrcode-show');
                    });
                    baidu.dom.addClass(this, 'ec-icon-qrcode-show');
                } 
                else if (target.className.indexOf('ec-qrcode-close-btn') >= 0) {
                    baidu.dom.removeClass(this, 'ec-icon-qrcode-show');
                }
                me.trigger(ui.events.CLICK, i, evt);
            });
        });
    }

    /**
     * Find tagName elements with className in container
     * 
     * @param  {string} className 
     * @param  {string} tagName   
     * @param  {Node}   container 
     * @return {NodeList}
     */
    function getByClass(className, tagName, container) {
        var elements = container.getElementsByTagName(tagName || '*');
        var filterElements = [];
        if (elements.getElementsByClassName) {
            return elements.getElementsByClassName(className);
        } 
        else {
            baidu.each(elements, function(element) {
                if (element.className.indexOf(className) >= 0) {
                    filterElements.push(element);
                }
            });
            return filterElements;
        }
    }
};

/** @override */
ad.widget.BaiduShareIsolation.prototype.patchData = function() {
    if (!this._data || !this._data['options']) {
        return ;
    }

    var options = [];
    baidu.each(this._data['options'], function(option) {
        option = option['platform'];
        var name;
        for (var i in option) {
            name = i;
            break;
        }
        option = option[name];

        var _option;
        _option = {
            'name': name,
            'title': option['title']
        };
        if (option['qrcode']) {
            _option['qrcode'] = option['qrcode'];
            if ('url' in option['qrcode']['type']) {
                option['params']['url'] = option['qrcode']['type']['url']['url'];
            } 
            else if ('image' in option['qrcode']['type']) {
                option['api'] = option['qrcode']['type']['image']['url'];
                option['params'] = {};
            }
        }
        _option['url'] = generateUrl(option['api'], option['params']);

        options.push(_option);
    });
    this._data['options'] = options;

    function generateUrl(apiUrl, params) {
        var paramsPair = [];
        for (var i in params) {
            paramsPair.push(i + '=' + encodeURIComponent(params[i]));
        }
        return paramsPair ? apiUrl + '?' + paramsPair.join('&') : apiUrl;
    }

};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
