/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: material.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/impl/image/top_background.js ~ 2013/02/26 14:49:57
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * 图片专区专用的对外api，用于提供给图片那边开发者使用的接口，控制图片搜索页面的背景
 *
 * 
 **/

goog.provide('ecom.ma.image.TopBackground');

/**
 * 获取附加背景的background样式
 *
 * @return {string} 样式字符串
 * @export
 */
ecom.ma.image.TopBackground.getSecondaryBack = function() {
    // {url: "http://someurl/pic.gif", color: "#FFF", repeat: "no-repeat", position: "center center"}
    if (!AD_CONFIG['top_background']) {
        return '';
    }

    var back = AD_CONFIG['top_background']['secondary'];
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
 * @export
 */
ecom.ma.image.TopBackground.getSecondaryHeight = function() {
    if (!AD_CONFIG['top_background']) {
        return null;
    }

    var back = AD_CONFIG['top_background']['secondary'];
    if (!back) {
        return null;
    }
    return back['height'];
};

/**
 * 获取主要背景的background样式
 *
 * @return {string} 样式字符串
 * @export
 */
ecom.ma.image.TopBackground.getPrimaryBack = function() {
    if (!AD_CONFIG['top_background']) {
        return '';
    }

    // {url: "http://someurl/pic.gif", color: "#FFF", repeat: "no-repeat", position: "center center"}
    var back = AD_CONFIG['top_background']['primary'];
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
 * @export
 */
ecom.ma.image.TopBackground.getPrimaryHeight = function() {
    if (!AD_CONFIG['top_background']) {
        return null;
    }

    var back = AD_CONFIG['top_background']['primary'];
    if (!back) {
        return null;
    }
    return back['height'];
};

/**
 * called when width of image change
 *
 * @param {Object} obj
 *              {
 *                  bgDiv: dom,
 *                  currImgLineWidth: 1000,
 *                  repeatDOM:repeatDOM
 *              } .
 * @export
 */
ecom.ma.image.TopBackground.updataEcomBackground = function(obj) {
    if (!AD_CONFIG['top_background']) {
        return null;
    }

    if (AD_CONFIG['top_background']['auto_width']) {
        var div = obj['bgDiv'];
        var width = parseInt(obj['currImgLineWidth'], 10);
        baidu.dom.setStyles(div, {
            // 注意不是居中
            // 是距离左边 60+13 像素
            'width': (width - 13) + 'px',
            'left': '40px'
        });
    }
};
