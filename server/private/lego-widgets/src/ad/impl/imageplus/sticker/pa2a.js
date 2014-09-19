/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/imageplus/sticker/pa2a.js ~ 2014/09/02 13:54:37
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * pa2a相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.base');
goog.require('ad.widget.imageplus.sticker.Pa2a');
goog.require('ad.impl.imageplus.stickerHelper');

goog.include('ad/impl/imageplus/sticker/pa2a.less');

goog.provide('ad.impl.imageplus.sticker.Pa2a');

ad.Debug(ad.impl.imageplus.stickerHelper.createStickerAd(
    ad.widget.imageplus.sticker.Pa2a, {
        after: function (adconfig, box) {
            var closeBtn = baidu.g(box.getId('close'));
            baidu.show(closeBtn);
            var widget = box.getWidget(0, 0);
            var firstShowTime = box.getData('box.first_show_time', 5000);
            widget.firstShowTimer = ad.base.setTimeout(function () {
                widget.firstShowTimer = -1;
                baidu.hide(closeBtn);
                widget.hide();
            }, firstShowTime);
        }
    }
));


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
