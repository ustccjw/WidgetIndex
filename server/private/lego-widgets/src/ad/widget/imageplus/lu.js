/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/lu.js ~ 2014/03/05 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * lu相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/lu.less');
goog.include('ad/widget/imageplus/lu.html');

goog.provide('ad.widget.imageplus.Lu');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Lu = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_lu';
};
baidu.inherits(ad.widget.imageplus.Lu, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.Lu.prototype.patchData = function () {
    ad.widget.imageplus.Lu.superClass.patchData.call(this);

    var adlist;
    if (this._data && (adlist = this._data['adlist'])) {
        var me = this;
        baidu.array.each(adlist, function (ad, index) {
            if (index > 0) {
                ad['idea_url'] = null;
            }
        });
    }
};


















/* vim: set ts=4 sw=4 sts=4 tw=100  */
