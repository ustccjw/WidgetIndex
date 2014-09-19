/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/img_with_sitelinks_v2.js ~ 2013/11/21 15:39:56
 * @author taoxutian@baidu.com (taoxutian)
 * @version $Revision: 150523 $
 * @description
 * img_with_sitelinks_v2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/img_with_sitelinks_v2.less');
goog.include('ad/widget/siva/img_with_sitelinks_v2.html');

goog.provide('ad.widget.siva.ImgWithSitelinksV2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.ImgWithSitelinksV2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_img_with_sitelinks_v2';
};
baidu.inherits(ad.widget.siva.ImgWithSitelinksV2, ad.widget.Widget);

/** @override */
ad.widget.siva.ImgWithSitelinksV2.prototype.enterDocument = function() {
    ad.widget.siva.ImgWithSitelinksV2.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.siva.ImgWithSitelinksV2.prototype.bindEvent = function() {
    ad.widget.siva.ImgWithSitelinksV2.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.siva.ImgWithSitelinksV2.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
