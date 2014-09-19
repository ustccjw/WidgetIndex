/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/sticker/combo_pa.js ~ 2014/05/15 16:00:19
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * combo_pa相关的实现逻辑
 **/

goog.require('ad.widget.imageplus.BaseWidget');

goog.include('ad/widget/imageplus/sticker/combo_pa.less');
goog.include('ad/widget/imageplus/sticker/combo_pa.html');

goog.provide('ad.widget.imageplus.sticker.ComboPa');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.BaseWidget}
 */
ad.widget.imageplus.sticker.ComboPa = function(data) {
    ad.widget.imageplus.BaseWidget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_imageplus_sticker_combo_pa';
};
baidu.inherits(ad.widget.imageplus.sticker.ComboPa, ad.widget.imageplus.BaseWidget);

/** @override */
ad.widget.imageplus.sticker.ComboPa.prototype.patchData = function() {
    ad.widget.imageplus.sticker.ComboPa.superClass.patchData.apply(this, arguments);

    /**
     * @type {ad.plugin.imageplus.ILoaderApi}
     */
    var loaderApi = this.getData('api');
    var itemWidth = 291;
    var count = 2;
    if (loaderApi) {
        var rect = loaderApi.getImgRect();
        // 根据图片宽度计算能显示的图文的个数
        count = Math.max(parseInt(rect['width'] / itemWidth, 10), 1);
        itemWidth = parseInt(rect['width'] / count, 10);
    }

    var adlist;
    if (this._data && (adlist = this._data['adlist'])) {
        this._data['adlist'] = adlist.slice(0, count);
    }

    adlist = this.getData('adlist', []);
    for (var i = 0; i < adlist.length; i++) {
        var item = adlist[i];
        item['item_width'] = itemWidth - 10;
        item['item_text_width'] = itemWidth - 116;
        item['title'] = ad.base.subByte(item['title'], parseInt(20 * item['item_text_width'] / 180), '..');
        item['desc'] = ad.base.subByte(item['desc'], parseInt(56 * item['item_text_width'] / 180), '..');
        item['show_url'] = ad.base.subByte(item['show_url'], 20, '..');
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
