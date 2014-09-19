/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: award_content.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/award_content.js ~ 2013/07/24 15:39:56
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * game_play相关的实现逻辑
 **/

goog.require('ad.widget.tieba.AwardList');
goog.require('ui.events');

goog.include('ad/widget/tieba/award_content.less');
goog.include('ad/widget/tieba/award_content.html');

goog.provide('ad.widget.tieba.AwardContent');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.tieba.AwardList}
 */
ad.widget.tieba.AwardContent = function(data) {
    ad.widget.tieba.AwardList.call(this, data);
    /**
     * 活动的状态.
     * @type {string}
     */
    this._status;
    /**
     * 活动参与人数.
     * @type {string}
     */
    this._total;
    /**
     * 活动开始时间戳.
     * @type {string}
     */
    this._startTime;
    /**
     * 活动结束时间戳.
     * @type {string}
     */
    this._endTime;
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_award_content';
};
baidu.inherits(ad.widget.tieba.AwardContent, ad.widget.tieba.AwardList);

/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */