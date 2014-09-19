define(function(require){
/**
 * @file spec/ad/base/event.js ~ 2014/07/25 22:27:29
 * @author zhouminming01
 **/

require('ad/base/event');

describe('ad.event', function() {
    function fireClickEvent(el) {
        var event;
        if (document.createEvent) {
            event = document.createEvent('MouseEvent');
            event.initEvent('click', true, true);
            el.dispatchEvent(event);
        }
        else if (el.fireEvent) {
            event = document.createEventObject();
            el.fireEvent('onclick', event);
        }
    }

    beforeEach(function() {
        var div = document.createElement('div');
        div.style.cssText = 'position:absolute;top:0;left:-9999px;';
        div.id = 'test';
        document.body.appendChild(div);
        var a = document.createElement('a');
        a.href = '#test-preventDefault' + new Date().getTime();
        div.appendChild(a);
    });

    afterEach(function() {
        var div = document.getElementById('test');
        if (div) {
            document.body.removeChild(div);
        }
    });

    it('on', function(done) {
        var div = document.getElementById('test');
        var count = 0;
        ad.event.on(div, 'click', function (event) {
            expect(this).toBe(div);
            expect(event.type).toBe('click');
            if (++count === 2) {
                done();
            }
        });

        fireClickEvent(div);
        fireClickEvent(div);
    });

    it('un with callback', function(done) {
        var div = document.getElementById('test');
        var count = 0;
        var callback = function (event) {
            count++;
            ad.event.un(div, 'click', callback);
        };
        ad.event.on(div, 'click', callback);

        fireClickEvent(div);
        fireClickEvent(div);
        setTimeout(function () {
            expect(count).toBe(1);
            done();
        });
    });

    it('un with no callback', function(done) {
        var div = document.getElementById('test');
        var count = 0;
        ad.event.on(div, 'click', function (event) {
            count++;
            ad.event.un(div, 'click');
        });

        fireClickEvent(div);
        fireClickEvent(div);
        setTimeout(function () {
            expect(count).toBe(1);
            done();
        });
    });

    it('preventDefault', function(done) {
        var div = document.getElementById('test');
        var a = div.firstChild;
        var oldHash = location.hash;
        ad.event.on(a, 'click', function (event) {
            ad.event.preventDefault(event);
        });

        fireClickEvent(a);
        setTimeout(function () {
            // 确保hash不变
            expect(location.hash).toBe(oldHash);
            done();
        });
    });
});











/* vim: set ts=4 sw=4 sts=4 tw=120: */
});
