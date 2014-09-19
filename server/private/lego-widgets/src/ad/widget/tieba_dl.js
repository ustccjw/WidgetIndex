/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba_dl.js ~ 2012/09/18 15:58:45
 * @author wangdawei04@baidu.com (wangdawei)
 * @version $Revision: 10927 $
 * @description
 * tieba_dl相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba_dl.less');
goog.include('ad/widget/tieba_dl.html');

goog.provide('ad.widget.TiebaDl');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.TiebaDl = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_dl';
};
baidu.inherits(ad.widget.TiebaDl, ad.widget.Widget);























/* vim: set ts=4 sw=4 sts=4 tw=100: */
