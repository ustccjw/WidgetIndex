/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao/micro_brand.js ~ 2012/11/29 16:13:22
 * @author wangdawei04@baidu.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * micro_brand相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao/micro_brand.less');
goog.include('ad/widget/zhidao/micro_brand.html');

goog.provide('ad.widget.zhidao.MicroBrand');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao.MicroBrand = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_micro_brand';
};
baidu.inherits(ad.widget.zhidao.MicroBrand, ad.widget.Widget);

/** @override */
ad.widget.zhidao.MicroBrand.prototype.enterDocument = function() {
    ad.widget.zhidao.MicroBrand.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.zhidao.MicroBrand.prototype.bindEvent = function() {
    var me = this;
    ad.widget.zhidao.MicroBrand.superClass.bindEvent.call(this);

    if (window['IS_PREVIEW']) {
        var form = baidu.g(me.getId('form'));
        var textarea = baidu.g(me.getId('mock'));
        baidu.on(me.getId('questions'), 'click', function(e) {
            e = e || window.event;
            var target = baidu.event.getTarget(e);
            if (target && target.nodeType === 1 && target.nodeName === 'A') {
                if (baidu.dom.hasClass(target, 'question-text')) {
                    var index = baidu.dom.getAttr(target, 'data-index');
                    var data = me._data;
                    var qa = data['options'][parseInt(index, 10) - 1];
                    var mockData = {
                        "q": {
                            "logo": "http://bs.baidu.com/adtest/e86b5adbbfd7e6200741f160df6a19a8.PNG",
                            "text": qa['title']
                        },
                        "a": {
                            "logo": data['replier_logo'],
                            "name": data['replier_name'],
                            "text": qa['answer']
                        },
                        "url": data['background_site']
                    };
                    textarea.value = baidu.json.stringify(mockData);

                    form.action = 'http://wbapi.baidu.com/service/util/intermediate?mcid=1&url=' + encodeURIComponent(data['background_site']);
                    form.submit();
                    baidu.event.stop(e);
                }
            }
        });
    }
    else {
        // 'data-rcv-url'的说明：
        // 由于中间页地址里要携带其他的rcv加密连接，所以问答连接里的地址本身不能加密
        // 但又需要发监控请求，所以由一个额外的对中间页前面一部分进行加密的链接来做为rcv监控地址，用
        // js来发送
        baidu.on(me.getId('questions'), 'click', function(e) {
            e = e || window.event;
            var target = baidu.event.getTarget(e);
            if (target && target.nodeType == 1) {
                if (baidu.dom.hasClass(target, 'question-text')) {
                    var rcvUrl = baidu.dom.getAttr(target, 'data-rcv-url');
                    if (rcvUrl) {
                        baidu.sio.log(rcvUrl);
                    }
                }
            }
        });
    }
};

/** @override */
ad.widget.zhidao.MicroBrand.prototype.patchData = function() {
    // 是否是线下测试环境：只有线下测试环境才有端口
    var isPreview = !!window.location.port && window.location.port != 80;
    var rtConfig = (typeof RT_CONFIG == 'undefined') ? null : RT_CONFIG;
    var rcv2Param = '';
    if (rtConfig && rtConfig['RCV2_URL']) {
        rcv2Param = '&rcv2=' + encodeURIComponent(rtConfig['RCV2_URL']);
    }

    var options = this.getData('options');
    if (options) {
        for (var i = 0; i < options.length; i++) {
            options[i]['intermediate_params'] = (/\?/.test(options[i]['intermediate_url']) ? '&': '?')
                                                + (isPreview ? 'ispreview=true&' : '')
                                                + 'url=' + encodeURIComponent(options[i]['background_site_rcv_url'])
                                                + rcv2Param;
        }
    }

    var showUrl = this.getData('site');
    if (showUrl) {
        // 去除protocol
        this._data['site'] = showUrl.replace(/^[A-Za-z]{3,9}:(\/\/)?/g, '');
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
