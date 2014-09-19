/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: share.js 2012-07-16 10:25:19Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/share.js ~ 2012/06/07 22:07:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: $
 * @description
 * 栏目模块
 **/
goog.require('ad.base');
goog.require('ad.dom');
goog.require('ad.widget.Widget');

goog.include('ad/widget/share.html');
goog.include('ad/widget/share.less');

goog.provide('ad.widget.Share');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Share = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_share';
};
baidu.inherits(ad.widget.Share, ad.widget.Widget);

/** @private */
ad.widget.Share.prototype.patchData = function() {
    var keys = ['share_text', 'share_link', 'share_pic', 'share_site'];
    for(var i = 0; i < keys.length; i ++) {
        var key = keys[i];
        var data = ad.base.getObjectByName('config.' + key, this._data);
        if (data) {
            this._data['config'][key] = encodeURIComponent(/** @type {string} */(data));
        }
    }
    var site = ad.base.getObjectByName('config.share_site', this._data);
    var link = ad.base.getObjectByName('config.share_link', this._data);
    if (!site && link) {
        this._data['config']['share_site'] = link;
    }

    var map = {
        'sina': '新浪微博',
        'qqweibo': '腾讯微博',
        'renren': '人人网',
        'sohu': '搜狐微博',
        'kaixin': '开心网',
        'qqzone': 'QQ空间',
        'douban': '豆瓣博'
    };
    var options = this._data && this._data['options'];
    if (options) {
        for (var i = 0; i < options.length;  i++) {
            options[i]['name'] = map[options[i]['type']];
            options[i]['index'] = i + 1;
            options[i]['left'] = i * 28 + 55;
        }
    }
};

/**
 * @param {string} type 分享的类型.
 */
ad.widget.Share.prototype._startShare = function(type) {
    function getParamsOfShareWindow(width, height) {
        return ['toolbar=0,status=0,resizable=1,width=' + width +
            ',height=' + height +
            ',left=', (screen.width-width)/2,
            ',top=', (screen.height-height)/2
        ].join('');
    }

    var map = {
        'sina': [
            'http://v.t.sina.com.cn/share/share.php?searchPic=false',
            ['url', 'share_link'],
            ['title', 'share_text'],
            ['pic', 'share_pic']
        ],
        'qqweibo': [
            'http://share.v.t.qq.com/index.php?c=share&a=index',
            ['url', 'share_link'],
            ['title', 'share_text'],
            ['pic', 'share_pic'],
            ['site', 'share_site']
        ],
        'douban': [
            'http://shuo.douban.com/!service/share',
            ['href', 'share_link'],
            ['name', 'share_text'],
            ['image', 'share_pic']
        ],
        'sohu': [
            'http://t.sohu.com/third/post.jsp?content=utf-8',
            ['url', 'share_link'],
            ['title', 'share_text'],
            ['pic', 'share_pic'],
            ['site', 'share_site']
        ],
        'kaixin': [
            'http://www.kaixin001.com/rest/records.php?style=11',
            ['url', 'share_link'],
            ['title', 'share_text'],
            ['pic', 'share_pic'],
            ['content', 'share_text']
        ],
        'renren': [
            'http://widget.renren.com/dialog/share?description=',
            ['resourceUrl', 'share_link'],
            ['title', 'share_text'],
            ['pic', 'share_pic'],
            ['srcUrl', 'share_site']
        ],
        'qqzone': [
            'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
            ['url', 'share_link'],
            ['title', 'share_text'],
            ['summary', 'share_text'],
            ['pics', 'share_pic']
        ]
    };
    if (!map[type]) {
        return;
    }

    var item = map[type];
    var prefix = item[0];
    var params = [];
    for(var i = 1; i < item.length; i ++) {
        params.push(item[i][0] + '=' + (this._data['config'][item[i][1]]));
    }
    var url = prefix + ((prefix.indexOf('?') !== -1) ? '&' : '?') + params.join('&');
    window.open(url, 'share', getParamsOfShareWindow(607, 523));
};

/** @override */
ad.widget.Share.prototype.bindEvent = function() {
    var me = this;

    ad.dom.on(this.getRoot(), 'click', function(opt_evt){
        var evt = opt_evt || window.event;
        var target = evt.target || evt.srcElement;
        if (target.nodeType === 1 &&
            target.getAttribute('data-role') === 'button') {
            var type = target.className.replace(/^ec-|-share$/g, '');
            me._startShare(type);
        }
    });
};












/* vim: set ts=4 sw=4 sts=4 tw=100 : */
