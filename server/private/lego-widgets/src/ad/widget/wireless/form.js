/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: form.js 13834 2012-11-03 06:31:22Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/form.js ~ 2012/06/07 22:07:55
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 13834 $
 * @description
 * 苏宁易购的头部效果
 **/
goog.require('ad.string');
goog.require('ad.crypt.base64');
goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/form.html');
goog.include('ad/widget/wireless/form.less');

goog.provide('ad.widget.wireless.Form');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.Form = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_wireless_form';
};
baidu.inherits(ad.widget.wireless.Form, ad.widget.Widget);

/**
 * @override
 */
ad.widget.wireless.Form.prototype.patchData = function() {
    if(this._data && !this._data['submit_btn_text']){
        this._data['submit_btn_text'] = '立即提交';
    }
};

/**
 * 验证表单元素
 * @return {boolean} 验证结果
 */
ad.widget.wireless.Form.prototype.validateForm = function() {
    var me = this;
    var defaultName = '您的姓名';
    var mobile = ad.string.trim(baidu.g(me.getId('mobile')).value);
    var name = ad.string.trim(baidu.g(me.getId('name')).value);
    var rtn = true;

    function checkChinese(clientName) {
        var rtn = true;
        for (var i = 0; i < clientName.length; i++) {
            if (!/[\u4E00-\u9FA5]/.test(clientName.charAt(i))) {
                rtn = false;
            }
        }
        return rtn;
    }

    if (name === ''
        || name === defaultName
        || (name.length < 2 || name.length > 4)
        || !checkChinese(name)) {
        rtn = false;
        baidu.addClass('show-error-' + me.getId('name'), 'ec-error-name');
    }
    else {
        baidu.removeClass('show-error-' + me.getId('name'), 'ec-error-name');
    }

    function checkNum() {
        if (mobile.charAt(0) === '1') {
        var telreg1 = new RegExp('^13\\d{9}$'),
            telreg2 = new RegExp('^14[57]\\d{8}$'),
            telreg3 = new RegExp('^15[0-35-9]\\d{8}$'),
            telreg4 = new RegExp('^18[0-9]\\d{8}$');
            if (telreg1.test(mobile)
                || telreg2.test(mobile)
                || telreg3.test(mobile)
                || telreg4.test(mobile)) {
                    return true;
            }
        }
    }

    if (mobile === '' || mobile.charAt(0) !== '1' || !checkNum()) {
        rtn = false;
        baidu.addClass('show-error-' + me.getId('mobile'), 'ec-error-mobile');
    }
    else {
        baidu.removeClass('show-error-' + me.getId('mobile'), 'ec-error-mobile');
    }

    return rtn;
};

ad.widget.wireless.Form.prototype.sendFormData = function() {
    var me = this;
    var mobile = ad.string.trim(baidu.g(me.getId('mobile')).value);
    var name = ad.string.trim(baidu.g(me.getId('name')).value);
    var plid = ad.string.trim(baidu.g(me.getId('form-plid')).value);
    var other = ad.crypt.base64.encode(encodeURIComponent('name=' + name + '&mobile=' + mobile));
    var url = 'http://clkmk.baidu.com/clkmk-rcv/rcv?plid=' + plid +
        '&xp=submit&title=submit&other=' + other + '&r=' + new Date().valueOf();
    baidu.sio.log(url);
};

/**
 * @override
 */
ad.widget.wireless.Form.prototype.bindEvent = function() {
    var me = this;
    var defaultName = '您的姓名';
    var defaultCell = '您的手机号';
    baidu.on(me.getId('name'), 'focus', function(){
        baidu.removeClass('show-error-' + me.getId('name'), 'ec-error-name');
        var value = ad.string.trim(baidu.g(me.getId('name')).value);
        if(value === defaultName) {
            baidu.g(me.getId('name')).value = '';
        }
    });
    baidu.on(me.getId('name'), 'blur', function(){
        var value = ad.string.trim(baidu.g(me.getId('name')).value);
        if(value === '') {
            baidu.g(me.getId('name')).value = defaultName;
        }
    });
    baidu.on(me.getId('mobile'), 'focus', function(){
        baidu.removeClass('show-error-' + me.getId('mobile'), 'ec-error-mobile');
        var value = ad.string.trim(baidu.g(me.getId('mobile')).value);
        if(value === defaultCell) {
            baidu.g(me.getId('mobile')).value = '';
        }
    });
    baidu.on(me.getId('mobile'), 'blur', function(){
        var value = ad.string.trim(baidu.g(me.getId('mobile')).value);
        if(value === '') {
            baidu.g(me.getId('mobile')).value = defaultCell;
        }
    });
    baidu.on(me.getId('submitbtn'), 'click', function(){
        if(me.validateForm()){
            me.sendFormData();
            baidu.addClass(me.getId('form-page'), 'ec-page-hide');
            baidu.removeClass(me.getId('success-page'), 'ec-page-hide');
        }
    });
};









/* vim: set ts=4 sw=4 sts=4 tw=100: */
