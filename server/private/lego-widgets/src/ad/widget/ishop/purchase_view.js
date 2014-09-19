/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/ishop/purchase_view.js ~ 2012/11/13 18:23:51
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * purchase_view相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.require('ad.impl.ishop.urls');
goog.require('ad.impl.ishop.constants');
goog.require('ad.impl.ishop.events');
goog.require('ad.impl.ishop.dal');

goog.include('ad/widget/ishop/purchase_view.less');
goog.include('ad/widget/ishop/purchase_view.html');

goog.provide('ad.widget.ishop.PurchaseView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @param {Object} region 地域信息.
 * @extends {ad.widget.Widget}
 */
ad.widget.ishop.PurchaseView = function(data, region) {
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
    this._view = 'AD_ad_widget_ishop_purchase_view';

    this.name = 'purchase';
};
baidu.inherits(ad.widget.ishop.PurchaseView, ad.widget.Widget);

/** @override */
ad.widget.ishop.PurchaseView.prototype.enterDocument = function() {
    var me = this;
    ad.widget.ishop.PurchaseView.superClass.enterDocument.call(me);

    var root = me.getRoot();

    // 计算商品名的长度，并填写到页面中
    var nameDom = baidu.q('ishop-purchase-name', root)[0],
        name = nameDom.getAttribute('data-name');
    nameDom.innerHTML = baidu.string.encodeHTML(
        ad.impl.ishop.util.ellipsis(name, 50)
    );

    // 查看运费是否符合免运费的规则
    me.refreshPayment();

    // 显示验证码
    // me.refreshVcode();
    
    // 根据是否存在fare_free_offset字段来决定是否显示
    // 为负数表示不免运费，0表示免运费，整数表示满多少免运费
    var fareFreeOffset = parseFloat(me._data['fare_free_offset']);
    if(fareFreeOffset === 0){
        // 免运费
        var fareDom = baidu.q('ishop-purchase-fare', root)[0];
        baidu.dom.addClass(fareDom, 'free');
    }
    if(fareFreeOffset > 0){
        var fareFreeOffsetDom = baidu.g('ishop-purchase-fare-offset');
        fareFreeOffsetDom.style.display = 'inline';
    }

    // 显示地域数据
    var provinceSelect = baidu.g('ishop-purchase-province-select');
    var provinceOptions = provinceSelect.options;
    var province;
    var option;
    for(var code in me._region){
        province = me._region[code];
        option = new Option(province[0], province[0]);
        option.setAttribute('data-id', code);
        option.setAttribute('title', province[0]);
        provinceOptions.add(option);
    }

    me.nameMap = {};
    var body = baidu.q('ishop-purchase-body', root)[0];
    var inputs = body.getElementsByTagName('input');
    var selects = body.getElementsByTagName('select');
    var input, select, i, l;
    for(i = 0, l = inputs.length; i < l; i++){
        input = inputs[i];
        if(baidu.dom.hasClass(input, 'pay-method')){
            continue;
        }
        me.nameMap[input.getAttribute('name')] = input;
    }
    for(i = 0, l = selects.length; i < l; i++){
        select = selects[i];
        me.nameMap[select.getAttribute('name')] = select;
    }


    // 从本地获取数据，再决定是否展现“使用上次地址”按钮
    me.readInfo(function(info){
        if (info
            && info['name']
            && info['province']
            && info['city']
            && info['address']
            && info['mobile']) {
            var restoreBtn = baidu.g('restore-btn');
            restoreBtn.style.display = 'inline';
        }
    });
};

/** @override */
ad.widget.ishop.PurchaseView.prototype.bindEvent = function() {
    var me = this;
    ad.widget.ishop.PurchaseView.superClass.bindEvent.call(me);

    var root = baidu.g(me.getId());

    // 增加购买产品的数量和减少
    var plus = baidu.q('ishop-purchase-count-plus', root)[0],
        minus = baidu.q('ishop-purchase-count-minus', root)[0],
        countInput = baidu.q('ishop-purchase-count-input')[0];

    baidu.on(plus, 'click', function(){
        var target = this,
            num = parseInt(countInput.value, 10);
        countInput.value = num + 1;
        if((num + 1) > 999){
            countInput.value = 999;
        }
        me.refreshPayment();
    });
    baidu.on(minus, 'click', function(){
        var target = this,
            num = parseInt(countInput.value, 10);
        countInput.value = (num - 1 < 1) ? 1 : (num - 1);
        me.refreshPayment();
    });
    baidu.on(countInput, 'blur', function(){
        var num = parseInt(countInput.value, 10);
        if(!num || num < 1){
            countInput.value = 1;
        } else if(num > 999) {
            countInput.value = 999;
        } else {
            countInput.value = num;
        }
        me.refreshPayment();
    });


    // 填写送货范围链接地址
    var deliveryRangeLink = baidu.g('ishop-purchase-delivery-range');
    // deliveryRangeLink.href = ad.impl.ishop.urls.DELIVERY_RANGE;
    // 采用弹窗的方式弹出一个iframe，让用户查询购买地址
    baidu.on(deliveryRangeLink, 'click', function(){
        me.displayDeliveryRange();
    });
    

    /*
    var refreshBtn = baidu.g('ishop-purchase-refresh-vcode');
    baidu.on(refreshBtn, 'click', function(){
        me.refreshVcode();
    });
    */


    // 点击获取短信安全码
    var getMobileVcodeBtn = baidu.g('ishop-purchase-get-mobile-code');
    var phoneInput = baidu.g('ishop-purchase-mobile-input');
    // var vcodeInput = baidu.g('ishop-purchase-vcode-input');
    var isBuffered = false;
    baidu.on(getMobileVcodeBtn, 'click', function(){
        if(isBuffered){
            return;
        }
        var mobile = phoneInput.value;
        if(!me.verifyMobile(mobile)){
            me.showErrorMessage(phoneInput);
            return;
        } else {
            me.hideErrorMessage(phoneInput);
        }

        /*
        var vcode = vcodeInput.value;
        if(!vcode || vcode.length != 4){
            me.showErrorMessage(vcodeInput, '图片验证码错误');
            return;
        } else {
            me.hideErrorMessage(vcodeInput);
        }
        */

        isBuffered = true;

        // 显示倒计时
        var left = 60;
        var dispValue = getMobileVcodeBtn.innerHTML;
        var internalHandler = ad.base.setInterval(function(){
            if(!left){
                ad.base.clearInterval(internalHandler);
                getMobileVcodeBtn.innerHTML = dispValue;
                isBuffered = false;
                return;
            }
            getMobileVcodeBtn.innerHTML = '<span class="'
                + 'ishop-purchase-time-left">'
                + (--left)
                + '</span> 秒后可重新获取';
        }, 1000);

        // 发送短信验证码
        ad.impl.ishop.dal.getMobileVCode(mobile, function(data){
            if(data['success'] == 'false'){
                ad.base.clearInterval(internalHandler);
                isBuffered = false;
                getMobileVcodeBtn.innerHTML = dispValue;
                // 如果用户输入验证码错误，刷新验证码
                // me.refreshVcode();
                var message = data['message'];
                if(message['field']){
                    me.responseErrorHandler(message['field']);
                }
            } else {
                me.hideErrorMessage(
                    baidu.g('ishop-purchase-mobile-vcode-input')
                );
            }
        });
    });

    // 绑定省市区下拉框的选择事件
    var provinceSelect = baidu.g('ishop-purchase-province-select');
    var citySelect = baidu.g('ishop-purchase-city-select');
    var districtSelect = baidu.g('ishop-purchase-district-select');
    provinceSelect.onchange = function(){
        var provinceOption = provinceSelect.options[
            provinceSelect.selectedIndex
        ];
        var provinceId = provinceOption.getAttribute('data-id');

        // 先清空市与区的下拉选项
        var cityOptions = citySelect.options;
        var districtOptions = districtSelect.options;
        cityOptions.length = 0;
        cityOptions.add(new Option('-选择市-', ''))
        districtOptions.length = 0;
        districtOptions.add(new Option('-选择区-', ''))

        if(!provinceId){
            return;
        }

        var option, item;
        for(var code in me._region[provinceId][2]){
            item = me._region[provinceId][2][code];
            option = new Option(item[0], item[0]);
            option.setAttribute('data-id', code);
            option.setAttribute('title', item[0]);

            cityOptions.add(option);
        }

        citySelect.selectedIndex = 1;
        citySelect.onchange();
    };

    citySelect.onchange = function(){
        var cityOptions = citySelect.options;
        var cityOption = cityOptions[citySelect.selectedIndex];
        var cityId = cityOption.getAttribute('data-id');
        var districtOptions = districtSelect.options;
        var provinceOption = provinceSelect.options[
            provinceSelect.selectedIndex
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
            districtOptions.add(option);
        }

        districtSelect.selectedIndex = 1;
    };

    // 在firefox下当select下拉框focus的时候改变select的size会直接导致浏览器崩溃
    if(!baidu.browser.firefox && baidu.browser.ie !== 6){
        var expanded = false;
        var selectWrapper = baidu.q('select-wrapper', root)[0];
        var collapseSelect = function(){
            var focusedElement = document.activeElement;
            if( focusedElement !== provinceSelect
                && focusedElement !== citySelect
                && focusedElement !== districtSelect ){
                provinceSelect.setAttribute('size', '1');
                citySelect.setAttribute('size', '1');
                districtSelect.setAttribute('size', '1');
                // 触发浏览器重新渲染selectWrapper元素，否则IE8下不会自动缩上去
                baidu.dom.addClass(selectWrapper, 'not-existed-class');
                baidu.dom.removeClass(selectWrapper, 'not-existed-class');
                expanded = false;
            }
        };
        var expandSelect = function(){
            if(!expanded){
                provinceSelect.setAttribute('size', '4');
                citySelect.setAttribute('size', '4');
                districtSelect.setAttribute('size', '4');
                expanded = true;
            }
        };
        // 当焦点是三个下拉框，将三个下拉框都变成size是4的
        baidu.on(provinceSelect, 'focus', expandSelect);
        baidu.on(citySelect, 'focus', expandSelect);
        baidu.on(districtSelect, 'focus', expandSelect);

        baidu.on(provinceSelect, 'blur', collapseSelect);
        baidu.on(citySelect, 'blur', collapseSelect);
        baidu.on(districtSelect, 'blur', collapseSelect);

    }
    // 提交
    var submitBtn = baidu.g('ishop-purchase-submit');
    var submitted = false;
    baidu.on(submitBtn, 'click', function(){
        if(submitted){
            return;
        }
        if(!me.verify()){
            submitted = false;
            return;
        }

        var body = baidu.q('ishop-purchase-body', root)[0];

        var params = {};
        var inputs = body.getElementsByTagName('input');
        var selects = body.getElementsByTagName('select');
        var input;
        var select;
        var i;
        var l;
        var name;
        for(i = 0, l = inputs.length; i < l; i++){
            input = inputs[i];
            if(baidu.dom.hasClass(input, 'pay-method')){
                continue;
            }
            name = input.getAttribute('name');
            if(baidu.dom.hasClass(input, 'invoice')){
                if(input.checked){
                    params[name] = '1';
                } else {
                    params[name] = '0';
                }
            } else {
                params[input.getAttribute('name')] = input.value;
            }
        }
        for(i = 0, l = selects.length; i < l; i++){
            select = selects[i];
            params[select.getAttribute('name')] = select.value;
        }

        // 添加id
        params['id'] = me._data['id'];
        // 获取用户购买的数量
        params['count'] = baidu.g('ishop-purchase-count-input').value;
        // 商家名
        params['merchant_name'] = me._data['vendor'];
        // 产品名称
        params['product_name'] = me._data['name'];
        // 订单总价
        params['total_price'] = baidu.g(
            'ishop-purchase-total-pay'
        ).getAttribute('title');
        // 商品单价
        params['product_price'] = me._data['price'];
        // 商品图片地址
        params['image_url'] = me._data['logo'];
        // 运费 (目前不需要运费)
        params['carriage_price'] = me._data['carriage_price'];
        // 商品URL
        params['product_url'] = me._data['product_url'];

        // 10s内第二次点击无效
        submitted = true;
        var _s = ad.base.setTimeout(function(){
            submitted = false;
        }, 10000);
        ad.impl.ishop.dal.submit(params, function(data){
            if(data['success'] == 'true'){
                params['fare_free_offset'] = me._data['fare_free_offset'];
                // Hide main body, and display successful message
                me.trigger(ad.impl.ishop.events.SUCCESS_VIEW, params);
            } else {
                // 提交失败
                var message = data['message'];
                if(message['field']){
                    me.responseErrorHandler(message['field']);
                }
            }
        });


        var toSavedInfo = {
            'name': params['name'],
            'province': params['province'],
            'city': params['city'],
            'district': params['district'],
            'address': params['address'],
            'mobile': params['mobile']
        };
        me.saveInfo(toSavedInfo);
    });

    var restoreBtn = baidu.g('restore-btn');
    baidu.on(restoreBtn, 'click', function(){
        me.readInfo(function(data){
            me.restoreInfo(data);
        });
    });
};


/**
 * 根据当前购买的物品件数计算运费和实际应支付的金额
 */
ad.widget.ishop.PurchaseView.prototype.refreshPayment = function(){
    var me = this,
        root = baidu.g(me.getId()),
        data = me._data;

    var countInput = baidu.q('ishop-purchase-count-input')[0],
        count = parseInt(countInput.value, 10),
        payment = parseFloat(data['price']) * count,
        offset = parseFloat(data['fare_free_offset']),
        fare = parseInt(data['fare'], 10),
        fareDom = baidu.q('ishop-purchase-fare', root)[0],
        totalPriceDom = baidu.g('ishop-purchase-total-pay');
    if(offset >= 0 && payment >= offset){
        // 免运费
        baidu.dom.addClass(fareDom, 'free');
        data['carriage_price'] = 0;
    } else {
        payment += fare;
        baidu.dom.removeClass(fareDom, 'free');
        data['carriage_price'] = fare;
    }

    // 把实际应支付的金额显示出来
    totalPriceDom.innerHTML = payment.toFixed(2);
    totalPriceDom.title = payment.toFixed(2);
};

/*
 * 刷新图片验证码
 */
/*
ad.widget.ishop.PurchaseView.prototype.refreshVcode = function(){
    var me = this;
    var vcodeImage = baidu.g('ishop-purchase-vcode-image');

    ad.impl.ishop.dal.vcode(function(data){
        if(data['success'] == 'true'){
            vcodeImage.src = data['result']['url'];
        }
    });

};
*/


/**
 * 校验表单是否填写正确与完全
 * @return {boolean}
 */
ad.widget.ishop.PurchaseView.prototype.verify = function(){
    var me = this;

    var nameInput = baidu.g('ishop-purchase-name-input');
    if(!baidu.string.trim(nameInput.value)){
        me.showErrorMessage(nameInput);
        return false;
    } else {
        me.hideErrorMessage(nameInput);
    }

    var provinceSelect = baidu.g('ishop-purchase-province-select');
    if(!provinceSelect.value){
        me.showErrorMessage(provinceSelect);
        return false;
    } else {
        me.hideErrorMessage(provinceSelect);
    }

    var citySelect = baidu.g('ishop-purchase-city-select');
    if(!citySelect.value){
        me.showErrorMessage(citySelect);
        return false;
    } else {
        me.hideErrorMessage(citySelect);
    }

    // 对区进行选择性验证
    var districtSelect = baidu.g('ishop-purchase-district-select');
    if(districtSelect.options.length > 1){
        if(!districtSelect.value){
            me.showErrorMessage(districtSelect);
            return false;
        } else {
            me.hideErrorMessage(districtSelect);
        }
    }

    var addressInput = baidu.g('ishop-purchase-address-input');
    if(!baidu.string.trim(addressInput.value)){
        me.showErrorMessage(addressInput);
        return false;
    } else {
        me.hideErrorMessage(addressInput);
    }

    var mobileInput = baidu.g('ishop-purchase-mobile-input');
    if(!me.verifyMobile(mobileInput.value)){
        me.showErrorMessage(mobileInput);
        return false;
    } else {
        me.hideErrorMessage(mobileInput);
    }

    var mobileVCodeInput = baidu.g('ishop-purchase-mobile-vcode-input');
    if(!baidu.string.trim(mobileVCodeInput.value)){
        me.showErrorMessage(mobileVCodeInput);
        return false;
    } else {
        me.hideErrorMessage(mobileVCodeInput);
    }

    /*
    var vcodeInput = baidu.g('ishop-purchase-vcode-input');
    if(!vcodeInput.value){
        me.showErrorMessage(vcodeInput);
        return false;
    } else {
        me.hideErrorMessage(vcodeInput);
    }
    */

    return true;
};


/**
 * 验证手机号码是否正确
 */
ad.widget.ishop.PurchaseView.prototype.verifyMobile = function(value){
    if(!value){
        return false;
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
        return false;
    }

    return true;
};

/**
 * 根据DOM节点的位置显示错误信息
 * @param {Node} dom 没有填写的节点
 * @param {string=} opt_msg 需要显示的错误信息
 */
ad.widget.ishop.PurchaseView.prototype.showErrorMessage = function(dom, opt_msg){
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
    var errorMessage = baidu.q('ishop-purchase-error-message', td)[0];

    baidu.dom.addClass(dom, 'error');
    if(!opt_msg){
        opt_msg = errorMessage.getAttribute('title');
    }
    errorMessage.innerHTML = opt_msg;
    errorMessage.style.display = 'inline';
};

/**
 * 根据DOM节点的位置隐藏错误信息
 */
ad.widget.ishop.PurchaseView.prototype.hideErrorMessage = function(dom){
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
    var errorMessage = baidu.q('ishop-purchase-error-message', td)[0];

    baidu.dom.removeClass(dom, 'error');
    errorMessage.style.display = 'none';
};

/**
 * 如果是field错误
 */
ad.widget.ishop.PurchaseView.prototype.responseErrorHandler = function(fields){
    var me = this;
    var msg;
    var inputOrSelect;
    var msgs = [];
    for(var field in fields){
        msg = fields[field];
        inputOrSelect = me.nameMap[field];
        if(inputOrSelect){
            me.showErrorMessage(inputOrSelect, msg);
        } else {
            msgs.push(msg);
        }
    }

    if(msgs.length){
        alert(msgs.join('\n'));
    }
};

/**
 * 展示查询收货地址范围
 */
ad.widget.ishop.PurchaseView.prototype.displayDeliveryRange = function(){
    var width = 510;
    var cover = document.createElement('div');
    cover.className = 'ishop-cover';
    cover.id = 'ishop-model';

    cover.style.width = document.body.offsetWidth + 'px'
    cover.style.height = document.body.offsetHeight + 'px'
    document.body.appendChild(cover);

    var wrapper = document.createElement('div');
    wrapper.className = 'ishop-dialog-wrapper';
    wrapper.id = 'ishop-dialog-wrapper';
    wrapper.innerHTML = [
        '<div class="ishop-dialog-header">',
            '<span class="ishop-dialog-title">货到付款范围</span>',
            '<b id="ishop-dialog-close" class="ishop-dialog-close"></b>',
            '<div class="clear"></div>',
        '</div>',
        '<iframe src="' + ad.impl.ishop.urls.DELIVERY_RANGE + '"',
            'width="510" height="275" frameborder="0"',
            ' class="ishop-dialog-delivery-iframe"></iframe>'
    ].join('');

    wrapper.style.left = ((document.body.offsetWidth - width) / 2) + 'px';
    wrapper.style.top = '170px';

    document.body.appendChild(wrapper);

    var closeBtn = baidu.g('ishop-dialog-close');
    var closeDialog = function(){
        baidu.dom.remove(cover);
        baidu.dom.remove(wrapper);
    };
    baidu.on(closeBtn, 'click', closeDialog);
    baidu.on(cover, 'click', closeDialog);
};

ad.widget.ishop.PurchaseView.prototype.saveInfo = function(data){
    var datas = [];
    var key;
    var value;
    for(key in data){
        value = data[key];
        datas.push(key + '=' + encodeURIComponent(value));
    }
    ad.impl.ishop.util.storage.set(
        'app_info', datas.join('&'), function(status, val){}, {
        'expires': 10 * 3600 * 24 * 1000
        // 'expires': 30 * 1000
    });
};

ad.widget.ishop.PurchaseView.prototype.restoreInfo = function(data){
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

    // 填充名字
    var nameInput = baidu.g('ishop-purchase-name-input');
    nameInput.value = data['name'] ? data['name'] : '';
    // 填充收货地址的三个下拉框
    var provinceSelect = baidu.g('ishop-purchase-province-select');
    var citySelect = baidu.g('ishop-purchase-city-select');
    var districtSelect = baidu.g('ishop-purchase-district-select');
    var index = findIndex(provinceSelect, data['province']);
    if(index !== null){
        provinceSelect.selectedIndex = index;
        provinceSelect.onchange();

        index = findIndex(citySelect, data['city']);
        if(index !== null){
            citySelect.selectedIndex = index;
            citySelect.onchange();

            index = findIndex(districtSelect, data['district']);
            if(index !== null){
                districtSelect.selectedIndex = index;
            }
        }
    }
    // 填充接到地址
    var addressInput = baidu.g('ishop-purchase-address-input');
    addressInput.value = data['address'] ? data['address'] : '';

    // 填充手机号码
    var mobileInput = baidu.g('ishop-purchase-mobile-input');
    mobileInput.value = data['mobile'] ? data['mobile'] : '';
};

ad.widget.ishop.PurchaseView.prototype.readInfo = function(callback){
    try {
        ad.impl.ishop.util.storage.get('app_info', function(status, value){
            if(status !== 0 || !value){
                return;
            }

            var data = {};
            var datas = value.split('&');
            var ds;
            for(var d in datas) {
                d = datas[d];
                ds = d.split('=');
                data[ds[0]] = decodeURIComponent(ds[1]);
            }

            if(callback){
                callback(data);
            }
        });
    } catch (e){}
};












/* vim: set ts=4 sw=4 sts=4 tw=100 : */
