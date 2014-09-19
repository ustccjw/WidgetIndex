/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: submit_xd_service.js 11413 2012-10-08 14:01:22 pengxing$
 *
 **************************************************************************/



/**
 * src/ad/service/submit_xd_service.js ~ 2012/10/08 14:47:40
 * @author pengxing(pengxing@baidu.com)
 * @version $Revision: 11413 $
 * @description
 *
 **/
goog.require('ad.service.Service');

goog.provide('ad.service.SubmitXDService');

/**
 * 提供跨域提交数据，并支持回调函数
 *
 * 服务器端的比较特殊的参数有callback和proxy_html
 *
 * callback => 回调函数名称
 * proxy_html => 跳转文件的地址
 *
 * @constructor
 * @extends {ad.service.Service}
 * @param {string} id 物料id
 * @param {string} proxyHtml 跳转文件的地址
 */
ad.service.SubmitXDService = function(id, proxyHtml) {
    ad.service.Service.call(this);

    /**
     * 物料ID
     * @type {string}
     */
    this.id = id;

    /**
     * 跳转文件的地址
     * @type {string}
     */
    this.proxyHtml = proxyHtml;
};
baidu.inherits(ad.service.SubmitXDService, ad.service.Service);

/** @override */
ad.service.SubmitXDService.prototype.init = function() {
    if ('postMessage' in window) {
        var handleMessage = function(opt_e){
            var e = opt_e || window.event;
            if (e.origin) {
                var data = e.data['data'];
                var method = e.data['method'];
                var callback = /** @type {Function} */(window['bds']['ecom']['callbacks'][method]);
                if (callback) {
                    callback(data);
                }
            }
        };

        if (window.addEventListener) {
            window.addEventListener('message', handleMessage, false);
        } else if (window.attachEvent) {
            window.attachEvent('onmessage', handleMessage);
        }
    }
}

/**
 * 注册回调函数到bds.ecom.callbacks命名空间上
 * @param {string} name 回调函数名
 * @param {string} wrapperId dom节点的id
 * @param {function()} opt_callback 回调函数
 */
ad.service.SubmitXDService.prototype._registerCallback = function(name, wrapperId, opt_callback){
    if(!name || !opt_callback){
        return;
    }

    // 所有的回调函数都挂在bds.ecom.callbacks里面
    var bds = window['bds'] = window['bds'] || {};
    var ecom = bds['ecom'] = bds['ecom'] || {};
    var cbs = ecom['callbacks'] = ecom['callbacks'] || {};

    cbs[name] = function(){
        opt_callback.apply(null, arguments);
        try {
            // 销毁函数
            delete window['bds']['ecom']['callbacks'][name];
        } catch (e) {}

        var wrapper = baidu.g(wrapperId);
        if (wrapper && wrapper.parentNode) {
            wrapper.parentNode.removeChild(wrapper);
        }
    };
};

/**
 * 提交数据
 *
 * @param {string} url 提交数据的url
 * @param {Object} data 需要提交的数据
 * @param {function()} opt_callback 回调函数
 */
ad.service.SubmitXDService.prototype.submit = function(url, data, opt_callback){
    var me = this;
    
    var wrapperId = 'ec_wrapper_' + me.id + '_' + (+new Date()),
        iframeId = 'ec_iframe_' + me.id + '_' + (+new Date()),
        formId = 'ec_form_' + me.id + '_' + (+new Date()),
        funcId = me.id + '_' + (+new Date()),
        html = [
            '<iframe style="display: none" id="' + iframeId + '" name="' + iframeId + '"></iframe>',
            '<form id="' + formId + '" action="' + url + '" method="POST" target="' + iframeId + '" style="display: none">'
        ],
        key, value;

    // 将回调函数名加到参数中，给callback name加上bds.ecom
    data['callback'] = funcId;
    // 将proxy页面的地址添加到参数中
    data['proxy_html'] = me.proxyHtml;

    for(key in data){
        value = data[key];
        html.push('<input name="' + baidu.string.encodeHTML(key) + '" value="' + baidu.string.encodeHTML(value) + '" />');
    }
    html.push('</form>');

    //register callback
    me._registerCallback(funcId, wrapperId, opt_callback);

    var dom = document.createElement('div');
    dom.id = wrapperId;
    dom.innerHTML = html.join('');
    dom.style.display = 'none';
    document.body.appendChild(dom);

    baidu.g(formId).submit();
};
