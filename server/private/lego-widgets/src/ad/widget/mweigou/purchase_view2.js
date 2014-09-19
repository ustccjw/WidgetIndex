/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/mweigou/purchase_view2.js ~ 2013/05/07 11:27:48
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 150523 $
 * @description
 * purchase_view2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/mweigou/purchase_view2.less');
goog.include('ad/widget/mweigou/purchase_view2.html');

goog.provide('ad.widget.mweigou.PurchaseView2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.mweigou.PurchaseView2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_mweigou_purchase_view2';

	/**
	 * View name
	 * @type {string}
	 */
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
    this.region = (ad.impl.weigou.user.getRegion() || '').replace('全国', '') || '北京';

    /**
     * 收货地址，包括京东和非京东
     * @type {Array}
     */
    this.addresses = ad.impl.weigou.user.getAddresses();

    /**
     * 用户的手机号
     * @type {string}
     */
    this.mobile = ad.impl.weigou.user.getMobile() || '';

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
     * @param {string} provinceName 省份名称
     * @return {number} 对应的长度
     */
    this.DEFINE_PROVINCE_NAME_LENGTH = function(provinceName) {
        return /内蒙古|黑龙江|钓鱼岛/.test(provinceName) ? 3 : 2;
    };

    this.MOBISCROLL_CSS = 'http://m.baidu.com/static/ala/ecWeigou/mobiscroll.css';
    //this.MOBISCROLL_CSS = 'http://wangyang.fe.baidu.com/tmp/weigou/mobiscroll.css';

    // this.MOBISCROLL_JS = 'http://m.baidu.com/static/ala/ecWeigou/mobiscroll.js';
    this.MOBISCROLL_JS = 'http://www.baidu.com/cache/biz/ecom/weigou/mobiscroll.js';
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
    this.validVCodeStartTime = null;

    /**
     * mobiscroll实例
     * @type {Zepto}
     */
    this.mobiscrollTarget = null;

    /**
     * 是否已经绑定地址填写框的事件
     */
    this._addressBinded = false;
};
baidu.inherits(ad.widget.mweigou.PurchaseView2, ad.widget.Widget);

/** @override */
ad.widget.mweigou.PurchaseView2.prototype.enterDocument = function() {
    var me = this;
    ad.widget.mweigou.PurchaseView2.superClass.enterDocument.call(me);

    me.$_root = $(me.getRoot());
    me.$_container = me.$_root.find('.ec-sg-weigou-' + me.name);

    // 判断是直接显示填写地址还是列出可用地址
    var addresses = me.filterAddress(
        me._data['vendor'] === '京东商城' ? '京东' : 'DEFAULT'
    );

    // 重新赋值addresses
    me.addresses = addresses;

    if (addresses.length === 0) {
        // 如果没有可选地址，直接现实填写地址框
        me.$_root.find('.ec-sg-weigou-purchase-newaddr').addClass('ec-sg-weigou-purchase-newaddr-actived');
        me.bindAddress();



        // 隐藏取消按钮
        me.$_root.find('.ec-sg-weigou-purchase-newaddr-cancel').hide();

        // 隐藏newaddr的header
        me.$_root.find('.ec-sg-weigou-purchase-newaddr header').hide();
    } else {
        // 显示可选地址
        var defaultAddr;
        if(addresses.length === 1) {
            defaultAddr = addresses[0];
        } else {
            for (var addr in addresses) {
                addr = addresses[addr];
                if (addr['is_default'] === '1') {
                    defaultAddr = addr;
                    break;
                }
            }
            if(!defaultAddr) {
                defaultAddr = addresses[addresses.length - 1];
            }
        }

        if (defaultAddr) {
            // 有默认地址
            me.showAddress(defaultAddr);
        }

        // 将历史地址填充到select中去
        var html = [
            '<option>使用之前的地址</option>'
        ];
        $.each(addresses, function(i, item) {
            html += [
                '<option>',
                    me.encodeHTML(item['addressee']),
                    ' ' + me.encodeHTML(item['address']),
                '</option>'
            ].join('');
        });
        me.g('select').html(html).change(function() {
            var i = this.selectedIndex - 1;
            if(i >= 0) {
                me.g('newaddr').removeClass('ec-sg-weigou-purchase-newaddr-actived');
                me.showAddress(me.addresses[i]);

                // 需要重新计算运费
                me.resetSubmit();
            }
        });

        if(addresses.length === 1) {
            me.g('addresses').hide();
        } else {
            me.g('addresses').show();
        }
    }

    // 加载mobiscroll所需的css和js
    $.getCSS(me.MOBISCROLL_CSS);
    $.getScript(me.MOBISCROLL_JS, function() {
        me.initMobiscroll();
    });
};

/** @override */
ad.widget.mweigou.PurchaseView2.prototype.bindEvent = function() {
    var me = this;
    ad.widget.mweigou.PurchaseView2.superClass.bindEvent.call(me);

    me.g('count').on('click', function(){
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

        me.g('goods-price td').text('￥' + (value * me.data['price']).toFixed(1));
    });

    var disabledClass = 'ec-sg-weigou-purchase-disabled';
    me.g('check').click(function() {

        var btn = $(this);
        if(btn.hasClass(disabledClass)) {
            return;
        }

        // 上面一种方式会报错
        // if(me.g('address-item').is(':visible')) {
        if(me.g('address-item').css('display') !== 'none') {

            me.checkOrder();
        } else {
            alert('您需要先选择地址');
        }
    });

    me.g('submit').click(function() {
        var btn = $(this);
        if(btn.hasClass(disabledClass)) {
            return;
        }
        if(me.g('address-item').css('display') !== 'none') {
            me.submitOrder();
        } else {
            alert('您需要先选择地址');
        }
    });

    $('#ec-sg-weigou-purchase-agreement').change(function() {
        if(this.checked) {
            me.g('submit').removeClass(disabledClass);
            me.g('check').removeClass(disabledClass);
        } else {
            me.g('submit').addClass(disabledClass);
            me.g('check').addClass(disabledClass);
        }
    });


    var newAddrActivedClass = 'ec-sg-weigou-purchase-newaddr-actived';
    me.$_root.find('.ec-sg-weigou-purchase-newaddr header').click(function() {
        var header = $(this);
        var container = header.parent();
        if(container.hasClass(newAddrActivedClass)) {
            container.removeClass(newAddrActivedClass);
        } else {
            // clear entered data
            me.g('receiver').val('');
            me.g('address').val('');
            me.g('region-dummy').html('');
            me.g('region').data('id', '');
            me.g('town').hide().html('');

            container.addClass(newAddrActivedClass);
            me.bindAddress();
        }
    });


    me.g('address-item').click(function() {
        var target = $(this);

        var data = {
            'name': me.decodeHTML(target.data('name')),
            'province': me.decodeHTML(target.data('province')),
            'city': me.decodeHTML(target.data('city')),
            'district': me.decodeHTML(target.data('district')),
            'district_id': target.data('district_id'),
            'address': me.decodeHTML(target.data('address'))
        };
        if(target.data('town')) {
            data['town'] = me.decodeHTML(target.data('town'));
        }

        me.g('receiver').val(me.decodeHTML(target.data('name')));
        me.g('region').val(
            data['province'] + ' ' +  data['city'] + ' ' + data['district']
        );
        me.g('region-dummy').text(/** @type {string} */ (me.g('region').val()));
        me.g('address').val(data['address']);

        if(data['town']) {
            me.g('town').data('currentTownName', data['town'])
                .parents('tr').show();
        }

        me.g('region').trigger('blur');


        me.$_root.find('.ec-sg-weigou-purchase-newaddr header')
            .parent().addClass(newAddrActivedClass);
        me.bindAddress();
    });
};

/**
 * 绑定地址选择事件
 */
ad.widget.mweigou.PurchaseView2.prototype.bindAddress = function() {
    var me = this;

    if (me._addressBinded) {
        return;
    }

    me.g('newaddr-ok').click(function() {
        var isPassed = me.verifyAll(true);
        if(isPassed) {
            me.g('newaddr').removeClass('ec-sg-weigou-purchase-newaddr-actived');
            me.$_root.find('.ec-sg-weigou-purchase-newaddr header').show();

            var address = me.getAddress();
            me.showAddress(address);

            // 只要添加过地址，就将取消按钮隐藏
            me.g('newaddr-cancel').show();

            me.g('select')[0].selectedIndex = 0;

            if(me.addresses.length > 0) {
                me.g('addresses').show();
            }
            me.resetSubmit();

            $('#ec-sg-weigou')[0].scrollIntoView();
        }
    });

    me.g('newaddr-cancel').click(function() {
        me.g('newaddr').removeClass('ec-sg-weigou-purchase-newaddr-actived');
    });

    me._addressBinded = true;
};

/**
 * 展示当前选中地址
 * @param {Object} address
 */
ad.widget.mweigou.PurchaseView2.prototype.showAddress = function(address) {
    var me = this;

    // 加载对应省份的详细数据
    me.g('region').val(
        address['province'] + ' ' +  address['city'] + ' ' + address['district']
    );
    me.g('region').trigger('blur');


    var addressItem = me.g('address-item');
    addressItem.html([
        '<span class="ec-sg-weigou-purchase-name">',
            me.encodeHTML(address['addressee']),
        ' </span>',
        '<span>' + me.encodeHTML(address['province']) + ' </span>',
        '<span>' + me.encodeHTML(address['city']) + ' </span>',
        '<span>' + me.encodeHTML(address['district']) + ' </span>',
        address['town'] ? ('<span>' + me.encodeHTML(address['town']) + '</span>') : '',
        '<br/>',
        '<span>' + me.encodeHTML(address['address']) + '</span>',
        '<b class="ec-sg-weigou-purchase-bottom-tag"></b>'
    ].join('')).show();

    addressItem.data(
        'name', me.encodeHTML(address['addressee'])
    ).data(
        'province', me.encodeHTML(address['province'])
    ).data(
        'city', me.encodeHTML(address['city'])
    ).data(
        'district', me.encodeHTML(address['district'])
    ).data(
        'district_id', address['district_id']
    ).data(
        'address', me.encodeHTML(address['address'])
    );
    if(address['town']) {
        addressItem.data('town', me.encodeHTML(address['town']));
    } else {
        addressItem.data('town', '');
    }

    me.g('region').val('');

};


/**
 * 转义html
 */
ad.widget.mweigou.PurchaseView2.prototype.encodeHTML = function(html) {
    return $('<div/>').text(html).html();
};

/**
 * Decode HTML
 */
ad.widget.mweigou.PurchaseView2.prototype.decodeHTML = function(html) {
    return $('<div/>').html(html).text();
};

/**
 * 获取用户填写的地址和收货人
 * @return {Object}
 */
ad.widget.mweigou.PurchaseView2.prototype.getAddress = function() {
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
        'addressee': v('receiver'),
        'province': regionNames[0],
        'city': regionNames[1],
        'district': regionNames[2],
        'district_id': regionIds[2],
        'address': v('address'),
        'town': subTownData ? subTownData[0] : ''
    };

    return params;
};

/**
 * 验证表单项
 * @param {string} name 表单项
 * @param {boolean=} changeErrorMessage 是否显示错误信息，默认为false
 * @return {boolean} 是否通过验证
 */
ad.widget.mweigou.PurchaseView2.prototype.verify = function(name, changeErrorMessage) {
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
 * @param {boolean=} changeErrorMessage 是否显示错误信息，默认为false
 * @return {boolean} 是否通过验证
 */
ad.widget.mweigou.PurchaseView2.prototype.verifyAll = function(changeErrorMessage) {
    var me = this;

    var isPassed = true;
    $.each(me.ITEM_PATTERNS, function(name, pattern) {
        if (!me.verify(String(name), changeErrorMessage)) {
            isPassed = false;
        }
    });

    return isPassed;
};

/** @override */
ad.widget.mweigou.PurchaseView2.prototype.dispose = function() {
    ad.widget.mweigou.PurchaseView2.superClass.dispose.call(this);

    if (this.mobiscrollTarget) {
        this.mobiscrollTarget.mobiscroll('destroy');
    }
};


/**
 * 拼装查看运费和提交订单请求所需要的参数
 * @return {Object.<string,(string|number)>}
 */
ad.widget.mweigou.PurchaseView2.prototype.getParams = function() {
    var me = this;

    var addressItem = me.g('address-item');
    var v = function(name) {
        return addressItem.data(name);
    };

    var params = {
        'name': v('name'),
        'mobile': me.mobile,
        'province': v('province'),
        'city': v('city'),
        'district': v('district'),
        'district_id': v('district_id'),
        'address': v('address'),
        'town': v('town') ? v('town') : '',
        'merchant_id': me.data['vendor_id'],
        'merchant': me.data['vendor'],
        'data': '[{"id":"' + me.data['id'] + '","count":"' + me.g('count').val() + '"}]',
        '_time': +new Date() - me.viewStartTime
    };

    return params;
};

/**
 * 查看运费和总价
 */
ad.widget.mweigou.PurchaseView2.prototype.checkOrder = function() {
    var me = this;

    // 给checkBtn加上disabled状态，并且将内容改成加载中...
    me.g('check').text('加载中...').addClass('ec-sg-weigou-purchase-disabled');

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
            if(result['totalPrice'] === '') {
                totalPrice = -1;
            }

            // 根据页面中单价乘以数量计算出的"商品总价"
            var goodsPrice = parseFloat(me.g('goods-price td').text().replace('￥', ''));

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
            if(totalPrice === -1) {
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

            me.g('fare').show().find('td').text('￥' + fare.toFixed(1));
            if (discount) {
                me.g('offers').show().find('td').text('￥' + discount.toFixed(1));
            } else {
                me.g('offers').hide();
            }

            me.g('details-top').html([
                '<strong>' + me.encodeHTML(params['name']) + '</strong>',
                '<span>' + (me.mobile ? me.mobile : '') + '</span>'
            ].join(''));
            me.g('details-middle').html([
                '<span>' + me.encodeHTML(params['province']) + ' </span>',
                '<span>' + me.encodeHTML(params['city']) + ' </span>',
                '<span>' + me.encodeHTML(params['district']) + ' </span>',
                params['town'] ? '<span>' + me.encodeHTML(params['town']) + ' </span>' : '',
                '<span>' + me.encodeHTML(params['address']) + '</span>'
            ].join(''));
            me.g('total-price').text(totalPrice.toFixed(1));

            // show submit btn
            me.g('check').hide();
            me.g('submit').show();

            me.g('details').show();
        } else {
            me.showServerMessage(data);
        }

        me.g('check').data('available', '1');
        me.g('check').removeClass('ec-sg-weigou-purchase-disabled').text('确定，查看运费');
    });
};

/**
 * 提交订单
 */
ad.widget.mweigou.PurchaseView2.prototype.submitOrder = function() {
    var me = this;

    // 给submit加上disabled状态，并且将内容改成加载中...
    me.g('submit').text('加载中...').addClass('ec-sg-weigou-purchase-disabled');

    var params = me.getParams();
    $.extend(params, {
        'mobile_vcode': '1',
        'need_invoice': me.g('invoice').prop('checked') ? 1 : 0,
        'data': '{"items":[{"id":"' + me.data['id']
            + '","price":"' + me.data['price']
            + '","count":"' + me.g('count').val() + '"}]}'
    });

    var retry = function() {
        ad.impl.weigou.dal.submit(params, function(data) {
            if (data['success'] === 'true') {
                me.delayTrigger(ad.impl.weigou.events.SUCCESS_VIEW, me.data);
            } else {
                me.showServerMessage(data);
            }

            me.g('submit').data('available', '1');
            me.g('submit').removeClass('ec-sg-weigou-purchase-disabled').text('确定购买');
        });
    };

    ad.impl.weigou.dal.submit(params, function(data) {
        if (data['success'] === 'true') {
            me.delayTrigger(ad.impl.weigou.events.SUCCESS_VIEW, me.data);
        } else {
            retry();
        }
    });
};

/**
 * 获取第4级地址
 * @param {string} districtId
 * @param {string=} currentTownName
 */
ad.widget.mweigou.PurchaseView2.prototype.loadTownData = function(districtId, currentTownName) {
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
 * @param {number|string} districtId 区县id
 * @param {string=} currentTownName 当前4级地址的名字
 */
ad.widget.mweigou.PurchaseView2.prototype.showTownSelect = function(districtId, currentTownName) {
    var me = this;

    var optionsHTML = '';
    $.each(me.townData[/** @type {string} */(districtId)], function(id, name) {
        currentTownName = currentTownName || name;
        optionsHTML += '<option value="' + id
            + '"' + (currentTownName == name ? ' selected="selected"' : '')
            + '>' + name + '</option>';
    });
    me.g('town').html(optionsHTML).show().parents('tr').show();

};

/**
 * 显示服务端返回的信息
 * @param {Object} data
 */
ad.widget.mweigou.PurchaseView2.prototype.showServerMessage = function(data) {
    var me = this;

    var msg = data['message'];
    if (!msg) { return; }

    var message;
    if (msg['field'] && msg['field'][me.data['id']]) {
        message = msg['field'][me.data['id']];
    } else if (msg['global']) {
        message = msg['global'];
    }

    if(message === '无法送达') {
        message = [
            '十分抱歉，',
            me.data['vendor'],
            "的货到付款服务未能覆盖您所提供的地址。\n",
            "您可以：\n",
            '1. 到' + me.data['vendor'] + "官网，通过其他支付方式下单\n",
            '2. 继续在微购选购其他类似商品'
        ].join('');
    } else if(message === '库存不足') {
        message = '十分抱歉，您选购的商品暂时库存不足，请尝试减少商品数量或选购其他商品。';
    }
    if (message) {
        alert(message);
    }
};

/**
 * 显示表单项的错误信息
 * @param {Zepto} target 表单项
 */
ad.widget.mweigou.PurchaseView2.prototype.showErrorMessage = function(target) {
    var me = this;

    var prevRow = $(target.parents('tr')[0]).prev();
    if (prevRow) {
        prevRow.find('span').show();
    }
};

/**
 * 隐藏表单项的错误信息
 * @param {Zepto} target 表单项
 */
ad.widget.mweigou.PurchaseView2.prototype.hideErrorMessage = function(target) {
    var prevRow = $(target.parents('tr')[0]).prev();
    if (prevRow) {
        prevRow.find('span').hide();
    }
};

/**
 * 重置提交按钮，隐藏运费和总价
 */
ad.widget.mweigou.PurchaseView2.prototype.resetSubmit = function() {
    var me = this;

    me.g('fare').hide();
    me.g('offers').hide();
    me.g('submit').hide();
    me.g('check').show();
    me.g('details').hide();
};

/**
 * 过滤地址，根据merchant
 */
ad.widget.mweigou.PurchaseView2.prototype.filterAddress = function(merchant) {
    var me = this;
    var addresses = [];
    var data = me.addresses;

    var item;
    for(var i = 0, length = data.length; i < length; i++) {
        item = data[i];
        if(item['merchant_id'] === merchant) {
            addresses.push(item);
        }
    }

    return addresses;
};


/**
 * 初始化mobiscroll
 */
ad.widget.mweigou.PurchaseView2.prototype.initMobiscroll = function() {
    var me = this;

    // mobiscroll所使用的对象数组
    var wheelArray = [];

    // 目标元素对应的zepto对象
    var target = $('.ec-sg-weigou-purchase-region');

    // 把target绑定在view上，方便在删除view的时候可以同时销毁mobiscroll实例
    me.mobiscrollTarget = target;

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

            return provinceData[0]
                + ' ' + (cityData[0] || '')
                + ' ' + (districtData[0] || '');
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
         * @param {number} id 地域的id
         * @param {string} name 地域的名称
         * @param {boolean=} hasChildren 是否含有子对象
         * @return {Object} 地域对象
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

        var params = {
            'all': 0,
            'province': me.regionData[provinceId][0],
            'merchant_id': me._data['vendor']
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

            // 页面会自动显示用户信息，这时要更新一下dummy元素的值
            if (region.length > 1) {
                target.mobiscroll('setValue', regionIds);
            }
        }
    });
};

/**
 * 根据名字获取页面元素
 * @param {string} itemName 名字（例如className是ec-sg-weigou-viewname-x的元素的名字就是x）
 * @return {Zepto} 元素的Zepto对象
 */
ad.widget.mweigou.PurchaseView2.prototype.g = function(itemName) {
    var me = this;

    return me.elemCache[itemName]
        || (me.elemCache[itemName]
            = me.$_container.find('.ec-sg-weigou-' + me.name + '-' + itemName)
        );
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
