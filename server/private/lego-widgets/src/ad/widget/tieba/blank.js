/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 13220 2012-10-24 10:14:08Z fanpengfei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/blank.js ~ 2013/08/07 15:45:41
 * @author guyiling@baidu.com (guyiling)
 * @version $Revision: 13220 $
 * @description
 * blank相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/blank.html');

goog.provide('ad.widget.tieba.Blank');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.Blank = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_blank';
};
baidu.inherits(ad.widget.tieba.Blank, ad.widget.Widget);






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
