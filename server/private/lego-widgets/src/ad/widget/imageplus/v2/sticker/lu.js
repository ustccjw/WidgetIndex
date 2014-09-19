/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/sticker/lu.js ~ 2014/07/31 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 **/

goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.provide('ad.widget.imageplus.v2.sticker.Lu');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.sticker.Lu = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);
};
baidu.inherits(ad.widget.imageplus.v2.sticker.Lu, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.sticker.Lu.prototype.getMainHtml = function () {
    return this.getData('desc', '');
};

/** @override */
ad.widget.imageplus.v2.sticker.Lu.prototype.enterDocument = function () {
    var me = this;
    ad.widget.imageplus.v2.sticker.Lu.superClass.enterDocument.call(me);

    var loaderApi = me.getData('api');
    loaderApi.addListener(ui.events.RESIZE, function (event, rect) {
        var doc = me.getDocument();
        var win = doc.defaultView || doc.parentWindow;
        var reloadAd = win['reloadAd'];
        if (reloadAd && baidu.lang.isFunction(reloadAd)) {
            reloadAd(rect);
        }
    });
};






















/* vim: set ts=4 sw=4 sts=4 tw=100  */
