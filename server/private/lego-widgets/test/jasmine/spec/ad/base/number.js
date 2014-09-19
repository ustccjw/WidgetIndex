/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
define(function(require){
/*
 * path:    test/jasmine/spec/ad/base/number.js
 * desc:    
 * author:  dingguoliang01(dingguoliang01@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/28 16:55:56$
 */

require('ad/base/number');

describe('ad.number', function(){
    it('pad', function() {
        expect(ad.number.pad(110, 2)).toBe('110');
        expect(ad.number.pad(-110, 2)).toBe('-110');
        expect(ad.number.pad(110, 3)).toBe('110');
        expect(ad.number.pad(-110, 3)).toBe('-110');
        expect(ad.number.pad(110, 4)).toBe('0110');
        expect(ad.number.pad(-110, 4)).toBe('-0110');
    });
});





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
});
