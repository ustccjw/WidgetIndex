/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/base/date.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:25:17$
 */
goog.require('ad.number');
goog.provide('ad.date');

/**
 * 获取广告的最后更新日期，例如2012-08, 2012-12
 * @return {string}
 */
ad.date.getLastUpdate = function() {
    if (COMPILED) {
        var now = new Date();
        return now.getFullYear() + '-' + (now.getMonth() > 8 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1));
    }
    return '2013-11'; // phantomjs直接返回2013-11，历史原因不解释
};

/**
 * 对目标日期对象进行格式化
 * @param {Date} source 目标日期对象
 * @param {string} pattern 日期格式化规则
 *
 <b>格式表达式，变量含义：</b><br><br>
 hh: 带 0 补齐的两位 12 进制时表示<br>
 h: 不带 0 补齐的 12 进制时表示<br>
 HH: 带 0 补齐的两位 24 进制时表示<br>
 H: 不带 0 补齐的 24 进制时表示<br>
 mm: 带 0 补齐两位分表示<br>
 m: 不带 0 补齐分表示<br>
 ss: 带 0 补齐两位秒表示<br>
 s: 不带 0 补齐秒表示<br>
 S: 原始的毫秒表示<br>
 yyyy: 带 0 补齐的四位年表示<br>
 yy: 带 0 补齐的两位年表示<br>
 MM: 带 0 补齐的两位月表示<br>
 M: 不带 0 补齐的月表示<br>
 dd: 带 0 补齐的两位日表示<br>
 d: 不带 0 补齐的日表示

 *
 * @return {string} 格式化后的字符串
 */

ad.date.format = function (source, pattern) {
    if ('string' !== typeof pattern) {
        return source.toString();
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }

    var pad      = ad.number.pad;
    var year     = source.getFullYear();
    var month    = source.getMonth() + 1;
    var date2    = source.getDate();
    var hours    = source.getHours();
    var minutes  = source.getMinutes();
    var seconds  = source.getSeconds();
    var mSeconds = source.getMilliseconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);
    replacer(/S/g, mSeconds);

    return pattern;
};















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
