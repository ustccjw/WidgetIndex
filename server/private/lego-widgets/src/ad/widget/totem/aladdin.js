/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/totem/aladdin.js ~ 2013/12/23 16:10:29
 * @author wdw0705@gmail.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * aladdin相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.widget.bzt.ImageAld');

goog.include('ad/widget/totem/aladdin.less');
goog.include('ad/widget/totem/aladdin.html');

goog.provide('ad.widget.totem.Aladdin');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.totem.Aladdin = function(data) {
    ad.widget.bzt.ImageAld.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_totem_aladdin';
};
baidu.inherits(ad.widget.totem.Aladdin, ad.widget.bzt.ImageAld);























/* vim: set ts=4 sw=4 sts=4 tw=100: */
