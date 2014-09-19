/*
 * coup-web
 * Copyright 2011 Baidu Inc. All rights reserved.
 *
 * path:    Requester.js
 * desc:    请求发送器
 * author:  zhaolei,erik
 * date:    $Date: 2011-03-28 18:40:17 +0800 (星期一, 28 三月 2011) $
 */
goog.require('er.context');
goog.require('jn.ui.loading');
goog.require('ui.Dialog.alert');
goog.require('app.traceback');

goog.provide('Requester');

/**
 * 请求发送器
 */
var Requester = (function() {
    var DEFAULT_SERVER_ERROR = {
        'success': 'false',
        'message': {
            'global': '服务器错误'
        }
    };

    /**
     * 获取success的回调函数
     *
     * @private
     * @param {XMLHttpRequest} xhr xhr对象.
     * @param {function(Object)} onsuccess 自定义回调行为.
     * @param {function(Object)=} opt_onfailure 自定义的数据解析函数.
     * @param {string=} opt_url 请求的地址，数据解析出错的时候用来提示.
     */
    function responseHandler(xhr, onsuccess, opt_onfailure, opt_url) {
        var data,
            message,
            errorTitle,
            errorWord,
            msgOkClick,
            onfailure = opt_onfailure || baidu.fn.blank;

        jn.ui.loading.hide();
        try {
            data = baidu.json.parse(xhr.responseText);
        } catch (e) {
            //TODO: delete the following code, it is only used to debug.
            var detail = [
                '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="baidu.show(baidu.dom.query(\'textarea\', this.parentNode)[0])">详细&gt;&gt;</a>',
                '<div>',
                    '<textarea style="width:270px;height:100px;display:none;font-size:12px;" readonly="readonly">',
                        ('URL:' + (opt_url || 'unknown') + '\n'),
                        xhr.responseText,
                    '</textarea>',
                '</div>'
            ].join('');

            // 提示错误
            ui.Dialog.alert({
                title: '数据解析出错',
                content: '数据解析出错' + detail,//TODO: delete " + detail" too
                onok: msgOkClick
            });
            app.traceback(e, ['JsonParseError: request url -> ' + (opt_url || 'unknown')].join('\n'));
            onfailure(DEFAULT_SERVER_ERROR);
            return;
        }

        if (typeof data == 'object') {
            if (data['success'] != 'true') {
                // 全局错误信息
                message = data['message'];

                // 判断错误类型
                if (message.global) {
                    errorTitle = '系统提示';
                    errorWord = message.global;
                } else if (message.noSession) {
                    errorTitle = '系统超时';
                    errorWord = message.noSession;
                    msgOkClick = gotoIndex;
                } else if (typeof message.redirect != 'undefined') {//重定向
                    storeCookie();
                    if (message.redirect == '') {
                        errorTitle = '登录超时';
                        errorWord = '登录超时，请重新登录！';
                        msgOkClick = function() {
                            window.location.reload(true);
                        };
                    }else {
                        window.location.href = message.redirect;
                        return;
                    }
                } else if (!message.field) {
                    errorTitle = '系统提示';
                    errorWord = '请求失败(未知错误)';
                } else {
                    onsuccess(data);
                    return;
                }

                // 提示错误
                ui.Dialog.alert({
                    title: errorTitle,
                    content: errorWord,
                    onok: msgOkClick
                });
                onfailure(data);
            } else {
                // 成功回调
                message = data['message'];

                // 判断错误类型
                if (message.global) {
                    errorTitle = '系统提示';
                    errorWord = message.global;

                    // 提示错误
                    ui.Dialog.alert({
                        title: errorTitle,
                        content: errorWord
                    });
                }

                onsuccess(data);
            }
        }
    }

    /**
     * 记录当前hash到cookie中
     *
     * @private
     */
    function storeCookie() {
        var visitor = '',
            adOwner = '';
        try {
            visitor = er.context.get('visitor')['name'];
            adOwner = er.context.get('adOwner') ? er.context.get('adOwner')['name'] : '';
        }catch (e) {}

        baidu.cookie.set('LAST_PAGE', window.location.href);
        baidu.cookie.set('LAST_VISITOR', visitor);
        baidu.cookie.set('LAST_ADOWNER', adOwner);
    }

    function getAdOwnerParam() {
        var adOwner = er.context.get('adOwner');
        return !!adOwner ? 'aderId=' + adOwner['id'] : '';
    }

    /**
     * 返回登录页
     *
     * @private
     */
    function gotoIndex() {
        var aderParam = getAdOwnerParam();
        storeCookie();
        document.location.href = '/index.html' + (aderParam != '' ? '?' : '') + aderParam;
    }

    /**
     * @lends Requester
     */
    return {
        /**
         * 发送登陆用户的post请求
         *
         * @param {string} url 请求url.
         * @param {string} params 发送参数.
         * @param {function(Object)} onsuccess 请求成功的回调函数.
         * @param {function(Object)=} onfailure 请求失败的回掉函数.
         * @param {{dontRetry:boolean}=} opt_options 其他的参数
         */
        post: function(url, params, onsuccess, onfailure, opt_options) {
            var hasQ = /\?/.test(url),
                aderParam = getAdOwnerParam(),
                realURL = url + (aderParam != '' ? (hasQ ? '&' : '?') + aderParam : ''),
                dontRetry = false,
                dataPaser = null,
                customFailHandler = onfailure || baidu.fn.blank,
                defaultFailHandler;

            if (opt_options) {
                dontRetry = !!opt_options['dontRetry'];
            }

            if (!dontRetry) {
                defaultFailHandler = function() {
                    jn.ui.loading.hide();
                    Requester.post(url, params, onsuccess, onfailure, {
                      'dontRetry' : true
                    });
                };
            } else {
                defaultFailHandler = function() {
                    jn.ui.loading.hide();
                    ui.Dialog.alert({
                        title: '请求失败',
                        content: '请求失败，请稍后再试'
                    });
                };
            }


            if (!params || -1 == params.indexOf(".ui-loading=0")) {
                jn.ui.loading.show();    
            }

            baidu.ajax.request(realURL, {
                'timeout' : 60000,  // 60s
                'method' : 'post',
                'data' : params,
                'onsuccess' : function(xhr) {
                    responseHandler(xhr, onsuccess,
                        /** @type {function(Object)}*/ (customFailHandler));
                },
                'onfailure' : function(xhr) {
                    defaultFailHandler();
                    customFailHandler(DEFAULT_SERVER_ERROR);
                },
                'ontimeout' : function(xhr) {
                    jn.ui.loading.hide();
                    // 防止请求在timeout后返回带来副作用
                    xhr.onreadystatechange = baidu.fn.blank;
                    ui.Dialog.alert({
                        title: '请求超时',
                        content: '请求超时(' + realURL + ')，请重试'
                    });
                },
                'headers' : {'X-Request-By' : 'ERApplication'}
            });
        },

        get: function(url, params, onsuccess) {
            var hasQ = /\?/.test(url),
                aderParam = getAdOwnerParam();
            url = url + (aderParam != '' ? (hasQ ? '&' : '?') + aderParam : '');
            baidu.ajax.request(url, {
                'method' : 'get',
                'data' : params,
                'onsuccess' : function(xhr) {
                    responseHandler(xhr, onsuccess);
                },
                'headers' : {'X-Request-By' : 'ERApplication'}
            });
        },

        /**
         * 获取广告主id参数
         * @return {string}
         */
        getAdOwnerParam : function() {
            return getAdOwnerParam();
        }
    };
})();
