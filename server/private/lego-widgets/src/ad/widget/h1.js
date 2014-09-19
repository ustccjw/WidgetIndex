/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h1.js 13834 2012-11-03 06:31:22Z liyubei $
 *
 **************************************************************************/


/**
 * src/ad/widget/H1.js ~ 2012/06/07 22:07:55
 * @author loutongbing
 * @version $Revision: 13834 $
 * @description
 * 苏宁易购的头部效果
 **/

goog.require('ad.date');
goog.require('ad.string');
goog.require('ad.widget.Widget');
goog.include('ad/widget/h1.html');
goog.include('ad/widget/h1.less');

goog.provide('ad.widget.H1');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.H1 = function (data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_h1';
};
baidu.inherits(ad.widget.H1, ad.widget.Widget);

/** @override */
ad.widget.H1.prototype.patchData = function () {
    if (this._data) {
        this._data['last_update_date'] = ad.date.getLastUpdate();
        this._rewriteLinks();
    }
    if (this._data['description_rcv_url'] === '') {
        delete this._data['description_rcv_url'];
    }
    if (this._data['description_rcv_html']) {
        this._data['description'] = this._data['description_rcv_html'];
    }
    if (this._data['logo'] && this._data['logo']['logo'] === '') {
        delete this._data['logo'];
    }
    if (this._data['image_links'] && this._data['image_links']['options'].length <= 0) {
        delete this._data['image_links'];
    }

    if (this._data['ps_select']) {
        var title = (this._data['ps_select']['title']) ? this._data['ps_select']['title'] : this._data['title'];
        title = title.replace(/<em>|<\/em>/g, '');
        var url = (this._data['ps_select']['site']) ? this._data['ps_select']['site'] : this._data['site'];
        url = /^https?:\/\//.test(url) ? url : 'http://' + url;
        var data = {
            // title中会包含&quot;等字符，需要decode
            'title': baidu.decodeHTML(title),
            'url': url
        };
        this._data['ps_select']['data'] = baidu.json.stringify(data);
    }
    if (this._data.hasOwnProperty('sign')) {
        if (baidu.platform.isIpad) {
            this._data['ps_vsign'] = false;
        }
        else {
            this._data['ps_vsign'] = true;
        }
    }

    if (this._data['ps_msign'] && this._data['ps_msign']['true']) {
        this._data['ps_msign'] = this._data['ps_msign']['true'];
    }
    else {
        this._data['ps_msign'] = false;
    }
};
/** @override */
ad.widget.H1.prototype.enterDocument = function () {
    ad.widget.H1.superClass.enterDocument.call(this);
    if (this._data['description_rcv_url'] === undefined) {
        var links = baidu.g(this.getId('description')).getElementsByTagName('A');
        if (links.length) {
            var key;
            for (var i = 0, l = links.length; i < l; i++) {
                key = links[i];
                if (!key.getAttribute('title2') && key.innerHTML !== '品牌推广') {
                    key.setAttribute('title2', '关键词' + (i + 1));
                }
            }
        }
    }
};

/** @override */
ad.widget.H1.prototype.bindEvent = function () {
    ad.widget.H1.superClass.bindEvent.call(this);
    var me = this;
    if (this._data['ps_vsign']) {
        var bdsReady = ad.base.getObjectByName('bds.ready');
        if ('function' === typeof bdsReady) {
            bdsReady(function () {
                // 创建dom
                var trustDom = baidu.g(me.getId('c-trust'));
                trustDom.innerHTML = '<span class="c-trust" data_key="' + me._data['sign'] + '"></span>';
                var trustObj = ad.base.getObjectByName('bds.se.trust');
                if (trustObj && 'function' === typeof trustObj['init']) {
                    trustObj['init']();
                }
            });
        }
    }
    if (this._data['ps_msign']) {
        var domSign = ad.dom.g(this.getId('ec-money'));
        if (domSign) {
            var tip = ad.dom.g(this.getId('ec-money-con'));
            var state;
            ad.dom.hover(domSign, function () {
                setTimeout(function () {
                    state = 1;
                }, 20);
                setTimeout(function () {
                    if (state === 1) {
                        var position = baidu.dom.getPosition(domSign);
                        baidu.setStyle(tip, 'left', (position.left - 10) + 'px');
                        baidu.setStyle(tip, 'top', (position.top + 30) + 'px');
                        baidu.setStyle(tip, 'display', 'block');
                    }
                }, 350);
            }, function () {
                state = 2;
                setTimeout(function () {
                    if (state === 2) {
                        baidu.setStyle(tip, 'display', 'none');
                    }
                }, 400);
            });
            ad.dom.hover(tip, function () {
                setTimeout(function () {
                    state = 3;
                }, 20);
            }, function () {
                state = 4;
                setTimeout(function () {
                    if (state === 4) {
                        baidu.setStyle(tip, 'display', 'none');
                    }
                }, 400);
            });
        }
    }
};

/**
 * 修订链接词
 */
ad.widget.H1.prototype._rewriteLinks = function () {
    var desc = this._data['description'];
    var arrQuery = this._data['query'];
    if (desc && arrQuery && arrQuery.length) {
        delete this._data['description_rcv_url']; // 都有链接词了，应该就不显示描述链接了
        arrQuery = arrQuery.sort(function (kw1, kw2) {
            return kw2['key_word'].length - kw1['key_word'].length;
        });
        for (var i = 0, len = arrQuery.length; i < len; i++) {
            desc = desc.replace(
                new RegExp(ad.string.escapeReg(arrQuery[i]['key_word']), 'g'),
                '{#' + i + '#}'
            ); // keyword含特殊字符时可能bug
            arrQuery[i]['link_html'] = '<a target=\"_blank\" href=\"' +
                arrQuery[i]['rcv_url'] + '\">' +
                arrQuery[i]['key_word'] + '</a>';
        }
        for (i = 0; i < len; i++) {
            desc = desc.replace(new RegExp(ad.string.escapeReg('{#' + i + '#}'), 'g'), arrQuery[i]['link_html']);
        }
        this._data['description'] = desc;
        delete this._data['query'];
    }
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
