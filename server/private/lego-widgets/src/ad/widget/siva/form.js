/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/form.js ~ 2013/09/21 10:17:33
 * @author yangfan12@baidu.com (yangfan12)
 * @version $Revision: 150523 $
 * @description
 * form相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/form.less');
goog.include('ad/widget/siva/form.html');

goog.provide('ad.widget.siva.Form');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.Form = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_form';
};
baidu.inherits(ad.widget.siva.Form, ad.widget.Widget);

/** @override */
ad.widget.siva.Form.prototype.enterDocument = function() {
    ad.widget.siva.Form.superClass.enterDocument.call(this);

    var form = baidu.g(this.getId('form'));
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; ++i) {
        this.emptyNotice(inputs[i]);
    }
};

/** @override */
ad.widget.siva.Form.prototype.bindEvent = function() {
    ad.widget.siva.Form.superClass.bindEvent.call(this);
    var me = this;
    var submitBtn = baidu.g(this.getId('submit'));
    baidu.event.on(submitBtn, 'click', function(e) {
        e = new baidu.event.EventArg(e);
        e.preventDefault();
        me.submit();
    });

    /* jshint ignore:start */
    var form = baidu.g(this.getId('form'));
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; ++i) {
        baidu.event.on(inputs[i], 'focus', function(e) {
            e = new baidu.event.EventArg(e);
            me.focusInput(e.target);
        });
    }
    for (var i = 0; i < inputs.length; ++i) {
        baidu.event.on(inputs[i], 'blur', function(e) {
            e = new baidu.event.EventArg(e);
            me.blurInput(e.target);
        });
    }
    /* jshint ignore:end */
};

/**
 * Validate the form and submit it.
 */
ad.widget.siva.Form.prototype.submit = function() {
    if (this.validate()) {
        this.success();
    }
};

/**
 * Vaildate a single filed by its type.
 * @param {Node} $input Input dom node.
 * @return {boolean} True for valid.
 */
ad.widget.siva.Form.prototype.validateField = function($input) {
    var type = baidu.dom.getAttr($input, 'data-type'); 
    var name = ad.string.trim(baidu.dom.getAttr($input, 'data-name') || '');
    var errorMsg = '请输入正确的' + name;
    var infoMsg = '请输入您的' + name;
    var value = ad.string.trim($input.value);
    var succeed = true;
    var empty = false;

    if ($input.value === infoMsg) {
        empty = true;
    }

    if ('text' === type) {
        succeed = !empty && value.length > 0;
    }
    else if ('email' === type) {
        succeed = !!value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
    }
    else if ('tel' === type) {
        succeed = !!value.match(
            /(^(1([3458][0-9]))\d{8}$)|(^010[2-8]\d{7}$)|(^02\d[2-8]\d{7}$)|(0[3-9]\d{2}[2-8]\d{6,7})/);
    }
    if (!succeed) {
        if ($input.value === '' || $input.value === infoMsg) {
            $input.value = infoMsg;
        }
        else {
            $input.value = errorMsg;
        }
        baidu.dom.addClass($input, 'ad-widget-siva-form-error');
    }
    return succeed;
};

/**
 * Validate all input fields.
 * @return {boolean} Whether all fileds are valid.
 */
ad.widget.siva.Form.prototype.validate = function() {
    var form = baidu.g(this.getId('form'));
    var inputs = form.getElementsByTagName('input');
    var succeed = true;
    for (var i = 0; i < inputs.length; ++i) {
        if (!this.validateField(inputs[i])) {
            succeed = false;
        }
    }
    return succeed;
};

/**
 * Do sth when success.
 */
ad.widget.siva.Form.prototype.success = function() {
    var container = baidu.g(this.getId());
    this.sendFormInfo();
    this.charge();
    baidu.dom.addClass(container, 'ad-widget-siva-form-success');
};

/**
 * Do sth when some field focused.
 * @param {Node} $input Focus dom.
 */
ad.widget.siva.Form.prototype.focusInput = function($input) {
    var name = ad.string.trim(baidu.dom.getAttr($input, 'data-name') || '');
    var errorMsg = '请输入正确的' + name;
    var infoMsg = '请输入您的' + name;
    var value = ad.string.trim($input.value);
    if (value === infoMsg || value === errorMsg) {
        $input.value = '';
        baidu.dom.removeClass($input, 'ad-widget-siva-form-error');
        baidu.dom.removeClass($input, 'ad-widget-siva-form-placeholder');
    }
};

/**
 * Do sth when some field blur.
 * @param {Node} $input Blur dom.
 */
ad.widget.siva.Form.prototype.blurInput = function($input) {
    this.emptyNotice($input);
};

/**
 * Notice a field is empyt.
 * @param {Node} $input An input dom node.
 */
ad.widget.siva.Form.prototype.emptyNotice = function($input) {
    if (ad.string.trim($input.value) === '') {
        var name = ad.string.trim(baidu.dom.getAttr($input, 'data-name')||''),
            infoMsg = '请输入您的' + name;
        $input.value = infoMsg;
        baidu.dom.addClass($input, 'ad-widget-siva-form-placeholder');
    }
};

/**
 * Charge when  submit succeed.
 */
ad.widget.siva.Form.prototype.charge = function() {
    var submitBtn = baidu.g(this.getId('submit')),
        url = baidu.dom.getAttr(submitBtn, 'href');
    baidu.sio.log( url );
};

/**
 * Send form log to fclick.baidu.com.
 */
ad.widget.siva.Form.prototype.sendFormInfo = function() {
    var form = baidu.g(this.getId('form'));
    var inputs = form.getElementsByTagName('input');
    var input;
    var url = RT_CONFIG.HOST('bzclk.baidu.com') + '/siva.php?';
    var data = {
        'tag': 'siva-form-submit',
        'qid': ad.base.getObjectByName('bds.comm.qid') || 'noqid',
        'adid': ad.base.getObjectByName('bds.ecom.siva.adid') || 'noadid'
    };

    for (var i = 0; i < inputs.length; ++i) {
        input = inputs[i];
        data['name' + i] = baidu.dom.getAttr(input, 'data-name');
        data['value' + i] = input.value;
    }
    url += baidu.url.jsonToQuery(data);
    baidu.sio.log(url);
};
/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
