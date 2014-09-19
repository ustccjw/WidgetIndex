/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/service/get_link_statistic.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2013/04/15 13:01:49$
 */

/**
 * 获取物料中统计项
 *
 * 调用示例：
 *    var STATISTIC = getLinkStatistic('m1234_canvas', m1234_LINKS, m1234_RT_CONFIG);
 *
 * @param {string} canvasId 物料容器id
 * @return {Array.<{
 *    ?linkId: number,
 *    ?linkName: string,
 *    ?linkText: string,
 *    ?href: string,
 *    xp: string
 * }>} 统计项数组
 */
function getLinkStatistic(canvasId, LINKS, RT_CONFIG) {
    /**
     * 修复tab中linkid未被统计的bug, 每个widget实现_fixWidgetDeferLinks方法
     */
    function fixDeferLinks() {
        if (Array.isArray(window.ECOM_LEGO_WIDGETS_STATS_CALLBACKS)) {
            window.ECOM_LEGO_WIDGETS_STATS_CALLBACKS.forEach(function (cb){
                cb();
            });
        }
    }
    fixDeferLinks();

    var _RCV_PATTERN = /%%BEGIN_LINK/;
    var canvas = document.getElementById(canvasId);
    var anchors = canvas ? canvas.getElementsByTagName('a') : [];
    var _links = LINKS;
    var _rt_config = RT_CONFIG;

    var linkIds = _rt_config['LINK_IDS'];
    _linkMap = {};
    for(var i = 0, l = _links.length; i < l; i++){
        var url = getAbsoluteUrl(_links[i]);
        _linkMap[url] = linkIds[i];
    }

    var collection = [];
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        var href = anchor.href;
        var linkName = anchor.getAttribute('title2');
        var linkText = anchor.getAttribute('data-link-text');
        var rcvUrl = anchor.getAttribute('data-rcv-url');
        if (href && _RCV_PATTERN.test(href)
            || rcvUrl && _RCV_PATTERN.test(rcvUrl)
            || linkName
        ) {
            var innerText = trim(
                anchor.innerHTML.replace(/<[^>]+>/g, '').replace(/\r|\n/g, ' ').replace(/&nbsp;/g, ' ')
            );
            var params = {};
            // linkId用于业务端查询原始链接
            if (_linkMap && _linkMap[href]) {
                params['linkId'] = _linkMap[href];
            }
            else if (_linkMap && rcvUrl) {
                var linkId = _linkMap[getAbsoluteUrl(rcvUrl)];
                if (linkId) {
                    params['linkId'] = linkId;
                }
            }
            if (linkName) {
                params['linkName'] = linkName;
            }
            if (innerText) {
                // 截取一下，不能太长
                params['linkText'] = linkText || subByte(innerText, 1000);
            }
            // 对于非rcv链接，需要将链接地址发给监控端
            if (href && !params['linkId']) {
                params['href'] = href;
            }
            params['xp'] = getXPath(anchor, canvas);

            collection.push(params);
        }
    }

    return collection;

    function getXPath(element, opt_canvas){
        if (element === opt_canvas || element.getAttribute('data-rendered')){
            return 'id("' + element.id + '")';
        }
        if (element === document.body)
            return element.tagName;

        var ix = 0;
        var siblings = element.parentNode.childNodes;
        for (var i = 0, l = siblings.length; i < l; i++) {
            var sibling = siblings[i];
            if (sibling === element) {
                return getXPath(element.parentNode, opt_canvas) + '/' + element.tagName + '[' + (ix + 1) + ']';
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }

    function getByteLength(source) {
        return String(source).replace(/[^\x00-\xff]/g, "ci").length;
    }

    function subByte(source, length, tail) {
        source = String(source);
        tail = tail || '';
        if (length < 0 || getByteLength(source) <= length) {
            return source + tail;
        }

        //thanks 加宽提供优化方法
        source = source.substr(0,length).replace(/([^\x00-\xff])/g,"\x241 ")//双字节字符替换成两个
            .substr(0,length)//截取长度
            .replace(/[^\x00-\xff]$/,"")//去掉临界双字节字符
            .replace(/([^\x00-\xff]) /g,"\x241");//还原
        return source + tail;

    }

    function trim(source) {
        var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
        return String(source).replace(trimer, "");
    }

    function getAbsoluteUrl(url) {
        var div = document.createElement('div');
        div.innerHTML = '<a href="' + url + '">x</a>';
        return div.childNodes[0].href;
    }
}


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
