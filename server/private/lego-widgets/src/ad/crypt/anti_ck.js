/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/**
 * src/ad/crypt/AntiCk.js ~ 2013/11/21 11:00:00
 *
 * @author zhouminming01(zhouminming01@baidu.com)
 * @version $Revision$
 * @description
 *
 **/

goog.provide('ad.crypt.AntiCk');

/**
 * 为链接增加反作弊校验域
 * 修改自mengke的代码:
 *     http://jsbin.com/eBUYaZOl/1/edit
 *
 * 例子：
 *     // 直接绑定
 *     var ck = new ad.crypt.AntiCk(node.getElementsByTagName('a'), 111);
 *
 *     // 修改timeSign
 *     ck.unbind();
 *     ck.setTimeSign(333);
 *     ck.bind();
 *
 * ck域的值应该为：
 *     “&ck=x.y.z.clk_x.clk_y.in_x.in_y.e”
 *     x：校验码
 *     y：鼠标在广告上移动的次数，不存在填0
 *   　z：鼠标按下和放开的时间间隔，不存在填0
 *     clk_x: 鼠标点击的x坐标
 *     clk_y: 鼠标点击的y坐标
 *     in_x:鼠标初次移入广告区域的x坐标
 *     in_y: 鼠标初次移入广告区域的y坐标
 *     e:鼠标初次移入广告区域到点击的时间间隔
 *
 * @constructor
 * @param {Array.<Element>|Element} links 所有要监控的链接
 * @param {number} timeSign 签名，由服务器端返回
 */
ad.crypt.AntiCk = function (links, timeSign) {
    var me = this;
    this.links = links.length ? links : [links];
    this.timeSign = timeSign || 0;
    this.binded = false; // 是否已经绑定,没有绑定则不需要解绑
    this.cachedEventIdx = 0; /*缓存事件ID*/
    this.cachedEvent = {};/*缓存容器*/


    // 校验码
    var checksum;
    // 鼠标在广告上移动的次数
    var mousemoveTime = 0;
    // 鼠标按下和放开的时间间隔
    var mouseInterval = 0;
    // 鼠标初次移入广告区域的x坐标
    var clickX = 0;
    // 鼠标初次移入广告区域的y坐标
    var clickY = 0;
    // 鼠标初次移入广告区域的x坐标
    var inX = 0;
    // 鼠标初次移入广告区域的y坐标
    var inY = 0;
    // 鼠标初次移入广告区域到点击的时间间隔
    var stayTime = 0;
    // 鼠标点击时候的时间
    var mousedownTime = 0;
    // 鼠标进入点击区域的时间
    var mouseoverTime = 0;
    // 事件发生的元素（例如链接元素）
    var element;

    /**
     * mousedown事件的回调函数
     *
     * @param {Object} event .
     */
    function mousedown(event) {
        event = window.event || event;
        element = event.target || event.srcElement;
        while (element && element.tagName !== 'A') {
            element = element.parentNode;
        }
        mousedownTime = new Date().getTime();
        clickX = event.clientX;
        clickY = event.clientY;
        if (!mouseoverTime) {
            stayTime = 0;
        }
        else {
            stayTime = mousedownTime - mouseoverTime;
        }

        // NOTE：之所以需要在mousedown时计算ck域，
        // 是为了处理“右键新标签打开的情况”，
        // 此情况下，默认设置鼠标点击间隔为9999
        mouseInterval = 9999;
        if (calcChecksum()) {
            addCk();
        }
    }

    /**
     * mouseup事件的回调函数
     */
    function mouseup() {
        mouseInterval = new Date().getTime() - mousedownTime;
        if (calcChecksum()) {
            addCk();
        }
    }

    /**
     * mouseover事件的回调函数
     *
     * @param {Object} event .
     */
    function mouseover(event) {
        event = window.event || event;
        mousemoveTime += 1;
        if (!inX) {
            inX = event.clientX;
        }

        if (!inY) {
            inY = event.clientY;
        }
        mouseoverTime = new Date().getTime();
    }

    /**
     * 计算校验码
     *
     * @return {boolean} 成功与否
     */
    function calcChecksum() {
        checksum = 0;
        // 目前遇到的两种url格式：
        // 1. 知心：
        // http://www.baidu.com/zhixin.php?url=-kfK00KSDNO1skoXLklZrl7jOYRzyyLfFtvZ5gXJsIEWv2hY5UD658HeopRTAmsBAoeG3Nrn_dN02LqK5Yq_uKgnSOkruK5k_RyJZ4ZReh4Gwo_VML63xqYblm8Y2yWQ337wcOY.DD_iug_kIorUzEukmDfg1pECXM66e3vQ2eQqv8OxoecX1Fjbi18eAUrz4rHk_lXrOXMkzpqhHk__oLSrHFovgNstIvEku3dLXPOi1ahEGi1xjk89o_LLyyIMHE9uEzpSQ5WovUeVLAOgxvTIOWx8LUrh1_8H899tIXEW3lqvwPISiZFuvfeQ8hek_utU_-MAZc1Ye3mIXH_dsSrzZy1_tReJeShlSzOux8ozuQDdSr1g3sqriSEGLLqrlEIYtRLvUQeDLfe3RS57r8SS1_zygpqSektXMGdLUCI-W5H3qrHk89eQbS5HIko_E3eCmI-xZF8EzgUtMWbLNsqrOuIIo8i1_3stRSPSeB1b__93lqWnrSSOgjkzUVLHIkolIt57-5Hux3_qhOGenMH__oePe5Hxgo8vNLTIYPSS7MgxbLgLleqMZX-Mku9LNdGo_ulIYPMHElXMIg3qhEkePqhe_eD4Q8zOFvTUPXzS1F_iheGoLsvntmII157PTr8eGvne5ZGHx3qhlZgk__LIQPOuYvyftIzTheF8dleVSiA7M_LS5Wg_eQtMHub8EdLS2ISSOIjuukzyf_eeSQPS1T1X13elOAOIIgYq5H3vTIxm1xgE8ouLXnPXEgvIQ5AVrSOkvuPxHIYSn5HbtX1WodeCIOugodderze_eQbqMHYeS5ZgvpqBIhekLgvU8-Mgxj8zIMuooEzuAIhiZgTM_zggXQ5uYdSn5Zk_H8L_GerPWreFjozurk-hexELslvIqv8exkLqr1g3vuDsecyTh1xYvUYLuPqMBhAzZI3S5AEX1b9zF93lSrE_vXriOT1ktUoE7Mg8LFlUSzl1mMxEEtUVxWblTW57h8l7QrO_EHubulX1k3qh88S1xkvIQPOHxELn4PXSeBheWIIyMGu3eVeQPIX8lZWgYeS1_Ldse5ZWIYLfGo9tIxZkE3tU5ZFgxgEvnLlqLWyMIYG8Hgx3dleCIqX1Fo_zNeqLBMxjbznsSrEGHjx3SPXHxuo3dL_qnr8zeWgIvTIhHk_ElX1chekLqPvEIvTUlqbr4r81G_ElXhO_8LS5HXMgIuYLgvgeVhV5WvgsllOZkozFLFtNrr7muCyrz1IvU6.THLZ_nZf1qb0IZF9uANGujY3n6KWULPYgLF9Uh_qn0K1IyFkpyfqnHfsP164rjD4PHbLrj64PsK-IZ-suHYz0ANGujYs0ANbugPWpyfqn0KWUA-WpdqYXgK-5H00TA3qnfKYugFVpy49UjYs0ZGY5y-VmyI-0ZKs5fK9uA-b5HDsrH0vP163P10v0A-1gLIGThN_ugP15H00ug9Y5g_BTv-bcWCBIyblniukT1CzFh71rW0hmMnlnBuWT1CzFh71IAqkrWDhIy-PTDGdpARlniuWTvN8IA-YXHCzFhP1fhk9mv_lniuWTv-zuh-_IANzrWDhNy-PUvFGUANcULPnUvIErWnhmgPkIA9zugPCUvkbrWchIy-PTDGGmh-8u1CzcBsBTZP1pyfBrBcscBsBuhN8UANGcWCBcBsBuMFEUiclcBc_cMNzUZw4TARBrW7q0APzm1Y1PWcvr0
        // 2. 网盟：
        // http://www.baidu.com/cpro.php?-kfK00aXiFAUlnSRvlQPm_bBw2QmZfjiZkgDuxJ-CizNnGDoaDNdNbHGI-aR8hJ5Ms7dFWSVML56hNJTRDalPPyxSMvO1V4-v2lKw1QbqZEkWM1OMn2nmuABqfR8.7D_jiSrPeCJMYpnx6wKGIqjYYZTDgPHAS6-nY1G8yZZn_nYQZuuYeS-f.IgF_5y9YIZ0lQzq_UvP9UA9ETLf8mh7GuZR8mvqVrW64PWfEmvqVUyq8gLPYpyPougc8pZwVU0KYUHYs0Zwd5gRkPH0YPjnY0ZI_5Hm0mv4YUWdBmy-bIgPGIAN-TMFET-qWTZc0mywWUA71T1Ys0ZF15H00mLwV5yF9pywdfLN1IDG1Uv30Uh7YIHY40A-Ypyfqn0KGIA-8uhqGujYs0AIspyfqn0Kzuyuspyfqn0KWTZFEpyfqnRFKrjbdwWDdf1mzwjTdrjIDfY7jrRPAPbmdnW6vfH00mgwGujYCUMN_Uab0mgwYXHYCUMN_Uab0mMNbuvNYgvN3TA-b5HD0my-s5NF1y-NdTyPrnb9B0ZNGTjYvrH9sPAcsTAfzmsKWpjYs0Zw9TWYvP0KbIZ0qnfK1uyk_ugFxpyfqPfKGTdq9TZ0qn0K9TZKxpyfqn0KWIgPY5fKGTdqLpgF-UAN1T1Ys0ZI9T7qYXgK-5H00TAsqn0KVm1Y1rj0dnHnkPfKVIWYk0A4vTjYsQW0snj0snj0s0AT45HD0uh-zTLwxThNMpyq85Hc0TvNWUv4bgLF-uv-EUWY3n100TLPs5HR0TLPsnWYs0ZwYTjYk0AwGTLws5H00mycqn0K9uZ6qnfKsuMwzmyw-5H00TZPYTh7buHYs0ZKGujYs0ZIspyfqn0K9uZw4TARqn0K1Iv-b5H00TLw4TARqn0KWThnqnHbYnWD0
        var d = /\.php\?(?:url=)?([0-9a-zA-Z_-]*)\./.exec(element.href);
        if (d) {
            var l = (((mousemoveTime * me.timeSign) % 99) + 9);
            for (var i = 0; i < l; ++i) {
                checksum += d[1].charCodeAt((mouseInterval * i) % d[1].length);
            }
            return true;
        }

        return false;
    }

    /**
     * 增加ck域
     */
    function addCk() {
        var ck = '&ck=' + [
            checksum,
            mousemoveTime,
            mouseInterval,
            clickX, clickY,
            inX, inY,
            stayTime
        ].join('.');

        if (element.href) {
            var i = element.href;
            if (i.indexOf('&ck=') === -1) {
                element.href += ck;
            }
            else {
                element.href = i.replace(/&ck=[\w.]*/, ck);
            }
        }
    }
    /**
     * 绑定事件
     *
     * 此处故意不使用事件代理，因为a标签不会很多。
     * 且mouseover可能触发频繁，如果遇到a标签不是e.target的情况，
     * 则需要每次事件触发时检测e.target的祖先元素是否是a标签，性能并不占优。
     */
    this.bind = function () {
        var links = me.links;
        for (var i = 0, l = links.length; i < l; i++) {
            this._bind(links[i], {
                'mouseover': mouseover,
                'mousedown': mousedown,
                'mouseup': mouseup
            });
        }
        if (links.length) {
            this.binded = true;
        }
    };

    // 直接绑定
    this.bind();
};

/**
 * 防止属性名重复用的字符串
 *
 * `echo "BAIDUANTICK" | md5sum` === b001e59bfbe56e7c12bbaed4f8d423bd
 *
 * @type {string}
 */
ad.crypt.AntiCk.ANTI_TAG = 'BAIDU-b001e59bfbe56e7c12bbaed4f8d423bd';

/**
 * 内部使用的绑定事件的函数
 *
 * @private
 * @param {Element} link 链接，或是其他元素
 * @param {Object} events 事件
 */
ad.crypt.AntiCk.prototype._bind = function (link, events) {
    var fn;
    for (var eventName in events) {
        fn = events[eventName];
        // 记录回调函数
        this.cachedEvent[++this.cachedEventIdx] = fn;
        link[ad.crypt.AntiCk.ANTI_TAG + eventName] = this.cachedEventIdx;

        baidu.on(link, eventName, fn);
    }
};

/**
 * 内部使用的解除绑定的函数
 *
 * @private
 * @param {Element} link 链接，或是其他元素
 * @param {Array.<string>} eventNames 事件名数组
 */
ad.crypt.AntiCk.prototype._unbind = function (link, eventNames) {
    var eventName;
    for (var i = 0, l = eventNames.length; i < l; i++) {
        eventName = eventNames[i];
        // 找回记录的回调函数
        var idx = link[ad.crypt.AntiCk.ANTI_TAG + eventName];
        var fn = this.cachedEvent[idx];

        if (fn) {
            baidu.un(link, eventName, fn);
        }
        this.cachedEvent[idx] = null;
    }
};

/**
 * 解除绑定
 */
ad.crypt.AntiCk.prototype.unbind = function () {
    var me = this;
    if (!me.binded) {
        return;
    }

    var links = me.links;
    for (var i = 0, l = links.length; i < l; i++) {
        me._unbind(links[i], ['mouseover', 'mousedown', 'mouseup']);
    }
    me.binded = false;
};

/**
 * 设置timesign
 *
 * @param {number} timeSign 签名，由后端提供
 */
ad.crypt.AntiCk.prototype.setTimesign = function (timeSign) {
    this.timeSign = timeSign;
};

