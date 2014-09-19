/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/siva/form_v2.js ~ 2013/11/20 11:54:55
 * @author taoxutian@baidu.com (taoxutian)
 * @version $Revision: 150523 $
 * @description
 * form_v2相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/siva/form_v2.less');
goog.include('ad/widget/siva/form_v2.html');

goog.provide('ad.widget.siva.FormV2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.siva.FormV2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_siva_form_v2';
};
baidu.inherits(ad.widget.siva.FormV2, ad.widget.Widget);

/** @override */
ad.widget.siva.FormV2.prototype.enterDocument = function() {
    ad.widget.siva.FormV2.superClass.enterDocument.call(this);
    this.initForm();
};

ad.widget.siva.FormV2.prototype.initForm = function(){
    var form = baidu.g(this.getId('form'));
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; ++i) {
        this.emptyNotice(inputs[i]);
    }
};


/** @override */
ad.widget.siva.FormV2.prototype.bindEvent = function() {
    ad.widget.siva.FormV2.superClass.bindEvent.call(this);
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

/** @override */
ad.widget.siva.FormV2.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
};

ad.widget.siva.FormV2.prototype.emptyNotice = function($input) {
    if (ad.string.trim($input.value) === '') {
        var name = ad.string.trim(baidu.dom.getAttr($input, 'data-name')||''),
            infoMsg = '请输入您的' + name;
        $input.value = infoMsg;
        baidu.dom.addClass($input, 'ad-widget-siva-form-placeholder');
    }
};


ad.widget.siva.FormV2.prototype.submit = function() {
    if (this.validate()) {
        this.success();
    }
};

/**
 * Validate all input fields.
 * @return {boolean} Whether all fileds are valid.
 */
ad.widget.siva.FormV2.prototype.validate = function() {
    var form = baidu.g(this.getId('form'));
    var inputs = form.getElementsByTagName('input'), succeed = true;
    for (var i = 0; i < inputs.length; ++i) {
        if (!this.validateField(inputs[i])) {
            succeed = false;
        }
    }
    return succeed;
};

/**
 * Vaildate a single filed by its type.
 * @param {Node} $input Input dom node.
 * @return {boolean} True for valid.
 */
ad.widget.siva.FormV2.prototype.validateField = function($input) {
    var type = $input.getAttribute('data-type');
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
 * Do sth when success.
 */
ad.widget.siva.FormV2.prototype.success = function() {
    var container = baidu.g(this.getId());
    this.sendFormInfo();
    this.charge();
    baidu.dom.addClass(container, 'ad-widget-siva-form-success');
    //成功提交后打开新页面
    window.open(this._data['success_rcv_url']);
};

/**
 * Do sth when some field focused.
 * @param {Node} $input Focus dom.
 */
ad.widget.siva.FormV2.prototype.focusInput = function($input) {
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
ad.widget.siva.FormV2.prototype.blurInput = function($input) {
    this.emptyNotice($input);
};

/**
 * Send form log to fclick.baidu.com.
 */
ad.widget.siva.FormV2.prototype.sendFormInfo = function() {
    var form = baidu.g(this.getId('form')),
        inputs = form.getElementsByTagName('input'),
        input,
        url = RT_CONFIG.HOST('bzclk.baidu.com') + '/siva.php?',
        data = {
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

/**
 * Charge when  submit succeed.
 */
ad.widget.siva.FormV2.prototype.charge = function() {
    var submitBtn = baidu.g(this.getId('submit')),
        url = baidu.dom.getAttr(submitBtn, 'href');
    baidu.sio.log( url );
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 noet: */
