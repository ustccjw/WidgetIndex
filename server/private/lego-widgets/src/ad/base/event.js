/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/

/*
 * path:    src/ad/base/event.js
 * desc:
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/07/23 15:17:21$
 */

goog.provide('ad.event');

/**
 * 事件监听器的存储表
 * @private
 */
ad.event._listeners = [];


/**
 * 为目标元素添加事件监听器
 * @param {Element|string|Window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} listener 需要添加的监听器
 *  1. 不支持跨浏览器的鼠标滚轮事件监听器添加<br>
 *  2. 改方法不为监听器灌入事件对象，以防止跨iframe事件挂载的事件对象获取失败
 * @see ad.event.un
 * @return {Element|Window} 目标元素
 */
ad.event.on = function (element, type, listener) {
    type = type.replace(/^on/i, '');
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }

    var realListener = function (ev) {
        // 1. 这里不支持EventArgument,  原因是跨frame的事件挂载
        // 2. element是为了修正this
        listener.call(element, ev);
    };
    var lis = ad.event._listeners;
    var realType = type;
    type = type.toLowerCase();

    // 事件监听器挂载
    if (element.addEventListener) {
        element.addEventListener(realType, realListener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + realType, realListener);
    }

    // 将监听器存储到数组中
    lis[lis.length] = [element, type, listener, realListener, realType];
    return element;
};

/**
 * 为目标元素移除事件监听器
 * @param {Element|string|Window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function=} opt_listener 需要移除的监听器
 * @see ad.event.on
 * @return {Element|Window} 目标元素
 */
ad.event.un = function (element, type, opt_listener) {
    var listener = opt_listener;
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    type = type.replace(/^on/i, '').toLowerCase();

    var lis = ad.event._listeners;
    var len = lis.length;
    var isRemoveAll = !listener;
    var item;
    var realType;
    var realListener;

    // 如果将listener的结构改成json
    // 可以节省掉这个循环，优化性能
    // 但是由于un的使用频率并不高，同时在listener不多的时候
    // 遍历数组的性能消耗不会对代码产生影响
    // 暂不考虑此优化
    while (len--) {
        item = lis[len];

        // listener存在时，移除element的所有以listener监听的type类型事件
        // listener不存在时，移除element的所有type类型事件
        if (item[1] === type
            && item[0] === element
            && (isRemoveAll || item[2] === listener)) {
            realType = item[4];
            realListener = item[3];
            if (element.removeEventListener) {
                element.removeEventListener(realType, realListener, false);
            }
            else if (element.detachEvent) {
                element.detachEvent('on' + realType, realListener);
            }
            lis.splice(len, 1);
        }
    }

    return element;
};

/**
 * 阻止事件的默认行为
 * @param {Event} event 事件对象
 * @see ad.event.stop,ad.event.stopPropagation
 */
ad.event.preventDefault = function (event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
};

/**
 * 获取事件的触发元素
 * @param {Event} event 事件对象
 * @return {Element} 事件的触发元素
 */
ad.event.getTarget = function (event) {
    return /** @type {Element}*/(event.target || event.srcElement);
};

/**
 * 获取事件
 * @param {Event} opt_evt 事件对象
 * @return {Event} 事件对象
 */
ad.event.getEvent = function (opt_evt) {
    return opt_evt || window.event;
};

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
