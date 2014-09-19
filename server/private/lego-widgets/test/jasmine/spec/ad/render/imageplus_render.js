define(function(require){
/**
 * @file ad/render/imageplus_render.js ~ 2014/08/01 10:00:00
 * @author zhouminming01(zhouminming01@baidu.com)
 **/

require('ad/render/imageplus_render');

describe('ad.render.ImageplusRender', function(){
    it('_replaceOrAttachIdForFirstTag', function(){
        var func = ad.render.ImageplusRender.prototype._replaceOrAttachIdForFirstTag;
        var tests = [
            {
                'i': '',
                'o': ''
            },
            {
                'i': 'not a start tag</div>',
                'o': 'not a start tag</div>'
            },
            {
                'i': '<div></div>',
                'o': '<div id="myId"></div>'
            },
            {
                'i': '<div></div>',
                'o': '<div id="myId"></div>'
            },
            {
                'i': '<DIV></DIV>',
                'o': '<DIV id="myId"></DIV>'
            },
            {
                'i': '<DIV ID="fakeId"></DIV>',
                'o': '<DIV id="myId"></DIV>'
            },
            {
                'i': '<DIV ID=\'fakeId\'></DIV>',
                'o': '<DIV id="myId"></DIV>'
            },
            {
                'i': '<a>XXX</a>',
                'o': '<a id="myId">XXX</a>'
            },
            {
                'i': '<a href="http://baidu.com" target="_blank">XXX</a>',
                'o': '<a href="http://baidu.com" target="_blank" id="myId">XXX</a>'
            },
            {
                'i': '<a href="http://baidu.com" id="fakeId" target="_blank">XXX</a>',
                'o': '<a href="http://baidu.com" id="myId" target="_blank">XXX</a>'
            },
            {
                'i': '<a href="http://baidu.com" id="fakeId">XXX</a>',
                'o': '<a href="http://baidu.com" id="myId">XXX</a>'
            },
            {
                'i': '<a id="fakeId" href="http://baidu.com">XXX</a>',
                'o': '<a id="myId" href="http://baidu.com">XXX</a>'
            },
            {
                'i': '<html id="fakeId" charset="utf-8">XXX</html>',
                'o': '<html id="myId" charset="utf-8">XXX</html>'
            },
            {
                'i': '<html id="fakeId" charset="utf-8"><body id="nextId">XXX</body></html>',
                'o': '<html id="myId" charset="utf-8"><body id="nextId">XXX</body></html>'
            },
            {
                'i': '<!DOCTYPE html><html id="fakeId" charset="utf-8"><body id="nextId">XXX</body></html>',
                'o': '<!DOCTYPE html><html id="myId" charset="utf-8"><body id="nextId">XXX</body></html>'
            },
            {
                'i': '<!DOCTYPE html id="uselessId">\n<html id="fakeId" charset="utf-8">\n<body id="nextId">XXX</body>\n</html>',
                'o': '<!DOCTYPE html id="uselessId">\n<html id="myId" charset="utf-8">\n<body id="nextId">XXX</body>\n</html>'
            }
        ];

        for (var i = 0, l = tests.length; i < l; i++) {
            expect(func(tests[i]['i'], 'myId')).toBe(tests[i]['o']);
        }
    });
});











/* vim: set ts=4 sw=4 sts=4 tw=120: */
});
