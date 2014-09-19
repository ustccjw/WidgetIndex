/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
define(function(require){
/*
 * path:    test/jasmine/spec/ad/base/date.js
 * desc:    
 * author:  dingguoliang01(dingguoliang01@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/28 16:55:56$
 */

require('ad/base/date');

describe('ad.date', function(){
    it('format', function() {
        var date = new Date();
        date.setFullYear(2014);
        date.setMonth(0);
        date.setDate(2);
        date.setHours(13);
        date.setMinutes(4);
        date.setSeconds(50);
        date.setMilliseconds(166);
        expect(ad.date.format(date, 'yyyy-yy-MM-M-dd-d-HH-H-hh-h-mm-m-ss-s-S')).toBe('2014-14-01-1-02-2-13-13-01-1-04-4-50-50-166');
        expect(ad.date.format(date, '')).toBe('');
        expect(ad.date.format(date, 0)).toBe(date.toString());
    });
});





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
});
