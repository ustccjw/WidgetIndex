/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao/qb.js ~ 2013/01/23 18:38:28
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * result相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/zhidao/qb.less');
goog.include('ad/widget/zhidao/qb.html');

goog.provide('ad.widget.zhidao.QB');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao.QB = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 检查回呼应用状态url
     * @type {string}
     */
    this._statusUrl = 'http://lxbjs.baidu.com/cb/user/app?';
    /**
     * 获取回呼token url
     * @type {string}
     */
    this._checkUrl = 'http://lxbjs.baidu.com/cb/user/check?';
    /**
     * 发起呼叫url
     * @type {string}
     */
    this._callUrl = 'http://lxbjs.baidu.com/cb/call?';
    /**
     * 发起呼叫的token
     * @type {string}
     */
    this._callToken = '';
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_qb';
};
baidu.inherits(ad.widget.zhidao.QB, ad.widget.Widget);

/** @override */
ad.widget.zhidao.QB.prototype.enterDocument = function() {
    var me = this;
    var statusUrl = me._statusUrl + 'uid=' + me._data['free_call']['uid']
        + '&t=' + new Date().valueOf();
    var checkUrl = me._checkUrl + 'uid=' + me._data['free_call']['uid']
        + '&f=11' + '&t=' + new Date().valueOf();
    baidu.sio.callByServer(statusUrl, function(statusData){
        if(statusData && (statusData['status'] === 0)
            && statusData['data'] && (statusData['data']['cbapp'] === '1')) {
            baidu.sio.callByServer(checkUrl, function(checkData){
                if(checkData && (checkData['status'] === 0)
                    && checkData['data'] && checkData['data']['tk']) {
                    me._callToken = checkData['data']['tk'];
                }
            });

        }
    });
};


/**
 * 手机号验证
 * @param {string} tel 手机号码
 * @return {boolean}
 */
ad.widget.zhidao.QB.prototype.TelValid = function(tel) {
    if(tel) {
        if (tel.charAt(0) === '1') {
            var telreg = new RegExp('^1[3458]\\d{9}$');
            if (!telreg.test(tel)) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (tel.charAt(0) === '0') {
            var phonereg = new RegExp('^0[1-9]\\d{1,2}[_—+-]?\\d{7,8}[_—+-]?\\d{0,5}$');
            if (!phonereg.test(tel)) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

/** @override */
ad.widget.zhidao.QB.prototype.bindEvent = function() {
    var me = this;
    baidu.on(me.getId('mobile'), 'focus', function(){
        baidu.show(me.getId('input-tip'));
        baidu.hide(me.getId('success'));
    });
    baidu.on(me.getId('mobile'), 'blur', function(){
        baidu.hide(me.getId('input-tip'));
    });
    baidu.on(me.getId('close'), 'click', function(){
        baidu.hide(me.getId('success'));
    });
    baidu.on(me.getId('button'), 'mousedown', function(){
        baidu.hide(me.getId('success'));
        var tel = ad.string.trim(baidu.g(me.getId('mobile')).value);
        if(!me.TelValid(tel)){
            me.sendLog('input_invalide', 'input_invalide');
            return false;
        }
        if(me._callToken) {
            var callUrl = me._callUrl + 'uid=' + me._data['free_call']['uid']
                + '&tk=' + me._callToken + '&t=' + new Date().valueOf()
                + '&vtel=' + tel;
            baidu.sio.callByServer(callUrl, function(checkData){
                if(checkData && (checkData['status'] === 0)) {
                    baidu.show(me.getId('success'));
                    me.sendLog('call_success', 'call_success');
                }
                else {
                    me.sendLog('call_fail', 'call_fail');
                }
            });
        }
        else {
            me.sendLog('token_fail', 'token_fail');
        }
    });
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
