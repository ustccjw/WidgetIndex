define(function(require){
/**
 * @file spec/ad/base/dom.js ~ 2014/07/23 22:27:29
 * @author leeight(liyubei@baidu.com)
 **/

require('ad/base/dom');

describe('ad.dom', function(){
    beforeEach(function(){
        var div = document.createElement('div');
        div.id = 'hello-word';
        document.body.appendChild(div);
        var first = document.createElement('div');
        first.id = 'first';
        div.appendChild(first);
        var second = document.createElement('div');
        second.id = 'second';
        div.appendChild(second);
    });

    afterEach(function(){
        var div = document.getElementById('hello-word');
        if (div) {
            document.body.removeChild(div);
        }
    });

    it('empty', function() {
        var div = document.getElementById('hello-word');
        var textNode = document.createTextNode('textnode');
        div.appendChild(textNode);
        expect(div.children.length).toBe(2);
        expect(div.childNodes.length).toBe(3);
        ad.dom.empty(div);
        expect(div.children.length).toBe(0);
        expect(div.childNodes.length).toBe(0);
    });

    it('g', function() {
        var div = document.getElementById('hello-word');
        expect(ad.dom.g('hello-word')).toBe(div);
        expect(ad.dom.g('no-such-element')).toBe(null);
        expect(ad.dom.g(new String('hello-word'))).toBe(div);
        expect(ad.dom.g(document)).toBe(document);
        expect(ad.dom.g(document.body)).toBe(document.body);
        expect(ad.dom.g(div)).toBe(div);
    });

    it('contains', function () {
        var div = document.getElementById('hello-word');
        var first = document.getElementById('first');
        var second = document.getElementById('second');
        expect(ad.dom.contains(div, first)).toBe(true);
        expect(ad.dom.contains(div, second)).toBe(true);
        expect(ad.dom.contains(first, second)).toBe(false);
        expect(ad.dom.contains(div, div)).toBe(false);
    });

    it('hide', function() {
        var div = document.getElementById('hello-word');
        var first = document.getElementById('first');
        var second = document.getElementById('second');
        second.style.display = 'block';
        ad.dom.hide('hello-word');
        ad.dom.hide(first);
        ad.dom.hide(second);
        expect(div.style.display).toBe('none');
        expect(first.style.display).toBe('none');
        expect(second.style.display).toBe('none');
    });


    it('remove', function () {
        ad.dom.remove('second');
        var second = document.getElementById('second');
        expect(second).toBeNull();

        var div = document.getElementById('hello-word');
        ad.dom.remove(div);
        var first = document.getElementById('first');
        expect(first).toBeNull();
        // IE8及以下的浏览器parentNode不为null，是一个doucmentFragment
        // expect(div.parentNode).toBeNull();
        expect(document.getElementById('hello-word')).toBeNull();

        var hasError = false;
        try {
            ad.dom.remove(first);
            ad.dom.remove('nothing-xxxx');
        } catch (e) {
            hasError = true;
        }
        expect(hasError).toBe(false);
    });

    describe('ad.dom className related', function() {
        beforeEach(function() {
            var first = document.getElementById('first');
            var second = document.getElementById('second');
            first.className = 'class1';
            second.className = 'class1 class2\tclass3\nclass4  class5';
        });

        it('hasClass', function() {
            var first = document.getElementById('first');
            var second = document.getElementById('second');
            expect(ad.dom.hasClass(first, 'class1')).toBe(true);
            expect(ad.dom.hasClass(first, 'class-notexist')).toBe(false);
            expect(ad.dom.hasClass(second, 'class2')).toBe(true);
            expect(ad.dom.hasClass(second, 'class1 class2')).toBe(true);
            expect(ad.dom.hasClass(second, 'class1 class-notexist')).toBe(false);
            expect(ad.dom.hasClass(second, 'class4 class3')).toBe(true);
            expect(ad.dom.hasClass(second, 'class5\tclass4')).toBe(true);
            expect(ad.dom.hasClass(second, 'class1 class2 class3 class4 class5')).toBe(true);
        });
    });

    describe('ad.dom style related', function() {
        beforeEach(function() {
            var div = document.getElementById('hello-word');
            var first = document.getElementById('first');
            var second = document.getElementById('second');
            div.style.cssText = ''
                + 'position: relative;'
                + 'z-index: 100;';
            first.style.cssText = ''
                + 'float: left;'
                + 'background-color: rgb(0, 0, 0);';
            second.style.cssText = ''
                + 'display: inline-block;'
                + 'opacity: 0.5;'
                + 'filter: alpha(opacity=50)';
        });

        it('getStyle', function() {
            var div = document.getElementById('hello-word');
            var first = document.getElementById('first');
            var second = document.getElementById('second');
            expect(ad.dom.getStyle(first, 'float')).toBe('left');
            expect(ad.dom.getStyle(first, 'background-color')).toBe('#000000');
            expect(ad.dom.getStyle(second, 'display')).toBe('inline-block');
            expect(ad.dom.getStyle(second, 'opacity')).toBe('0.5');
            expect(ad.dom.getStyle(div, 'z-index') == '100');
        });
    });
});

describe('ad.DomHelper', function(){
    beforeEach(function(){
        var ifr = document.createElement('iframe');
        ifr.id = 'hello-iframe';
        document.body.appendChild(ifr);

        var ifrDoc = ifr.contentWindow.document;
        ifrDoc.open('text/html', 'replace');
        ifrDoc.write('<div id="in-iframe-div"></div>');
    });

    afterEach(function(){
        var ifr = document.getElementById('hello-iframe');
        if (ifr) {
            document.body.removeChild(ifr);
        }
    });

    it('DomHelper', function() {
        var ifr = document.getElementById('hello-iframe');
        var ifrDoc = ifr.contentWindow.document;
        var domHelper = new ad.DomHelper(ifrDoc);
        var divInIframe = ifrDoc.getElementById('in-iframe-div');
        expect(domHelper.g('in-iframe-div')).toBe(divInIframe);
        expect(domHelper.getDocument()).toBe(ifrDoc);
        expect(ad.dom.getDocument()).toBe(document);
    });
});











/* vim: set ts=4 sw=4 sts=4 tw=120: */
});
