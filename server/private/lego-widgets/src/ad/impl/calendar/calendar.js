/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: calendar.js 14263 2012-11-11 14:26:04Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/impl/calendar/calendar.js ~ 2012/11/11 22:01:18
 * @author leeight@gmail.com (leeight)
 * @version $Revision: 14263 $
 * @description
 * calendar相关的实现逻辑
 **/

goog.require('ad.Debug');
goog.require('ad.Material');
goog.require('ad.widget.calendar.AddEvent');
goog.require('ad.widget.calendar.Calendar');

goog.include('ad/impl/calendar/calendar.less');

goog.provide('ad.impl.calendar.Calendar');

ad.Debug(function() {
    var material = new ad.Material(AD_CONFIG['id']);
    material.setWidgets(
        [
          new ad.widget.calendar.Calendar(AD_CONFIG['calendar']),
          new ad.widget.calendar.AddEvent(AD_CONFIG['add_event'])
        ]
    );
    material.show();

    var calendar = /** @type {ad.widget.calendar.Calendar} */ (material.getWidget(0, 0));
    var addEvent = /** @type {ad.widget.calendar.AddEvent}*/ (material.getWidget(0, 1));
    addEvent.addListener(ui.events.NEW_EVENT_ADDED, function(item) {
        calendar.addEvent(item);
    });
});


















/* vim: set ts=4 sw=4 sts=4 tw=100: */
