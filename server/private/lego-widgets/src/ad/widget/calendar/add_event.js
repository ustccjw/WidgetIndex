/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: add_event.js 14263 2012-11-11 14:26:04Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/calendar/add_event.js ~ 2012/11/11 20:31:23
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 14263 $
 * @description
 * add_event相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/calendar/add_event.less');
goog.include('ad/widget/calendar/add_event.html');

goog.provide('ad.widget.calendar.AddEvent');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.calendar.AddEvent = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_calendar_add_event';
};
baidu.inherits(ad.widget.calendar.AddEvent, ad.widget.Widget);

/** @override */
ad.widget.calendar.AddEvent.prototype.bindEvent = function() {
    ad.widget.calendar.AddEvent.superClass.bindEvent.call(this);

    var me = this;
    baidu.on(this.getId('form'), 'submit', function(opt_evt) {
        var evt = opt_evt || window.event;
        var elements = this.elements;
        var end = parseInt(elements['end'].value, 10);
        var start = parseInt(elements['start'].value, 10);
        if (end <= start) {
            // IGNORE
        } else {
            var item = {
                'title' : elements['title'].value,
                'start' : start,
                'end' : end,
                'description' : elements['description'].value
            };
            me.trigger(ui.events.NEW_EVENT_ADDED, item);
        }
        baidu.event.stop(evt);
    });
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
