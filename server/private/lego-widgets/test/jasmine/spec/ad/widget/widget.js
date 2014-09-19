define(function(require){
/**
 * @file ad/widget/widget.js ~ 2014/07/24 10:06:40
 * @author leeight(liyubei@baidu.com)
 **/

require('ad/widget/button');

describe('ad.widget', function(){
    it('foo', function() {
        expect(true).toBe(true);
    });
    it('bar', function(){
        var widget = new ad.widget.Widget({});
        expect(widget instanceof ad.widget.Widget).toBe(true);
    });
    it('Button', function(){
        var button = new ad.widget.Button({});
        expect(button instanceof ad.widget.Button).toBe(true);
        expect(button instanceof ad.widget.Widget).toBe(true);
    })
});











/* vim: set ts=4 sw=4 sts=4 tw=120: */
});
