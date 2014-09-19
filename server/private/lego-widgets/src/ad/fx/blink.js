/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/

/**
 * src/ad/fx/blink.js ~ 2013/04/29 13:51:25
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 *
 **/

goog.require('ad.dom');
goog.require('ad.fx.Timeline');

goog.provide('ad.fx.blink');

/**
 * blink效果
 *
 * @param  {string|Element} element   元素或者元素的ID
 * @param  {Object=} options          选项。参数的详细说明如下表所示
 * @config {number} blinkTime        blink次数，默认值为2
 * @config {number} duration         效果持续时间，默认值为2000ms
 * @config {Function} transition     时间线函数
 * @config {Function} onbeforestart  效果开始前执行的回调函数
 * @config {Function} onbeforeupdate 每次刷新画面之前会调用的回调函数
 * @config {Function} onafterupdate  每次刷新画面之后会调用的回调函数
 * @config {Function} onafterfinish  效果结束后会执行的回调函数
 * @config {Function} oncancel       效果被撤销时的回调函数
 *
 * @return {ad.fx.Timeline} timeline
 */
ad.fx.blink = function (element, options) {
    if (!(element = baidu.g(element))) {
        return null;
    }

    options = baidu.extend({
        // blink的次数
        blinkTime: 2,
        duration: 2000
    }, options || {});

    var e = element;
    var ralpha = /alpha\([^)]*\)/i;
    var isVisibleAtStart;

    var fx = ad.fx.create(e, baidu.extend({
        // [Implement Interface] initialize
        initialize : function () {
            if (baidu.browser.ie < 9) {
                fx.protect('filter');
            }
            else {
                fx.protect('opacity');
            }

            isVisibleAtStart = ad.dom.getStyle(element, 'display') !== 'none';
            if (!isVisibleAtStart) {
                // 如果默认是隐藏的元素，则动画初始状态是opacity为0
                baidu.setStyles(element, 'opacity', 0);
                element.style.display = 'block';
            }
        },

        // [Implement Interface] render
        render : function (schedule) {
            var tmp = schedule * options.blinkTime * 2;
            // 取整数部分
            var integer = Math.floor(tmp);
            // 取小数部分
            var decimal = tmp - integer;
            var isOdd = integer % 2 !== 0;

            if (!isVisibleAtStart) {
                isOdd = !isOdd;
            }
            var n = isOdd
                ? decimal
                : (1 - decimal);

            // 此处不能使用baidu.setStyle方法，因为：
            // 如果需要显示闪烁效果的元素使用了
            //      filter:progid:DXImageTransform.Microsoft.AlphaImageLoader
            // 且使用了baidu.setStyle方法，则无法显示动画效果
            if (!(baidu.browser.ie < 9)) {  // jshint ignore:line
                e.style.opacity = n;
            }
            else {
                if (!e.currentStyle) {
                    // IE下如果元素被删除，则currentStyle可能为null
                    return;
                }
                var filter = e.currentStyle.filter;
                var opacity = 'alpha(opacity=' + Math.floor(n * 100) + ')';
                e.style.filter = ralpha.test(filter)
                    ? filter.replace(ralpha, opacity)
                    : (filter + ' ' + opacity);
            }
        }
    }, options), 'ad.fx.opacity');

    fx.addEventListener('onafterfinish', function() {
        if (!isVisibleAtStart) {
            element.style.display = 'none';
        }
    });

    // 移除动画添加的opacity或filter值
    fx.restoreAfterFinish = true;

    return fx.launch();
};

