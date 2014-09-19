/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: rcv2_service.js 11362 2012-08-28 08:31:18Z songao $
 *
 **************************************************************************/



/**
 * src/ad/service/rcv2_service.js ~ 2012/10/15 16:47:40
 * @author pengxing(pengxing@baidu.com)
 * @version $Revision: 11362 $
 * @description
 * 提供RCV2统计的服务
 **/
goog.require('ad.string');
goog.require('ad.url');
goog.require('ad.dom');
goog.require('ad.base');
goog.require('ad.service.Service');
goog.require('app.log.send');

goog.provide('ad.service.RCV2Service');

/**
 * @constructor
 * @param {string} id 物料的id.
 * @param {Object=} opt_links LINKS数组，如果不传，直接取scope中的LINKS.
 * @param {Object=} opt_rtConfig RT_CONFIG，如果不传，直接取scope中的RT_CONFIG.
 * @param {{extraParams: Object, logTimeout: number}|Object=} opt_config 监控服务的配置
 * @extends {ad.service.Service}
 */
ad.service.RCV2Service = function(id, opt_links, opt_rtConfig, opt_config) {
    ad.service.Service.call(this);

    /**
     * 物料id
     * @type {string}
     */
    this._id = id;

    /**
     * LINKS数组的引用
     * @type {Object}
     */
    this._links = opt_links || ((typeof LINKS === 'undefined') ? null : LINKS);

    /**
     * RT_CONFIG的引用
     * @type {Object}
     */
    this._rtConfig = opt_rtConfig || ((typeof RT_CONFIG === 'undefined') ? null : RT_CONFIG);

    /**
     * 监控服务的配置
     * @type {Object}
     */
    this._config = opt_config || {};

    /**
     * 需附带到log中的额外参数
     * @type {Object}
     */
    this._config.extraParams = this._config['extraParams'] || {};

    /**
     * 发送log时延迟跳转等待的时间间隔
     * @type {number}
     */
    this._config.logTimeout = this._config['logTimeout'] || 250;

    /**
     * 匹配是否是RCV1的链接
     * @type {RegExp} 匹配是否是RCV链接的正则表达式
     */
    this._RCV_PATTERN = /\/adrc\.php\?t=/;

    /**
     * 地标Siva中SIVA跳转地址的格式
     * @type {RegExp}
     */
    this._SIVA_PATTERN = /\/siva\.php\?url=/;

    // Initiate
    this.init();
};
baidu.inherits(ad.service.RCV2Service, ad.service.Service);

/** @override */
ad.service.RCV2Service.prototype.init = function() {
    var me = this;

    if (!me._links || !me._rtConfig) {
        return false;
    }

    me.attachTo(baidu.g(this._id));
};

/**
 * 获取离指定元素最近的指定的标签名的元素
 * @param {Element} sourceElement 寻找标签的起始元素.
 * @param {string} tagName 要寻找的标签名.
 * @return {?Node} 找到的元素.
 */
ad.service.RCV2Service.prototype.findNearestTag = function(sourceElement, tagName) {
    var ele = sourceElement;
    while (ele
        && ele.nodeName.toLowerCase() !== tagName
        && ele !== document.body
    ) {
        ele = ele.parentNode;
    }
    if (ele && ele.nodeName.toLowerCase() === tagName) {
        return ele;
    }
    else {
        return null;
    }
};

/**
 * 从location.href中获取广告的流量来源
 * @return {?string} 来源标识
 */
ad.service.RCV2Service.prototype.getSource = function() {
    // 兼容同步模式和异步模式 (异步模式参数都在hash里)
    var queryStr = window.document.location.search;
    var hashStr = window.document.location.hash;
    var list = [queryStr, hashStr];
    for (var i = 0; i < list.length; i++) {
        var str = list[i];
        if (/ecma_src=/.test(str)) {
            var matches = str.match(/ecma_src=([^&]+)/);
            if (matches.length > 1) {
                return matches[1];
            }
        }
    }
    return null;
};

/**
 * 获取监控参数
 * @param {Node} anchor 链接元素.
 * @return  {?Object} 参数集.
 */
ad.service.RCV2Service.prototype.getParams = function(anchor) {
    var me = this;
    var href = anchor.href;
    var linkName = baidu.dom.getAttr(anchor, 'title2');
    var linkText = baidu.dom.getAttr(anchor, 'data-link-text');
    var rcvUrl = baidu.dom.getAttr(anchor, 'data-rcv-url');

    // 素材库决定是否替换*_rcv_url是跟ad.plugin.Rcv2这个插件绑定的，但是
    // SIVA里面只需要替换*_rcv_url，不想发送请求，否则有可能计费2次。
    // 所以我们只针对/adrc.php?t=格式的地址去处理
    if (href && me._RCV_PATTERN.test(href)
        || rcvUrl && me._RCV_PATTERN.test(rcvUrl)
        || linkName && (!me._SIVA_PATTERN.test(href || rcvUrl || ''))
    ) {
        var innerText = ad.string.trim(
            anchor.innerHTML.replace(/<[^>]+>/g, '').replace(/\r|\n/g, ' ').replace(/&nbsp;/g, ' ')
        );
        var params = {};
        // linkId用于业务端查询原始链接
        var linkId = me.getLinkId(href);
        if (!linkId && rcvUrl) {
            linkId = me.getLinkId(rcvUrl);
        }
        if (linkId) {
            params['linkId'] = linkId;
        }
        if (linkName) {
            params['linkName'] = linkName;
        }
        if (innerText) {
            // 截取一下，不能太长
            params['linkText'] = linkText || baidu.string.subByte(innerText, 32);
        }
        // 对于非rcv链接，需要将链接地址发给监控端
        if (href && !params['linkId']) {
            params['href'] = href;
        }

        // 遍历所有属性，找到如"data-extra-*"的属性，将其一同发送
        // （如果和上面的参数有重名，将会覆盖）
        var attributes = anchor.attributes;
        var extraPattern = /data-extra-([\w]+(?:-\w+)*)/;
        for (var i = 0, j = attributes.length; i < j; i++) {
            var attr = attributes.item(i);
            var match = extraPattern.exec(attr.nodeName);
            if (match && match[1]) {
                // 转为camel case格式
                var key;
                /* jshint ignore:start */
                key = match[1].replace(/-([a-z])/g, function(g) {
                    return g[1].toUpperCase();
                });
                /* jshint ignore:end */
                params[key] = attr.nodeValue;
            }
        }

        // XPATH
        params['xp'] = ad.dom.getXPath(anchor);

        return params;
    }
    else {
        return null;
    }
};

/**
 * 根据url获取linkId
 * @param {string} url rcv加密链接
 */
ad.service.RCV2Service.prototype.getLinkId = function(url) {
    var me = this;
    if (!url || !me._links || !me._rtConfig) {
        return null;
    }
    if (/^http:\/\/www.baidu.com\/ulink\?url=/.test(url)) {
        var ourl = baidu.url.getQueryValue(url, 'url');
        if (ourl) {
            try {
                url = decodeURIComponent(ourl);
            }
            catch (e) {}
        }
    }
    var linkIds = me._rtConfig['LINK_IDS'];
    for (var i = 0, l = me._links.length; i < l; i++) {
        var link = me._links[i];
        if (url.indexOf(link) === 0) {
            return linkIds[i];
        }
    }
};

/**
 * 监听是否是RCV链接的点击，如果是，则发送相应字段
 * @param {Node} root 可选根节点.
 * @expose
 */
ad.service.RCV2Service.prototype.attachTo = function(root) {
    if (!root) {
        return;
    }
    var me = this;

    ad.dom.on(root, 'click', function(event) {
        event = event || window['event'];
        var target = event.srcElement || event.target;

        var anchor = me.findNearestTag(target, 'a');
        if (anchor) {
            var params = me.getParams(anchor);
            if (params) {
                me.sendLog(params);
                var href = anchor.href;
                if (href
                    && (href.indexOf('javascript:') !== 0)    // jshint ignore:line
                    && anchor.target.toLowerCase() !== '_blank') {
                    // 非新窗口打开延迟跳转
                    // 其实除了'_self', '_parent', '_top', ''外如果没有对应name的frame/iframe，
                    // 都会新窗口打开，但我们不应该用未定义的值做target
                    me.redirect(anchor.href, me._config.logTimeout);

                    baidu.event.stop(event);
                }
            }
        }
    });
};

/**
 * 根据参数发送RCV2的日志
 * @param {Object} params 需要发送的参数.
 * @param {Element=} opt_element 点击的节点.
 * @param {boolean=} opt_is_charge 该统计是否需要计费.
 */
ad.service.RCV2Service.prototype.sendLog = function(params, opt_element, opt_is_charge) {
    var me = this;

    if (!me._links || !me._rtConfig) {
        return false;
    }

    params = params || {};

    // 附上此service的额外参数
    baidu.extend(params, me._config.extraParams);

    if (opt_element && !params['xp']) {
        params['xp'] = ad.dom.getXPath(opt_element);
    }

    // templateId
    if (me._rtConfig['timestamp']) {
        params['tid'] = me._rtConfig['timestamp'];
    }

    // 流量来源
    var source = me.getSource();
    if (source) {
        params['source'] = source;
    }

    var logUrl = '';
    for (var p in params) {
        logUrl += '&' + p + '=' + encodeURIComponent(params[p]);
    }
    logUrl = logUrl.substring(1);

    var rcv2Url = (opt_is_charge ? me._rtConfig['RCV2_URL2'] : me._rtConfig['RCV2_URL']);
    if (!rcv2Url) {
        return;
    }
    // https的环境下，修改一下域名.
    rcv2Url = ad.url.normalize(rcv2Url);
    logUrl = rcv2Url + '&attach=' + encodeURIComponent(logUrl);

    // 采用app.log.send解决IE下image需要挂在window下的问题
    app.log.send(logUrl);
};


/**
 * 延迟跳转到新地址
 * @param {string} href 需要跳转到的新地址.
 * @param {number} timeout 延迟毫秒数.
 */
ad.service.RCV2Service.prototype.redirect = function(href, timeout) {
    var gate = document.createElement('a');
    gate.href = href;
    gate.style.display = 'none';
    document.body.appendChild(gate);

    ad.base.setTimeout(function() {
        gate.click();
    }, timeout);
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
