/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: layout.js 14263 2012-11-11 14:26:04Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/calendar/layout.js ~ 2012/11/11 12:57:54
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 14263 $
 * @description
 * Calendar Events Layout Algorithm
 **/

goog.provide('ad.widget.calendar.Layout');


/**
 * Adjust event item's width and left.
 * @param {Array.<Object>} columns event item collection.
 * @private
 */
ad.widget.calendar._packEvents = function(columns) {
    var length = columns.length;
    for (var i = 0; i < length; i++) {
        var col = columns[i];
        for (var j = 0; j < col.length; j++) {
            col[j]['left'] = (i * 1.0 / length);
            col[j]['width'] = (1.0 / length);
        }
    }
};

/**
 * @param {Array.<{id:number,
 * start:number,end:number}>} events The calendar events need to be layouted.
 * @return {Array.<{id:number,width:number,left:number,top:number}>}
 */
ad.widget.calendar.Layout = function(events) {
    events = events.sort(function(e1, e2) {
        if (e1['start'] < e2['start']) return -1;
        if (e1['start'] > e2['start']) return 1;
        if (e1['end'] < e2['end']) return -1;
        if (e1['end'] > e2['end']) return 1;
        return 0;
    });

    var lastEnd = -1;
    var columns = [];

    for (var i = 0, item; item = events[i++]; ) {
        if (lastEnd !== -1 && item['start'] > lastEnd) {
            ad.widget.calendar._packEvents(columns);
            columns = [];
            lastEnd = -1;
        }

        var placed = false;
        for (var j = 0; j < columns.length; j++) {
            var col = columns[j];
            var last = col[col.length - 1];
            if (!(last['end'] > item['start'] && last['start'] < item['end'])) {
                col.push(item);
                placed = true;
                break;
            }
        }

        if (!placed) {
            columns.push([item]);
        }

        if (lastEnd === -1 || item['end'] > lastEnd) {
            lastEnd = item['end'];
        }
    }

    if (columns.length > 0) {
        ad.widget.calendar._packEvents(columns);
    }

    return events;
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
