/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/icon/pa.js ~ 2014/08/06 12:35:05
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * pa相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.v2.BaseWidget');

goog.include('ad/widget/imageplus/v2/icon/pa.less');
goog.include('ad/widget/imageplus/v2/icon/pa.html');

goog.provide('ad.widget.imageplus.v2.icon.Pa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.BaseWidget}
 */
ad.widget.imageplus.v2.icon.Pa = function (data) {
    ad.widget.imageplus.v2.BaseWidget.call(this, data);

    /**
     * 当前widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_v2_icon_pa';
};
baidu.inherits(ad.widget.imageplus.v2.icon.Pa, ad.widget.imageplus.v2.BaseWidget);

/** @override */
ad.widget.imageplus.v2.icon.Pa.prototype.patchData = function () {
    ad.widget.imageplus.v2.icon.Pa.superClass.patchData.call(this);
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
        if (showUrl) {
            this._data['show_url'] = ad.base.subByte(
                showUrl,
                hasIdeaUrl ? 14 : 28,
                '...'
            );
        }
    }
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
