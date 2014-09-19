/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: coca_pincode.js 10927 2012-08-05 07:35:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/coca_pincode.js ~ 2013/01/24 21:08:37
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * button相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/coca_pincode.less');
goog.include('ad/widget/coca_pincode.html');

goog.provide('ad.widget.CocaPincode');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.CocaPincode = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_coca_pincode';
};
baidu.inherits(ad.widget.CocaPincode, ad.widget.Widget);

/** @override */
ad.widget.CocaPincode.prototype.patchData = function() {
    var me = this;
    if(me._data) {
        me._data['submitbtn'] = me._data['submitbtn'] ? me._data['submitbtn'] : '查看中奖';
        me._data['pincode_value'] = '请输入促销瓶盖内所印13位字符';
    }
};

/** 
 *@public 
 * 重置表单
 */
ad.widget.CocaPincode.prototype.reset = function() {
    var me = this;
    var pincode = baidu.g(me.getId('pincode'));
    pincode.value = me._data['pincode_value'];
    baidu.dom.setAttr(me.getId('submitbtn-link'), 'href', '');
};
/** @override */
ad.widget.CocaPincode.prototype.bindEvent = function() {
    var me = this;
    baidu.on(me.getId('pincode'), 'focus', function() {
        baidu.dom.addClass(me.getId('pincode-error'), 'ec-hide');
        var pincode = baidu.g(me.getId('pincode'));
        var value = ad.string.trim(pincode.value);
        if(value === me._data['pincode_value']) {
            pincode.value = '';
            baidu.removeClass(pincode, 'ec-default');
        }
    });
    baidu.on(me.getId('pincode'), 'blur', function() {
        var pincode = baidu.g(me.getId('pincode'));
        var value = ad.string.trim(pincode.value);
        if(value === '') {
            pincode.value = me._data['pincode_value'];
            baidu.addClass(pincode, 'ec-default');
        }
        var formAction = me._data['form_action'] + '?pincode=' + value;
        var actionUrl = 'https://base.yixun.com/login.html?url=' + encodeURIComponent(formAction);
        baidu.dom.setAttr(me.getId('submitbtn-link'), 'href', actionUrl);
    });
    baidu.on(me.getId('submitbtn-link'), 'click', function(e) {
        var pincode = ad.string.trim(baidu.g(me.getId('pincode')).value);
        var pincodeError = baidu.g(me.getId('pincode-error'));
        var errorflag = false;

        if(!errorflag){
            if(!pincode || pincode === me._data['pincode_value']){
                errorflag = true;
                pincodeError.innerHTML = '请填写13位pincode字符';
                baidu.dom.removeClass(pincodeError, 'ec-hide');
            }
            else if(!/^([0-9a-z]{13})$/ig.test(pincode)){
                errorflag = true;
                pincodeError.innerHTML = '请正确填写13位pincode字符';
                baidu.dom.removeClass(pincodeError, 'ec-hide');
            }
        }
        if(errorflag){
            baidu.event.preventDefault(e);
        }
        else {
            this._timerId = ad.base.setTimeout(function() {
                me.reset();
            }, 50);
        }
    });
};

/** @override */
ad.widget.CocaPincode.prototype.dispose = function() {
    if (this._timerId) {
        ad.base.clearTimeout(this._timerId);
        this._timerId = 0;
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
