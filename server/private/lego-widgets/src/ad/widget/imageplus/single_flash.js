/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/single_flash.js ~ 2013/11/07 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * single_flash相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/single_flash.less');
goog.include('ad/widget/imageplus/single_flash.html');

goog.provide('ad.widget.imageplus.SingleFlash');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.SingleFlash = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_single_flash';
};
baidu.inherits(ad.widget.imageplus.SingleFlash, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.SingleFlash.prototype.enterDocument = function () {
    var swfUrl = this.getData('idea_url');
    this.preloadSwf(swfUrl);
};

ad.widget.imageplus.SingleFlash.prototype.preloadSwf = function (swfUrl) {
    if (baidu.browser.ie) {
        new Image().src = swfUrl;
    } else {
        var obj = document.createElement('object');
        obj.data = swfUrl;
        obj.width = 0;
        obj.height = 0;
        document.body.appendChild(obj);
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
