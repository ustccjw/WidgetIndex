/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: simple_title.js 2013-09-16 13:53:28Z dingguoliang01 $
 *
 **************************************************************************/



/**
 * src/ad/widget/baike/simple_title.js ~ 2013/09/16 13:53:28
 * @author dingguoliang01
 * @version $Revision: $
 * @description
 * simple_title模块
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/baike/simple_title.html');
goog.include('ad/widget/baike/simple_title.less');

goog.provide('ad.widget.baike.SimpleTitle');

/**
 * @constructor
 * @param {Object=} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.baike.SimpleTitle = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_baike_simple_title';
};
baidu.inherits(ad.widget.baike.SimpleTitle, ad.widget.Widget);

/**
 * @override
 */
ad.widget.baike.SimpleTitle.prototype.bindEvent = function() {
    ad.widget.baike.SimpleTitle.superClass.bindEvent.call(this);
};
