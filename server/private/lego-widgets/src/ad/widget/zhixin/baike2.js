/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhixin/baike2.js ~ 2014/02/20 22:48:15
 * @author chenli11@baidu.com (chestnutchen)
 * @version $Revision: 10927 $
 * @description
 * baike2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhixin/baike2.less');
goog.include('ad/widget/zhixin/baike2.html');

goog.provide('ad.widget.zhixin.Baike2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhixin.Baike2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhixin_baike2';
};
baidu.inherits(ad.widget.zhixin.Baike2, ad.widget.Widget);





/* vim: set ts=4 sw=4 sts=4 tw=100: */
