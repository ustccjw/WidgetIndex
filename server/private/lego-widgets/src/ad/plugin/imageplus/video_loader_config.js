/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/

/**
 * src/ad/plugin/imageplus/video_loader_config.js ~ 2014/06/06 11:22:00
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 **/

goog.require('ad.object');
goog.require('ad.plugin.imageplus.BaseLoaderConfig');

goog.provide('ad.plugin.imageplus.VideoLoaderConfig');

/**
 * imageplus Loader
 *
 * @extends ad.plugin.imageplus.BaseLoaderConfig
 * @constructor
 * @param {Object} config .
 */
ad.plugin.imageplus.VideoLoaderConfig = function (config) {
    var pathMap = {
        'entindex': '娱乐',
        'gameindex': '游戏',
        'musicindex': '音乐',
        'infoindex': '资讯',
        'sportindex': '体育',
        'amuseindex': '搞笑',
        'top': '排行榜'
    };
    var channelName = '';

    for (var path in pathMap) {
        if (location.pathname.indexOf(path) >= 0) {
            channelName = pathMap[path];
            break;
        }
    }

    this._defaultConfig = ad.object.extend({
        'apiSrc': 100,
        'apiWd': function (img) {
            return [channelName, '', (img.alt || '')];
        },
        'maxAdCount': 9999
        // 图片最小宽度，小于此宽度不展示广告
        // 'minImgWidth': 170,
        // 图片最小高度，小于此高度不展示广告
        // 'minImgHeight': 114
    }, this._defaultConfig || {});

    ad.plugin.imageplus.BaseLoaderConfig.call(this, config);
};

baidu.inherits(ad.plugin.imageplus.VideoLoaderConfig, ad.plugin.imageplus.BaseLoaderConfig);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
