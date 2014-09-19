/**
 * @file src/ad/string/string.js ~ 2014/07/23 12:18:23
 * @author leeight(liyubei@baidu.com)
 **/
goog.require('ad.object');

goog.provide('ad.string');


/**
 * 删除目标字符串两端的空白字符
 * @param {string} source 目标字符串
 * @return {string} 删除两端空白字符后的字符串
 */
ad.string.trim = typeof ''.trim === 'function' ? function(source) {
    return String(source).trim();
} : function(source) {
    var pattern = /(^[\s\t\xa0\u3000\ufeff]+)|([\ufeff\u3000\xa0\s\t]+$)/g;
    return String(source).replace(pattern, '');
};

/**
 * 对目标字符串进行格式化
 * @suppress {duplicate}
 * @param {string} source  目标字符串.
 * @param {...*} var_args  提供相应数据的对象.
 * @return {string} 格式化后的字符串.
 */
ad.string.format = function(source, var_args) {
    source = String(source);

    var opts = arguments[1];
    if ('undefined' !== typeof opts) {
        if (ad.object.isPlain(/** @type {Object} */ (opts))) {
            return source.replace(/\$\{(.+?)\}/g, function(match, key) {
                var replacer = opts[key];
                if ('function' === typeof replacer) {
                    replacer = replacer(key);
                }
                return ('undefined' === typeof replacer ? '' : replacer);
            });
        }
        else {
            var data = Array.prototype.slice.call(arguments, 1);
            var len = data.length;
            return source.replace(/\{(\d+)\}/g, function(match, index) {
                index = parseInt(index, 10);
                return (index >= len ? match : data[index]);
            });
        }
    }

    return source;
};

/**
 * 将目标字符串中可能会影响正则表达式构造的字符串进行转义。
 * @param {string} source 目标字符串
 * @return {string} 转义后的字符串
 */
ad.string.escapeReg = function(source) {
    return String(source)
        .replace(new RegExp('([.*+?^=!:${}()|[\\]\/\\\\-])', 'g'), '\\$1');
};









/* vim: set ts=4 sw=4 sts=4 tw=120: */
