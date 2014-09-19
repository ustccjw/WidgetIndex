/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/imageplus/sticker/pa_new.js ~ 2014/09/15 18:19:51
 * @author zhouminming01@baidu.com (zhouminming)
 * @version $Revision: 150523 $
 * @description
 * pa_new相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.widget.imageplus.sticker.PaNew');
goog.require('ad.impl.imageplus.stickerHelper');

goog.provide('ad.impl.imageplus.sticker.PaNew');

ad.Debug(ad.impl.imageplus.stickerHelper.createStickerAd(
    ad.widget.imageplus.sticker.PaNew,
    {
        after: function (adconfig, box) {
            var closeBtn = baidu.g(box.getId('close'));
            baidu.show(closeBtn);
            var widget = box.getWidget(0, 0);
            var firstShowTime = box.getData('box.first_show_time', 5000);
            widget.firstShowTimer = ad.base.setTimeout(function () {
                widget.firstShowTimer = null;
                baidu.hide(closeBtn);
                widget.hide();
            }, firstShowTime);
        }
    }
));


















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
