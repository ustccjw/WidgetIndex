/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/aladdin/house.js ~ 2013/09/26 09:29:16
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * House相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/aladdin/house2.less');
goog.include('ad/widget/aladdin/house2.html');

goog.provide('ad.widget.aladdin.House2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.aladdin.House2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_aladdin_house2';
};
baidu.inherits(ad.widget.aladdin.House2, ad.widget.Widget);






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
