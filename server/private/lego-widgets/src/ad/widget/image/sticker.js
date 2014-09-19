/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/image/sticker.js ~ 2012/11/21 15:24:49
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image/sticker.less');
goog.include('ad/widget/image/sticker.html');

goog.provide('ad.widget.image.Sticker');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.image.Sticker = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_sticker';
};
baidu.inherits(ad.widget.image.Sticker, ad.widget.Widget);


/** @override */
ad.widget.image.Sticker.prototype.patchData = function() {
    if (this._data) {
        this._data['width'] = 158;
        this._data['height'] = 94;
        //价格取整
        if (this._data['options'] && this._data['options'].length) {
            baidu.array.each(this._data['options'], function(item, index) {
                item['price'] = parseInt(item['price']);
            });
        }
        //过滤showurl的http://
        if (this._data['show_url']) {
            this._data['show_url'] = this._data['show_url'].replace('http://', '');
        }

        for (var i = 0; i < this._data['options'].length; i++) {
            var text = this._data['options'][i]['text'];
            var maxLength = 48;
            if (baidu.string.getByteLength(text) > maxLength) {
                this._data['options'][i]['text'] = baidu.string.subByte(text, maxLength - 2, '..');
            }
        }

        var text1 = '周边酒店-' + this._data['seller_name'];
        var maxLength1 = 33;
        if (baidu.string.getByteLength(text1) > maxLength1) {
            this._data['seller_name'] = baidu.string.subByte(text1, maxLength1 - 2, '..');
        } else {
            this._data['seller_name'] = text1;
        }
    }
}



/* vim: set ts=4 sw=4 sts=4 tw=100: */