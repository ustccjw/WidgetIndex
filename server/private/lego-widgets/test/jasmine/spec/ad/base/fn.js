/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
define(function(require){
/*
 * path:    test/jasmine/spec/ad/base/fn.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/28 16:56:09$
 */

require('ad/base/fn');

describe('ad.fn', function(){
    it('bind', function() {
        function run() {
            function funOne() {
                expect(this).toBe(funOne);
            }
            ad.fn.bind(funOne)();

            var objTwo = {};
            function funTwo() {
                expect(this).toBe(objTwo);
            }
            ad.fn.bind(funTwo, objTwo)();

            var objThree = {};
            function funThree(arg1, arg2, arg3) {
                expect(this).toBe(objThree);
                expect(arg1).toBe('arg1');
                expect(arg2).toBe('arg2');
                expect(arg3).toBe('arg3');
            }
            ad.fn.bind(funThree, objThree, 'arg1', 'arg2')('arg3');

            var objFour = {
                'funFour': function() {
                    expect(this).toBe(objFour);
                }
            };
            ad.fn.bind('funFour', objFour)();
        }
        // 使用 native bind
        run();
        // 不使用 native bind
        var nativeBind = Function.prototype.bind;
        Function.prototype.bind = null;
        run();
        Function.prototype.bind = nativeBind;
    });
});




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
});
