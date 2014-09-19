/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
define(function(require){
/*
 * path:    test/jasmine/spec/ad/base/url.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/29 12:55:12$
 */

require('ad/base/url');
require('ad/plugin/plugin');

describe('ad.url', function(){
    beforeEach(function(){
        RT_CONFIG.HOSTMAP = {
            'www.baidu.com': 'https://www.baidu.com',
            'bzclk.baidu.com': 'https://bzclk.baidu.com',
            '10.94.16.54:8080': 'https://www.google.com',
            'cp01-ma-eval-000.cp01.baidu.com:8091': 'https://hello',
        };
    });
    afterEach(function(){
        RT_CONFIG.HOSTMAP = {};
    });

    it('escapeSymbol', function() {
        expect(ad.url.escapeSymbol('%&+ /#=')).toBe('%25%26%2B%20%2F%23%3D');
    });

    it('getQueryValue', function() {
        var url = 'a=1&b=2';
        expect(ad.url.getQueryValue(url, 'a')).toBe('1');
        expect(ad.url.getQueryValue(url, 'b')).toBe('2');
        expect(ad.url.getQueryValue(url, 'c')).toBeNull();
        url = '&a=1&b=2#';
        expect(ad.url.getQueryValue(url, 'a')).toBe('1');
        expect(ad.url.getQueryValue(url, 'b')).toBe('2');
        url = 'http://www.baidu.com?a=1&b=2';
        expect(ad.url.getQueryValue(url, 'a')).toBe('1');
        url = '#a=1&b=2';
        expect(ad.url.getQueryValue(url, 'a')).toBe('1');
    });

    it('jsonToQuery', function() {
        expect([
                'a=1&b=%25%26%2B%20%2F%23%3D',
                'b=%25%26%2B%20%2F%23%3D&a=1'
            ])
            .toContain(ad.url.jsonToQuery({'a': 1, 'b': '%&+ /#='}));
        expect([
                'a=1&b=中文',
                'b=中文&a=1'
            ])
            .toContain(ad.url.jsonToQuery({'a': 1, 'b': '中文'}));
        expect([
                'a=a-1&b=b-%E4%B8%AD%E6%96%87',
                'b=b-%E4%B8%AD%E6%96%87&a=a-1'
            ])
            .toContain(ad.url.jsonToQuery(
                {'a': 1, 'b': '中文'},
                function(value, key) {
                    return key + '-' + encodeURIComponent(value);
                }
            ));
        expect([
                'a=1&b=x&b=y',
                'a=1&b=y&b=x',
                'b=x&a=1&b=y',
                'b=y&a=1&b=x',
                'b=x&b=y&a=1',
                'b=y&b=x&a=1'
            ])
            .toContain(ad.url.jsonToQuery({'a': 1, 'b': ['x', 'y']}));
    });

    it('queryToJson', function() {
        expect(ad.url.queryToJson('http://www.baidu.com?a=1&b=2'))
            .toEqual({
                'a': '1',
                'b': '2'
            });
        expect(ad.url.queryToJson('a=1&b=2&'))
            .toEqual({
                'a': '1',
                'b': '2'
            });
        expect(ad.url.queryToJson('')).toEqual({});
        expect(ad.url.queryToJson('a=1&b=%E4%B8%AD%E6%96%87'))
            .toEqual({
                'a': '1',
                'b': '%E4%B8%AD%E6%96%87'
            });
        expect(ad.url.queryToJson('a=1&b=中文'))
            .toEqual({
                'a': '1',
                'b': '中文'
            });
        expect(ad.url.queryToJson('a=1&b=x&b=y'))
            .toEqual({
                'a': '1',
                'b': ['x', 'y']
            });
    });

    it('realpath', function() {
        expect(ad.url.realpath('file:///a//b/c')).toBe('file:///a/b/c');
        expect(ad.url.realpath('http://a//b/c')).toBe('http://a/b/c');
        expect(ad.url.realpath('https://a//b/c')).toBe('https://a/b/c');
        expect(ad.url.realpath('a/b/c')).toBe('a/b/c');
        expect(ad.url.realpath('a/./b/c')).toBe('a/b/c');
        expect(ad.url.realpath('a/../b/c')).toBe('b/c');
        expect(function() { ad.url.realpath('../a/b/c') }).toThrow();
        expect(function() { ad.url.realpath('a/../../b/c') }).toThrow();
    });

    it('dirname', function() {
        expect(ad.url.dirname('file:///a/b/c')).toBe('file:///a/b/');
        expect(ad.url.dirname('http://s.com/a/b/c')).toBe('http://s.com/a/b/');
        expect(ad.url.dirname('https://s.com/a/b/c')).toBe('https://s.com/a/b/');
        expect(ad.url.dirname('http://s.com/a/b/c?x=1')).toBe('http://s.com/a/b/');
        expect(ad.url.dirname('http://s.com/a')).toBe('http://s.com/');
        expect(ad.url.dirname('http://s.com/')).toBe('http://s.com/');
        expect(ad.url.dirname('a/b/c')).toBe('a/b/');
    });

    it('normalize', function() {
        var https = true;
        expect(ad.url.normalize('http://www.baidu.com', https)).toBe('https://www.baidu.com');
        expect(ad.url.normalize('http://no-such-host.baidu.com/hello/world.php?t=10', https)).toBe('http://no-such-host.baidu.com/hello/world.php?t=10');
        expect(ad.url.normalize('http://www.baidu.com/adrc.php', https)).toBe('https://www.baidu.com/adrc.php');
        expect(ad.url.normalize('http://bzclk.baidu.com/adrc.php', https)).toBe('https://bzclk.baidu.com/adrc.php');
        expect(ad.url.normalize('https://bzclk.baidu.com/adrc.php', https)).toBe('https://bzclk.baidu.com/adrc.php');
        expect(ad.url.normalize('file://bzclk.baidu.com/adrc.php', https)).toBe('file://bzclk.baidu.com/adrc.php');
        expect(ad.url.normalize('http://cp01-ma-eval-000.cp01.baidu.com:8091', https)).toBe('https://hello');
    });
});






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
});
