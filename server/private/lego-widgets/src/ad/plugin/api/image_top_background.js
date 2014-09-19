/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * src/ad/plugin/api/image_top_background.js ~ 2013/07/03 19:02:29
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
goog.require('ad.base');

goog.provide('ad.plugin.api.TopBackground');

/**
 * 背景图的数据
 */
ad.plugin.api.TopBackground.data = {};

/**
 * 设置背景图的数据
 * @param {Object} data 背景图的数据.
 */
ad.plugin.api.TopBackground.setData = function(data) {
    ad.plugin.api.TopBackground.data = data;
}

/**
 * 获取附加背景的background样式
 *
 * @return {string} 样式字符串
 */
ad.plugin.api.TopBackground.getSecondaryBack = function() {
    // {url: "http://someurl/pic.gif", color: "#FFF", repeat: "no-repeat", position: "center center"}
    var data = ad.plugin.api.TopBackground.data;
    if (!data) {
        return '';
    }

    var back = data['secondary'];
    if (!back) {
        return '';
    }
    return [
        (back.url ? 'url(' + back.url + ')' : ''),
        (back.repeat || ''),
        (back.position || ''),
        (back.color || '')
    ].join(' ');
};

/**
 * 获取附加背景的高度
 *
 * @return {number|null} 高度
 */
ad.plugin.api.TopBackground.getSecondaryHeight = function() {
    var data = ad.plugin.api.TopBackground.data;
    if (!data) {
        return null;
    }

    var back = data['secondary'];
    if (!back) {
        return null;
    }
    return back['height'];
};

/**
 * 获取主要背景的background样式
 *
 * @return {string} 样式字符串
 */
ad.plugin.api.TopBackground.getPrimaryBack = function() {
    var data = ad.plugin.api.TopBackground.data;
    if (!data) {
        return '';
    }

    // {url: "http://someurl/pic.gif", color: "#FFF", repeat: "no-repeat", position: "center center"}
    var back = data['primary'];
    if (!back) {
        return '';
    }
    return [
        (back.url ? 'url(' + back.url + ')' : ''),
        (back.repeat || ''),
        (back.position || ''),
        (back.color || '')
    ].join(' ');
};

/**
 * 获取主要背景的高度
 *
 * @return {number|null} 高度
 */
ad.plugin.api.TopBackground.getPrimaryHeight = function() {
    var data = ad.plugin.api.TopBackground.data;
    if (!data) {
        return null;
    }

    var back = data['primary'];
    if (!back) {
        return null;
    }
    return back['height'];
};
ad.base.exportPath('ecom.ma.image.TopBackground', ad.plugin.api.TopBackground);




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
