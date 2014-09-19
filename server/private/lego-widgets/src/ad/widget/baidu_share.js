/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: baidu_share.js 2012-07-16 10:25:19Z fanxueliang $
 *
 **************************************************************************/


/**
 * src/ad/widget/baidu_share.js ~ 2012/06/07 22:07:55
 * @author fanxueliang(fanxueliang@baidu.com)
 * @version $Revision: $
 * @description
 * 旧版百度分享模块【已弃用】，请使用新版(ad.widget.BaiduShareV2)
 **/
goog.require('ad.base');
goog.require('ad.widget.Widget');

goog.include('ad/widget/baidu_share.html');
goog.include('ad/widget/baidu_share.less');

goog.provide('ad.widget.BaiduShare');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.BaiduShare = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * @type {?}
     * @private
     */
    this._bdshare;

    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_baidu_share';
};
baidu.inherits(ad.widget.BaiduShare, ad.widget.Widget);

/** @override */
ad.widget.BaiduShare.prototype.patchData = function() {
    if (!this._data['display']) {
        return ;
    }
    var keys = ['bdText', 'bdPic'];
    var dataConfig = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var data = ad.base.getObjectByName('config.' + key, this._data);
        if (data) {
            dataConfig[key] = /** @type {string} */ (data);
        }
    }
    window['bds_config'] = dataConfig;
    this._data['share_url'] = ad.base.getObjectByName('config.url', this._data);

    var map = {
        "bds_tsina": "新浪微博",
        "bds_tqq": "腾讯微博",
        "bds_kaixin001": "开心网",
        "bds_renren": "人人网",
        "bds_tsohu": "搜狐微博",
        "bds_qzone": "QQ空间",
        "bds_douban": "豆瓣网",
        "bds_t163": "网易微博",
        "bds_more": "更多"
    };
    var options = this._data && this._data['options'];
    if (options) {
        for (var i = 0; i < options.length; i++) {
            options[i]['name'] = map[options[i]['type']];
        }
    }
};

/** @override */
ad.widget.BaiduShare.prototype.bindEvent = function() {
    if (this._data['display']) {
        var me = this;
        var url = RT_CONFIG.HOST('ecma.bdimg.com') + '/public01/ui/bdshare.js';
        var requireId = url.replace(/[\W]/g, '');
        var requestUrl = url + '?cdnversion=' + Math.ceil(new Date() / 3600000);
        ad.base.require(requireId, requestUrl, function(bdshare){
            try {
                me._bdshare = bdshare;
                bdshare['fn']['init']({'type': 'tools', 'mini': '1'});
                me._fixClickEvent();
            } catch(ex) {
            }
        });
    }
};

/**
 * 由于百度分享阻止了事件冒泡，监控事件需要直接绑定到分享按钮元素
 * @private
 */
ad.widget.BaiduShare.prototype._fixClickEvent = function() {
    var me = this;
    var ctner = baidu.g(this.getId('baidu-share'));
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
ad.widget.BaiduShare.prototype.dispose = function() {
    var ctner = baidu.g(this.getId('baidu-share'));
    var links = ctner.getElementsByTagName('a');
    if (links) {
        baidu.each(links, function(link) {
            baidu.un(link, 'click');
        });
    }

    if (this._bdshare) {
        try {
            this._bdshare['fn']['dispose']();
        } catch(ex) {}
    }

    ad.widget.BaiduShare.superClass.dispose.call(this);
};



/* vim: set ts=4 sw=4 sts=4 tw=100 : */
