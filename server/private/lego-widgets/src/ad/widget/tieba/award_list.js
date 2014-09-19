/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: award_list.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/award_list.js ~ 2013/07/24 15:39:56
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * game_play相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/tieba/award_list.less');
goog.include('ad/widget/tieba/award_list.html');

goog.provide('ad.widget.tieba.AwardList');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.AwardList = function(data) {
    ad.widget.Widget.call(this, data);
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
     * @type {number}
     */
    this._startTime;
    /**
     * 活动结束时间戳.
     * @type {number}
     */
    this._endTime;
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_award_list';
};
baidu.inherits(ad.widget.tieba.AwardList, ad.widget.Widget);

/** 
 * 格式化日期时间
 * @param {number} data 时间戳
 * @return {string}
 */
ad.widget.tieba.AwardList.prototype.formatDate = function(data) {
    if(data) {
        var date = new Date(data);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return year + '.' + month + '.' + day;
    }
    else {
        return "";
    }
}

/** @override */
ad.widget.tieba.AwardList.prototype.enterDocument = function() {
    var me = this;
    var url = 'http://tieba.baidu.com/actstage/getInfo?format=json'+ '&forum_id='
        + this._data['forum_id'] + '&thread_id=' + this._data['thread_id'];
    baidu.sio.callByServer(url, function(data){
        if(data && data['no'] === 0) {
            me._status = data['data']['act_info']['status'];
            me._startTime = 1000 * data['data']['act_info']['begin_time'];
            me._endTime = 1000 * data['data']['act_info']['end_time'];
            baidu.g(me.getId('number')).innerHTML = (data['data']['total_num'] 
                - (data['data']['total_num'] % 1000)) / 10000 + '万';
            baidu.g(me.getId('row-right-1')).innerHTML = me.formatDate(me._startTime) 
                + '-' + me.formatDate(me._endTime);
            var now = new Date().valueOf();
            if(now < me._startTime) {
                baidu.g(me.getId('row-right-2')).innerHTML = "抽奖即将开始";
            }
            else if(now < me._endTime) {
                baidu.g(me.getId('row-right-2')).innerHTML = "抽奖进行中";
            }
            else {
                baidu.g(me.getId('row-right-2')).innerHTML = "抽奖已结束";
            }
        }
    });
};



/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */