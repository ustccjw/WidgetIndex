/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: countdown.js 9607 2012-06-08 17:10:22Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/countdown.js ~ 2012/06/09 00:30:31
 * @author loutongbing
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.include('ad/widget/countdown.html');
goog.include('ad/widget/countdown.less');

goog.provide('ad.widget.CountDown');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.CountDown = function(data) {
    ad.widget.Widget.call(this, data);
    /**
     * @type {number}
     * @private
     */
    this._serverTime;
    
    /**
     * @type {string}
     * @private
     */
    this._serverTimeUrl;

    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_countdown';

    /**
     * @type {number}
     * @private
     */
    this._timer;

    /**
     * 是否需要请求服务器时间
     * @type {boolean}
     */
    this.needServerTime;
};
baidu.inherits(ad.widget.CountDown, ad.widget.Widget);

/** @override */
ad.widget.CountDown.prototype.patchData = function() {
    var me = this;
    me.serverTime = ad.base.getObjectByName('bds.comm.serverTime');
    if (!me.serverTime) {
        // 先用当前时间，在 enterDocument 时会请求服务器获取时间
        me.serverTime = new Date().getTime();
        me.needServerTime = true;
    }
    else {
        me.serverTime = 1000 * me.serverTime;
    }
    if (this._data) {
        if (/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/.test(this._data['endTime'])) {
            this._endTime = new Date(
                    parseInt(RegExp.$1, 10),
                    parseInt(RegExp.$2, 10) - 1,
                    parseInt(RegExp.$3, 10),
                    parseInt(RegExp.$4, 10),
                    parseInt(RegExp.$5, 10),
                    parseInt(RegExp.$6, 10)
                )
                - new Date(me.serverTime);
        }
    }
};

/**
 * 获取倒计时时间
 * @private
 */
ad.widget.CountDown.prototype._getCountdownText = function() {
    var timeStr = [];
    function addPaddingZero(i) {
        return i < 10 ? ('0' + i) : ('' + i);
    }
    if (this._endTime > 0) {
        var ms = Math.floor(this._endTime / 1000);
        var d = Math.floor(ms / 86400);
        var h = Math.floor((ms - d * 86400) / 3600);
        var m  = Math.floor((ms - d * 86400 - h * 3600) / 60);
        var s = ms - d * 86400 - h * 3600 - m * 60;

        if (this._data['displayText']) {
            if (this._data['displayDay']) {
                timeStr.push('<span class="ec-digit-text ec-digit-day">' + d + '</span>');
                if (this._data['displayDayUnit']) {
                    timeStr.push('<span class="ec-unit-text ec-unit-day">天</span>');
                }
            }
            else if (d > 0) {
                h += d * 24;
            }

            if (this._data['timeSeparator']) {
                timeStr.push('<span class="ec-digit-text ec-digit-hour">' + addPaddingZero(h) + '</span>');
                timeStr.push('<span class="ec-separate-text ec-separate-hour">'
                    + this._data['timeSeparator'] + '</span>'
                );
                timeStr.push('<span class="ec-digit-text ec-digit-minute">' + addPaddingZero(m) + '</span>');
                timeStr.push('<span class="ec-separate-text ec-separate-minute">'
                    + this._data['timeSeparator'] + '</span>'
                );
                timeStr.push('<span class="ec-digit-text ec-digit-second">' + addPaddingZero(s) + '</span>');
            }
            else if (this._data['displayTimeUnit']) {
                timeStr.push('<span class="ec-digit-text ec-digit-hour">' + addPaddingZero(h) + '</span>');
                timeStr.push('<span class="ec-separate-text ec-separate-hour">时</span>');
                timeStr.push('<span class="ec-digit-text ec-digit-minute">' + addPaddingZero(m) + '</span>');
                timeStr.push('<span class="ec-separate-text ec-separate-minute">分</span>');
                timeStr.push('<span class="ec-digit-text ec-digit-second">' + addPaddingZero(s) + '</span>');
                timeStr.push('<span class="ec-separate-text ec-separate-minute">秒</span>');
            }
            else {
                timeStr.push('<span class="ec-digit-text ec-digit-hour">' + addPaddingZero(h) + '</span>');
                timeStr.push('<span class="ec-digit-text ec-digit-minute">' + addPaddingZero(m) + '</span>');
                timeStr.push('<span class="ec-digit-text ec-digit-second">' + addPaddingZero(s) + '</span>');
            }
        }
        else {
            if (this._data['displayDay'] && d > 0) {
                var dArr = (d + '').split('');
                baidu.each(dArr, function(item, index) {
                    timeStr.push('<span class="ec-digit-day-' + index + ' ec-digit-' + item + '"></span>');
                });
            }
            else if (d > 0) {
                h += d * 24;
            }

            var hArr = addPaddingZero(h).split('');
            baidu.each(hArr, function(item, index) {
                timeStr.push('<span class="ec-digit-hour-' + index + ' ec-digit-' + item + '"></span>');
            });
            var mArr = addPaddingZero(m).split('');
            baidu.each(mArr, function(item, index) {
                timeStr.push('<span class="ec-digit-minute-' + index + ' ec-digit-' + item + '"></span>');
            });
            var sArr = addPaddingZero(s).split('');
            baidu.each(sArr, function(item, index) {
                timeStr.push('<span class="ec-digit-second-' + index + ' ec-digit-' + item + '"></span>');
            });
        }
    }
    return timeStr.join('');
};

/** @override */
ad.widget.CountDown.prototype.isOver = function () {
    var me = this;
    if (me._endTime > 0) {
        return false;
    }
    else {
        return true;
    }
};

/** @override */
ad.widget.CountDown.prototype.enterDocument = function () {
    ad.widget.CountDown.superClass.enterDocument.call(this);
    var me = this;
    baidu.g(me.getId('countdown-container')).innerHTML = me._getCountdownText();

    if (this.needServerTime) {
        this._serverTimeUrl = RT_CONFIG.HOST('wbapi.baidu.com') + '/service/timer/gettime';
        baidu.sio.callByServer(me._serverTimeUrl, function(data) {
            if (data && data['success'] && data['time']) {
                me.serverTime = 1000 * data['time'];
                if (/(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})/.test(me._data['endTime'])) {
                    me._endTime = new Date(
                            parseInt(RegExp.$1, 10),
                            parseInt(RegExp.$2, 10) - 1,
                            parseInt(RegExp.$3, 10),
                            parseInt(RegExp.$4, 10),
                            parseInt(RegExp.$5, 10),
                            parseInt(RegExp.$6, 10)
                        )
                        - new Date(me.serverTime);
                }
            }
        });
    }
};

/** @override */
ad.widget.CountDown.prototype.bindEvent = function () {
    var me = this;
    if (me._endTime > 0) {
        me._countdownId = ad.base.setInterval(function () {
            me._endTime -= 1000;
            if (me._endTime < 0) {
                ad.base.clearInterval(me._countdownId);
                me.trigger(ui.events.TIME_OVER);
            }
            else {
                baidu.g(me.getId('countdown-container')).innerHTML = me._getCountdownText();
            }
        }, 1000);
    }
    else {
        me.trigger(ui.events.TIME_OVER);
    }
};

/**
 * @override
 */
ad.widget.CountDown.prototype.dispose = function() {
    if (this._countdownId) {
        ad.base.clearInterval(this._countdownId);
        this._countdownId = null;
    }
    ad.widget.CountDown.superClass.dispose.call(this);
};



/* vim: set ts=4 sw=4 sts=4 tw=100 : */
