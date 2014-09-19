/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/icon/single_flash.js ~ 2014/07/14 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * v2/icon/single_flash相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.include('ad/widget/imageplus/v2/icon/single_flash.less');
goog.include('ad/widget/imageplus/v2/icon/single_flash.html');

goog.provide('ad.widget.imageplus.v2.icon.SingleFlash');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.icon.SingleFlash = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_icon_single_flash';
};
baidu.inherits(ad.widget.imageplus.v2.icon.SingleFlash, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.icon.SingleFlash.prototype.patchData = function () {
    ad.widget.imageplus.v2.icon.SingleFlash.superClass.patchData.call(this);

    if (this._data) {
        this._data['real_idea_width'] = this.getData('idea_width', 300);
        this._data['real_idea_height'] = this.getData('idea_height', 250);
    }
};

/** @override */
ad.widget.imageplus.v2.icon.SingleFlash.prototype.enterDocument = function () {
    var swfUrl = this.getData('idea_url');
    this.preloadSwf(swfUrl);
};

ad.widget.imageplus.v2.icon.SingleFlash.prototype.preloadSwf = function (swfUrl) {
    if (baidu.browser.ie) {
        new Image().src = swfUrl;
    }
    else {
        var obj = document.createElement('object');
        obj.data = swfUrl;
        obj.width = 0;
        obj.height = 0;
        document.body.appendChild(obj);
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100  */
