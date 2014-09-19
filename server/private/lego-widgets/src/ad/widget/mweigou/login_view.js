/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/mweigou/login_view.js ~ 2013/05/04 12:01:05
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * 逻辑是这样子的：
 * 首先根据sessionStorage里面的内容判断是否有登录的信息，如果有的话，那么可能是登录的状态
 * enterDocument
 *   -> displayLoading...
 *   -> checkSessionStorage
 *      -> if(found)
 *         -> fetchTheAddresses
 *            if (login)
 *               switchToThePurchaseView2(addresses || [])
 *            else
 *              displayLoginForm
 *      -> else
 *         -> displayLoginForm
 **/

goog.require('ad.widget.Widget');
goog.require('ad.impl.weigou.user');
goog.require('ad.impl.weigou.dal');

goog.include('ad/widget/mweigou/login_view.less');
goog.include('ad/widget/mweigou/login_view.html');

goog.provide('ad.widget.mweigou.LoginView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.mweigou.LoginView = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前view的名字，用于识别和统计
     * @type {string}
     */
    this.name = 'login';

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_mweigou_login_view';

    /**
     * login view的根节点
     * @type {Zepto}
     */
    this.$_root = null;

    /**
     * 需要验证的表单项对应的正则
     * @type {Object.<string, RegExp>}
     * @const
     */
    this.ITEM_PATTERNS = {
        'mobile': /^1(3\d|4[57]|5[0-35-9]|8\d)\d{8}$/,
        'mobile_vcode': /.{6,}/
        // 'vcode-result': /1/
    };
};
baidu.inherits(ad.widget.mweigou.LoginView, ad.widget.Widget);

/** @override */
ad.widget.mweigou.LoginView.prototype.enterDocument = function() {
    ad.widget.mweigou.LoginView.superClass.enterDocument.call(this);

    this.$_root = $(this.getRoot());

    var me = this;
    if (ad.impl.weigou.user.maybeIsLogin()) {
        ad.impl.weigou.dal.getMyAddresses({}, function(data) {
            if (data['success'] == 'true') {
                // 可以切换到PurchaseView2了
                ad.impl.weigou.user.setAddresses(
                    /** @type {Array.<Object>} */(data['result']));
                me.delayTrigger(ad.impl.weigou.events.PURCHASE_VIEW, me._data);
            } else {
                // 服务器反馈没有登录，那么说明的确是没有登录.
                me._displayLoginForm();
            }
        });
    } else {
        me._displayLoginForm();
    }
};

/**
 * 显示表单项的错误信息
 * @private
 * @param {Zepto} target 表单项
 */
ad.widget.mweigou.LoginView.prototype.showErrorMessage = function(target) {
    var me = this;

    var nextRow = $(target.parents('tr')[0]).next();
    if (nextRow && nextRow.hasClass('error')) {
        nextRow.show();
    }
};

/**
 * 隐藏表单项的错误信息
 * @private
 * @param {Zepto} target 表单项
 */
ad.widget.mweigou.LoginView.prototype.hideErrorMessage = function(target) {
    var nextRow = $(target.parents('tr')[0]).next();
    if (nextRow && nextRow.hasClass('error')) {
        nextRow.hide();
    }
};


/**
 * 验证表单项是否合法.
 * @param {string} name 表单的名称.
 * @param {boolean=} opt_changeErrorMessage 是否显示错误信息，默认为false
 * @return {boolean}
 */
ad.widget.mweigou.LoginView.prototype._verify = function(name, opt_changeErrorMessage) {
    var target = $('#' + this.getId(name));
    var value;
    if (target.attr('type') == 'checkbox') {
        value = target.prop('checked');
    } else {
        value = $.trim(String(target.val()));
    }

    var pattern = this.ITEM_PATTERNS[name];
    if (!pattern) {
        return true;
    }

    var isPassed = pattern.test(value);

    if (opt_changeErrorMessage) {
        if (isPassed) {
            this.hideErrorMessage(target);
        } else {
            this.showErrorMessage(target);
        }
    }

    /*
    // 通过验证的数据就保存到userData里面
    if (isPassed) {
        if (name != 'mobile' && name != 'vcode') {
            // 手机号和验证码不要自动保存，而是要等到get_address接口成功返回之后才自动保存
            me.setUserData(name, value);
        }
    }
    */

    return isPassed;
}

/**
 * 验证所有的表单项是否合法。
 * @param {boolean=} opt_changeErrorMessage 是否显示错误信息，默认为false
 * @return {boolean}
 */
ad.widget.mweigou.LoginView.prototype._verifyAll = function(opt_changeErrorMessage) {
    var me = this;
    var isPassed = true;
    $.each(this.ITEM_PATTERNS, function(name, pattern) {
        if (!me._verify(String(name), opt_changeErrorMessage)) {
            isPassed = false;
        }
    });

    return isPassed;
}

/**
 * 展示登录的表单
 * @private
 */
ad.widget.mweigou.LoginView.prototype._displayLoginForm = function() {
    var body = this.$_root.find('.body');
    var loading = this.$_root.find('.loading');

    ad.impl.weigou.user.forceLogout();
    loading.hide();
    body.show();
}

/**
 * 显示服务端返回的信息
 * @param {Object} data
 */
ad.widget.mweigou.LoginView.prototype.showServerMessage = function(data) {
    var me = this;

    var msg = data['message'];
    if (!msg) { return; }

    if (msg['field'] && msg['field'][me._data['id']]) {
        alert(msg['field'][me._data['id']]);
    } else if (msg['global']) {
        alert(msg['global']);
    } else {
        for(var name in msg['field']) {
            this.showErrorMessage(this.g(name));
        }
    }
};

/**
 * @private
 * @return {Zepto}
 */
ad.widget.mweigou.LoginView.prototype.g = function(name) {
    return $('#' + this.getId(name));
}

/** @override */
ad.widget.mweigou.LoginView.prototype.bindEvent = function() {
    ad.widget.mweigou.LoginView.superClass.bindEvent.call(this);

    var me = this;
    this.g('submit').on('click', function(){
        if (me._verifyAll(true)) {
            var params = {
                'mobile': me.g('mobile').val(),
                'mobile_vcode': me.g('mobile_vcode').val(),
                'merchant': me._data['vendor'],
                'merchant_id': me._data['vendor_id']
            };

            ad.impl.weigou.dal.addressesV2(params, function(data) {
                if (data['success'] === 'true') {
                    // 登录成功
                    ad.impl.weigou.user.setLoginStatus({
                        'mobile': params['mobile'],
                        'vcode': params['mobile_vcode'],
                        'startTime': new Date().getTime()
                    });
                    ad.impl.weigou.user.setAddresses(
                        /** @type {Array.<Object>} */(data['result']))
                    // 切换到PurchaseView2
                    me.delayTrigger(ad.impl.weigou.events.PURCHASE_VIEW, me._data, data['result']);
                } else {
                    // 登录失败
                    me.showServerMessage(data);
                }
            });
        }
    });


    this.g('vcode-getter').click(function(){
        me._getVCode();
        return false;
    }).data('available', '1');

};

/**
 * 获取手机验证码
 * @private
 */
ad.widget.mweigou.LoginView.prototype._getVCode = function() {
    var me = this;

    if (!this._verify('mobile', true)
        || this.g('vcode-getter').data('available') == '0') {
        return false;
    }

    this.g('vcode-getter')
        .data('available', '0')
        .addClass('disabled');

    // 控制获取手机验证码的时间间隔
    var GET_VCODE_INTERVAL = 60 * 1000;
    var startTime = new Date();
    var delay = function() {
        var detal = new Date() - startTime;
        if (detal < GET_VCODE_INTERVAL) {
            var timeLeft = parseInt((GET_VCODE_INTERVAL - detal) / 1000, 10);
            me.g('vcode-getter').text(timeLeft + '秒后可重试');
            ad.base.setTimeout(delay, 1000);
        } else {
            me.g('vcode-getter')
              .data('available', '1')
              .removeClass('disabled')
              .text('获取验证码');
        }
    };
    delay();

    var mobile = this.g('mobile').val();
    ad.impl.weigou.dal.getMobileVCode(mobile, function(data){
        if (data['success'] !== 'true') {
            me.showServerMessage(data);
        }
    });
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
