/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: ui.js 11655 2012-09-10 09:04:23Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/ui.js ~ 2012/09/10 16:14:21
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 11655 $
 * @description
 * ui相关的公共方法
 **/
goog.provide('ad.test.ui');


/**
 * @private
 * @type {number}
 */
ad.test.ui._START_ZINDEX = 1000;

/**
 * @return {number}
 */
ad.test.ui.getNextZIndex = function() {
    return this._START_ZINDEX++;
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
