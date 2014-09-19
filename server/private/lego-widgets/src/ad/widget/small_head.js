/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h1.js 9823 2012-06-19 02:51:16Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/H1.js ~ 2012/06/07 22:07:55
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 9823 $
 * @description
 * 苏宁易购的头部效果
 **/

goog.require('ad.date');
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/small_head.html');
goog.include('ad/widget/small_head.less');

goog.provide('ad.widget.SmallHead');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.SmallHead = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_small_head';
};
baidu.inherits(ad.widget.SmallHead, ad.widget.Widget);

/** @private */
ad.widget.SmallHead.prototype.patchData = function() {
    if (this._data) {
        if (this._data['logoimg'] && (!this._data['logoimg']['logoimg'])) {
            delete this._data['logoimg'];
        }

        var imgOptions = this.getData('image_group_head.options');
        if (imgOptions) {
            for (var i = 0; i < imgOptions.length; i++) {
                if (!imgOptions[i]['img_rcv_url']) {
                    delete imgOptions[i]['img_rcv_url'];
                }
            }
        }

        this._data['last_update_date'] = ad.date.getLastUpdate();
        this._rewriteLinks();
    }
};

/** @override */
ad.widget.SmallHead.prototype.enterDocument = function() {
    ad.widget.SmallHead.superClass.enterDocument.call(this);

    var description = baidu.g(this.getId('description'));
    if (description) {
        var links = description.getElementsByTagName('A');
        if (links.length) {
            for (var i = 0, l = links.length; i < l; i++) {
                var key = links[i];
                if (key.innerHTML === '品牌推广') {
                    continue;
                }

                key.setAttribute('title2', '关键词' + (i + 1));
            }
        }
    }

    var imagegroup = baidu.g(this.getId('imagegroup'));
    if (imagegroup) {
        var imglinks = imagegroup.getElementsByTagName('A');
        if (imglinks.length) {
            for (var i = 0, l = imglinks.length; i < l; i++) {
                var key = imglinks[i];
                if (key.getAttribute('href')) {
                    key.setAttribute('title2', '产品图片' + (i + 1));
                }
            }
        }
    }
};

/** @override */
ad.widget.SmallHead.prototype.bindEvent = function() {
    /* jshint ignore:start */
    var me = this;
    var imagegroup = baidu.g(me.getId('imagegroup'));
    if (imagegroup) {
        var imglinks = imagegroup.getElementsByTagName('A');
        if (imglinks.length) {
            for (var i = 0, l = imglinks.length; i < l; i++) {
                var key = imglinks[i];
                var index = i;
                baidu.on(key, 'click', (function() {
                    var _index = index;
                    var link = imglinks[index];
                    return function(e) {
                        if (me.trigger(ui.events.CLICK, _index, me, link) === false) {
                            baidu.event.preventDefault(e);
                        }
                    };
                })());
            }
        }
    }
    /* jshint ignore:end */
};

/**
 * 修订链接词
 */
ad.widget.SmallHead.prototype._rewriteLinks = function() {
    var desc = this._data['description_rcv_html'];
    var arrQuery = this._data['query'];

    if (desc && arrQuery && arrQuery.length) {
        /* jshint ignore:start */
        for (var i = 0, len = arrQuery.length; i < len; i++) {
            var re = new RegExp(arrQuery[i]['key_word'], 'g');
            desc = desc.replace(re, function(keyword) {
                return '<a target=\"_blank\" href=\"' +
                    arrQuery[i]['rcv_url'] + '\" class=\"' +
                    (arrQuery[i]['class_name'] || '') + '\">' + keyword + '</a>';
            });
        }
        /* jshint ignore:end */
        this._data['description_rcv_html'] = desc;
    }
};













/* vim: set ts=4 sw=4 sts=4 tw=100 : */
