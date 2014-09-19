/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/pa_1_link.js ~ 2014/05/20 21:48:49
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * pa_1_link相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/sticker/pa_1_link.less');
goog.include('ad/widget/imageplus/sticker/pa_1_link.html');

goog.provide('ad.widget.imageplus.sticker.Pa1Link');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.Pa1Link = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_pa_1_link';
};
baidu.inherits(ad.widget.imageplus.sticker.Pa1Link, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.Pa1Link.prototype.patchData = function() {
    ad.widget.imageplus.sticker.Pa1Link.superClass.patchData.call(this);
    if (this._data) {
        //截断百科的描述
        var desc = this.getData('desc');
        if (desc) {
            this._data['desc'] = ad.base.subByte(
                desc,
                70,
                '...'
            );
        }
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
