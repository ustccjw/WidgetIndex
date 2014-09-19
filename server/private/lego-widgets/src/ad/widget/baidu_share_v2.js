/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: baidu_share_v2.js 2012-07-16 10:25:19Z fanxueliang $
 *
 **************************************************************************/


/**
 * src/ad/widget/baidu_share_v2.js ~ 2012/06/07 22:07:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: $
 * @description
 * 栏目模块
 **/
goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/baidu_share_v2.html');
goog.include('ad/widget/baidu_share_v2.less');

goog.provide('ad.widget.BaiduShareV2');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.BaiduShareV2 = function(data) {
    ad.widget.Widget.call(this, data);
    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_baidu_share_v2';
};
baidu.inherits(ad.widget.BaiduShareV2, ad.widget.Widget);

/** @override */
ad.widget.BaiduShareV2.prototype.patchData = function() {
    var options = [];
    if (this._data['display']) {
        this._data['display_more'] = typeof this._data['display_more'] === 'undefined'
            ? true : this._data['display_more'];
        var type = this._data['type'];
        baidu.object.each(type, function(value, key) {
            if (value) {
                options.push(
                    {
                        'type': key,
                        'name': ''
                    }
                );
            }
        });
    }
    
    var map = {
        'tsina': '新浪微博',
        'tqq': '腾讯微博',
        'kaixin001': '开心网',
        'renren': '人人网',
        'tsohu': '搜狐微博',
        'weixin': '微信',
        'douban': '豆瓣网',
        'more': '更多'
    };
    if (options && options.length) {
        for (var i = 0; i < options.length; i++) {
            options[i]['name'] = map[options[i]['type']];
        }
    }
    this._data['options'] = options;
    this._data['data_tag'] = 'share_pl_qtz';
    this._data['common']['tag'] = this._data['data_tag'];
};

/** @override */
ad.widget.BaiduShareV2.prototype.bindEvent = function() {
    var me = this;
    function requireBaiduShare() {
        ad.base.exportPath('ECMA.HOST_MAP.BD_SHARE', RT_CONFIG.HOST('bdimg.share.baidu.com'));
        ad.base.exportPath('ECMA.HOST_MAP.ECMA_CDN', RT_CONFIG.HOST('ecma.bdimg.com'));
        var url = RT_CONFIG.HOST('ecma.bdimg.com') + '/public01/bdshare/loader.js';
        var requireId = url.replace(/[\W]/g, '');
        var requestUrl = url;
        ad.base.require(requireId, requestUrl, function(Share) {
            try {
                me._bdshare = new Share(me._data['common']);
                me._fixClickEvent();
            }
            catch (ex) {
            }
        });
    }
    if (me._data['display']) {
        requireBaiduShare();
    }
};

/**
 * 由于百度分享阻止了事件冒泡，监控事件需要直接绑定到分享按钮元素
 * @private
 */
ad.widget.BaiduShareV2.prototype._fixClickEvent = function() {
    var me = this;
    var ctner = baidu.g(this.getId('baidu-share-v2'));
    var links = ctner.getElementsByTagName('a');
    if (links) {
        baidu.each(links, function(link) {
            baidu.on(link, 'click', function(evt) {
                var title = baidu.dom.getAttr(link, 'title2');
                if (title) {
                    me.sendLog({
                        'action': '[分享]' + title,
                        '__node': link
                    });
                }
            });
        });
    }
};

/**
 * @inheritDoc
 */
ad.widget.BaiduShareV2.prototype.dispose = function() {
    var ctner = baidu.g(this.getId('baidu-share-v2'));
    if (ctner) {
        var links = ctner.getElementsByTagName('a');
        if (links) {
            baidu.each(links, function(link) {
                baidu.un(link, 'click');
            });
        }
    }

    if (this._bdshare) {
        try {
            this._bdshare['dispose']();
        }
        catch (ex) {}
    }

    ad.widget.BaiduShareV2.superClass.dispose.call(this);
};



/* vim: set ts=4 sw=4 sts=4 tw=100 : */
