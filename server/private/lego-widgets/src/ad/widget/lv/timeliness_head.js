/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/lv/timeliness_head.js ~ 2014/02/28 15:52:42
 * @author xiongjie01@baidu.com (xiongjie)
 * @version $Revision: 150523 $
 * @description
 * timeliness_head相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.base');

goog.include('ad/widget/lv/timeliness_head.less');
goog.include('ad/widget/lv/timeliness_head.html');

goog.provide('ad.widget.lv.TimelinessHead');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.lv.TimelinessHead = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_lv_timeliness_head';
};
baidu.inherits(ad.widget.lv.TimelinessHead, ad.widget.Widget);

/**
 * 获取倒计时时间
 * @private
 */
ad.widget.lv.TimelinessHead.prototype._getCountdownText = function() {
    var timeStr = ''
    function addPaddingZero(i) {
        return i < 10 ? ('0' + i) : i;
    }
    if (this._endTime > 0) {
        var ms = Math.floor(this._endTime / 1000);
        var d = Math.floor(ms / 86400);
        var h = Math.floor((ms - d * 86400) / 3600);
        var m  = Math.floor((ms - d * 86400 - h * 3600) / 60);
        var s = ms - d * 86400 - h * 3600 - m * 60;
        timeStr = (d > 0 ? ('<span class="ec-digit-text">' + d + '</span>天') : '')
                + '<span class="ec-digit-text">' + addPaddingZero(h) + '</span>时'
                + '<span class="ec-digit-text">' + addPaddingZero(m) + '</span>分'
                + '<span class="ec-digit-text">' + addPaddingZero(s) + '</span>秒'
    }
    return timeStr;
};

/** @override */
ad.widget.lv.TimelinessHead.prototype.patchData = function() {
    this._endTime = -1;
    if (COMPILED && this._data) {
        if (/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/.test(this._data["endTime"])) {
            this._endTime = new Date(parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$3, 10),
                                parseInt(RegExp.$4, 10), parseInt(RegExp.$5, 10), parseInt(RegExp.$6, 10)) - new Date();
            if (this._endTime > 0) {
                this._data['_render_countdown'] = true;
            }
            this._data["endTime"] = this._data["endTime"].slice(0, this._data["endTime"].lastIndexOf(':'));
        }
        if (!this._data['_render_countdown'] && this._data['activity_src']) { //已经结束了
            this._data['poster_src'] = this._data['activity_src'];
        }
    }
}
/** @override */
ad.widget.lv.TimelinessHead.prototype.enterDocument = function () {
    ad.widget.lv.TimelinessHead.superClass.enterDocument.call(this);
    var me = this;
    if (this._data['_render_countdown']) {
        baidu.g(me.getId('countdown-text')).innerHTML = me._getCountdownText();
        baidu.removeClass(me.getId('countdown-text'), 'ec-countdown-hidden');
    }
};

/** @override */
ad.widget.lv.TimelinessHead.prototype.bindEvent = function () {
    var me = this;
    if (me._endTime > 0) {
        me._countdownId = ad.base.setInterval(function () {
            me._endTime -= 1000;
            if (me._endTime < 1000) {
                ad.base.clearInterval(me._countdownId);
                baidu.hide(me.getId('start-time'));
                baidu.hide(me.getId('countdown-text'));
                baidu.show(me.getId('activity-over'));
                if (me._data['activity_src'] && me._data['activity_src'] != me._data['poster_src']) { //已经结束了
                    baidu.g(me.getId('poster-img')).src = me._data['activity_src'];
                }
            }
            else {
                baidu.g(me.getId('countdown-text')).innerHTML = me._getCountdownText();
            }
        }, 1000);
    }
};

/** @override */
ad.widget.lv.TimelinessHead.prototype.dispose = function() {
    this._countdownId && ad.base.clearInterval(this._countdownId);
    ad.widget.lv.TimelinessHead.superClass.dispose.call(this);
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
