/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: coord.js 13407 2012-10-29 03:55:41Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/coord.js ~ 2012/09/10 16:06:14
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 13407 $
 * @description
 *
 **/
goog.provide('ad.test.coord');

/**
 * 缓存(x1, y1), (x2, y2)的坐标内容
 * @private
 */
ad.test.coord._data = [];

/**
 * @param {Element=} opt_excludeTarget 需要忽略的节点.
 */
ad.test.coord.refresh = function(opt_excludeTarget) {
    var data = this._data;

    data.length = 0;
    baidu.array.each(document.querySelectorAll('.widget'), function(widget) {
        if (widget === opt_excludeTarget) {
            return;
        }
        var x1 = parseInt(widget.style.left, 10);
        var y1 = parseInt(widget.style.top, 10);
        var x2 = x1 + widget.offsetWidth;
        var y2 = y1 + widget.offsetHeight;
        data.push({'x' : x1, 'y' : y1});
        data.push({'x' : x2, 'y' : y2});
    });
};

/**
 * 从this._data检查是否能找到符合的坐标，只需要
 * 遍历一次即可.
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {boolean|{x:number, y:number}}
 */
ad.test.coord.match = function(x1, y1, x2, y2) {
    var x = null;
    var y = null;
    for (var i = 0; i < this._data.length; i++) {
        var item = this._data[i];
        if ((item.x == x1 || item.x == x2)) {
            x = item.x;
        }
        if ((item.y == y1 || item.y == y2)) {
            y = item.y;
        }
    }

    if (x == null && y == null) {
        return false;
    }

    return { 'x' : x, 'y' : y };
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
