/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/zhidao_native/company_leave_message.js ~ 2014/04/16 15:53:34
 * @author songao@baidu.com (songao)
 * @version $Revision: 10927 $
 * @description
 * company_leave_message相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/zhidao_native/company_leave_message.less');
goog.include('ad/widget/zhidao_native/company_leave_message.html');

goog.provide('ad.widget.zhidao_native.CompanyLeaveMessage');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.zhidao_native.CompanyLeaveMessage = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zhidao_native_company_leave_message';

    this.supportPlaceholder = ('placeholder' in document.createElement('input'));
};
baidu.inherits(ad.widget.zhidao_native.CompanyLeaveMessage, ad.widget.Widget);

/** @override */
ad.widget.zhidao_native.CompanyLeaveMessage.prototype.bindEvent = function() {
    ad.widget.zhidao_native.CompanyLeaveMessage.superClass.bindEvent.call(this);

    var me = this;
    var button = baidu.g(this.getId('button'));
    baidu.on(button, 'click', function(e) {
        var data = me.getFormData();

        if (me.validate(data)) {
            me.logData(data);
            me.trigger(ui.events.CLICK, e, me);
        }
        baidu.event.preventDefault(e);
    });

    baidu.each(['name', 'email', 'message'], function(key) {
        var element = baidu.g(me.getId(key));

        me.togglePlaceholder(element, false);
        baidu.on(element, 'focus', function() {
            me.togglePlaceholder(element, true);
        });
        baidu.on(element, 'blur', function() {
            me.togglePlaceholder(element, false);
        });
    });
};

/**
 * 控制placeholder的显示与隐藏
 *
 * @param {HTMLElement} element 控件实例
 * @param {boolean} [focused] 额外指定文本框是否聚集
 */
ad.widget.zhidao_native.CompanyLeaveMessage.prototype.togglePlaceholder = function(element, focused) {
    if (!this.supportPlaceholder) {
        if (typeof focused !== 'boolean') {
            focused = document.activeElement === element;
        }
        var placeholder = baidu.dom.getAttr(element, 'placeholder');
        // 只有没焦点且没值的时候才显示placeholder
        if (!focused && !element.value) {
            if (!baidu.dom.hasClass(element, 'ad-text-virtual')) {
                baidu.dom.addClass(element, 'ad-text-virtual');
            }
            element.value = placeholder;
        }
        else {
            if (baidu.dom.hasClass(element, 'ad-text-virtual')) {
                baidu.dom.removeClass(element, 'ad-text-virtual');

                if (element.value === placeholder) {
                    element.value = '';
                }
            }
        }
    }
};

/**
 * 获取表单数据
 *
 * @return {Object} data
 */
ad.widget.zhidao_native.CompanyLeaveMessage.prototype.getFormData = function() {
    var me = this;
    var data = {};
    baidu.each(['name', 'email', 'message'], function(key) {
        var element = baidu.g(me.getId(key));
        var value = element.value;
        var placeholder = baidu.dom.getAttr(element, 'placeholder');
        if (value === placeholder) {
            value = '';
        }
        data[key] = ad.string.trim(value);
    });

    return data;
};

/**
 * 重置表单数据
 */
ad.widget.zhidao_native.CompanyLeaveMessage.prototype.reset = function() {
    var me = this;
    baidu.each(['name', 'email', 'message'], function(key) {
        var element = baidu.g(me.getId(key));
        element.value = '';
        me.togglePlaceholder(element, false);
    });
};

/**
 * 验证表单数据
 *
 * @param {Object} data
 * @return {boolean}
 */
ad.widget.zhidao_native.CompanyLeaveMessage.prototype.validate = function(data) {
    var errorCtner = baidu.g(this.getId('error'));
    baidu.hide(errorCtner);
    var nameMap = {
        'name': '姓名',
        'email': '邮箱地址',
        'message': '消息'
    };
    var errors = [];
    baidu.each(['name', 'email', 'message'], function(key) {
        if (!data[key]) {
            errors.push(nameMap[key] + '不能为空');
        }
    });
    var email = data['email'];
    if (email.length > 200) {
        errors.push('邮箱地址长度不能超过200字符');
    }
    else if (!/^.+@.+$/.test(email)) {
        errors.push('邮箱格式不正确，请重新填写');
    }
    if (errors.length) {
        errorCtner.innerHTML = '* ' + errors.join('<br />* ');
        baidu.show(errorCtner);
        return false;
    }
    return true;
};

/**
 * 发送clickmonkey的统计请求，用于记录表单数据
 * @param {Object} params 请求参数.
 */
ad.widget.zhidao_native.CompanyLeaveMessage.prototype.logData = function(data) {
    var kw = document.getElementById('kw');
    var params = {
        'r': new Date().valueOf(),
        'q': (window['bdQuery'] || (kw && kw.value) || ''),
        'xp': 'qb-leave-message',
        'plid': this.getData('parent_plid') + '-message',
        'title': 'qb-leave-message',
        'other': baidu.url.jsonToQuery(data, function(value, key) {
            return encodeURIComponent(value);
        })
    };
    var query = baidu.url.jsonToQuery(params, function(value, key) {
        return encodeURIComponent(value);
    });
    baidu.sio.log('http://clkmk.baidu.com/clkmk-rcv/rcv?' + query);

    this.reset();
};

























/* vim: set ts=4 sw=4 sts=4 tw=100: */
