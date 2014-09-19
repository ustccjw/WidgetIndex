/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/common_loader.js ~ 2013/12/03 13:20:37
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 * 用于图+首页的展示用的loader，数据必须全部是mockup的
 **/

goog.require('ad.dom');
goog.require('ad.plugin.imageplus.BaseLoader');
goog.require('ui.events');

goog.provide('ad.plugin.imageplus.MockupLoader');

/**
 * imageplus Loader
 *
 * @extends ad.plugin.imageplus.BaseLoader
 * @constructor
 * @param {ad.plugin.imageplus.LoaderConfig} config .
 */
ad.plugin.imageplus.MockupLoader = function (config) {
    ad.plugin.imageplus.BaseLoader.call(this, config);
};

baidu.inherits(ad.plugin.imageplus.MockupLoader, ad.plugin.imageplus.BaseLoader);


/** @override */
ad.plugin.imageplus.MockupLoader.prototype.findImgs = function () {
    return /** @type {Array.<Element>}*/(window['baiduImagePlusFakeImgs']);
};


/** @override */
ad.plugin.imageplus.MockupLoader.prototype.getData = function (img, callback) {
    callback(window['baiduImagePlusFakeData']);
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
