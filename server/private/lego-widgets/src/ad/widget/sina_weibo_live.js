/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/sina_weibo_live.js ~ 2014/04/29 12:56:07
 * @author hekai02@baidu.com (Kyle He)
 * @version $Revision: 150523 $
 * @description
 * sina_weibo_live相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/sina_weibo_live.less');
goog.include('ad/widget/sina_weibo_live.html');

goog.provide('ad.widget.SinaWeiboLive');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 * @export
 */
ad.widget.SinaWeiboLive = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_sina_weibo_live';
};
baidu.inherits(ad.widget.SinaWeiboLive, ad.widget.Widget);


/** @override */
ad.widget.SinaWeiboLive.prototype.patchData = function() {
    var trim = ad.string.trim;
    var data = this._data;
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            data[i] = encodeURIComponent(trim(data[i]));
        }
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
