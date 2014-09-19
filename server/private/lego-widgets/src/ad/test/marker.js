/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: marker.js 11655 2012-09-10 09:04:23Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/marker.js ~ 2012/09/10 15:52:45
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 11655 $
 * @description
 * 标尺
 **/
goog.provide('ad.test.marker');


/**
 * 显示标尺
 * @param {number} x
 * @param {number} y
 */
ad.test.marker.show = function(x, y) {
    var x_axis = document.querySelector('.x-axis');
    if (y != null) {
        x_axis.style.display = '';
        x_axis.style.top = y + 'px';
    } else {
        x_axis.style.display = 'none';
    }

    var y_axis = document.querySelector('.y-axis');
    if (x != null) {
        y_axis.style.display = '';
        y_axis.style.left = x + 'px';
    } else {
        y_axis.style.display = 'none';
    }
};

/**
 * 隐藏标尺
 */
ad.test.marker.hide = function() {
    this.show(null, null);
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
