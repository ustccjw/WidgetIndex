/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tab/item.js ~ 2013/09/13 10:00:59
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * 处理原来ad.widget.Tab的显示逻辑.
 * 标题的部分放到ad.widget.TabContainer来完成.
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tab/item.less');
goog.include('ad/widget/tab/item.html');

goog.provide('ad.widget.tab.Item');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tab.Item = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tab_item';
};
baidu.inherits(ad.widget.tab.Item, ad.widget.Widget);





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
