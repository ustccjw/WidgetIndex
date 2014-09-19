define(function(require){
/**
 * @file spec/ad/base/dom.js ~ 2014/07/23 22:27:29
 * @author leeight(liyubei@baidu.com)
 **/

require('ad/base/array');

describe('ad.array', function(){
    it('forEach', function() {
        var array = [1, 2, 3, '4', 5];
        var i = 0;
        ad.array.forEach(array, function (value, index) {
            expect(index).toBe(i);
            expect(value).toBe(array[i]);
            i++;
        });

        i = 0;
        var thisObj = {'test': 1};
        ad.array.forEach(array, function (value, index) {
            expect(index).toBe(i);
            expect(value).toBe(array[i]);
            expect(this['test']).toBe(1);
            i++;
        }, thisObj);

        i = 0;
        ad.array.forEach(array, function (value, index) {
            i++;
            return false;
        });

        expect(i).toBe(1);
    });

    it('each', function() {
        expect(ad.array.each).toBe(ad.array.forEach);
    });
});











/* vim: set ts=4 sw=4 sts=4 tw=120: */
});
