/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/img_with_sitelinks.js ~ 2013/09/06 22:07:14
 * @author yangfan12@baidu.com (yangfan12)
 * @version $Revision: 10927 $
 * @description
 * img_with_sitelinks相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/img_with_sitelinks.less');
goog.include('ad/widget/siva/img_with_sitelinks.html');

goog.provide('ad.widget.siva.Img_with_sitelinks');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Img_with_sitelinks = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_img_with_sitelinks';
};
baidu.inherits(ad.widget.siva.Img_with_sitelinks, ad.widget.Widget);

/** @override */
ad.widget.siva.Img_with_sitelinks.prototype.enterDocument = function() {
    ad.widget.siva.Img_with_sitelinks.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.siva.Img_with_sitelinks.prototype.bindEvent = function() {
    ad.widget.siva.Img_with_sitelinks.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.siva.Img_with_sitelinks.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
