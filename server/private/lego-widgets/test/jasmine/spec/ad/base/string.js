define(function(require){
/**
 * @file spec/ad/base/string.js ~ 2014/07/23 22:27:29
 * @author leeight(liyubei@baidu.com)
 **/

require('ad/base/string');

describe('ad.string', function(){
    it('trim', function() {
        expect(ad.string.trim('hello')).toBe('hello');
        expect(ad.string.trim('  hel  lo  ')).toBe('hel  lo');
        expect(ad.string.trim('    ')).toBe('');
        expect(ad.string.trim('\ufeff')).toBe('');
        expect(ad.string.trim('\u3000')).toBe('');
    });

    it('format', function() {
        expect(ad.string.format('Well begun is {0}.', 'half done')).toBe('Well begun is half done.');
        expect(ad.string.format('I love {0}, {1} and {2}.', 'html', 'css', 'javascript')).toBe('I love html, css and javascript.');
        expect(ad.string.format('My name is ${name}. I work for ${company} based in ${city}.', {
            'name': 'foo',
            'company': 'baidu',
            'city': 'Shanghai'
        })).toBe('My name is foo. I work for baidu based in Shanghai.');
    });

    it('escapeReg', function() {
        expect(ad.string.escapeReg('.*+?^=!:${}()|[]/\\-'))
            .toBe('\\.\\*\\+\\?\\^\\=\\!\\:\\$\\{\\}\\(\\)\\|\\[\\]\\/\\\\\\-');
    });
});











/* vim: set ts=4 sw=4 sts=4 tw=120: */
});
