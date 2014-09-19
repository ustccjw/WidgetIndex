/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/floatvideo/like.js ~ 2012/12/25 15:40:39
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * like相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/floatvideo/like.less');
goog.include('ad/widget/floatvideo/like.html');

goog.provide('ad.widget.floatvideo.Like');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.floatvideo.Like = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_floatvideo_like';
};
baidu.inherits(ad.widget.floatvideo.Like, ad.widget.Widget);

/** @override */
ad.widget.floatvideo.Like.prototype.enterDocument = function() {
    ad.widget.floatvideo.Like.superClass.enterDocument.call(this);

    var me = this;
    window['bdShare_config'] = me._data;
    baidu.sio.callByBrowser(RT_CONFIG.HOST("bdimg.share.baidu.com") + "/static/js/like_shell.js?t=" + Math.ceil(new Date() / 3600000), function() {
        baidu.on(baidu.g(me.getId('button')), 'click', function() {
            me.trigger(ui.events.CLICK);
        });
    });
};


/* vim: set ts=4 sw=4 sts=4 tw=100: */
