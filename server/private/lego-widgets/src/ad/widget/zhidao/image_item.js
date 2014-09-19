/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao/image_item.js ~ 2013/06/25 15:30:35
 * @author xiebin01@baidu.com (DestinyXie)
 * @version $Revision: 150523 $
 * @description
 * image_item相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao/image_item.less');
goog.include('ad/widget/zhidao/image_item.html');

goog.provide('ad.widget.zhidao.ImageItem');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao.ImageItem = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_image_item';
};
baidu.inherits(ad.widget.zhidao.ImageItem, ad.widget.Widget);

/** @override */
ad.widget.zhidao.ImageItem.prototype.patchData = function() {
    if (this._data) {
        var items = this._data['items'];
        for (var i = items.length - 1; i >= 0; i--) {
            items[i]['img_width'] = items[i]['img_width'] || 65;
            items[i]['img_height'] = items[i]['img_height'] || 65;
            items[i]['item_width'] = items[i]['item_width'] || 183;
        };
    }
}
