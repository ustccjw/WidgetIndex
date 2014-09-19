/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/weigou/purchase_view.js ~ 2013/03/04 14:05:06
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * purchase_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');
goog.require('ad.impl.weigou.dom');

goog.include('ad/widget/weigou/purchase_view.less');
goog.include('ad/widget/weigou/purchase_view.html');

goog.provide('ad.widget.weigou.PurchaseView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.weigou.PurchaseView = function(data, region) {
    ad.widget.Widget.call(this, data);

    /**
     * 地域数据
     * @type {Object}
     */
    this._region = region;

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_weigou_purchase_view';

    this.name = 'purchase';

    /**
     * 表示现在是否已经校验没问题并且可以提交订单
     */
    this.isOk = true;

    this._props = {};

    this._globalTip = {
        'isGlobalTipShow': false
    };

    this._defaultFare = {
        '京东商城': 5,
        '当当网': 5,
        '一号店': 10,
        '买卖宝': 15,
        '顺丰优选': 10,
        '走秀网': 15,
        '其他': 10
    };

    this._fareFreeOffset = {
        '京东商城': 39,
        '当当网': 79,
        '一号店': 100,
        '买卖宝': 99,
        '顺丰优选': 59,
        '走秀网': 199
    };
};
baidu.inherits(ad.widget.weigou.PurchaseView, ad.widget.Widget);

/** @override */
ad.widget.weigou.PurchaseView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.weigou.PurchaseView.superClass.enterDocument.call(me);

    var root = me.getRoot();

    me.provinceSelect = baidu.g('ecl-weigou-province-select');
    me.citySelect = baidu.g('ecl-weigou-city-select');
    me.districtSelect = baidu.g('ecl-weigou-district-select');
    me.townSelect = baidu.g('ecl-weigou-town-select');
    me.addressInput = baidu.g('ecl-weigou-address-input');
    me.phoneInput = baidu.g('ecl-weigou-phone-input');
    me.userNameInput = baidu.g('ecl-weigou-username-input');
    me.vcodeInput = baidu.g('ecl-weigou-vcode-input');

    me.changeMobileBtn = baidu.g('ecl-weigou-change-phone');
    me.checkBtn = baidu.g('ecl-weigou-pur-check');
    me.submitBtn = baidu.g('ecl-weigou-pur-submit');

    me.vcodeVerifyBtn = baidu.g('ecl-weigou-pur-vcode-verify');
    me.submitLoading = baidu.g('ecl-weigou-pur-submit-loading');
    me.pricesDom = baidu.g('ecl-weigou-pur-prices');

    me.globalTipDom = baidu.g('ecl-weigou-pur-global-msg');

    // 显示省份数据
    var provinceOptions = me.provinceSelect.options;
    var province;
    var option;
    for(var key in me._region) {
        province = me._region[key];
        option = new Option(province[0], province[0]);
        option.setAttribute('title', province[0]);
        option.setAttribute('data-id', key);
        option.className = 'OP_LOG_BTN';
        option.setAttribute('data-click', '{fm:"behz"}');
        provinceOptions.add(option);
    }


    // 显示商品清单的名称并截断
    // 截断商品名称
    var names = baidu.q('ecl-weigou-pur-name', root);
    baidu.each(names, function(name) {
        var title = name.getAttribute('title');
        title = ad.impl.weigou.util.subByte(title, 64);
        name.innerHTML = baidu.string.encodeHTML(title);
    });

    // 点击获取短信安全码
    var getMobileVcodeBtn = baidu.g('ecl-weigou-get-mobile-code');
    var phoneInput = baidu.g('ecl-weigou-phone-input');
    var vcodeInput = baidu.g('ecl-weigou-vcode-input');
    var isBuffered = false;
    ad.impl.weigou.dom.on(getMobileVcodeBtn, 'click', function(){
        if(isBuffered){
            return;
        }
        var mobile = phoneInput.value;
        if(!me.verifyPhone()){
            return;
        }

        isBuffered = true;

        // 显示倒计时
        var left = 60;
        var dispValue = getMobileVcodeBtn.innerHTML;
        function decount() {
            if(!left){
                ad.base.clearInterval(internalHandler);
                getMobileVcodeBtn.innerHTML = dispValue;
                isBuffered = false;
                return;
            }
            getMobileVcodeBtn.innerHTML = (--left) + '秒后可重新获取';
        };
        var internalHandler = ad.base.setInterval(decount, 1000);
        decount();

        // 发送短信验证码
        ad.impl.weigou.dal.getMobileVCode(mobile, function(data){
            if(data['success'] == 'false'){
                ad.base.clearInterval(internalHandler);
                isBuffered = false;
                getMobileVcodeBtn.innerHTML = dispValue;
                // 如果用户输入验证码错误，刷新验证码
                // me.refreshVcode();
                var message = data['message'];
                if(message['field']){
                    me.responseErrorHandler(message);
                }
            } else {
                me.hideErrorMessage(vcodeInput);
            }
        });
    });

    me.calcTotalPrice();

    var agmtLink = baidu.g('ecl-weigou-pur-agmt-link');
    if(agmtLink) {
        agmtLink.href = ad.impl.weigou.constants.WEIGOU_DOMAIN
            + ad.impl.weigou.urls.AGMT_LINK;
    }
};

/** @override */
ad.widget.weigou.PurchaseView.prototype.bindEvent = function() {
    var me = this;
    ad.widget.weigou.PurchaseView.superClass.bindEvent.call(me);

    var root = me.getRoot();

    // 绑定商品清单中的各种事件
    var trs = baidu.q('ecl-weigou-pur-item', root);
    baidu.each(trs, function(tr) {
        ad.impl.weigou.dom.on(tr, 'click', function(event) {
            event  = event || window.event;
            var target = event.srcElement || event.target;
            var countInput = this.getElementsByTagName('input')[0];
            var num = parseInt(countInput.value, 10);
            if(baidu.dom.hasClass(target, 'ecl-weigou-minus')) {
                countInput.value = (num - 1 < 1) ? 1 : (num - 1);
                me.calcTotalPrice();


                if(countInput.getAttribute('data-count') !== countInput.value) {
                    me.hidePrices();
                    
                    // 隐藏该tr下的库存不足的信息，目前还是通过信息的内容来的，因为没有errno
                    var msgDom = baidu.q('ecl-weigou-product-errmsg', this)[0];
                    if(msgDom) {
                        var msg = baidu.string.trim(msgDom.innerHTML);
                        if(msg === '库存不足') {
                            baidu.dom.hide(msgDom);
                            me.hideGlobalMsg();
                        }
                    }
                }

                countInput.setAttribute('data-count', countInput.value);
            } else if(baidu.dom.hasClass(target, 'ecl-weigou-plus')) {
                countInput.value = num + 1;
                if((num + 1) > 999){
                    countInput.value = 999;
                }
                me.calcTotalPrice();
                if(countInput.getAttribute('data-count') !== countInput.value) {
                    me.hidePrices();
                }

                countInput.setAttribute('data-count', countInput.value);
            } else if(baidu.dom.hasClass(target, 'ecl-weigou-pur-delete')) {
                baidu.dom.remove(this);

                // 如果只有一个商品，隐藏这个商品的删除按钮
                var trs = baidu.q('ecl-weigou-pur-item', root);
                if(trs.length === 1) {
                    var tr = trs[0];
                    var deleteBtn = baidu.q('ecl-weigou-pur-delete', tr)[0];
                    baidu.dom.hide(deleteBtn);
                }
                me.calcTotalPrice();
            }
            
        });

        var countInput = tr.getElementsByTagName('input')[0];
        ad.impl.weigou.dom.on(countInput, 'blur', function() {
            var num = parseInt(countInput.value, 10);
            if(!num || num < 1){
                countInput.value = 1;
            } else if(num > 999) {
                countInput.value = 999;
            } else {
                countInput.value = num;
            }
            if(countInput.getAttribute('data-count') !== countInput.value) {
                me.hidePrices();
            }
            me.calcTotalPrice();

            countInput.setAttribute('data-count', countInput.value);
        });
    });


    // 绑定选择地址的控件事件
    var addressFirstShow = false;
    var isAddressSelectorShow = false;
    var addressBtn = baidu.q('ecl-weigou-pur-pick-address', root)[0];
    var addressWrapper = baidu.q('ecl-weigou-pur-addresses', addressBtn.parentNode)[0];
    var hideAddressSelector = function() {
        addressWrapper.style.display = 'none';
        isAddressSelectorShow = false;

        // 判断属性是否发生改变，然后决定是否需要隐藏总价
        var params = me.collectData();
        if(me.judgeRecheckPrice(params, me._props)) {
            // 隐藏无法送达
            me.hideUnreachableInfo();
            // 隐藏已查到的运费
            me.hidePrices();
        }
    };
    ad.impl.weigou.dom.on(addressBtn, 'click', function() {
        if(isAddressSelectorShow) {
            hideAddressSelector();
        } else {
            addressWrapper.style.display = 'block';
            addressFirstShow = true;
            isAddressSelectorShow = true;
        }
    });
    var addressCloseBtn = addressWrapper.getElementsByTagName('b')[0];
    ad.impl.weigou.dom.on(addressCloseBtn, 'click', function() {
        hideAddressSelector();
    });
    // 隐藏浮层
    ad.impl.weigou.dom.on(document.body, 'click', function(event) {
        if(!isAddressSelectorShow || addressFirstShow) {
            addressFirstShow = false;
            return;
        }
        event = event || window.event;
        var target = event.srcElement || event.target;

        var on = false;
        while(target !== document.body){ 
            if(target === addressWrapper) {
                on = true;
                break;
            }
            target = target.parentNode;
        }
        if(!on) {
            addressWrapper.style.display = 'none';
            isAddressSelectorShow = false;
        }
    });

    // 绑定选择省份和市的事件
    ad.impl.weigou.dom.on(me.districtSelect, 'click', function() {
        var provinceOption = me.provinceSelect.options[
            me.provinceSelect.selectedIndex
        ];
        var cityOption = me.citySelect.options[
            me.citySelect.selectedIndex
        ];
        var districtOption = me.districtSelect.options[
            me.districtSelect.selectedIndex
        ];

        var addressWrapper = baidu.q('ecl-weigou-pur-addresses', root)[0];
        var townOptions = me.townSelect.options;   
        var townWrapper = baidu.g('ecl-weigou-pur-address-town');
        var data = me._region[provinceOption.getAttribute('data-id')][2];
        if(data){
            data = data[cityOption.getAttribute('data-id')];
            if(data) {
                data = data[2];
            }
        }
        if(data) {
            data = data[districtOption.getAttribute('data-id')];
            if(data && data[2]) {
                // 存在四级地址
                return;
            }
        }
        if(me.districtSelect.value) {
            if (!ad.impl.weigou.dist.IPAD) {
                // 调用这个函数会导致iPad下面输入框自动隐藏
                hideAddressSelector();
            }
            me.refreshAddressText();
        }
    });
    ad.impl.weigou.dom.on(me.townSelect, 'click', function() {
        if(me.townSelect.value) {
            hideAddressSelector();
            me.refreshAddressText();
        }
    });
    me.townSelect.onchange = function() {
        me.refreshAddressText();
    };
    me.districtSelect.onchange = function() {
        var provinceOption = me.provinceSelect.options[
            me.provinceSelect.selectedIndex
        ];
        var cityOption = me.citySelect.options[
            me.citySelect.selectedIndex
        ];
        var districtOption = me.districtSelect.options[
            me.districtSelect.selectedIndex
        ];

        var addressWrapper = baidu.q('ecl-weigou-pur-addresses', root)[0];
        var townOptions = me.townSelect.options;   
        var townWrapper = baidu.g('ecl-weigou-pur-address-town');
        var data = me._region[provinceOption.getAttribute('data-id')][2];
        if(data){
            data = data[cityOption.getAttribute('data-id')];
            if(data) {
                data = data[2];
            }
        }
        if(data) {
            data = data[districtOption.getAttribute('data-id')];
            if(data && data[2]) {
                townOptions.length = 0;
                townOptions.add(new Option('-请选择-', ''));

                var towns = data[2];
                var option;
                var item;
                for(var code in towns){
                    item = towns[code];
                    option = new Option(item[0], item[0]);
                    option.setAttribute('title', item[0]);
                    option.setAttribute('data-id', code);
                    option.className = 'OP_LOG_BTN';
                    option.setAttribute('data-click', '{fm:"behz"}');
                    townOptions.add(option);
                }
                baidu.dom.setStyles(addressWrapper, {
                    'width': '500px'
                });
                baidu.dom.show(townWrapper);
                townOptions.selectedIndex = 1;
                me.townSelect.onchange();
            } else {
                townOptions.length = 0;
                baidu.dom.setStyles(addressWrapper, {
                    'width': '380px'
                });
                baidu.dom.hide(townWrapper);
            }
        } else {
            townOptions.length = 0;
            baidu.dom.setStyles(addressWrapper, {
                'width': '380px'
            });
            baidu.dom.hide(townWrapper);
        }

        me.refreshAddressText();
    };
    me.citySelect.onchange = function() {
        var cityOptions = me.citySelect.options;
        var cityOption = cityOptions[me.citySelect.selectedIndex];
        var cityId = cityOption.getAttribute('data-id');
        var districtOptions = me.districtSelect.options;
        var provinceOption = me.provinceSelect.options[
            me.provinceSelect.selectedIndex
        ];

        districtOptions.length = 0;
        districtOptions.add(new Option('-选择区-', ''));

        if(!cityId){
            return;
        }

        var cities = me._region[provinceOption.getAttribute('data-id')][2];
        var districts = cities[cityId][2];

        var item;
        var option;
        for(var code in districts){
            item = districts[code];
            option = new Option(item[0], item[0]);
            option.setAttribute('title', item[0]);
            option.setAttribute('data-id', code);
            option.className = 'OP_LOG_BTN';
            option.setAttribute('data-click', '{fm:"behz"}');
            districtOptions.add(option);
        }

        if(districts) {
            me.districtSelect.selectedIndex = 1;
            me.districtSelect.onchange();
        }
    };
    me.provinceSelect.onchange = function() {
        var provinceOption = me.provinceSelect.options[me.provinceSelect.selectedIndex];
        var provinceId = provinceOption.getAttribute('data-id');

        var cityOptions = me.citySelect.options;
        var districtOptions = me.districtSelect.options;
        cityOptions.length = 0;
        cityOptions.add(new Option('-选择市-', ''))
        districtOptions.length = 0;
        districtOptions.add(new Option('-选择区-', ''))

        if(!provinceId) {
            return;
        }

        var option, item;
        for(var code in me._region[provinceId][2]){
            item = me._region[provinceId][2][code];
            option = new Option(item[0], item[0]);
            option.setAttribute('data-id', code);
            option.setAttribute('title', item[0]);
            option.className = 'OP_LOG_BTN';
            option.setAttribute('data-click', '{fm:"behz"}');
            cityOptions.add(option);
        }

        me.citySelect.selectedIndex = 1;
        me.citySelect.onchange();
    };

    var phoneInput = baidu.g('ecl-weigou-phone-input');
    ad.impl.weigou.dom.on(phoneInput, 'blur', function() {
        me.verifyPhone();
    });
    var vcodeInput = baidu.g('ecl-weigou-vcode-input');
    ad.impl.weigou.dom.on(vcodeInput, 'blur', function() {
        if(me.verifyVcode()) {
            me.loadAddresses();
        }
    });
    var userNameInput = baidu.g('ecl-weigou-username-input');
    ad.impl.weigou.dom.on(userNameInput, 'blur', function() {
        me.verifyUsername();
    });
    ad.impl.weigou.dom.on(me.addressInput, 'blur', function() {
        me.verifyAddress();
    });


    // 绑定地址选择事件
    var isAddressesShow = false;
    var addressesFirstShow = false;
    var addressesContainer = baidu.g('ecl-weigou-pur-address-wrapper');
    var selectorBtn = baidu.g('ecl-weigou-pur-selector');
    var hideAddressesSelector = function() {
        isAddressesShow = false;
        addressesContainer.style.display = 'none';

        // 判断属性是否发生改变，然后决定是否需要隐藏总价
        var params = me.collectData();
        if(me.judgeRecheckPrice(params, me._props)) {
            // 隐藏无法送达
            me.hideUnreachableInfo();
            // 隐藏已查到的运费
            me.hidePrices();
        }
    };
    ad.impl.weigou.dom.on(selectorBtn, 'click', function() {
        if(baidu.dom.hasClass(selectorBtn, 'active')) {
            if(isAddressesShow) {
                hideAddressesSelector();
            } else {
                baidu.dom.setStyles(addressesContainer, {
                    'display': 'block',
                    'top': selectorBtn.offsetHeight - 1 + 'px'
                });
                isAddressesShow = true;
                addressesFirstShow = true;
            }
        }
    });
    ad.impl.weigou.dom.on(addressesContainer, 'click', function(event) {
        event = event || window.event;
        var target = event.srcElement || event.target;

        if(target.nodeName === 'B') {
            hideAddressesSelector();
            return;
        } else {
            var a = target;
            if(target.nodeName === 'SPAN') {
                a = target.parentNode;
            }
            if(a.nodeName === 'A') {
                var address = a.getAttribute('data-address');
                var province = a.getAttribute('data-province');
                var city = a.getAttribute('data-city');
                var district = a.getAttribute('data-district');
                var name = a.getAttribute('data-name');
                var town = a.getAttribute('data-town');

                me.restoreAddress(province, city, district, address, name, town);
                hideAddressesSelector();
            }
        }
    });
    ad.impl.weigou.dom.on(document.body, 'click', function(event) {
        if(!isAddressesShow || addressesFirstShow) {
            addressesFirstShow = false;
            return;
        }
        event = event || window.event;
        var target = event.srcElement || event.target;
        var on = false;
        while(target !== document.body) {
            if(target === addressesContainer) {
                on = true;
                break;
            }
            target = target.parentNode;
        }
        if(!on) {
            hideAddressesSelector();
        }
    });


    // 提交按钮
    var submitBtn = baidu.g('ecl-weigou-pur-submit');
    var submitting = false;
    var clicked = false;
    ad.impl.weigou.dom.on(submitBtn, 'click', function() {
        var params = {};

        if(!me.verify()) {
            return false;
        }
        if(clicked) {
            return false;
        }
        clicked = true;
        if(submitting) {
            return false;
        }

        params['mobile'] = baidu.string.trim(
            baidu.g('ecl-weigou-phone-input').value
        );
        params['mobile_vcode'] = baidu.string.trim(
            baidu.g('ecl-weigou-vcode-input').value
        );
        params['name'] = baidu.string.trim(
            baidu.g('ecl-weigou-username-input').value
        );
        params['province'] = baidu.g('ecl-weigou-province-select').value;
        params['city'] = baidu.g('ecl-weigou-city-select').value;
        params['district'] = me.districtSelect.value;
        params['district_id'] = me.districtSelect.options[
            me.districtSelect.selectedIndex
        ].getAttribute('data-id') || '';
        params['address'] = baidu.string.trim(
            baidu.g('ecl-weigou-address-input').value
        );
        params['town'] = me.townSelect.value;
        params['need_invoice'] = baidu.g('ecl-weigou-invoice-input').checked ? '1' : '0';
        params['merchant_id'] = me._data['vendorId'];
        params['merchant'] = me._data['vendor'];

        var p = {
            "items": []
        };
        var trs = baidu.q('ecl-weigou-pur-item', root);
        baidu.each(trs, function(tr) {
            var id = tr.getAttribute('data-id');
            if(id) {
                var priceDom = baidu.q('ecl-weigou-pur-price', tr)[0];
                var inputDom = baidu.q('ecl-weigou-count-input', tr)[0];
                p['items'].push({
                    'id': id,
                    'price': parseFloat(priceDom.getAttribute('data-price')),
                    'count': parseInt(inputDom.value, 10)
                });
            }
        });
        params['data'] = ad.impl.weigou.json.stringify(p);

        baidu.dom.addClass(submitBtn, 'submitting');

        submitting = true;
        ad.impl.weigou.dal.submit(params, function(data) {
            data = ad.impl.weigou.json.parse(data['data']);
            if(data['success'] === 'true') {
                me.trigger(ad.impl.weigou.events.SUCCESS_VIEW, params);
            } else {
                me.hidePrices();
                me.responseErrorHandler(data['message']);
            }

            baidu.dom.removeClass(submitBtn, 'submitting');
            submitting = false;
        });
        clicked = false;
    });

    // 绑定返回按钮的事件
    var backBtn = baidu.g('ecl-weigou-pur-return-btn');
    if(backBtn) {
        ad.impl.weigou.dom.on(backBtn, 'click', function() {
            me.trigger(ad.impl.weigou.events.BACK);
        });
    }

    // 绑定查看运费按钮的点击事件
    var checkBtn = baidu.g('ecl-weigou-pur-check');
    if(checkBtn) {
        ad.impl.weigou.dom.on(checkBtn, 'click', function() {
            me.refreshPrice();
        });
    }

    // 绑定更换手机号的事件
    ad.impl.weigou.dom.on(me.changeMobileBtn, 'click', function() {
        // 隐藏获取验证码按钮
        // 设置disable
        me.vcodeInput.value = '';
        me.phoneInput.value = '';
        me.vcodeInput.removeAttribute('disabled');
        me.phoneInput.removeAttribute('disabled');
        baidu.dom.hide(me.changeMobileBtn);
        var getMobileVcodeBtn = baidu.g('ecl-weigou-get-mobile-code');
        getMobileVcodeBtn.style.display = 'block'
        me.vcodeVerifyBtn.style.display = 'inline-block';
        var success = baidu.g('ecl-weigou-pur-item-success');
        success.style.display = 'none';
    });


    // 绑定全局事件，为消失global tip使用
    ad.impl.weigou.dom.on(document.body, 'click', function(event) {
        if(!me._globalTip['isGlobalTipShow']) {
            return;
        }
        event = event || window.event;
        var target = event.srcElement || event.target;

        var on = false;
        while(target !== document.body) {
            if(target === me.globalTipDom) {
                on = true;
                break;
            }
            target = target.parentNode;
        }
        if(!on) {
            me.hideGlobalMsg();
        }
    });

    var tipCloseBtn = me.globalTipDom.getElementsByTagName('b')[0];
    if(tipCloseBtn) {
        ad.impl.weigou.dom.on(tipCloseBtn, 'click', function() {
            me.hideGlobalMsg();
        });
    }


};

/**
 * 验证手机
 * @param {string=} opt_msg
 * @return {boolean} 如果只用来显示错误信息，返回false，否则根据手机号的正确性来返回
 */
ad.widget.weigou.PurchaseView.prototype.verifyPhone = function(opt_msg) {
    var me = this;
    var phoneInput = baidu.g('ecl-weigou-phone-input');
    var error = true;
    if(opt_msg) {
        me.showErrorMessage(phoneInput, opt_msg);
        return false;
    } else {
        var value = phoneInput.value;
        if(!value){
            error = false;
        }

        var telreg1 = /^13\d{9}$/;
        var telreg2 = /^14[57]\d{8}$/;
        var telreg3 = /^15[0-35-9]\d{8}$/;
        var telreg4 = /^18[0-9]\d{8}$/;
        if (!telreg1.test(value)
            && !telreg2.test(value)
        && !telreg3.test(value)
        && !telreg4.test(value))
        {
            error = false;
        }

        if(!error) {
            this.showErrorMessage(phoneInput);
        } else {
            this.hideErrorMessage(phoneInput);
        }
    }

    return error;
};

/**
 * 验证验证码
 * @param {string=} opt_msg
 */
ad.widget.weigou.PurchaseView.prototype.verifyVcode = function(opt_msg) {
    var me = this;
    var vcodeInput = baidu.g('ecl-weigou-vcode-input');
    if(opt_msg) {
        me.showErrorMessage(vcodeInput, opt_msg);
        return false;
    } else {
        var value = vcodeInput.value;
        if(!value || !baidu.string.trim(value)) {
            me.showErrorMessage(vcodeInput);
            return false;
        } else {
            me.hideErrorMessage(vcodeInput);
            return true;
        }
    }
};

/**
 * 验证用户名
 * @param {string=} opt_msg
 */
ad.widget.weigou.PurchaseView.prototype.verifyUsername = function(opt_msg) {
    var me = this;
    var userNameInput = baidu.g('ecl-weigou-username-input');
    if(opt_msg) {
        me.showErrorMessage(userNameInput, opt_msg);
        return false;
    } else {
        var value = userNameInput.value;
        if(!value || !baidu.string.trim(value)) {
            me.showErrorMessage(userNameInput);
            return false;
        } else {
            me.hideErrorMessage(userNameInput);
            return true;
        }
    }
};

/**
 * 验证地址
 * @param {string=} opt_msg
 */
ad.widget.weigou.PurchaseView.prototype.verifyAddress = function(opt_msg) {
    var me = this;
    if(opt_msg) {
        me.showErrorMessage(me.addressInput, opt_msg);
        return false;
    } else {
        var value = me.addressInput.value;
        if(!value || !baidu.string.trim(value)) {
            me.showErrorMessage(me.addressInput);
            return false;
        } else {
            me.hideErrorMessage(me.addressInput);
            return true;
        }
    }
};

/**
 * @param {string=} opt_msg
 */
ad.widget.weigou.PurchaseView.prototype.verifySelectAddress = function(opt_msg) {
    var me = this;
    var root = me.getRoot();
    var textDom = baidu.q('ecl-weigou-pur-pick-address', root)[0];
    if(opt_msg) {
        me.showErrorMessage(textDom, opt_msg);
    } else {
        var isError = false;
        if(
            !me.provinceSelect.value 
            || !me.citySelect.value 
        ) {
            isError = true;
        } else {
            if(me.districtSelect.options.length > 1) {
                if(!me.districtSelect.value) {
                    isError = true;
                }
            }
        }
        if(isError) {
            me.showErrorMessage(textDom);
        } else {
            me.hideErrorMessage(textDom);
        }
        return !isError;
    }
};

ad.widget.weigou.PurchaseView.prototype.verify = function() {
    var me = this;
    var agmtInput = baidu.g('ecl-weigou-pur-agmt');
    if(!agmtInput.checked) {
        me.responseErrorHandler('您需要同意我们的协议才能继续');
        return false;
    }

    if(
        !me.verifyPhone()
        || !me.verifyVcode()
        || !me.verifyUsername()
        || !me.verifyAddress()
        || !me.verifySelectAddress()
      ) {
        return false;
    }

    return true;
};

/**
 * Show Error Message
 * @param {Element} dom
 * @param {string=} opt_msg
 */
ad.widget.weigou.PurchaseView.prototype.showErrorMessage = function(dom, opt_msg) {
    var td = dom;
    while (td !== document.body) {
        td = td.parentNode;
        if(td === null || td.nodeName.toLowerCase() === 'td'){
            break;
        }
    }
    if(!td){
        return;
    }
    var errorMessage = baidu.q('ecl-weigou-pur-error-message', td)[0];

    baidu.dom.addClass(dom, 'ecl-weigou-pur-error');
    if(!opt_msg){
        opt_msg = errorMessage.getAttribute('title');
    }
    errorMessage.innerHTML = opt_msg;
    errorMessage.style.display = 'inline';
};

ad.widget.weigou.PurchaseView.prototype.hideErrorMessage = function(dom) {
    var td = dom;
    while (td !== document.body) {
        td = td.parentNode;
        if(td === null || td.nodeName.toLowerCase() === 'td'){
            break;
        }
    }
    if(!td){
        return;
    }
    var errorMessage = baidu.q('ecl-weigou-pur-error-message', td)[0];

    baidu.dom.removeClass(dom, 'ecl-weigou-pur-error');
    errorMessage.style.display = 'none';
};

/**
 * 根据手机号和验证码加载用户已经使用过的数据
 */
ad.widget.weigou.PurchaseView.prototype.loadAddresses = function() {
    var me = this;
    if(!(me.verifyPhone() && me.verifyVcode())) {
        return false;
    }

    // 显示验证码的loading
    baidu.dom.addClass(me.vcodeVerifyBtn, 'loading');

    var phoneInput = baidu.g('ecl-weigou-phone-input');
    var vcodeInput = baidu.g('ecl-weigou-vcode-input');
    var addressesContainer = baidu.g('ecl-weigou-pur-address-wrapper');
    var selectorBtn = baidu.g('ecl-weigou-pur-selector');
    ad.impl.weigou.dal.addresses({
        'mobile': phoneInput.value,
        'mobile_vcode': vcodeInput.value,
        'merchant_id': me._data['vendorId'],
        'merchant': me._data['vendor']
    }, function(data) {
        if(data['success'] === 'true') {
            if(data['result'] && data['result'].length > 0) {
                var html = [
                    '<b></b>'
                ];
                html.push(
                    ad.impl.weigou.util.tmpl(me.tpl('ecl_pur_addresses'), data)
                );

                baidu.dom.addClass(selectorBtn, 'active');
                addressesContainer.innerHTML = html.join('');

                var addr;
                if(data['result'].length === 1) {
                    addr = data['result'][0];
                } else {
                    for(var a in data['result']) {
                        a = data['result'][a];
                        if(a['is_default'] === '1') {
                            addr = a;
                            break;
                        }
                    }
                }
                if(!addr) {
                    addr = data['result'][0];
                }
                // 如果下面已经有填内容，则不进行地址自动填充
                if(
                    !baidu.string.trim(me.userNameInput.value)
                    && !me.provinceSelect.value
                    && !me.citySelect.value
                    && !me.districtSelect.value
                    && !baidu.string.trim(me.addressInput.value)
                ) {
                    var address = addr['address'];
                    var province = addr['province'];
                    var city = addr['city'];
                    var district = addr['district'];
                    var name = addr['addressee'];
                    var town = addr['town'];

                    me.restoreAddress(province, city, district, address, name, town);
                }
            } else {
                baidu.dom.removeClass(selectorBtn, 'active');
            }
            baidu.dom.hide(addressesContainer);

            // 显示成功的勾
            // 隐藏获取验证码按钮
            // 设置disable
            me.vcodeInput.setAttribute('disabled', 'true');
            me.phoneInput.setAttribute('disabled', 'true');
            me.changeMobileBtn.style.display = 'inline';
            var getMobileVcodeBtn = baidu.g('ecl-weigou-get-mobile-code');
            baidu.dom.hide(getMobileVcodeBtn);
            var success = baidu.g('ecl-weigou-pur-item-success');
            success.style.display = 'block';
            baidu.dom.hide(me.vcodeVerifyBtn);
            me.verifyVcode();
        } else {
            me.responseErrorHandler(data['message']);
            me.vcodeVerifyBtn.style.display = 'inline-block';
        }

        baidu.dom.removeClass(me.vcodeVerifyBtn, 'loading');
    });
};

/**
 * 根据省市区选定select下拉框中的内容
 */
ad.widget.weigou.PurchaseView.prototype.restoreAddress = function(province, city, district, address, name, town) {
    var me = this;

    var findIndex = function(select, value){
        var options = select.options;
        var option;

        for (var i = 0; i < options.length; i++) {
            option = options[i];
            if(option.getAttribute('value') === value){
                return i;
            }
        }
        return null;
    };

    // 填充收货地址的三个下拉框
    var index = findIndex(me.provinceSelect, province);
    if(index !== null){
        me.provinceSelect.selectedIndex = index;
        me.provinceSelect.onchange();

        index = findIndex(me.citySelect, city);
        if(index !== null){
            me.citySelect.selectedIndex = index;
            me.citySelect.onchange();

            index = findIndex(me.districtSelect, district);
            if(index !== null){
                me.districtSelect.selectedIndex = index;
                me.districtSelect.onchange();

                index = findIndex(me.townSelect, town);
                if(index !== null) {
                    me.townSelect.selectedIndex = index;
                }
            }
        }
    }

    me.verifySelectAddress();
    // 填充街道地址
    me.addressInput.value = address ? address : '';
    me.verifyAddress();
    var nameInput = baidu.g('ecl-weigou-username-input');
    nameInput.value = name ? name : '';
    me.verifyUsername();

    me.refreshAddressText();

};

/**
 * 刷新收货地址
 */
ad.widget.weigou.PurchaseView.prototype.refreshAddressText = function() {
    var me = this;

    var root = me.getRoot();
    var textNode = baidu.q('ecl-weigou-pur-pick-address', root)[0];
    if(textNode) {
        var span = textNode.getElementsByTagName('span')[0];
        var text = me.provinceSelect.value + ' ' + me.citySelect.value + ' ' + me.districtSelect.value;
        if(me.townSelect.value) {
            text += ' ' + me.townSelect.value;
        }
        span.innerHTML = baidu.string.encodeHTML(
            ad.impl.weigou.util.subByte(text, 24)
        );
        span.title = text;
    }
}

/**
 * 处理提交订单失败的错误信息显示
 */
ad.widget.weigou.PurchaseView.prototype.responseErrorHandler = function(message) {
    var me = this;
    if(typeof message === 'string') {
        me.showGlobalMsg(message);
        return;
    }

    var fieldError;
    if(message['field']) {
        var value;
        for(var key in message['field']) {
            value = message['field'][key];
            switch(key) {
                case 'mobile':
                    me.verifyPhone(value);
                    break;
                case 'vcode':
                case 'mobile_vcode':
                    me.verifyVcode(value);

                    me.vcodeInput.removeAttribute('disabled');
                    var getMobileVcodeBtn = baidu.g('ecl-weigou-get-mobile-code');
                    getMobileVcodeBtn.style.display = 'block'
                    var success = baidu.g('ecl-weigou-pur-item-success');
                    success.style.display = 'none';

                    break;
                case 'name':
                    me.verifyUsername(value);
                    break;
                case 'province':
                case 'city':
                case 'district':
                    me.verifySelectAddress(value);
                    break;
                case 'address':
                    me.verifyAddress(value);
                    break;
            }
        }

        var trMap = {};
        var root = me.getRoot();
        var trs = baidu.q('ecl-weigou-pur-item', root);
        baidu.each(trs, function(tr) {
            var id = tr.getAttribute('data-id');
            if(id) {
                var errDom = baidu.q('ecl-weigou-product-errmsg', tr)[0];
                if(message['field'][id]) {
                    if(errDom) {
                        errDom.style.display = 'block';
                        errDom.innerHTML = message['field'][id];
                        fieldError = message['field'][id];
                    }
                } else {
                    errDom.style.display = 'none';
                }
            }
        });
    }
    if(message['global']) {
        me.showGlobalMsg(message['global']);
    } else {
        // 展示field错误信息
        if(fieldError) {
            if (fieldError === '无法送达') {
                fieldError = [
                    '十分抱歉，',
                    me._data['vendor'],
                    '的货到付款服务未能覆盖您所提供的地址。<br/>',
                    '您可以：<br/>',
                    '1. 到' + me._data['vendor'] + '官网，通过其他支付方式下单<br/>',
                    '2. 继续在微购选购其他类似商品'
                ].join('');
            } else if (fieldError === '库存不足') {
                fieldError = '十分抱歉，您选购的商品暂时库存不足，请尝试减少商品数量或选购其他商品。';
            }
            me.showGlobalMsg(fieldError);
        } else {
            me.hideGlobalMsg();
        }
    }
};

/**
 * 显示错误的tip
 * @param {string} msg
 */
ad.widget.weigou.PurchaseView.prototype.showGlobalMsg = function(msg) {
    var me = this;
    var root = me.getRoot();
    var tipDom = baidu.g('ecl-weigou-pur-global-msg');
    var errorDom = baidu.q('ecl-weigou-pur-global-inner', tipDom)[0];
    errorDom.innerHTML = msg;

    tipDom.style.visibility = 'hidden';
    tipDom.style.display = 'block';
    var pur = baidu.q('ecl-weigou-pur', root)[0];
    var checkPos = ad.impl.weigou.dom.getPosition(me.checkBtn);
    var containerPos = ad.impl.weigou.dom.getPosition(pur);

    var pos = {
        'top': checkPos['top'] - containerPos['top'],
        'left': checkPos['left'] - containerPos['left']
    };

    baidu.dom.setStyles(tipDom, {
        'top': (pos['top'] - tipDom.offsetHeight - 10) + 'px',
        'left': (pos['left'] - ((tipDom.offsetWidth - me.checkBtn.offsetWidth) / 2) ) + 'px'
    });

    tipDom.style.visibility = 'visible';

    me._globalTip['isGlobalTipShow'] = true;
};

ad.widget.weigou.PurchaseView.prototype.hideGlobalMsg = function() {
    var me = this;
    var errorDom = baidu.g('ecl-weigou-pur-global-msg');
    errorDom.style.display = 'none';

    me._globalTip['isGlobalTipShow'] = false;
};


/**
 * 刷新价格和总价和运费
 */
ad.widget.weigou.PurchaseView.prototype.refreshPrice = function() {
    var me = this;
    var root = me.getRoot();
    
    var isWrong = false;
    isWrong = (me.verifyPhone() 
        ^ me.verifyUsername()
        ^ me.verifyAddress()
        ^ me.verifySelectAddress())
        | !me.verifyUsername();

    if(isWrong) {
        return false;
    }

    var params = me.collectData();

    // 如果属性没发生改变，则返回，不进行运费的校准，此处去掉，否则会带来一些问题
    /*
    if(!me.judgeRecheckPrice(params, me._props)) {
        return;
    } else {
        */
        me._props['address'] = params['address'];
        me._props['province'] = params['province'];
        me._props['city'] = params['city'];
        me._props['district'] = params['district'];
        me._props['town'] = params['town'];
        me._props['data'] = params['data'];
    /*}*/

    // 显示loading & 隐藏查看运费的按钮
    baidu.dom.hide(me.checkBtn);
    baidu.dom.hide(me.submitBtn);
    me.submitLoading.style.display = 'block';

    var fareDom = baidu.g('ecl-weigou-pur-fare');
    var totalPriceDom = baidu.g('ecl-weigou-pur-total-price');
    var totalPriceText = baidu.g('ecl-weigou-pur-total-price-text');
    var fareMoneyDom = baidu.q('ecl-weigou-money', fareDom.parentNode)[0];

    me.showMask();
    ad.impl.weigou.dal.checkOrder(params, function(data) {
        data = ad.impl.weigou.json.parse(data['data']);

        baidu.dom.hide(me.submitLoading);
        if(data['success'] === 'true') {
            data = data['result'];
            var trs = baidu.q('ecl-weigou-pur-item', root);
            baidu.each(trs, function(tr) {
                var id = tr.getAttribute('data-id');
                if(data[id]) {
                    var span = baidu.q('ecl-weigou-pur-price', tr)[0];
                    span.innerHTML = parseFloat(data[id]['price']).toFixed(2);
                    span.setAttribute('data-price', data[id]['price']);
                }
                var errDom = baidu.q('ecl-weigou-product-errmsg', tr)[0];
                errDom.style.display = 'none';
            });
            // 运费是字符串
            if(data['fare']) {
                fareDom.innerHTML = data['fare'];
                fareMoneyDom.style.display = '';
            } else {
                fareMoneyDom.style.display = 'none';
                fareDom.innerHTML = '以短信确认金额为准';
            }
            totalPriceDom.innerHTML = parseFloat(data['totalPrice']).toFixed(2);
            totalPriceText.style.display = 'none';

            // 如果没问题，隐藏报错信息
            me.hideGlobalMsg();
            baidu.dom.hide(me.checkBtn);
            me.submitBtn.style.display = 'block';
            me.pricesDom.style.display = 'block';
            me.calcTotalPrice();
            
            /////////////////////////////////////////////////////////////////////////////////
            // 下面这段逻辑非常临时。。。。一定要找准时机去掉，实在扛不住BOSS的压力
            // 计算商品总价和合计的差价
            var fare = data['fare'];
            // 合计，包括运费
            var heji = parseFloat(data['totalPrice']);
            var calcedTotalPriceDom = baidu.q('ecl-weigou-pur-top-totalprice', root)[0];
            // 计算出来的总价
            var totalPrice = parseFloat(calcedTotalPriceDom.getAttribute('data-price'));

            if(!fare) {
                fare = me._defaultFare[me._data['vendor']];
                if(!fare) {
                    fare = me._defaultFare['其他'];
                }
                var fareFreeOffset = me._fareFreeOffset[me._data['vendor']];
                if(fareFreeOffset !== undefined) {
                    if(totalPrice > fareFreeOffset) {
                        fare = 0;
                    }
                }
                fareDom.innerHTML = fare + ' 以短信确认金额为准';
                fareMoneyDom.style.display = '';
            } else {
                fare = parseFloat(fare);
            }

            heji = heji - fare;
            var offersDom = baidu.g('ecl-weigou-pur-offers');
            if(heji > totalPrice) {
                fareMoneyDom.style.display = '';
                fare = fare + heji - totalPrice;
                totalPriceDom.innerHTML = (totalPrice + fare).toFixed(2);
            } else if(heji < totalPrice) {
                fareMoneyDom.style.display = '';
                var offers = (heji - totalPrice).toFixed(2);
                var offersMoney = baidu.g('ecl-weigou-pur-offers-money');
                offersMoney.innerHTML = offers;
                offersDom.style.display = 'block';
            } else {
                baidu.dom.hide(offersDom);
            }

            // 临时逻辑到此结束
            /////////////////////////////////////////////////////////////////////////////////

            me.startAddressTimer();
        } else {
            me.hidePrices();
            me.responseErrorHandler(data['message']);
        }
        me.hideMask();
    });

};

ad.widget.weigou.PurchaseView.prototype.dispose = function() {
    var me = this;
    ad.widget.weigou.PurchaseView.superClass.dispose.call(me);

    // clear interval 清空监听address改变的timer
    ad.base.clearInterval(me._checkAddressTimer);
};

/**
 * 计算总价
 */
ad.widget.weigou.PurchaseView.prototype.calcTotalPrice = function() {
    var me = this;

    var root = me.getRoot();
    var trs = baidu.q('ecl-weigou-pur-item', root);
    var total = 0;
    baidu.each(trs, function(tr) {
        var price = parseFloat(
            baidu.string.trim(
                baidu.q('ecl-weigou-pur-price', tr)[0].getAttribute('data-price')
            )
        );
        var count = parseInt(
            baidu.string.trim(
                tr.getElementsByTagName('input')[0].value
            ),
        10);
        total += price * count;
    });

    var totalPriceDom = baidu.q('ecl-weigou-pur-top-totalprice', root)[0];
    totalPriceDom.innerHTML = total.toFixed(2);
    totalPriceDom.setAttribute('data-price', total);
};

/**
 * 隐藏合计价格，隐藏提交订单按钮，展示查询运费按钮
 */
ad.widget.weigou.PurchaseView.prototype.hidePrices = function() {
    var me = this;
    ad.base.clearInterval(me._checkAddressTimer);

    baidu.dom.hide(me.submitBtn);
    baidu.dom.hide(me.pricesDom);
    me.checkBtn.style.display = 'block';
    
};

/**
 * 收集订单信息
 * @return {Object} 订单数据
 */
ad.widget.weigou.PurchaseView.prototype.collectData = function() {
    var me = this;
    var root = me.getRoot();
    var params = {};
    params['name'] = baidu.string.trim(me.userNameInput.value);
    params['mobile'] = baidu.string.trim(me.phoneInput.value);
    params['province'] = me.provinceSelect.value;
    params['city'] = me.citySelect.value;
    params['district'] = me.districtSelect.value;
    params['district_id'] = me.districtSelect.options[
        me.districtSelect.selectedIndex
    ].getAttribute('data-id') || '';
    params['address'] = baidu.string.trim(me.addressInput.value);
    params['town'] = me.townSelect.value;
    params['merchant_id'] = me._data['vendorId'];
    params['merchant'] = me._data['vendor'];

    var data = [];
    var trs = baidu.q('ecl-weigou-pur-item', root);
    baidu.each(trs, function(tr) {
        var id = tr.getAttribute('data-id');
        var input = tr.getElementsByTagName('input')[0];
        if(id) {
            data.push({
                'id': id,
                'count': parseInt(input.value, 10)
            });
        }
    });
    params['data'] = ad.impl.weigou.json.stringify(data);

    return params;
};

/**
 * 判断是否需要重新计算运费
 * @param {Object} newProps
 * @param {Object} oldProps
 * @return {boolean} true为需要重新计算
 */
ad.widget.weigou.PurchaseView.prototype.judgeRecheckPrice = function(newProps, oldProps) {
    if(oldProps['address'] === newProps['address']
       && oldProps['province'] === newProps['province']
       && oldProps['city'] === newProps['city']
       && oldProps['district'] === newProps['district']
       && oldProps['town'] === newProps['town']
       && oldProps['data'] === newProps['data']
      ) {
          return false;
      }
      return true;
};

ad.widget.weigou.PurchaseView.prototype.startAddressTimer = function() {
    var me = this;
    // Timer，定时检查address的内容是否发生改变
    me.addressValue = me.addressInput.value;
    me._checkAddressTimer = ad.base.setInterval(function() {
        if(me.addressInput.value !== me.addressValue) {
            me.hideUnreachableInfo();
            me.hidePrices();
        }
    }, 500);
};

/**
 * 隐藏无法送达的信息
 */
ad.widget.weigou.PurchaseView.prototype.hideUnreachableInfo = function() {
    var me = this;
    var root = me.getRoot();

    var trs = baidu.q('ecl-weigou-pur-item', root);
    baidu.each(trs, function(tr) {
        // 隐藏该tr下的库存不足的信息，目前还是通过信息的内容来的，因为没有errno
        var msgDom = baidu.q('ecl-weigou-product-errmsg', tr)[0];
        if(msgDom) {
            var msg = baidu.string.trim(msgDom.innerHTML);
            if(msg === '无法送达') {
                baidu.dom.hide(msgDom);
                me.hideGlobalMsg();
            }
        }
    });
};

/**
 * 显示mask
 */
ad.widget.weigou.PurchaseView.prototype.showMask = function() {
    var me = this;
    var root = me.getRoot();
    var bottom = baidu.q('ecl-weigou-pur-bottom')[0];
    var rootPos = ad.impl.weigou.dom.getPosition(root);
    var bottomPos = ad.impl.weigou.dom.getPosition(bottom);
    var height = bottomPos['top'] - rootPos['top'];

    var div = document.createElement('div');
    div.id = 'ecl-weigou-pur-mask';
    baidu.dom.setStyles(div, {
        'height': height + 'px'
    });

    var pur = baidu.q('ecl-weigou-pur', root)[0];
    pur.appendChild(div);
};

/**
 * 隐藏mask
 */
ad.widget.weigou.PurchaseView.prototype.hideMask = function() {
    baidu.dom.remove('ecl-weigou-pur-mask');
};

/* vim: set ts=4 sw=4 sts=4 tw=100 : */
