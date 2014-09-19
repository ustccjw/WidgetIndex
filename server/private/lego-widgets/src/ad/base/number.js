/**
 * Created by dingguoliang01 on 2014/8/6.
 */


/*
 * path:    src/ad/base/number.js
 * desc:
 * author:  number(number@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:16:24$
 */

goog.provide('ad.number');

/**
 * 对目标数字进行0补齐处理
 * @name ad.number.pad
 * @function
 * @grammar ad.number.pad(source, length)
 * @param {number} source 需要处理的数字
 * @param {number} length 需要输出的长度
 *
 * @return {string} 对目标数字进行0补齐处理后的结果
 */
ad.number.pad = function (source, length) {
    var pre = '';
    var negative = (source < 0);
    var string = String(Math.abs(source));

    if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0');
    }

    return (negative ?  '-' : '') + pre + string;
};
