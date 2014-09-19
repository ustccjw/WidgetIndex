/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: email.js 9923 2012-06-28 10:25:19Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/email.js ~ 2012/06/15 13:01:14
 * @author loutongbing
 * @version $Revision: 9923 $
 * @description
 * 搜索框的组件
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');
goog.require('ui.events');

goog.include('ad/widget/email.html');
goog.include('ad/widget/email.less');

goog.provide('ad.widget.Email');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Email = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_email';
};
baidu.inherits(ad.widget.Email, ad.widget.Widget);

/** @private */
ad.widget.Email.prototype.reset = function() {
    var username = baidu.g(this.getId('username'));
    var password = baidu.g(this.getId('password'));
    var url = baidu.g(this.getId('url'));
    var form = baidu.g(this.getId('form'));
    username.value = '';
    password.value = '';
    url.value = '';
    form.reset();
};

/** @override */
ad.widget.Email.prototype.bindEvent = function() {
    ad.widget.Email.superClass.bindEvent.call(this);

    var me = this;
    baidu.on(me.getId('submit-button'), 'click', function() {
        me.sendLog('邮箱登陆', 'mail');
        me.trigger(ui.events.BEFORE_SUBMIT);
        var username = baidu.g(me.getId('username'));
        var password = baidu.g(me.getId('password'));
        var userName = baidu.g(me.getId('user-name'));
        var select = baidu.g(me.getId('mail-type'));
        var url = baidu.g(me.getId('url'));
        var passWord2 = baidu.g(me.getId('pass-word'));
        if(!ad.string.trim(userName.value) ||
           !ad.string.trim(passWord2.value)) {
            return false;
        }
        else {
            username.value = userName.value + '@' + select.options[select.selectedIndex].innerHTML;
            url.value = select.options[select.selectedIndex].value;
            password.value = passWord2.value;
            baidu.g(me.getId('form')).submit();
            me.reset();
        }
        return false;
    });
};

















/* vim: set ts=4 sw=4 sts=4 tw=100: */
