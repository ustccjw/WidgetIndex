/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/imageplus/v2/sticker_multimedia_box.js ~ 2014/09/12 14:04:13
 * @author xiongjie01@baidu.com
 * @version $Revision: 10927 $
 * @description
 * 继承自sticker_box，flash/图片box
 **/

goog.require('ui.events');
goog.require('ad.base');
goog.require('ad.widget.imageplus.v2.StickerBox');

goog.provide('ad.widget.imageplus.v2.StickerMultimediaBox');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.imageplus.v2.StickerBox}
 */
ad.widget.imageplus.v2.StickerMultimediaBox = function (data) {
    ad.widget.imageplus.v2.StickerBox.call(this, data);
};
baidu.inherits(ad.widget.imageplus.v2.StickerMultimediaBox, ad.widget.imageplus.v2.StickerBox);

/** @override */
ad.widget.imageplus.v2.StickerMultimediaBox.prototype.enterAd = function (loaderApi) {
    ad.widget.imageplus.v2.StickerMultimediaBox.superClass.enterAd.call(this, loaderApi);
    var me = this;
    this.getWidget(0).addListener(ui.events.BOX_RESIZE, function (sizeInfo) {
        var wrapper = baidu.g(me.getId('wrapper'));
        if (sizeInfo['width'] !== undefined) {
            baidu.dom.setStyle(wrapper, 'width', sizeInfo['width']);
        }
        if (sizeInfo['height'] !== undefined) {
            baidu.dom.setStyle(wrapper, 'height', sizeInfo['height']);
        }
        me.updateIsolatedContainerSize();
    });
};























/* vim: set ts=4 sw=4 sts=4 tw=100: */
