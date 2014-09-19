/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/



/**
 * src/ad/impl/weigou/dom.js ~ 2013/05/02 21:06:36
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$
 * @description
 *
 **/
goog.require('ad.impl.weigou.dist');

goog.provide('ad.impl.weigou.dom');

/**
 * 获取目标元素相对于整个文档左上角的位置
 * @param {Node|Element} element 目标元素或目标元素的id.
 * @return {{left:number,top:number}} 目标元素的位置，键值为top和left的Object。
 */
ad.impl.weigou.dom.getPosition = function(element) {
    if (ad.impl.weigou.dist.IPAD ||
        ad.impl.weigou.dist.MOBILE) {
        var rect = element.getBoundingClientRect();
        return {
            'left': rect.left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
            'top': rect.top + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        };
    } else {
        return baidu.dom.getPosition(element);
    }
};

/**
 * 为目标元素添加事件监听器
 * @param {Element|HTMLDocument|Window} element 目标元素或目标元素id.
 * @param {string} type 事件类型.
 * @param {Function} listener 需要添加的监听器.
 * @return {Element|Window|HTMLDocument} 目标元素.
 */
ad.impl.weigou.dom.on = function(element, type, listener) {
    if (ad.impl.weigou.dist.IPAD ||
        ad.impl.weigou.dist.MOBILE) {
        if (element) {
            element.addEventListener(type, listener, false);
        }
        return element;
    } else {
        return baidu.on(element, type, listener);
    }
};


/**
 * 从DOM树上移除目标元素
 * @param {Node|string} element 需要移除的元素或元素的id.
 */
ad.impl.weigou.dom.remove = function(element) {
    if (ad.impl.weigou.dist.IPAD ||
        ad.impl.weigou.dist.MOBILE) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(/** @type {Node} */ (element));
        }
    } else {
        baidu.dom.remove(element);
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
