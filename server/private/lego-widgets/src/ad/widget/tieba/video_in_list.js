/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/video_in_list.js ~ 2013/08/20 16:28:36
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * video_in_list相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/video_in_list.less');
goog.include('ad/widget/tieba/video_in_list.html');

goog.provide('ad.widget.tieba.VideoInList');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.VideoInList = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_video_in_list';
};
baidu.inherits(ad.widget.tieba.VideoInList, ad.widget.Widget);




/* vim: set ts=4 sw=4 sts=4 tw=100: */
