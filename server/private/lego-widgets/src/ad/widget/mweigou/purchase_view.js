/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/mweigou/purchase_view.js ~ 2013/04/02 18:10:49
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * purchase_view相关的实现逻辑
 **/

goog.require('ad.impl.weigou.user');
goog.require('ad.widget.Widget');

goog.include('ad/widget/mweigou/purchase_view.less');
goog.include('ad/widget/mweigou/purchase_view.html');

goog.provide('ad.widget.mweigou.PurchaseView');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.mweigou.PurchaseView = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_mweigou_purchase_view';

    this.name = 'purchase';

    /**
     * 商品详细数据
     * @type {Object}
     */
    this.data = data;

    /**
     * 默认省份
     * @type {string}
     */
    this.region = ad.impl.weigou.user.getRegion();

    /**
     * 商品的DOM容器
     * @type {Zepto}
     */
    this.$_container = null;

    /**
     * detail view的根节点
     * @type {Zepto}
     */
    this.$_root = null;

    /**
     * 元素对象缓存，用g方法获取过的元素引用会保存在这里
     * @type {Object.<string, Zepto>}
     */
    this.elemCache = {};

    /**
     * 手机验证码的有效期（ms）
     * @type {number}
     * @const
     */
    this.VCODE_VALID_PERIOD = 30 * 60 * 1000;

    /**
     * 获取手机验证码的时间间隔（ms）
     * @type {number}
     * @const
     */
    this.GET_VCODE_INTERVAL = 60 * 1000;

    /**
     * 需要验证的表单项对应的正则
     * @type {Object.<string, RegExp>}
     * @const
     */
    this.ITEM_PATTERNS = {
        'mobile': /^1(3\d|4[57]|5[0-35-9]|8\d)\d{8}$/,
        'vcode': /.{6,}/,
        'vcode-result': /1/,
        'receiver': /./,
        'region': /./,
        'address': /./,
        'invoice': /.*/,
        'agreement': /true/
    };

    /**
     * 默认运费
     * @type {Object.<string, number>}
     * @const
     */
    this.DEFAULT_FARE = {
        '京东商城': 5,
        '当当网': 5,
        '一号店': 10,
        '买卖宝': 15,
        '顺丰优选': 10,
        '走秀网': 15,
        '其他': 10
    };

    /**
     * 可以免运费的价格额度
     * @type {Object.<string, number>}
     * @const
     */
    this.FARE_FREE_OFFSET = {
        '京东商城': 39,
        '当当网': 79,
        '一号店': 100,
        '买卖宝': 99,
        '顺丰优选': 59,
        '走秀网': 199
    };

    /**
     * 定义省份名称的长度
     * 除了3个字的几个省份外，其余的都缩短成2个字
     * @param {string} provinceName 省份名称.
     * @return {number} 对应的长度.
     */
    this.DEFINE_PROVINCE_NAME_LENGTH = function(provinceName) {
        return /内蒙古|黑龙江|钓鱼岛/.test(provinceName) ? 3 : 2;
    };

    this.MOBISCROLL_CSS = 'http://m.baidu.com/static/ala/ecWeigou/mobiscroll.css';
    //this.MOBISCROLL_CSS = 'http://wangyang.fe.baidu.com/tmp/weigou/mobiscroll.css';

    this.MOBISCROLL_JS = 'http://m.baidu.com/static/ala/ecWeigou/mobiscroll-1.js';
    // this.MOBISCROLL_JS = 'http://www.baidu.com/cache/biz/ecom/weigou/mobiscroll.js';
    //this.MOBISCROLL_JS = 'http://wangyang.fe.baidu.com/tmp/weigou/mobiscroll.js';

    // 地域选择器对每个省份的最大请求次数
    this.MAX_REQUEST_COUNT = 1;

    // 地域选择器默认的动画速度(ms)
    this.DEFAULT_ANIMATION_SPEED = 350;

    /**
     * 全部地域数据（前三级）
     * @type {Object.<string, Array>}
     */
    this.regionData = {};

    /**
     * 4级地址数据
     * @type {Object.<string, Object>}
     */
    this.townData = {};

    /**
     * 当前view的开始时间
     * @type {number}
     */
    this.viewStartTime = +new Date();

    /**
     * 验证码有效期的开始时间
     * 如果用户点击了"获取验证码"，说明使用的是临时验证码，则有效期从获取时开始
     * 如果用户未点击"获取验证码"，直接验证成功，说明使用的是固定验证码，有效期从验证成功开始
     * @type {?number}
     */
    this.validVCodeStartTime;

    /**
     * mobiscroll实例
     * @type {Zepto}
     */
    this.mobiscrollTarget;
};
baidu.inherits(ad.widget.mweigou.PurchaseView, ad.widget.Widget);

/** @override */
ad.widget.mweigou.PurchaseView.prototype.enterDocument = function() {
    ad.widget.mweigou.PurchaseView.superClass.enterDocument.call(this);

    // vcode HERE
    var me = this;

    me.$_root = $(me.getRoot());
    me.$_container = me.$_root.find('.ec-sg-weigou-' + me.name);
};

/** @override */
ad.widget.mweigou.PurchaseView.prototype.dispose = function() {
    ad.widget.mweigou.PurchaseView.superClass.dispose.call(this);

    if (this.mobiscrollTarget) {
        this.mobiscrollTarget.mobiscroll('destroy');
    }
};

/** @override */
ad.widget.mweigou.PurchaseView.prototype.bindEvent = function() {
    ad.widget.mweigou.PurchaseView.superClass.bindEvent.call(this);

    var me = this;

    // 显示当前session的用户信息
    me.showUserData();

    // 加载mobiscroll所需的css和js
    $.getCSS(me.MOBISCROLL_CSS);
    $.getScript(me.MOBISCROLL_JS, function() {
        me.initMobiscroll();
    });


    // 给表单元素绑定验证事件
    $.each(me.ITEM_PATTERNS, function(name, pattern) {
        me.bindVerifyEvent(String(name), pattern);
    });

    me.g('count').on('click', function() {
        this.select();
    });

    // 商品数量是单独做验证和处理的
    me.g('count').blur(function() {
        // 取值区间[1,999]，默认值为1
        var value = Math.min(999, Math.max(1, parseInt($(this).val(), 10))) || 1;
        $(this).val(value);

        // 如果数量改变，要重置提交按钮
        if (value !== $(this).data('previous')) {
            $(this).data('previous', value);
            me.resetSubmit();
        }

        me.g('goods-price').text('￥' + (value * me.data['price']).toFixed(2));
    });

    // 手机号改变时要清空验证码，显示验证按钮，隐藏验证成功的图标
    me.g('mobile').blur(function() {
        if ($.trim(this.value) !== $(this).data('previous')) {
            $(this).data('previous', $.trim(this.value));

            me.g('vcode').val('').data('previous', '');
            me.g('vcode-ok').hide();
            me.g('vcode-checker').show();
            me.g('vcode-result').val('0');

            // 更新提交按钮的状态
            me.verifyAll(false);
        }
    });

    // 点击"获取手机验证码"
    me.g('vcode-getter').click(function() {
        me.getVCode();
        return false;
    }).data('available', '1');

    // 点击"更改手机号"
    me.g('change-mobile').click(function() {
        // 启用输入框
        me.g('vcode-checker').show();
        me.g('vcode-getter').show();
        me.g('change-mobile').hide();
        me.g('vcode-ok').hide();
        me.g('vcode').val('').removeAttribute('disabled');
        me.g('mobile').val('').removeAttribute('disabled');
        // 如果有地址的手机切换到没地址的手机
        me._resetAddressFields();
        return false;
    });

    // 验证码改变
    me.g('vcode').blur(function() {
        if ($.trim(this.value) !== $(this).data('previous')) {
            $(this).data('previous', $.trim(this.value));

            // 之前可能已经验证成功了，要改回未验证的状态
            me.g('vcode-ok').hide();
            me.g('vcode-checker').show();
            me.g('vcode-result').val('0');

            // blur就校验一下
            me.checkVCode();
        }
    });

    // 点击"验证"
    me.g('vcode-checker').click(function() {
        me.checkVCode();
        return false;
    }).data('available', '1');

    // 改变收件人/收货地址/详细地址后，要重置历史地址和提交按钮
    $(['receiver', 'region', 'town', 'address']).each(function(i, name) {
        me.g(String(name)).blur(function() {
            if ($.trim(this.value) !== $(this).data('previous')) {
                $(this).data('previous', $.trim(this.value));
                me.g('addresses')[0].selectedIndex = 0;
                me.resetSubmit();
            }
        });
    });

    // 改变4级地址后要保存到userData
    /*
    me.g('town').change(function() {
        // FIXME town应该如何处理?
        // me.setUserData('town', $(this.options[this.selectedIndex]).text());
    });
    */

    // 点击提交按钮
    me.g('submit').click(function() {
        if ($(this).data('available') == '0') {
            return;
        }
        $(this).data('available', '0');

        if (me.verifyAll(true)) {
            $(this).addClass('ec-sg-weigou-purchase-disabled');

            if ($(this).text() === '确定，查看运费') {
                me.checkOrder();
            } else {
                me.submitOrder();
            }

            $(this).text('加载中...');
        }
        else {
            $(this).data('available', '1');
        }

        return false;
    }).data('available', '1');

    // 避免在手机虚拟键盘上点击"前往"时就提交表单
    me.g('form').submit(function() {
        return false;
    });
};

/**
 * 根据名字获取页面元素
 * @param {string} itemName 名字（例如className是ec-sg-weigou-viewname-x的元素的名字就是x）.
 * @return {Zepto} 元素的Zepto对象.
 */
ad.widget.mweigou.PurchaseView.prototype.g = function(itemName) {
    var me = this;

    return me.elemCache[itemName]
        || (me.elemCache[itemName]
            = me.$_container.find('.ec-sg-weigou-' + me.name + '-' + itemName)
        );
};

/**
 * 显示表单项的错误信息
 * @param {Zepto} target 表单项.
 */
ad.widget.mweigou.PurchaseView.prototype.showErrorMessage = function(target) {
    var me = this;

    var nextRow = $(target.parents('tr')[0]).next();
    if (nextRow && nextRow.hasClass('ec-sg-weigou-purchase-error')) {
        nextRow.show();
    }
};

/**
 * 隐藏表单项的错误信息
 * @param {Zepto} target 表单项.
 */
ad.widget.mweigou.PurchaseView.prototype.hideErrorMessage = function(target) {
    var nextRow = $(target.parents('tr')[0]).next();
    if (nextRow && nextRow.hasClass('ec-sg-weigou-purchase-error')) {
        nextRow.hide();
    }
};

/**
 * 验证表单项
 * @param {string} name 表单项.
 * @param {boolean=} changeErrorMessage 是否显示错误信息，默认为false.
 * @return {boolean} 是否通过验证.
 */
ad.widget.mweigou.PurchaseView.prototype.verify = function(name, changeErrorMessage) {
    var me = this;

    var target = me.g(name);
    var value;
    if (target.attr('type') == 'checkbox') {
        value = target.prop('checked');
    }
    else {
        value = $.trim(String(target.val()));
    }
    var pattern = me.ITEM_PATTERNS[name];
    var isPassed = pattern.test(value);

    if (changeErrorMessage) {
        if (isPassed) {
            me.hideErrorMessage(target);
        }
        else {
            me.showErrorMessage(target);
        }
    }

    return isPassed;
};

/**
 * 验证全部表单项，并根据验证结果控制提交按钮的状态
 * @param {boolean=} changeErrorMessage 是否显示错误信息，默认为false.
 * @return {boolean} 是否通过验证.
 */
ad.widget.mweigou.PurchaseView.prototype.verifyAll = function(changeErrorMessage) {
    var me = this;

    var isPassed = true;
    $.each(me.ITEM_PATTERNS, function(name, pattern) {
        if (!me.verify(String(name), changeErrorMessage)) {
            isPassed = false;
        }
    });

    if (isPassed) {
        me.g('submit').removeClass('ec-sg-weigou-purchase-disabled');
    }
    else {
        me.g('submit')
            .text('确定，查看运费')
            .addClass('ec-sg-weigou-purchase-disabled');
    }

    return isPassed;
};

/**
 * 显示服务端返回的信息
 * @param {Object} data
 */
ad.widget.mweigou.PurchaseView.prototype.showServerMessage = function(data) {
    var me = this;

    var msg = data['message'];
    if (!msg) { return; }

    var message;
    if (msg['field'] && msg['field'][me.data['id']]) {
        message = msg['field'][me.data['id']];
    } else if (msg['global']) {
        message = msg['global'];
    }

    if (message === '无法送达') {
        message = [
            '十分抱歉，',
            me.data['vendor'],
            '的货到付款服务未能覆盖您所提供的地址。\n',
            '您可以：\n',
            '1. 到' + me.data['vendor'] + '官网，通过其他支付方式下单\n',
            '2. 继续在微购选购其他类似商品'
        ].join('');
    } else if (message === '库存不足') {
        message = '十分抱歉，您选购的商品暂时库存不足，请尝试减少商品数量或选购其他商品。';
    }
    if (message) {
        alert(message);
    }
};

/**
 * 绑定事件对表单项做验证，验证失败则显示错误提示
 * @param {string} name 表单项的类型.
 * @param {RegExp} pattern 需要匹配的正则.
 */
ad.widget.mweigou.PurchaseView.prototype.bindVerifyEvent = function(name, pattern) {
    var me = this;
    var target = me.g(name);
    var eventName = (target.attr('type') == 'checkbox') ? 'change' : 'blur';
    target[eventName](function() {
        me.verify(name, true);

        // 更新提交按钮的状态
        me.verifyAll(false);
    });
};

/**
 * 获取手机验证码
 */
ad.widget.mweigou.PurchaseView.prototype.getVCode = function() {
    var me = this;

    if (!me.verify('mobile', true)
        || me.g('vcode-getter').data('available') == '0'
    ) {
        return;
    }
    me.g('vcode-getter')
        .data('available', '0')
        .addClass('ec-sg-weigou-purchase-disabled');

    // 控制获取手机验证码的时间间隔
    var startTime = new Date();
    var delay = function() {
        var detal = new Date() - startTime;
        if (detal < me.GET_VCODE_INTERVAL) {
            var timeLeft = parseInt((me.GET_VCODE_INTERVAL - detal) / 1000, 10);
            me.g('vcode-getter').text(timeLeft + '秒后可重试');
            ad.base.setTimeout(delay, 1000);
        }
        else {
            me.g('vcode-getter')
                .data('available', '1')
                .removeClass('ec-sg-weigou-purchase-disabled')
                .text('获取验证码');
        }
    };
    delay();

    var number = me.g('mobile').val();
    ad.impl.weigou.dal.getMobileVCode(number, function(data) {
        if (data['success'] !== 'true') {
            me.showServerMessage(data);
        }
    });
};

/**
 * 验证手机验证码
 * 如果验证成功，就把服务端返回的已有地址显示在select框中
 */
ad.widget.mweigou.PurchaseView.prototype.checkVCode = function() {
    var me = this;

    if (!me.verify('vcode', true)
        || !me.verify('mobile', true)
        || me.g('vcode-checker').data('available') == '0'
    ) {
        return;
    }
    me.g('vcode-checker').data('available', '0');

    var params = {
        'mobile': me.g('mobile').val(),
        'mobile_vcode': me.g('vcode').val()
        // 'merchant': me.data['vendor'],
        // 'merchant_id': me.data['vendor_id']
    };

    ad.impl.weigou.dal.addressesV2(params, function(data) {
        if (data['success'] == 'true') {
            me.g('vcode-checker').hide();
            me.g('vcode-ok').show();
            me.g('vcode-result').val('1');

            // 保存一下我的收货地址.
            ad.impl.weigou.user.setAddresses(data['result']);

            // 显示收货地址的列表.
            me.showAddresses();

            // 登录成功
            ad.impl.weigou.user.setLoginStatus({
                'mobile': me.g('mobile').val(),
                'vcode': me.g('vcode').val(),
                'startTime': new Date().getTime()
            });

            // 验证通过之后，默认禁用输入框.
            me.g('vcode').attr('disabled', 'disabled');
            me.g('mobile').attr('disabled', 'disabled');
            me.g('vcode-getter').hide();
            me.g('change-mobile').show();
        }
        else {
            me.g('vcode-ok').hide();
            me.g('vcode-checker').show();
            me.g('vcode-result').val('0');
            me.showErrorMessage(me.g('vcode'));
        }

        // 更新提交按钮的状态
        me.verifyAll(false);

        me.g('vcode-checker').data('available', '1');
    });
};

/**
 * 清空地域相关的控件
 * @private
 */
ad.widget.mweigou.PurchaseView.prototype._resetAddressFields = function() {
    var elements = ['receiver', 'region', 'address'];
    for (var i = 0; i < elements.length; i++) {
        this.g(elements[i]).val('');
    }
    if (this.mobiscrollTarget) {
        this.mobiscrollTarget.mobiscroll('setValue', [0, 0, 0]);
    }
    this.g('addresses').parents('tr').hide();
    this.g('town').parents('tr').hide();
};

/**
 * 在"使用之前的地址"select框中显示已有地址
 * @param {Array.<Object>=} opt_addresses 全部已有地址.
 */
ad.widget.mweigou.PurchaseView.prototype.showAddresses = function(opt_addresses) {
    var me = this;
    var addresses = opt_addresses || ad.impl.weigou.user.getAddresses();
    if (!addresses || addresses.length <= 0) {
        return;
    }

    var isJd = (me.data['vendor_id'] == 276);

    var defaultAddress;
    var optionsHTML = '<option>使用之前的地址</option>';
    $.each(addresses, function(i, item) {
        if (isJd) {
            if (item['merchant_id'] === '京东') {
                if (!defaultAddress || item['is_default'] === '1') {
                    defaultAddress = item;
                }

                optionsHTML +=
                    '<option data-index="' + i + '">' + item['addressee'] + ' ' + item['address'] + '</option>';
            }
        } else {
            if (item['merchant_id'] === 'DEFAULT') {
                if (!defaultAddress || item['is_default'] === '1') {
                    defaultAddress = item;
                }

                optionsHTML +=
                    '<option data-index="' + i + '">' + item['addressee'] + ' ' + item['address'] + '</option>';
            }
        }
    });
    // 找到默认地址，自动填充到表单中
    if (defaultAddress) {
        me.g('addresses').html(optionsHTML);

        me.g('addresses').change(function(e) {
            var option = this.options[this.selectedIndex];
            var i = parseInt(option.getAttribute('data-index'), 10);
            if (i > 0) {
                me.fillDetails(addresses[i]);
                me.sendLog('region-item');
            }
        });

        me.fillDetails(defaultAddress, true);

        $(me.g('addresses').parents('tr')[0]).show();
    }
};

/**
 * 选择已有地址后，设置收件人、收货地址、详细地址
 * @param {Object.<string, string>} data 地址对象.
 * @param {boolean=} opt_dontOverwrite 如果存在的话，不要覆盖.
 */
ad.widget.mweigou.PurchaseView.prototype.fillDetails = function(data, opt_dontOverwrite) {
    var me = this;
    var dontOverwrite = !!opt_dontOverwrite;

    var names = ['receiver', 'region', 'address'];

    var values = [
        data['addressee'] || '',
        data['province'] + ' ' + data['city'] + ' ' + data['district'] || '',
        data['address'] || ''
    ];

    $(names).each(function(i, name) {
        var target = me.g(String(name));
        if (dontOverwrite && !!target.val()) {
            // 如果有值（可能是用户输入的，并且设置了dontOverwrite的标记，那么不要覆盖）
        } else {
            // 1. 没有任何输入
            // 2. 没有设置dontOverwrite标记（选择常用地址的逻辑）
            target.val(values[i]);
        }

        // 如果变化了就要重置提交按钮
        if ($.trim(values[i]) !== target.data('previous')) {
            target.data('previous', $.trim(values[i]));
            me.resetSubmit();
        }
    });

    // 把4级地址的名字写进元素data
    // 后面触发region的blur事件后，4级地址会被加载
    if (data['town']) {
        me.g('town')
            .data('currentTownName', data['town'])
            .parents('tr').show();
    }

    me._refreshDummyText();

    // 填充之后要全部校验一次，更新错误提示和提交按钮的状态
    me.verifyAll(true);
};

/**
 * @private
 */
ad.widget.mweigou.PurchaseView.prototype._refreshDummyText = function() {
    var me = this;
    var regionNodeId = me.g('region')[0].id;
    if (regionNodeId) {
        // 要同时更新mobiscroll显示的dummy元素的值
        var dummy = $('#' + regionNodeId + '_dummy');
        dummy.text(/** @type {string} */ (me.g('region').val()));

        // 触发region的blur事件
        // 为了使mobiscroll去更新当前地域对应的相关数据
        // 以及更新四级地址的状态
        me.g('region').trigger('blur');
    }
};

/**
 * 获取第4级地址
 * @param {string} districtId
 * @param {string=} currentTownName
 */
ad.widget.mweigou.PurchaseView.prototype.loadTownData = function(districtId, currentTownName) {
    var me = this;

    if (String(districtId) in me.townData
        && {}.toString.call(me.townData[districtId]) == '[object Object]'
    ) {
        me.showTownSelect(districtId, /** @type {string} */(currentTownName));
    }
    else {
        var params = {
            'district_id': districtId
        };
        ad.impl.weigou.dal.jd_town(params, function(res) {
            if (res['success'] == 'true') {
                me.townData[districtId] = res['result'];

                // 显示4级地址选择框
                me.showTownSelect(districtId, currentTownName);
            }
        });
    }
};

/**
 * 显示4级地址选择框
 * @param {number|string} districtId 区县id.
 * @param {string=} currentTownName 当前4级地址的名字.
 */
ad.widget.mweigou.PurchaseView.prototype.showTownSelect = function(districtId, currentTownName) {
    var me = this;

    var optionsHTML = '';
    $.each(me.townData[/** @type {string} */(districtId)], function(id, name) {
        currentTownName = currentTownName || name;
        optionsHTML += '<option value="' + id
            + '"' + (currentTownName == name ? ' selected="selected"' : '')
            + '>' + name + '</option>';
    });
    me.g('town').html(optionsHTML)
        .parents('tr').show();

    // 保存到userData
    // me.setUserData('districtId', districtId);
    // me.setUserData('town', currentTownName);
    // me.setUserData('townData', me.townData[/** @type {string} */ (districtId)]);
};

/**
 * 重置提交按钮，隐藏运费和总价
 */
ad.widget.mweigou.PurchaseView.prototype.resetSubmit = function() {
    var me = this;

    me.g('total-price').parents('tr').hide();
    me.g('submit').text('确定，查看运费');
};

/**
 * 拼装查看运费和提交订单请求所需要的参数
 * @return {Object.<string,(string|number)>}
 */
ad.widget.mweigou.PurchaseView.prototype.getParams = function() {
    var me = this;

    var v = function(name) {
        return me.g(name).val();
    };

    var regionNames = v('region').split(' ');
    var regionIds = me.g('region').data('id').split(' ');

    // 从townData里面提取townName
    var town = me.townData[regionIds[2]];
    var subTownData = town ? town[v('town')] : '';

    var params = {
        'name': v('receiver'),
        'mobile': v('mobile'),
        'province': regionNames[0],
        'city': regionNames[1],
        'district': regionNames[2],
        'district_id': regionIds[2],
        'address': v('address'),
        'town': subTownData ? subTownData[0] : '',
        'merchant_id': me.data['vendor_id'],
        'merchant': me.data['vendor'],
        'data': '[{"id":"' + me.data['id'] + '","count":"' + v('count') + '"}]',
        '_time': +new Date() - me.viewStartTime
    };

    return params;
};

/**
 * 查看运费和总价
 */
ad.widget.mweigou.PurchaseView.prototype.checkOrder = function() {
    var me = this;

    var params = me.getParams();
    ad.impl.weigou.dal.checkOrder(params, function(data) {
        if (data['success'] === 'true'
            && data['result'][me.data['id']]
        ) {
            var result = data['result'];

            /*
             * 下面这段逻辑比较蛋疼 -_-|||
             * 商品总价和合计是不会变的，要根据这两个东西来调整运费和优惠
             */

            // 服务端返回的合计（合计=商品总价+运费-优惠）
            var totalPrice = Math.floor(parseFloat(result['totalPrice']) * 100) / 100;
            if (result['totalPrice'] === '') {
                totalPrice = -1;
            }

            // 根据页面中单价乘以数量计算出的"商品总价"
            var goodsPrice = parseFloat(me.g('goods-price').text().replace('￥', ''));

            // 先确定运费
            // 如果服务端不返回运费就得自己估算。如果超过免运费额度，运费就是0
            var fare;
            if (result['fare']) {
                fare = parseFloat(result['fare']);
            }
            else {
                fare = me.DEFAULT_FARE[me.data['vendor']] || me.DEFAULT_FARE['其他'];
                var fareFreeOffset = me.FARE_FREE_OFFSET[me.data['vendor']];
                if (fareFreeOffset && goodsPrice >= fareFreeOffset) {
                    fare = 0;
                }
            }
            // 如果totalPrice为空，默认totalPrice等于运费和当前价格的总和
            if (totalPrice === -1) {
                totalPrice = fare + goodsPrice;
            }

            // 如果合计减掉运费后高于商品总价，就把运费调高
            // 如果合计减掉运费后低于商品总价，就把差价作为优惠
            var discount;
            if (totalPrice - fare > goodsPrice) {
                fare = totalPrice - goodsPrice;
            }
            else if (totalPrice - fare < goodsPrice) {
                discount = Math.abs(totalPrice - fare - goodsPrice);
            }

            me.g('fare').find('span').text('￥' + fare.toFixed(2));
            if (discount) {
                me.g('discount').show().find('span').text('￥' + discount.toFixed(2));
            }
            else {
                me.g('discount').hide();
            }

            me.g('total-price')
                .find('strong').text('￥' + totalPrice.toFixed(2))
                .parents('tr').show();

            me.g('submit').text('确定购买');
        } else {
            me.showServerMessage(data);
            me.g('submit').text('确定，查看运费');
        }

        me.g('submit').data('available', '1');
        if (me.verifyAll(true)) {
            me.g('submit').removeClass('ec-sg-weigou-purchase-disabled');
        }
    });
};

/**
 * 提交订单
 */
ad.widget.mweigou.PurchaseView.prototype.submitOrder = function() {
    var me = this;

    var params = me.getParams();
    $.extend(params, {
        'mobile_vcode': me.g('vcode').val(),
        'need_invoice': me.g('invoice').prop('checked') ? 1 : 0,
        'data': '{"items":[{"id":"' + me.data['id']
            + '","price":"' + me.data['price']
            + '","count":"' + me.g('count').val() + '"}]}'
    });

    var retry = function() {
        ad.impl.weigou.dal.submit(params, function(data) {
            if (data['success'] === 'true') {
                me.delayTrigger(ad.impl.weigou.events.SUCCESS_VIEW, me.data);
            }
            else {
                me.showServerMessage(data);
            }

            me.g('submit').data('available', '1').text('确定购买');
            if (me.verifyAll(true)) {
                me.g('submit').removeClass('ec-sg-weigou-purchase-disabled');
            }
        });
    };

    ad.impl.weigou.dal.submit(params, function(data) {
        if (data['success'] === 'true') {
            me.delayTrigger(ad.impl.weigou.events.SUCCESS_VIEW, me.data);
        }
        else {
            retry();
        }
    });
};

/**
 * 根据sessionStorage中的userData自动显示用户信息
 */
ad.widget.mweigou.PurchaseView.prototype.showUserData = function() {
    var me = this;

    if (ad.impl.weigou.user.maybeIsLogin()) {
        // 显示手机号和验证码
        var mobile = ad.impl.weigou.user.getMobile();
        if (mobile) {
            me.g('mobile').val(mobile);
        }

        var vcode = ad.impl.weigou.user.getVcode();
        if (vcode) {
            me.g('vcode').val(vcode);
            me.g('vcode-result').val('1');
        }

        ad.impl.weigou.dal.getMyAddresses({}, function(data) {
            if (data['success'] !== 'true') {
                me.g('vcode').val('');
                me.g('vcode-result').val('0');
                me.verify('vcode', true);
                ad.impl.weigou.user.forceLogout();
            } else {
                // 保存一下我的收货地址.
                ad.impl.weigou.user.setAddresses(data['result']);

                // 显示收货地址的列表.
                me.showAddresses();

                // 改变验证按钮为已验证成功状态
                me.g('vcode-checker').hide();
                me.g('vcode-ok').show();

                me.g('vcode-getter').hide();
                me.g('change-mobile').show();

                me.g('mobile').attr('disabled', 'disabled');
                me.g('vcode').attr('disabled', 'disabled');

                me.verifyAll();
            }
        });
    }
};

/**
 * 初始化mobiscroll
 */
ad.widget.mweigou.PurchaseView.prototype.initMobiscroll = function() {
    var me = this;

    // mobiscroll所使用的对象数组
    var wheelArray = [];

    // 目标元素对应的zepto对象
    var target = $('.ec-sg-weigou-purchase-region');

    // 把target绑定在view上，方便在删除view的时候可以同时销毁mobiscroll实例
    me.mobiscrollTarget = target;
    window.mobiscrollTarget = target;

    // 这里是页面中影响到mobiscroll正常使用的敌对势力们
    // 在onshow时要把他们无情的隐藏起来，onClose时再恢复
    // 目前发现的有"其他人还关注"这个卡片，特征是className中包含"swipeX"
    var enemiesToHide = [
        '[class*=swipeX]'
    ];

    // mobiscroll的参数
    var options = {
        'preset': 'asynclist',
        'theme': navigator.userAgent.indexOf('Android') > -1 ? 'android' : 'ios',
        'display': 'bottom',
        'mode': 'scroller',
        'setText': '确定',
        'cancelText': '取消',

        // dummy元素的className
        'inputClass': 'ec-sg-weigou-purchase-region-dummy',

        // 动画速度
        'animationSpeed': me.DEFAULT_ANIMATION_SPEED,

        // 滚轮的行数
        'rows': $(window).height() >= 320 ? 5 : 3,

        // 滚轮最小宽度，改成了数组，可以对每个滚轮单独定义
        'width': [70, 85, 85],

        // 滚轮的最大宽度
        'maxWidth': ($(window).width() - 143) / 2,

        // 用于生成滚轮的数组
        'wheelArray': wheelArray,

        // 默认值
        'defaultValues': [],

        // 在格式化数据时用于通过匹配id得到中文地名
        'dataObject': me.regionData,

        // 该函数用于格式化显示到文本框中的数据
        'formatFunction': function(v, data) {
            var provinceId = v[0];
            var cityId = v[1];
            var districtId = v[2];

            var provinceData = data[provinceId] || [];
            var cityData = (provinceData[1] || [])[cityId] || [];
            var districtData = (cityData[1] || [])[districtId] || [];

            var text = (provinceData[0] || '')
                + ' ' + (cityData[0] || '')
                + ' ' + (districtData[0] || '');
            return text;
        },

        'onShow': function() {
            $.each(enemiesToHide, function(i, characteristic) {
                $(characteristic).each(function(i, elem) {
                    if ($(elem).css('display') != 'none') {
                        $(elem).hide().data('ec-sg-weigou-kick-ur-ass', '1');
                    }
                });
            });
        },

        'onClose': function() {
            $.each(enemiesToHide, function(i, characteristic) {
                $(characteristic).each(function(i, elem) {
                    if ($(elem).data('ec-sg-weigou-kick-ur-ass') == '1') {
                        $(elem).show().data('ec-sg-weigou-kick-ur-ass', '0');
                    }
                });
            });
        },

        // 如果滚动到无数据的省份，则异步加载该省份数据
        'onChange': function(text, inst) {
            var provinceId = inst['temp'][0];
            var cityId = inst['temp'][1];
            if (cityId == 0) {
                loadProvinceData(provinceId, true);
            }
        },

        // 点击确定后，要更新region
        'onSelect': function(text, inst) {
            // 更新地域输入框，并触发blur事件来触发历史地址等校验
            me.g('region')
                .val(text)
                .data('id', inst['values'].join(' '))
                .trigger('blur');
            me.sendLog('customized-address');
            var districtId = inst['values'][2];
            if (me.townData[districtId]) {
                me.loadTownData(districtId);
            }
        }
    };

    /**
     * 缩短省份显示在滚轮中的名称
     */
    var reduceProvinceName = function(provinceName) {
        var length = me.DEFINE_PROVINCE_NAME_LENGTH(provinceName);
        return provinceName.substr(0, length);
    };

    // 处理数据
    var processData = function(targetProvinceId, data) {
        // 因为每个省份的详细数据允许请求多次（由MAX_REQUEST_COUNT控制）
        // 如果前面发出的请求已经成功响应，后面的就没用了
        if (me.regionData[targetProvinceId] && me.regionData[targetProvinceId][1]) {
            return;
        }

        me.regionData = $.extend(me.regionData, data);

        /**
         * 生成一个地域对象，符合wheelArray子元素的格式要求
         * @param {number} id 地域的id.
         * @param {string} name 地域的名称.
         * @param {boolean=} hasChildren 是否含有子对象.
         * @return {Object} 地域对象.
         */
        var genObj = function(id, name, hasChildren) {
            var obj = {
                'key': id,
                'value': name,
                'children': hasChildren ? [] : null
            };
            return obj;
        };

        // 检查省份对象是否已经存在于wheelArray中，有则返回index
        var indexOfWheelArray = function(provinceId) {
            var index = -1;
            $.each(wheelArray, function(i, provinceObj) {
                if (provinceObj['key'] == provinceId) {
                    index = i;
                    return false;
                }
            });
            return index;
        };

        // 添加省份
        $.each(data, function(provinceId, provinceData) {
            if (/台湾|香港|澳门|钓鱼岛/.test(provinceData[0])) {
                return;
            }

            var provinceObj = genObj(/** @type {number} */(provinceId), reduceProvinceName(provinceData[0]), true);
            var index = indexOfWheelArray(provinceId);
            wheelArray[index > -1 ? index : wheelArray.length] = provinceObj;

            // 如果没有城市数据，就先用"加载中"对象来填补
            if (!provinceData[1]) {
                // "钓鱼岛"之类的本身就没有城市和区县，就全显示空白
                var value = (provinceId == targetProvinceId ? '' : '加载中');

                provinceObj['children'] = [{
                    'key': 0,
                    'value': value,
                    'invalid': true,
                    'children': [{
                        'key': 0,
                        'value': value,
                        'invalid': true,
                        'children': null
                    }]
                }];
                return;
            }

            // 添加城市
            $.each(provinceData[1], function(cityId, cityData) {
                var cityObj = genObj(/** @type {number} */(cityId), cityData[0], true);
                provinceObj['children'].push(cityObj);

                // 如果没有区县数据，就用空白对象来填补，避免显示出错
                if (!cityData[1]) {
                    cityObj['children'] = [{
                        'key': 0,
                        'value': '',
                        'children': null
                    }];
                    return;
                }

                // 添加区县
                $.each(cityData[1], function(districtId, districtData) {
                    var districtObj = genObj(/** @type {number} */(districtId), districtData[0]);
                    cityObj['children'].push(districtObj);

                    if (districtData[1]) {
                        me.townData[String(districtId)] = me.townData[String(districtId)] || true;
                    }
                });
            });
        });
    };

    // 根据地域名称获取地域id
    var getRegionIdsByNames = function(regionNames, data) {
        var regionIds = [0, 0, 0];

        var setRegionId = function(data, i) {
            $.each(data, function(id, subRegionData) {
                if (!regionNames[i]      // 需匹配的名称为空，则取第一个为默认值
                    || regionNames[i] == subRegionData[0]    // 名称相同
                    || (i == 0      // 如果是省份名，缩短之后相同，也算成功匹配（如"上海"和"上海市"）
                        && reduceProvinceName(regionNames[i]) == reduceProvinceName(subRegionData[0])
                    )
                ) {
                    regionIds[i] = id;

                    if (subRegionData[1]) {
                        setRegionId(subRegionData[1], i + 1);
                    }

                    return false;
                }
            });
        };

        setRegionId(data, 0);

        return regionIds;
    };

    // 响应屏幕旋转事件
    var currentOrientation = window.orientation;
    var orientationChangeHandler = function() {
        // 仅当屏幕方向发生变化时才触发
        if (window.orientation === currentOrientation) { return; }
        currentOrientation = window.orientation;

        target.mobiscroll('hide');
    };

    // 初始化mobiscroll
    var initScroller = function() {
        target.mobiscroll(options);

        // 出现这种情况的原因是：
        // 先返回了addressesV2或者getMyAddresses
        // 然后执行了initScroller
        // 导致dummy的内容为空，因此我们这里需要恢复一下内容.
        me.showAddresses();

        // 监控屏幕旋转
        // 某些android手机的orientationchange事件不靠谱，要把resize也监控了才行
        $(window).bind('resize', orientationChangeHandler)
            .bind('orientationchange', orientationChangeHandler);
    };

    // 请求计数器
    var requestCounter = [];

    /**
     * 异步加载指定省份（包括城市和区县）数据
     * @param {string} provinceId
     * @param {boolean} flowControl
     * @param {Function=} opt_callback
     */
    var loadProvinceData = function(provinceId, flowControl, opt_callback) {
        // 如果开启了flowControl，请求每个省份数据的次数不能超过MAX_REQUEST_COUNT
        if (flowControl) {
            requestCounter[provinceId] = (requestCounter[provinceId] || 0) + 1;
            if (requestCounter[provinceId] > me.MAX_REQUEST_COUNT) {
                return;
            }
        }

        // 省份数据还没有加载完毕
        if (!me.regionData[provinceId]) {
            return;
        }

        var params = {
            'all': 0,
            'province': me.regionData[provinceId][0],
            'merchant_id': me.data['vendor']
        };
        ad.impl.weigou.dal.region(params, function(res) {
            if (res['success'] == 'true') {
                var data = {};
                data[provinceId] = res.result;
                processData(provinceId, data);

                // 如果处于可视状态，则更新城市和区县
                if (target.mobiscroll('isVisible')) {
                    target.mobiscroll('updateWheels', [1, 2]);
                }

                opt_callback && opt_callback();
            }
        });
    };

    // 如果region的blur事件被触发，就要获取对应地域的id及其四级地址
    // 目前选择历史地址后会主动触发该事件
    me.g('region').blur(function() {
        var regionNames = me.g('region').val().split(' ');

        var updateRegions = function(regionIds) {
            me.g('region').data('id', regionIds.join(' '));

            target.mobiscroll('setValue', regionIds);

            // 加载4级地址
            var districtId = regionIds[2];
            var currentTownName = me.g('town').data('currentTownName');
            if (me.townData[districtId]) {
                me.loadTownData(districtId, /** @type {string} */ (currentTownName));
            }
            else {
                $(me.g('town').parents('tr')[0]).hide();
            }
        };

        // 先拿到省份id，这时该省份可能还没有城市和区县数据
        var regionIds = getRegionIdsByNames(regionNames, me.regionData);
        if (regionIds[1] != 0) {
            updateRegions(regionIds);
        }
        else {
            loadProvinceData(regionIds[0], false, function() {
                // 获取数据后要再获取一次全部的id
                regionIds = getRegionIdsByNames(regionNames, me.regionData);
                updateRegions(regionIds);
            });
        }
    });

    // 先加载全国各省份（不包括城市）以及默认省份（包括城市和区县）数据
    // 默认省份指的是
    // 1. 用户在列表页选择
    // 2. 检索端传过来的
    var region = me.region.split(' ');
    var params = {
        'all': 1,
        'province': region[0],
        'merchant_id': me.data['vendor']
    };
    ad.impl.weigou.dal.region(params, function(res) {
        if (res['success'] == 'true') {
            var regionNames = [region[0], region[1] || '', region[2] || ''];
            var regionIds = getRegionIdsByNames(regionNames, res.result);

            // 把id设置为region的data属性
            me.g('region').data('id', regionIds.join(' '));

            // 处理数据，生成wheelArray数组
            processData(regionIds[0], res.result);

            // 设置mobiscroll的默认值
            options['defaultValues'] = regionIds;

            // 隐藏region
            me.g('region').hide();

            // 初始化mobiscroll
            initScroller();

            // 如果region数组长度大于1，表明当前的用户数据已经保存在sessionStorage中了
            // 页面会自动显示用户信息，这时要更新一下dummy元素的值
            if (region.length > 1) {
                target.mobiscroll('setValue', regionIds);
            }
        }
    });
};






/* vim: set ts=4 sw=4 sts=4 tw=100: */
