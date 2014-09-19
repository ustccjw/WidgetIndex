/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
define(function(require){
/*
 * path:    test/jasmine/spec/ad/base/lang.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/28 16:55:56$
 */

require('ad/base/lang');

describe('ad.lang', function(){
    it('isString', function() {
        expect(ad.lang.isString('abc')).toBe(true);
        expect(ad.lang.isString(new String('abc'))).toBe(true);
        expect(ad.lang.isString(123)).toBe(false);
        expect(ad.lang.isString(true)).toBe(false);
        expect(ad.lang.isString(false)).toBe(false);
        expect(ad.lang.isString([1, 2, 3])).toBe(false);
        expect(ad.lang.isString({})).toBe(false);
        expect(ad.lang.isString(null)).toBe(false);
        expect(ad.lang.isString()).toBe(false);
        expect(ad.lang.isString(new Date())).toBe(false);
    });

    it('isArray', function() {
        expect(ad.lang.isArray([1, 2, 3])).toBe(true);
        expect(ad.lang.isArray(new Array(1, 2, 3))).toBe(true);
        expect(ad.lang.isArray(123)).toBe(false);
        expect(ad.lang.isArray(true)).toBe(false);
        expect(ad.lang.isArray(false)).toBe(false);
        expect(ad.lang.isArray('abc')).toBe(false);
        expect(ad.lang.isArray({})).toBe(false);
        expect(ad.lang.isArray(null)).toBe(false);
        expect(ad.lang.isArray()).toBe(false);
        expect(ad.lang.isArray(new Date())).toBe(false);
    });
});





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
});
