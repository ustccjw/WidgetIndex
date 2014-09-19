/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: url.js 12776 2012-10-15 03:08:37Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/url.js ~ 2012/10/12 12:49:40
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 12776 $
 * @description
 * 获取一些资源文件的绝对位置
 **/
goog.provide('ad.test.url');

/**
 * @param {string} relativePath 资源的相对文件地址.
 */
ad.test.url.getAbsolute = function(relativePath) {
    return goog.basePath + relativePath;
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
