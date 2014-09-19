/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/pa.js ~ 2013/15/11 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * pa相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/pa.less');
goog.include('ad/widget/imageplus/pa.html');

goog.provide('ad.widget.imageplus.Pa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.Pa = function (data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_pa';
};
baidu.inherits(ad.widget.imageplus.Pa, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.Pa.prototype.patchData = function () {
    ad.widget.imageplus.Pa.superClass.patchData.call(this);
    if (this._data) {
        var hasIdeaUrl = !!this.getData('idea_url');
        // 描述
        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                hasIdeaUrl ? 60 : 100,
                '...'
            );
        }

        // 客户主页
        var showUrl = this.getData('show_url');
        if (showUrl && this.getData('keep_whole_show_url') !== true) {
            this._data['show_url'] = ad.base.subByte(
                showUrl,
                hasIdeaUrl ? 14 : 28,
                '...'
            );
        }
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
