/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: calendar.js 14265 2012-11-11 15:45:58Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/calendar/calendar.js ~ 2012/11/11 12:51:51
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 14265 $
 * @description
 * calendar相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.widget.calendar.Layout');

goog.include('ad/widget/calendar/calendar.less');
goog.include('ad/widget/calendar/calendar.html');

goog.provide('ad.widget.calendar.Calendar');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.calendar.Calendar = function(data) {
    /**
     * The max width of an event item.
     * @private
     * @type {number}
     */
    this._maxWidth = 600;

    /**
     * @private
     * @type {number}
     */
    this._timer;

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_calendar_calendar';

    ad.widget.Widget.call(this, data);
};
baidu.inherits(ad.widget.calendar.Calendar, ad.widget.Widget);

/**
 * @private
 */
ad.widget.calendar.Calendar.prototype._resetNowMarker = function() {
    var marker = baidu.g(this.getId('nowmarker'));
    if (marker) {
        var now = new Date();
        if (now.getHours() >= 21) {
            baidu.hide(marker);
        } else {
            var minutes = (now.getHours() - 9) * 60 + now.getMinutes();
            marker.style.top = minutes + 'px';
        }
    }
};

/**
 * @private
 */
ad.widget.calendar.Calendar.prototype._startTimer = function() {
    if (this._timer) {
        ad.base.clearTimeout(this._timer);
    }
    var me = this;
    this._timer = ad.base.setTimeout(function() {
        me._resetNowMarker();
        me._startTimer();
    }, 60 * 1000);
};

/** @override */
ad.widget.calendar.Calendar.prototype.enterDocument = function() {
    ad.widget.calendar.Calendar.superClass.enterDocument.call(this);
    this._resetNowMarker();
    this._startTimer();
};

/**
 * Add New Event Item.
 * @param {Object} item new event item.
 */
ad.widget.calendar.Calendar.prototype.addEvent = function(item) {
    if (this._data) {
        item['id'] = new Date().getTime();
        this._data['events'].push(item);
        this.setData(this._data);
        this.render();
        this._resetNowMarker();
    }
};

/** @override */
ad.widget.calendar.Calendar.prototype.bindEvent = function() {
    ad.widget.calendar.Calendar.superClass.bindEvent.call(this);

    var me = this;
    baidu.on(this.getRoot(), 'click', function(opt_evt) {
        var evt = opt_evt || window.event;
        var element = baidu.event.getTarget(evt);
        if (element.nodeType == 1 && element.nodeName == 'BUTTON') {
            var eventId = element.parentNode.getAttribute('data-event-id');
            baidu.array.remove(me._data['events'], function(item) {
                return item['id'] == eventId;
            });
            me.setData(me._data);
            me.render();
            me._resetNowMarker();
        }
    });
};

/** @override */
ad.widget.calendar.Calendar.prototype.patchData = function() {
    if (this._data) {
        var events = ad.widget.calendar.Layout(this._data['events']);
        for (var i = 0, item; item = events[i++]; ) {
            item['width'] = item['width'] * this._maxWidth;
            item['left'] = item['left'] * this._maxWidth;
            item['height'] = Math.max(item['end'] - item['start']);
            if (!item['description']) {
                item['description'] = item['start'] + ' - ' + item['end'];
            }
        }
        this._data['events'] = events;

        // prepare the timeline
        var timeline = [];
        var start = 9;
        var end = 21;
        for (var i = start; i < end; i++) {
            timeline.push('<div class="ec-time">');
            timeline.push('<strong>' + i + ':00</strong>' + ((i < 12) ? ' AM' : ' PM') + '<br><br><br>' + i + ':30');
            if (i == end - 1) {
                timeline.push('<br><br><strong>' + (i + 1) + ':00</strong>' + (((i + 1) < 12) ? ' AM' : ' PM'));
            }
            timeline.push('</div>');
        }
        this._data['timeline'] = timeline.join('');
        var now = new Date();
        if (now.getHours() < 21) {
            var minutes = (now.getHours() - 9) * 60 + now.getMinutes();
            this._data['nowmarker_top'] = minutes;
        }
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
