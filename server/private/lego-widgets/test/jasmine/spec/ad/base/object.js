define(function(require){
/**
 * @file spec/ad/base/object.js ~ 2014/07/28 22:27:29
 * @author zhouminming01
 **/

require('ad/base/object');

describe('ad.object', function(){
    it('each', function () {
        // 测试plain object
        var obj = {
            'key1': 'value1',
            'key2': 2,
            'key3': {},
            'key4': [],
            'key5': null,
            'key6': undefined,
            'key7': new Date()
        };
        var keys = {
            'key1': true,
            'key2': true,
            'key3': true,
            'key4': true,
            'key5': true,
            'key6': true,
            'key7': true
        };
        var visitedKey = {};
        ad.object.each(obj, function(value, key) {
            visitedKey[key] = true;
            expect(keys[key]).toBe(true);
            expect(value).toBe(obj[key]);
        });
        for (var key in obj) {
            expect(visitedKey[key]).toBe(true);
        }

        // 测试有继承链的object
        function A() {
            this.x = 1;
        }
        function B() {
            this.y = 2;
        }
        B.prototype = new A();
        B.prototype.z = 3;
        obj = new B();
        keys = {
            'y': true
        };
        visitedKey = {};
        ad.object.each(obj, function(value, key) {
            visitedKey[key] = true;
            expect(keys[key]).toBe(true);
            expect(value).toBe(obj[key]);
        });
        expect(visitedKey['x']).toBeUndefined();
        expect(visitedKey['y']).toBe(true);
        expect(visitedKey['z']).toBeUndefined();
    });

    it('extend', function() {
        var src = [1, 2, 3, '4', 5];
        var target = {};
        ad.object.extend(target, src);
        expect(target[3]).toBe('4');
        expect(target.length).toBeUndefined();

        src = {'test': 1, 'change': 2, 'obj': {'test': 1, 'change': 2}};
        target = {};
        ad.object.extend(target, src);
        src.change = 3;
        src.obj.change = 3;
        expect(target.test).toBe(1);
        expect(target.obj.test).toBe(1);
        expect(target.change).toBe(2);
        expect(target.obj.change).toBe(3);

        function Src() {
            this.name = 'src';
        };
        Src.prototype.protoKey = 'src';
        src = new Src();
        target = {};
        ad.object.extend(target, src);
        expect(target.name).toBe('src');
        expect(target.protoKey).toBeUndefined();
    });

    it('isPlain', function () {
        expect(ad.object.isPlain('something')).toBe(false);
        expect(ad.object.isPlain(123)).toBe(false);
        expect(ad.object.isPlain({})).toBe(true);
        expect(ad.object.isPlain({'test': 123})).toBe(true);
        expect(ad.object.isPlain(new Object())).toBe(true);
        expect(ad.object.isPlain(new Function())).toBe(false);
        function XXX() {
            this.test = 1;
        }
        expect(ad.object.isPlain(new XXX())).toBe(false);
        function YYY() {
            this.t = 1;
        }
        YYY.prototype = new XXX();
        expect(ad.object.isPlain(new YYY())).toBe(false);
    });
});











/* vim: set ts=4 sw=4 sts=4 tw=120: */
});
