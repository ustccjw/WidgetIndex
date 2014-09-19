/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/plusbox/plusbox.js ~ 2012/09/26 17:55:39
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 10927 $
 * @description
 * plusbox相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/plusbox/plusbox.less');
goog.include('ad/widget/plusbox/plusbox.html');

goog.provide('ad.widget.plusbox.Plusbox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.plusbox.Plusbox = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_plusbox_plusbox';
};
baidu.inherits(ad.widget.plusbox.Plusbox, ad.widget.Widget);

/** @override */
ad.widget.plusbox.Plusbox.prototype.enterDocument = function() {
    ad.widget.plusbox.Plusbox.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.plusbox.Plusbox.prototype.bindEvent = function() {
    ad.widget.plusbox.Plusbox.superClass.bindEvent.call(this);

    var icon = baidu.g(this.getId('icon'));
    var content = baidu.g(this.getId('content'));
    var adslogan = baidu.g(this.getId('ad-slogan'));

    baidu.on(this.getId('bar'), 'click', function(e) {
        if (baidu.dom.hasClass(icon, 'icon-close')) {
            baidu.dom.removeClass(icon, 'icon-close');
            baidu.dom.addClass(icon, 'icon-expand');

            baidu.show(content);
            if (adslogan) {
                baidu.hide(adslogan);
            }
        } else {
            baidu.dom.removeClass(icon, 'icon-expand');
            baidu.dom.addClass(icon, 'icon-close');

            baidu.hide(content);
            if (adslogan) {
                baidu.show(adslogan);
            }
        }

        baidu.event.stop(e || window.event);
    });
    /*
    if (baidu.browser.ie) {
        baidu.on(this.getId('items'), 'mouseover', function(e) {
            var target = baidu.event.getTarget(e || window.event);
            if (target.nodeName == 'IMG') {
                var span = target.parentNode.getElementsByTagName('span');
                if (span && span[0]) {
                    baidu.show(span[0]);
                }
            }
        });

        baidu.on(this.getId('items'), 'mouseout', function(e) {
            var target = baidu.event.getTarget(e || window.event);
            if (target.nodeName == 'IMG') {
                var span = target.parentNode.getElementsByTagName('span');
                if (span && span[0]) {
                    baidu.hide(span[0]);
                }
            }
        });
    }*/
};

/** @override */
ad.widget.plusbox.Plusbox.prototype.patchData = function() {
    if (this._data) {
        baidu.array.each(this._data['items'], function(item) {
            if (item['tip_img']) {
                var img = item['tip_img'];
                if (img == '惠') {
                    item['_tip_img_icon'] = 'hui';
                } else if (img == '折') {
                    item['_tip_img_icon'] = 'zhe';
                }
            }
        });
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
