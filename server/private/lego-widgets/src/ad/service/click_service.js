/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: click_service.js 11362 2012-08-28 08:31:18Z songao $
 *
 **************************************************************************/



/**
 * src/ad/service/click_service.js ~ 2012/06/18 16:47:40
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 11362 $
 * @description
 * 1. 人工制作的品专物料点击监控的服务
 * 2. 模板工具也有一套，功能基本类似
 * @see https://svn.baidu.com/app/ecom/adcoup/branches/jn-core/jn-core_2-0-0_BRANCH/src/main/resources/htmlMaker/resource/pl_landmark.js
 **/
goog.require('ad.dom');
goog.require('ad.service.Service');

goog.provide('ad.service.ClickService');

/**
 * @constructor
 * @param {string=} opt_product 产品线的类型.
 * @param {string=} opt_rsvPart 点击的区域类型(品专，知道，百科等等，这个事先需要跟UBS的同学约定).
 * @extends {ad.service.Service}
 */
ad.service.ClickService = function(opt_product, opt_rsvPart) {
    ad.service.Service.call(this);

    /**
     * 产品的类型，例如pl, lm
     * @type {string}
     * @private
     */
    this._product = opt_product || 'pl';

    /**
     * 是否已经绑定过了mousedown事件.
     * @private
     * @type {boolean}
     */
    this._eventBounded = false;

    /**
     * @type {string|undefined}
     * @private
     */
    this._rsvPart = opt_rsvPart;

    /**
     * 子链接索引
     * @private
     * @type {number}
     */
    this.p2 = 1;
};
baidu.inherits(ad.service.ClickService, ad.service.Service);

/**
 * @param {Node} target 链接地址.
 * @private
 */
ad.service.ClickService.prototype._analyzeAnchor = function(target) {
    if (target.nodeName != 'A') {
        if (target.parentNode.nodeName == 'A') {
            target = target.parentNode;
        }else if (target.parentNode &&
                 target.parentNode.parentNode &&
                 target.parentNode.parentNode.nodeName == 'A') {
            // <a><font><em>飘红词语</em></font></a>
            target = target.parentNode.parentNode;
        } else {
            if (!(target.nodeName == 'INPUT' &&
                 (target.type.toLowerCase() == 'checkbox' ||
                  target.type.toLowerCase() == 'radio'))) {
                return;
            }
        }
    }

    if (target.innerHTML == '品牌推广') return;

    // 有些链接是物料展现之后生成的，比如多TAB面板里的链接，需要补充一下统计信息
    this.fixTarget(target);

    var params = {
        'fm': target.getAttribute('data-fm'),
        'p1': 1,
        'p5': 1, // UBS: p5除了在左侧知心和自然结果区域统一计数外，在其他区域与p1一致
        'url': target.getAttribute('data-url'),
        'rsv_tpl': 'se_com_default', // UBS: 点击结果使用的模板名，我们广告没有，使用默认值
        'rsv_srcid': '999999' // UBS: 阿拉丁资源位ID，我们广告没有，使用一个假的六位数字代替
    };
    if (this._rsvPart) {
        params['rsv_part'] = this._rsvPart;
    }
    if (target.getAttribute('data-p2')) {
        params['p2'] = target.getAttribute('data-p2');
    }
    if (target.getAttribute('data-title1')) {
        params['title'] = decodeURIComponent(target.getAttribute('data-title1'));
    }
    if (target.getAttribute('data-mu')) {
        params['mu'] = target.getAttribute('data-mu');
    }
    this.searchExtraParams(target, params);

    if (params['rsv_part']) {
        params['rsv_xpath'] = ad.dom.getXPath(target);
    }

    if (typeof window['c'] === 'function') {
        window['c'](params);
    }
};

/**
 * 往指定链接上补充统计信息
 * @param {Node} link 目标元素
 */
ad.service.ClickService.prototype.fixTarget = function(link) {
    // 检测链接是否设置过ubs信息
    if (link.getAttribute('data-fm')) {
        return;
    }

    link.setAttribute('data-fm', this._product);
    link.setAttribute('data-url', link.getAttribute('ourl') || link.href);

    if (link !== this.mainAnchor) {
        link.setAttribute('data-p2', this.p2++);
        if (typeof this.mainText != 'undefined') {
            link.setAttribute('data-title1', this.mainText);
        }
        if (typeof this.mainUrl != 'undefined') {
            link.setAttribute('data-mu', this.mainUrl);
        }
    }
};

/**
 * 遍历父节点获取额外参数
 * @param {Node} target 目标元素
 * @param {Object} params 已搜集的参数
 *
 * <div data-ubs-config="{'rsv_part':1}"></div>
 */
ad.service.ClickService.prototype.searchExtraParams = function(target, params) {
    while(target && target.getAttribute) {
        var config = target.getAttribute('data-ubs-config');
        if (config) {
            try {
                var conf = baidu.json.parse(config);
                for (var key in conf) {
                    if (typeof params[key] == 'undefined') {
                        params[key] = conf[key];
                    }
                }
            }
            catch(e) {}
        }
        target = target.parentNode;
    }
};

/**
 * @override
 * @param {string} parameters AD参数.
 * @param {string=} opt_mainUrl 主链接参数.
 */
ad.service.ClickService.prototype.init = function(parameters, opt_mainUrl) {
    var canvas = baidu.g(parameters);
    if (!canvas) {
        return;
    }

    var links = canvas.getElementsByTagName('A');

    // 分链接的位置，对于pl广告来说，p2要随着链接递增，
    // p1的值永远都是1
    var mainText;
    var mainUrl = opt_mainUrl || "";
    this.mainAnchor = links.length > 0 ? links[0] : null;
    // find main url
    for (var i = 0, l = links.length; i < l; i++) {
        if (links[i].getAttribute('data-is-main-url') === 'true') {
            this.mainAnchor = links[i];
            break;
        }
    }
    if (mainUrl && this.mainAnchor) {
        this.mainAnchor.setAttribute('ourl', mainUrl);
    }

    // record main url's information
    if (this.mainAnchor) {
        if (this.mainAnchor.innerHTML) {
            mainText = encodeURIComponent(this.mainAnchor.innerHTML);
            this.mainAnchor.setAttribute('data-title1', mainText);
        }
        if (this.mainAnchor.getAttribute('ourl') || this.mainAnchor.href) {
            // ourl为了跟品专和地标保持一直
            mainUrl = this.mainAnchor.getAttribute('ourl') || this.mainAnchor.href;
        }
    }
    this.mainUrl = mainUrl;
    this.mainText = mainText;

    for (var i = 0, link = null; link = links[i]; i++) {
        link.setAttribute('data-fm', this._product);
        link.setAttribute('data-url', link.getAttribute('ourl') || link.href);

        if (link !== this.mainAnchor) {
            link.setAttribute('data-p2', this.p2++);
            if (typeof mainText != 'undefined') {
                link.setAttribute('data-title1', mainText);
            }
            if (typeof mainUrl != 'undefined') {
                link.setAttribute('data-mu', mainUrl);
            }
        }
        /* 不需要设置默认的title2属性
        if (!link.getAttribute('title2')) {
            // 这里不用data-title2，因为ClickMonkey里面用了title2的属性
            // title2属性不需要encodeURIComponent，ClickMonkey里面已经做了处理
            link.setAttribute('title2', (decodeURIComponent(mainText || '')));
        }*/
    }

    var me = this;
    if (!me._eventBounded) {
        ad.dom.on(canvas, 'mousedown', function(opt_evt) {
            var evt = opt_evt || window.event;
            var target = evt.srcElement || evt.target;
            if (!target || target.nodeType != 1) {
                return;
            }

            me._analyzeAnchor(target);
        });
        me._eventBounded = true;
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
