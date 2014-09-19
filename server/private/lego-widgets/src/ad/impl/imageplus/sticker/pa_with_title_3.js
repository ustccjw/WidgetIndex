/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/impl/imageplus/sticker/pa_with_title_3.js
 * desc:
 * author:  zhouminming01@baidu.com
 * version: $Revision$
 * date:    $Date: 2014/06/05 19:09:42$
 */

goog.require('ad.Debug');
goog.require('ad.crypt.AntiCk');
goog.require('ad.widget.imageplus.sticker.Pa1');
goog.require('ad.impl.imageplus.stickerHelper');

goog.provide('ad.impl.imageplus.sticker.PaWithTitle3');

ad.Debug(ad.impl.imageplus.stickerHelper.createStickerAd(
    ad.widget.imageplus.sticker.Pa1,
    {
        'after': function (adConfig, box) {
            // 如果都没有就不设置ck域
            if (!adConfig['target_url'] || !adConfig['mid']) {
                return;
            }

            // 设置ck域
            new ad.crypt.AntiCk( // jshint ignore:line
                box.getRoot().getElementsByTagName('a'),
                adConfig['mid']
            );

        }
    }
));





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
