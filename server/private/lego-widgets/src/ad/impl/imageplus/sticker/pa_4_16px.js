/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/

/*jshint sub:true */
/*global COMPILED:false */


/**
 * src/ad/impl/imageplus/sticker/pa_4_16px.js ~ 2014/03/05 16:05:01
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * sticker相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.widget.imageplus.sticker.Pa1');
goog.require('ad.impl.imageplus.stickerHelper');

goog.include('ad/impl/imageplus/sticker/pa_4_16px.less');

goog.provide('ad.impl.imageplus.sticker.Pa416px');

ad.Debug(ad.impl.imageplus.stickerHelper.createStickerAd(
    ad.widget.imageplus.sticker.Pa1
));


















/* vim: set ts=4 sw=4 sts=4 tw=100  */
