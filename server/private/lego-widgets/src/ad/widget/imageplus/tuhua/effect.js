/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/widget/imageplus/tuhua/effect.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/06/15 12:13:06$
 */

goog.require('ad.fx.Timeline');
goog.require('base.EventDispatcher');

goog.provide('ad.widget.imageplus.tuhua.effect');
goog.provide('ad.widget.imageplus.tuhua.effect.fx');

/**
 * 颜色来回变化
 * @param {Array.<HTMLElement>} eles 元素数组
 * @param {Array.<string>} colors 颜色数组
 * @param {Function} endCallback 结束回调
 * @param {number=} opt_duration 变换时间间隔
 */
ad.widget.imageplus.tuhua.effect.swingColors = function(eles, colors, opacitys, endCallback, opt_duration) {
    var duration = opt_duration || 10000;

    var candidateColors = [];
    baidu.each(colors, function(color) {
        var rgb = ad.widget.imageplus.tuhua.effect.parseColor(color);
        candidateColors.push(rgb);
    });
    // [color1, color2, color3]的变换过程是：
    // color1 -> color2 -> color3 -> color2 -> color1 -> ...
    var queue = candidateColors.slice(0);
    var opacityQueue = opacitys.slice(0);
    for (var i = candidateColors.length - 2; i >= 0; i--) {
        queue.push(candidateColors[i]);
        opacityQueue.push(opacitys[i]);
    }

    var segCount = queue.length - 1;
    var interval = 1 / segCount;
    var colorUtil = ad.widget.imageplus.tuhua.effect.colorUtil;
    function getCurrent(schedule) {
        var currentSeg = parseInt(schedule / interval, 0);
        var scheduleInSeg = (schedule - interval * currentSeg) / interval;
        var startColor = queue[currentSeg];
        var startOpcity = opacityQueue[currentSeg];
        if (schedule >= 1) {
            return {
                'color': colorUtil.toHexColor(startColor),
                'opacity': startOpcity
            };
        }
        var endColor = queue[currentSeg + 1];
        var endOpacity = opacityQueue[currentSeg + 1];
        var currentColor = [];
        for (var i = 0; i < 3; i++) {
            currentColor.push(
                parseInt(startColor[i] + (endColor[i] - startColor[i]) * scheduleInSeg, 10)
            );
        }
        var currentOpacity = startOpcity + (endOpacity - startOpcity) * scheduleInSeg;
        return {
            'color': colorUtil.toHexColor(currentColor),
            'opacity': currentOpacity
        };
    }

    var fx = ad.fx.create(eles[0], {
        __type: 'swing-colors',
        duration: duration,
        render: function(schedule) {
            var styles = getCurrent(schedule);
            baidu.each(eles, function(ele) {
                baidu.setStyle(ele, 'color', styles['color']);
                baidu.setStyle(ele, 'opacity', styles['opacity']);
            });
        }
    });
    fx.addEventListener('onafterfinish', function() {
        endCallback && endCallback();
    });
    fx.launch();
    return fx;
};

/**
 * 颜色处理函数集
 *
 * @type {Object}
 */
ad.widget.imageplus.tuhua.effect.colorUtil = {
    /**
     * 给颜色十六进制分量补全0
     * @param {string} number 十六进制数字
     * @return {string}
     */
    pad: function(number) {
        number += '';
        if (number.length == 1) {
            return '0' + number;
        }
        return number;
    },
    /**
     * 颜色十进制分量转十六进制分量
     * @param {number} number 颜色分量
     * @return {string}
     */
    toHex: function(number) {
        var colorUtil = ad.widget.imageplus.tuhua.effect.colorUtil;
        return colorUtil.pad(number.toString(16));
    },
    /**
     * 将rgb分量转换成十六进制颜色
     * @param {Array.<number>} rgb 颜色分量数组
     * @return {string}
     */
    toHexColor: function(rgb) {
        var colorUtil = ad.widget.imageplus.tuhua.effect.colorUtil;
        return '#' + [
            colorUtil.toHex(rgb[0]),
            colorUtil.toHex(rgb[1]),
            colorUtil.toHex(rgb[2])
        ].join('');
    }
};

/**
 * 解析十六进制颜色
 * @param {string} color 颜色值
 * @return {?Object}
 */
ad.widget.imageplus.tuhua.effect.parseColor = function(color) {
    var matches = /^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i.exec(color);
    var rgb = [];
    if (matches) {
        var hex = matches[1];
        if (hex.length === 3) {
            hex = [hex.charAt(0), hex.charAt(0), hex.charAt(1), hex.charAt(1), hex.charAt(2), hex.charAt(2)].join('');
        }
        for (var i = 0; i < 3; i++) {
            rgb.push(parseInt(hex.substring(i * 2, i * 2 + 2), 16));
        }
        return rgb;
    }

    return null;
};




















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
