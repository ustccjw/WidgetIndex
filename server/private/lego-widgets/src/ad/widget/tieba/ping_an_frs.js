/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/tieba/ping_an_frs.js ~ 2012/11/13 10:21:03
 * @author pengxing@baidu.com (pengxing)
 * @version $Revision: 10927 $
 * @description
 * ping_an_frs相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/tieba/ping_an_frs.less');
goog.include('ad/widget/tieba/ping_an_frs.html');

goog.provide('ad.widget.tieba.PingAnFrs');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.tieba.PingAnFrs = function (data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_tieba_ping_an_frs';
};
baidu.inherits(ad.widget.tieba.PingAnFrs, ad.widget.Widget);

/** @override */
ad.widget.tieba.PingAnFrs.prototype.patchData = function () {
    if (this._data) {
        // 处理城市的数据
        var processor = new ad.widget.tieba.PingAnFrs.Processor();
        processor.process();

        var provinces = processor._provinces;
        this.provinceMap = processor._provinceMap;
        this.cityMap = processor._cityMap;

        // 创建select下拉框
        var provinceOptions = this._data['_provinces'] = [];
        for (var i = 0, l = provinces.length; i < l; i++) {
            provinceOptions.push({
                'name': provinces[i]._name,
                'value': provinces[i]._id
            });
        }

        // 填充购车时间的年份
        var yearOption = this._data['_years'] = [];
        var currentYear = (new Date()).getFullYear();
        var year;
        for(i = 0; i < 16; i++) {
            year = currentYear - i;
            yearOption.push({
                'name': year,
                'value': year
            });
        }

        // 填充保险到期月的月份
        var monthOption = this._data['_months'] = [];
        var month;
        for(i = 1; i < 13; i++) {
            month = i < 10 ? '0' + i : i;
            monthOption.push({
                'name': month,
                'value': month
            });
        }
    }
};

/** @override */
ad.widget.tieba.PingAnFrs.prototype.enterDocument = function () {
    var me = this;
    ad.widget.tieba.PingAnFrs.superClass.enterDocument.call(me);

    me.form = baidu.g('ping-an-frs-form');
    me.provinceSelect = baidu.g('ping-an-frs-province-select');
    me.citySelect = baidu.g('ping-an-frs-city-select');
    me.priceInput = baidu.g('ping-an-frs-price-input');
    me.licenseInput = baidu.g('ping-an-frs-license-input');
    me.yearSelect = baidu.g('ping-an-frs-year-select');
    me.monthSelect = baidu.g('ping-an-frs-month-select');
    me.phoneInput = baidu.g('ping-an-frs-phone-input');
    me.provinceNameInput = baidu.g('ping-an-frs-province-name');
    me.cityNameInput = baidu.g('ping-an-frs-city-name');
};

/** @override */
ad.widget.tieba.PingAnFrs.prototype.bindEvent = function () {
    var me = this;
    ad.widget.tieba.PingAnFrs.superClass.bindEvent.call(me);

    var root = baidu.g(me.getId());
    if (!root) {
        return;
    }

    // 为省份下拉框绑定事件
    me.provinceSelect.onchange = function (event) {
        event = event || window.event;
        var target = event.srcElement || event.target,
            cityOptions = me.citySelect.options;

        cityOptions.length = 0;
        cityOptions.add(new Option('请选择', ''));

        if (!target.value) {
            return;
        }
        var province = me.provinceMap[target.value];
        me.provinceNameInput.value = province._name;
        var cities = province._cities;


        for(var i = 0, l = cities.length; i < l; i++) {
            cityOptions.add(new Option(cities[i]._name, cities[i]._id));
        }

        me.licenseInput.value = me.licenseInput.getAttribute('data-value');
        me.emptyMap[me.licenseInput.name] = true;
    };

    // 为城市下拉框绑定事件
    me.citySelect.onchange = function (event) {
        event = event || window.event;
        var target = event.srcElement || event.target;
        if (!target.value) {
            me.licenseInput.value = me.licenseInput.getAttribute('data-value');
            me.emptyMap[me.licenseInput.name] = true;
            return;
        }

        var city = me.cityMap[target.value];
        me.cityNameInput.value = city._name;
        me.licenseInput.value = city._carNo + '-';
        me.emptyMap[me.licenseInput.name] = false;
    };

    baidu.on('ping-an-frs-submit', 'click', function (event) {
        event = event || window.event;
        if (me.validate()) {
            me.exchangeCharset();
            me.form.submit();
            me.exchangeCharset();
            me.onSubmitSuccess();
        }
        baidu.event.preventDefault(event);
    });


    // 实现PlaceHolder的功能
    var inputs = root.getElementsByTagName('input'),
        emptyMap = {},
        input;

    me.emptyMap = emptyMap;
    for(var i = 0, l = inputs.length; i < l; i++) {
        input = inputs[i];
        if (input.getAttribute('type') !== 'text'
            || !input.getAttribute('data-value')) {
            continue;
        }
        emptyMap[input.getAttribute('name')] = true;
        // input.value = input.getAttribute('data-value');
        /* jshint ignore:start */
        baidu.on(input, 'focus' , function (event) {
            var elem = this;
            baidu.dom.removeClass(elem, 'ec-ping-an-frs-empty');
            if (emptyMap[elem.getAttribute('name')]) {
                elem.value = '';
            }
        });

        baidu.on(input, 'blur', function () {
            var elem = this;
            if (!elem.value) {
                baidu.dom.addClass(elem, 'ec-ping-an-frs-empty');
                elem.value = elem.getAttribute('data-value');
                emptyMap[elem.getAttribute('name')] = true;
            }
            else {
                emptyMap[elem.getAttribute('name')] = false;
            }
        });
        /* jshint ignore:end */
    }
};


/**
 * @private
 */
ad.widget.tieba.PingAnFrs.prototype.exchangeCharset = function () {
    var me = this;
    var charset;
    if (baidu.browser.ie
        && me._data.charset
        && document.charset.toLowerCase() !== me._data.charset.toLowerCase()) {
        charset = document.charset;
        document.charset = me._data.charset;
        me._data.charset = charset;
    }
};

ad.widget.tieba.PingAnFrs.prototype.onSubmitSuccess = function () {
    var me = this;

    me.provinceSelect.selectedIndex = 0;

    me.citySelect.options.length = 0;
    me.citySelect.options.add(new Option('请选择', ''));

    me.priceInput.value = me.priceInput.getAttribute('data-value');
    me.emptyMap[me.priceInput.name] = true;
    baidu.dom.addClass(me.priceInput, 'ec-ping-an-frs-empty');

    me.licenseInput.value = me.licenseInput.getAttribute('data-value');

    me.yearSelect.selectedIndex = 0;
    me.monthSelect.selectedIndex = 0;

    me.phoneInput.value = me.phoneInput.getAttribute('data-value');
    me.emptyMap[me.phoneInput.name] = true;

    me.trigger(ui.events.SUBMIT_SUCCESS);
};

/**
 * 验证表单数据
 * @return {boolean} true为正确，false为错误
 */
ad.widget.tieba.PingAnFrs.prototype.validate = function () {
    var me = this;
    if (!me.provinceSelect.value) {
        me.showTip(me.provinceSelect, '请选择车辆所在省');
        return false;
    } 

    if (!me.citySelect.value) {
        me.showTip(me.citySelect, '请选择车辆所在市');
        return false;
    }

    var license = ad.string.trim(me.licenseInput.value);
    var licensePattern = /^([\u4e00-\u9fa5]){1}([a-zA-Z]){1}-([a-z0-9A-Z]){5}$/;
    if (licensePattern.test(license)) {
        if (encodeURIComponent(license).indexOf('%E7%B2%A4B') !== -1) {
            var b = license.slice(-5);
            if (!/([a-zA-Z])/.test(b)) {
                me.showTip(me.licenseInput, '请填写有效车牌号');
                return false;
            }
        }
    }
    else {
        me.showTip(me.licenseInput, '请填写有效车牌号');
        return false;
    }


    if (!me.yearSelect.value) {
        me.showTip(me.yearSelect, '请选择购车时间');
        return false;
    }

    if (!me.priceInput.value || !/^\d+$/.test(me.priceInput.value)) {
        me.showTip(me.priceInput, '请填写有效车价');
        return false;
    }

    if (!me.validatePhone(me.phoneInput.value)) {
        me.showTip(me.phoneInput, '请填写有效手机号');
        return false;
    }

    if (!me.monthSelect.value) {
        me.showTip(me.monthSelect, '请选择到期月');
        return false;
    }


    return true;
};


/**
 * 验证字符串是否符合手机号码的要求
 * @param {string} value 手机号码
 * @return {boolean} true为正确，false为错误
 */
ad.widget.tieba.PingAnFrs.prototype.validatePhone = function (value) {
    if (!value) {
        return false;
    }

    var telreg1 = new RegExp('^13\\d{9}$'),
    telreg2 = new RegExp('^14[57]\\d{8}$'),
    telreg3 = new RegExp('^15[0-35-9]\\d{8}$'),
    telreg4 = new RegExp('^18[0-9]\\d{8}$');
    if (!telreg1.test(value)
        && !telreg2.test(value)
    && !telreg3.test(value)
    && !telreg4.test(value)) {
        return false;
    }

    return true;
};

/**
 * 显示错误的tip
 * @param {Node} dom 出现错误的节点
 * @param {string} str 错误提示信息
 */
ad.widget.tieba.PingAnFrs.prototype.showTip = function (dom, str) {
    var me = this;
    var main = baidu.g('ping-an-frs-main'),
        tip = baidu.g('ping-an-frs-tip'),
        iframe = baidu.g('ping-an-frs-iframe'),
        mainPos = baidu.dom.getPosition(main),
        domPos = baidu.dom.getPosition(dom),
        pos = {};

    pos['left'] = domPos['left'] - mainPos['left'];
    pos['top'] = domPos['top'] - mainPos['top'];

    tip.style.display = iframe.style.display = 'none';
    var top = pos.top + dom.offsetHeight + 'px',
        left = pos.left + 'px',
        width = dom.offsetWidth;
    tip.style.top = iframe.style.top = top;
    tip.style.left = iframe.style.left = left;
    tip.style.width = width - 12 + 'px';

    tip.style.display = 'block';
    tip.innerHTML = str;
    iframe.style.width = dom.offsetWidth + 'px';
    iframe.style.height = tip.offsetHeight + 2 + 'px';

    iframe.style.display = 'block';
    if (me.prevDom) {
        me.prevDom.onfocus = function () {};
    }
    dom.onfocus = function () {
        tip.style.display = iframe.style.display = 'none';
    };
    me.prevDom = dom;
};

/**
 * 表示一个省份
 *
 * @constructor
 * @param {string} id 省的id
 * @param {string} name 省的名称
 */
ad.widget.tieba.PingAnFrs.Province = function (id, name) {
    this._id = id;
    this._name = name;

    this._cities = [];
};

/**
 * 添加该省城市
 * @param {ad.widget.tieba.PingAnFrs.City} city 该省的城市
 */
ad.widget.tieba.PingAnFrs.Province.prototype.add = function (city) {
    this._cities.push(city);
};


/**
 * 代表一个城市
 * @constructor
 * @param {string} id 该城市的id
 * @param {string} name 该城市的名称
 * @param {string} carNo 该城市对应的车牌号前缀 
 */
ad.widget.tieba.PingAnFrs.City = function (id, name, carNo) {
    this._id = id;
    this._name = name;
    this._carNo = carNo;
};

/**
 * 处理城市字符串
 * @constructor
 */
ad.widget.tieba.PingAnFrs.Processor = function () {
    /* jshint ignore:start */
    this._items = ['110000,北京市,110100,北京市,京A','310000,上海市,310100,上海市,沪A','440000,广东省,440100,广州市,g粤A|440300,深圳市,粤B|441900,东莞市,粤S|440183,广州市,粤A|440184,广州市,粤A|440185,广州市,粤A|440113,广州市,粤A|440114,广州市,粤A|440400,珠海市,粤C|440600,佛山市,粤E|442000,中山市,粤T|441400,梅州市,粤M|440200,韶关市,粤F|440700,江门市,粤J|440500,汕头市,粤D|441300,惠州市,粤L|441200,肇庆市,粤H|445200,揭阳市,粤V|445100,潮州市,粤U|441800,清远市,粤R|440900,茂名市,粤K|440800,湛江市,粤G|441700,阳江市,粤Q|445300,云浮市,粤W|441600,河源市,粤P|441500,汕尾市,粤N','320000,江苏省,320100,南京市,苏A|320500,苏州市,苏E|320200,无锡市,苏B|320400,常州市,苏D|320600,南通市,苏F|321200,泰州市,苏M|321000,扬州市,苏K|321100,镇江市,苏L|320300,徐州市,苏C|320800,淮安市,苏H|320900,盐城市,苏J|320582,张家港市,苏E|320583,昆山市,苏E|320581,常熟市,苏E|320585,太仓市,苏E|320584,吴江市,苏E|320281,江阴市,苏B|320282,宜兴市,苏B|321300,宿迁市,苏N|320700,连云港市,苏G|320322,沛　县,苏C|320321,丰　县,苏C|320382,邳州市,苏C|320482,金坛市,苏D|320481,溧阳市,苏D|321081,仪征市,苏K|321088,江都市,苏K|321023,宝应县,苏K|321084,高邮市,苏K|321181,丹阳市,苏L|320826,涟水县,苏H|320830,盱眙县,苏H|320831,金湖县,苏H|320829,洪泽县,苏H|320982,大丰市,苏J|320981,东台市,苏J|320924,射阳县,苏J|320925,建湖县,苏J|320923,阜宁县,苏J|320922,滨海县,苏J|320124,溧水县,苏A|320125,高淳县,苏A|320323,铜山县,苏C|320324,睢宁县,苏C|320381,新沂市,苏C|320623,如东县,苏F|320681,启东市,苏F|320682,如皋市,苏F|320683,通州市,苏F|320684,海门市,苏F|320721,赣榆县,苏G|320722,东海县,苏G|320723,灌云县,苏G|320724,灌南县,苏G|321182,扬中市,苏L|321183,句容市,苏L|321281,兴化市,苏M|321282,靖江市,苏M|321283,泰兴市,苏M|321284,姜堰市,苏M|321322,沭阳县,苏N|321323,泗阳县,苏N|321324,泗洪县,苏N','330000,浙江省,330200,宁波市,浙B|330700,金华市,浙G|330283,奉化市,浙B|330281,余姚市,浙B|330282,慈溪市,浙B|330600,绍兴市,浙D|330226,宁海县,浙B|330225,象山县,浙B|330400,嘉兴市,浙F|331000,台州市,浙J|331100,丽水市,浙K|330800,衢州市,浙H|330900,舟山市,浙L|330500,湖州市,浙E|330109,萧山区,浙A|330183,富阳市,浙A|330185,临安市,浙A|330110,余杭区,浙A|330182,建德市,浙A|330122,桐庐县,浙A|330127,淳安县,浙A|330100,杭州市,浙A|330324,永嘉县,浙C|330326,平阳县,浙C|330327,苍南县,浙C|330381,瑞安市,浙C|330382,乐清市,浙C|330421,嘉善县,浙F|330424,海盐县,浙F|330481,海宁市,浙F|330482,平湖市,浙F|330483,桐乡市,浙F|330521,德清县,浙E|330522,长兴县,浙E|330523,安吉县,浙E|330621,绍兴县,浙D|330624,新昌县,浙D|330681,诸暨市,浙D|330682,上虞市,浙D|330683,嵊州市,浙D|330723,武义县,浙G|330726,浦江县,浙G|330781,兰溪市,浙G|330782,义乌市,浙G|330783,东阳市,浙G|330784,永康市,浙G|330822,常山县,浙H|330824,开化县,浙H|330825,龙游县,浙H|330881,江山市,浙H|330921,岱山县,浙L|331021,玉环县,浙J|331022,三门县,浙J|331023,天台县,浙J|331024,仙居县,浙J|331081,温岭市,浙J|331082,临海市,浙J|331121,青田县,浙K|331122,缙云县,浙K|331123,遂昌县,浙K|331124,松阳县,浙K|331125,云和县,浙K|331126,庆元县,浙K|331127,景宁畲族自治县,浙K|331181,龙泉市,浙K|330300,温州市,浙C','370000,山东省,370100,济南市,鲁A|370200,青岛市,鲁B|370600,烟台市,鲁Y|371000,威海市,鲁K|370700,潍坊市,鲁G|370300,淄博市,鲁C|371100,日照市,鲁L|370500,东营市,鲁E|370900,泰安市,鲁J|371200,莱芜市,鲁S|371700,菏泽市,鲁R|370400,枣庄市,鲁D|371600,滨州市,鲁M|371400,德州市,鲁N|370800,济宁市,鲁H|370181,章丘市,鲁A|371500,聊城市,鲁P|371300,临沂市,鲁Q|370124,平阴县,鲁A|370125,济阳县,鲁A|370126,商河县,鲁A|370281,胶州市,鲁B|370282,即墨市,鲁B|370283,平度市,鲁B|370284,胶南市,鲁B|370285,莱西市,鲁B|370321,桓台县,鲁C|370322,高青县,鲁C|370323,沂源县,鲁C|370521,垦利县,鲁E|370522,利津县,鲁E|370523,广饶县,鲁E|370634,长岛县,鲁Y|370681,龙口市,鲁Y|370682,莱阳市,鲁Y|370683,莱州市,鲁Y|370684,蓬莱市,鲁Y|370685,招远市,鲁Y|370686,栖霞市,鲁Y|370687,海阳市,鲁Y|370724,临朐县,鲁G|370725,昌乐县,鲁G|370781,青州市,鲁G|370782,诸城市,鲁G|370783,寿光市,鲁G|370784,安丘市,鲁G|370785,高密市,鲁G|370786,昌邑市,鲁G|371081,文登市,鲁K|371082,荣成市,鲁K|371083,乳山市,鲁K|371121,五莲县,鲁L|371122,莒　县,鲁L|371321,沂南县,鲁Q|371322,郯城县,鲁Q|371323,沂水县,鲁Q|371324,苍山县,鲁Q|371325,费　县,鲁Q|371326,平邑县,鲁Q|371327,莒南县,鲁Q|371328,蒙阴县,鲁Q|371329,临沭县,鲁Q','420000,湖北省,420100,武汉市,鄂A|420300,十堰市,鄂C|420200,黄石市,鄂B|420500,宜昌市,鄂E|421100,黄冈市,鄂J|420600,襄樊市,鄂F|421000,荆州市,鄂D|420900,孝感市,鄂K|421300,随州市,鄂S|420800,荆门市,鄂H|429006,天门市,鄂R|421200,咸宁市,鄂L|429004,仙桃市,鄂M|420700,鄂州市,鄂G|429005,潜江市,鄂N|422801,恩施市,鄂Q|420683,枣阳市,鄂F|420821,京山县,鄂H|420822,沙洋县,鄂H|420881,钟祥市,鄂H|420923,云梦县,鄂K|420981,应城市,鄂K|420982,安陆市,鄂K|420984,汉川市,鄂K|422802,利川市,鄂Q|422822,建始县,鄂Q|422823,巴东县,鄂Q|422826,咸丰县,鄂Q|422827,来凤县,鄂Q|420581,宜都市,鄂E|420582,当阳市,鄂E|420583,枝江市,鄂E|420624,南漳县,鄂F|420625,谷城县,鄂F|420684,宜城市,鄂F|421022,公安县,鄂D|421023,监利县,鄂D|421081,石首市,鄂D|421087,松滋市,鄂D|421121,团风县,鄂J|421123,罗田县,鄂J|421125,浠水县,鄂J|421126,蕲春县,鄂J|421127,黄梅县,鄂J|421181,麻城市,鄂J|421182,武穴市,鄂J|421223,崇阳县,鄂L|421281,赤壁市,鄂L','210000,辽宁省,210100,沈阳市,辽A|210200,大连市,辽B|210300,鞍山市,辽C|210800,营口市,辽H|211100,盘锦市,辽L|210700,锦州市,辽G|211200,铁岭市,辽M|210600,丹东市,辽F|211000,辽阳市,辽K|211400,葫芦岛市,辽P|210400,抚顺市,辽D|210500,本溪市,辽E|211300,朝阳市,辽N|210900,阜新市,辽J|210281,瓦房店市,辽B|210282,普兰店市,辽B|210283,庄河市,辽B|210381,海城市,辽C','510000,四川省,510100,成都市,川A|510400,攀枝花市,川D|510700,绵阳市,川B|510500,泸州市,川E|511900,巴中市,川Y|511100,乐山市,川L|513200,阿坝藏族羌族自治州,川U|511500,宜宾市,川Q|510600,德阳市,川F|511600,广安市,川X|510300,自贡市,川C|511800,雅安市,川T|511700,达州市,川S|510900,遂宁市,川J|513400,凉山彝族自治州,川W|513401,西昌市,川W|511400,眉山市,川Z|511300,南充市,川R|512000,资阳市,川M|511000,内江市,川K|510722,三台县,川B|510723,盐亭县,川B|510724,安　县,川B|510725,梓潼县,川B|510726,北川羌族自治县,川B|510727,平武县,川B|510121,金堂县,川A|510122,双流县,川A|510124,郫　县,川A|510129,大邑县,川A|510131,蒲江县,川A|510132,新津县,川A|510181,都江堰市,川A|510182,彭州市,川A|510183,邛崃市,川A|510184,崇州市,川A|510781,江油市,川B|510800,广元市,川H|511024,威远县,川K|511025,资中县,川K|511028,隆昌县,川K|511321,南部县,川R|511421,仁寿县,川Z|513300,甘孜藏族自治州,川v|511526,珙　县,川Q','120000,天津市,120100,天津市,津A','500000,重庆市,500100,重庆市,渝A','610000,陕西省,610100,西安市,陕A|610400,咸阳市,陕D|610300,宝鸡市,陕C|610500,渭南市,陕E|610700,汉中市,陕F|610800,榆林市,陕K|610600,延安市,陕J|610900,安康市,陕G|610200,铜川市,陕B|611000,商洛市,陕H|610122,蓝田县,陕A|610126,高陵县,陕A|610323,岐山县,陕C|610324,扶风县,陕C|610422,三原县,陕D|610423,泾阳县,陕D|610427,彬　县,陕D|610481,兴平市,陕D|610521,华　县,陕E|610525,澄城县,陕E|610526,蒲城县,陕E|610528,富平县,陕E|610581,韩城市,陕E|610623,子长县,陕J|610625,志丹县,陕J|610626,吴旗县,陕J|610722,城固县,陕F|610723,洋　县,陕F|610724,西乡县,陕F|610725,勉　县,陕F|610727,略阳县,陕F|610821,神木县,陕K|610822,府谷县,陕K|610823,横山县,陕K|610824,靖边县,陕K|610825,定边县,陕K|610826,绥德县,陕K|610827,米脂县,陕K|610928,旬阳县,陕G|611026,柞水县,陕H','410000,河南省,410100,郑州市,豫A|410300,洛阳市,豫C|410700,新乡市,豫G|411400,商丘市,豫N|410200,开封市,豫B|410500,安阳市,豫E|411000,许昌市,豫K|410800,焦作市,豫H|411300,南阳市,豫R|410400,平顶山市,豫D|410900,濮阳市,豫J|411600,周口市,豫P|411500,信阳市,豫S|411100,漯河市,豫L|411200,三门峡市,豫M|411700,驻马店市,豫Q|410881,济源市,豫H|410600,鹤壁市,豫F|410122,中牟县,豫A|410181,巩义市,豫A|410182,荥阳市,豫A|410183,新密市,豫A|410184,新郑市,豫A|410185,登封市,豫A|410522,安阳县,豫E|410523,汤阴县,豫E|410526,滑　县,豫E|410527,内黄县,豫E|410581,林州市,豫E','130000,河北省,130100,石家庄市,冀A|130200,唐山市,冀B|130600,保定市,冀F|130300,秦皇岛市,冀C|131000,廊坊市,冀R|130400,邯郸市,冀D|130900,沧州市,冀J|130500,邢台市,冀E|131100,衡水市,冀T|130700,张家口市,冀G|130800,承德市,冀H','430000,湖南省,430100,长沙市,湘A|430300,湘潭市,湘C|430600,岳阳市,湘F|430200,株洲市,湘B|431000,郴州市,湘L|430400,衡阳市,湘D|430500,邵阳市,湘E|430700,常德市,湘J|431300,娄底市,湘K|430900,益阳市,湘H|431200,怀化市,湘N|431100,永州市,湘M|433101,吉首市,湘U|430800,张家界市,湘G|430121,长沙县,湘A|430122,望城县,湘A|430124,宁乡县,湘A|430181,浏阳市,湘A|430421,衡阳县,湘D|430481,耒阳市,湘D|430922,桃江县,湘H|430923,安化县,湘H|430981,沅江市,湘H|431081,资兴市,湘L','530000,云南省,530100,昆明市,云A|532901,大理市,云L|532529,红河县,云G|530400,玉溪市,云F|530300,曲靖市,云D|530800,普洱市,云J|533100,德宏傣族景颇族自治州,云N|530500,保山市,云M|530900,临沧市,云S|530700,丽江市,云P|532301,楚雄市,云E|532600,文山壮族苗族自治州,云H|530600,昭通市,云C|532800,西双版纳傣族自治州,云K|533300,怒江傈僳族自治州,云Q|533400,迪庆藏族自治州,云R|530128,禄劝彝族苗族自治县,云A|530522,腾冲县,云M|530623,盐津县,云C|530627,镇雄县,云C|530630,水富县,云C|530723,华坪县,云P|530824,景谷傣族彝族自治县,云J|530921,凤庆县,云S|530922,云　县,云S|530926,耿马傣族佤族自治县,云S|532324,南华县,云E|532327,永仁县,云E|532328,元谋县,云E|532329,武定县,云E|532331,禄丰县,云E|532501,个旧市,云G|532502,开远市,云G|532522,蒙自县,云G|532524,建水县,云G|532525,石屏县,云G|532526,弥勒县,云G|532527,泸西县,云G|532532,河口瑶族自治县,云G|532622,砚山县,云H|532923,祥云县,云L|532924,宾川县,云L|532925,弥渡县,云L|532930,洱源县,云L|532932,鹤庆县,云L|533102,瑞丽市,云N|532300,楚雄彝族自治州,云E|532500,红河哈尼族彝族自治州,云G|532900,大理白族自治州,云L','220000,吉林省,220100,长春市,吉A|220500,通化市,吉E|220800,白城市,吉G|220600,白山市,吉F|220200,吉林市,吉B|220700,松原市,吉J|220300,四平市,吉C|222401,延吉市,吉H|220282,桦甸市,吉B|220400,辽源市,吉D|220122,农安县,吉A|220181,九台市,吉A|220182,榆树市,吉A|220221,永吉县,吉B|220281,蛟河市,吉B|220283,舒兰市,吉B|220284,磐石市,吉B|220322,梨树县,吉C|220323,伊通满族自治县,吉C|220381,公主岭市,吉C|220382,双辽市,吉C|220421,东丰县,吉D|220422,东辽县,吉D|220521,通化县,吉E|220524,柳河县,吉E|220581,梅河口市,吉E|220582,集安市,吉E|220621,抚松县,吉F|220721,前郭尔罗斯蒙古族自治县,吉J|220722,长岭县,吉J|220723,乾安县,吉J|220724,扶余县,吉J|222404,珲春市,吉H|222400,延边朝鲜族自治州,吉H','140000,山西省,140100,太原市,晋A|140400,长治市,晋D|140200,大同市,晋B|140500,晋城市,晋E|140700,晋中市,晋K|141000,临汾市,晋L|140300,阳泉市,晋C|140600,朔州市,晋F|141100,吕梁市,晋J|140800,运城市,晋M|140900,忻州市,晋H|140121,清徐县,晋A|140122,阳曲县,晋A|140123,娄烦县,晋A|140181,古交市,晋A|140221,阳高县,晋B|140222,天镇县,晋B|140223,广灵县,晋B|140224,灵丘县,晋B|140225,浑源县,晋B|140226,左云县,晋B|140227,大同县,晋B|140321,平定县,晋C|140322,盂　县,晋C|140421,长治县,晋D|140423,襄垣县,晋D|140424,屯留县,晋D|140425,平顺县,晋D|140426,黎城县,晋D|140427,壶关县,晋D|140428,长子县,晋D|140429,武乡县,晋D|140430,沁　县,晋D|140431,沁源县,晋D|140481,潞城市,晋D|140521,沁水县,晋E|140522,阳城县,晋E|140524,陵川县,晋E|140525,泽州县,晋E|140581,高平市,晋E|140621,山阴县,晋F|140622,应　县,晋F|140623,右玉县,晋F|140624,怀仁县,晋F|140722,左权县,晋K|140723,和顺县,晋K|140724,昔阳县,晋K|140725,寿阳县,晋K|140726,太谷县,晋K|140727,祁　县,晋K|140728,平遥县,晋K|140729,灵石县,晋K|140781,介休市,晋K|140821,临猗县,晋M|140822,万荣县,晋M|140823,闻喜县,晋M|140824,稷山县,晋M|140825,新绛县,晋M|140826,绛　县,晋M|140827,垣曲县,晋M|140828,夏　县,晋M|140829,平陆县,晋M|140830,芮城县,晋M|140881,永济市,晋M|140882,河津市,晋M|140921,定襄县,晋H|140922,五台县,晋H|140926,静乐县,晋H|140928,五寨县,晋H|141021,曲沃县,晋L|141022,翼城县,晋L|141023,襄汾县,晋L|141024,洪洞县,晋L|141025,古　县,晋L|141026,安泽县,晋L|141027,浮山县,晋L|141028,吉　县,晋L|141029,乡宁县,晋L|141030,大宁县,晋L|141031,隰　县,晋L|141032,永和县,晋L|141033,蒲　县,晋L|141034,汾西县,晋L|141081,侯马市,晋L|141082,霍州市,晋L|141121,文水县,晋J|141122,交城县,晋J|141123,兴　县,晋J|141124,临　县,晋J|141125,柳林县,晋J|141126,石楼县,晋J|141127,岚　县,晋J|141128,方山县,晋J|141129,中阳县,晋J|141130,交口县,晋J|141181,孝义市,晋J|141182,汾阳市,晋J','340000,安徽省,340100,合肥市,皖A|341600,亳州市,皖S|340200,芜湖市,皖B|341800,宣城市,皖P|340300,蚌埠市,皖C|341300,宿州市,皖L|341400,巢湖市,皖Q|340500,马鞍山市,皖E|341200,阜阳市,皖K|341100,滁州市,皖M|341500,六安市,皖N|340600,淮北市,皖F|341000,黄山市,皖J|341700,池州市,皖R|340400,淮南市,皖D|340700,铜陵市,皖G|340121,长丰县,皖A|340122,肥东县,皖A|340123,肥西县,皖A|340221,芜湖县,皖B|340222,繁昌县,皖B|340223,南陵县,皖B|340321,怀远县,皖C|340322,五河县,皖C|340323,固镇县,皖C|340421,凤台县,皖D|340521,当涂县,皖E|340621,濉溪县,皖F|340721,铜陵县,皖G|340800,安庆市,皖H|340822,怀宁县,皖H|340823,枞阳县,皖H|340824,潜山县,皖H|340825,太湖县,皖H|340826,宿松县,皖H|340827,望江县,皖H|340828,岳西县,皖H|340881,桐城市,皖H|341021,歙　县,皖J|341022,休宁县,皖J|341023,黟　县,皖J|341024,祁门县,皖J|341122,来安县,皖M|341124,全椒县,皖M|341125,定远县,皖M|341126,凤阳县,皖M|341181,天长市,皖M|341182,明光市,皖M|341221,临泉县,皖K|341222,太和县,皖K|341225,阜南县,皖K|341226,颍上县,皖K|341282,界首市,皖K|341321,砀山县,皖L|341322,萧　县,皖L|341323,灵璧县,皖L|341324,泗　县,皖L|341421,庐江县,皖Q|341422,无为县,皖Q|341423,含山县,皖Q|341424,和　县,皖Q|341521,寿　县,皖N|341522,霍邱县,皖N|341523,舒城县,皖N|341524,金寨县,皖N|341525,霍山县,皖N|341621,涡阳县,皖S|341622,蒙城县,皖S|341623,利辛县,皖S|341721,东至县,皖R|341722,石台县,皖R|341723,青阳县,皖R|341821,郎溪县,皖P|341822,广德县,皖P|341823,泾　县,皖P|341824,绩溪县,皖P|341825,旌德县,皖P|341881,宁国市,皖P','520000,贵州省,520100,贵阳市,贵A|520400,安顺市,贵G|520200,六盘水市,贵B|520300,遵义市,贵C|522401,毕节市,贵F|522701,都匀市,贵J|522201,铜仁市,贵D|522600,黔东南苗族侗族自治州,贵H|520121,开阳县,贵A|520122,息烽县,贵A|520123,修文县,贵A|520181,清镇市,贵A|520222,盘　县,贵B|520321,遵义县,贵C|520322,桐梓县,贵C|520323,绥阳县,贵C|520324,正安县,贵C|520325,道真仡佬族苗族自治县,贵C|520326,务川仡佬族苗族自治县,贵C|520327,凤冈县,贵C|520328,湄潭县,贵C|520330,习水县,贵C|520381,赤水市,贵C|520382,仁怀市,贵C|520421,平坝县,贵G|522223,玉屏侗族自治县,贵D|522225,思南县,贵D|522301,兴义市,贵E|522423,黔西县,贵F|522424,金沙县,贵F|522425,织金县,贵F|522702,福泉市,贵J|522725,瓮安县,贵J|522727,平塘县,贵J|522731,惠水县,贵J','360000,江西省,360100,南昌市,赣A|361100,上饶市,赣E|360800,吉安市,赣D|360700,赣州市,赣B|360900,宜春市,赣C|360400,九江市,赣G|361000,抚州市,赣F|360300,萍乡市,赣J|360500,新余市,赣K|360200,景德镇市,赣H|360600,鹰潭市,赣L|360121,南昌县,赣A|360122,新建县,赣A|360123,安义县,赣A|360281,乐平市,赣H|360323,芦溪县,赣J|360424,修水县,赣G|360429,湖口县,赣G|360430,彭泽县,赣G|360481,瑞昌市,赣G|360521,分宜县,赣K|360681,贵溪市,赣L|360721,赣　县,赣B|360722,信丰县,赣B|360723,大余县,赣B|360727,龙南县,赣B|360729,全南县,赣B|360730,宁都县,赣B|360731,于都县,赣B|360732,兴国县,赣B|360735,石城县,赣B|360781,瑞金市,赣B|360782,南康市,赣B|360822,吉水县,赣D|360823,峡江县,赣D|360824,新干县,赣D|360825,永丰县,赣D|360826,泰和县,赣D|360827,遂川县,赣D|360829,安福县,赣D|360830,永新县,赣D|360881,井冈山市,赣D|360921,奉新县,赣C|360923,上高县,赣C|360981,丰城市,赣C|360982,樟树市,赣C|360983,高安市,赣C|361021,南城县,赣F|361022,黎川县,赣F|361023,南丰县,赣F|361029,东乡县,赣F|361121,上饶县,赣E|361122,广丰县,赣E|361123,玉山县,赣E|361124,铅山县,赣E|361126,弋阳县,赣E|361127,余干县,赣E|361128,鄱阳县,赣E|361181,德兴市,赣E','630000,青海省,630100,西宁市,青A|632100,海东地区,青B|632800,海西蒙古族藏族自治州,青H|630121,大通回族土族自治县,青A|630122,湟中县,青A|632121,平安县,青B|632122,民和回族土族自治县,青B|632123,乐都县,青B|632126,互助土族自治县,青B|632200,海北藏族自治州,青C|632521,共和县,青E|632801,格尔木市,青H|632802,德令哈市,青H','230000,黑龙江省,230100,哈尔滨市,黑A|230600,大庆市,黑E|230200,齐齐哈尔市,黑B|230300,鸡西市,黑G|230800,佳木斯市,黑D|230400,鹤岗市,黑H|230500,双鸭山市,黑J|231200,绥化市,黑M|230700,伊春市,黑F|231100,黑河市,黑N|230900,七台河市,黑K|231000,牡丹江市,黑C|230123,依兰县,黑A|230124,方正县,黑A|230125,宾　县,黑A|230126,巴彦县,黑A|230181,阿城市,黑A|230182,双城市,黑A|230183,尚志市,黑A|230184,五常市,黑A|230229,克山县,黑B|230281,讷河市,黑B|230381,虎林市,黑G|230382,密山市,黑G|230521,集贤县,黑J|230523,宝清县,黑J|230621,肇州县,黑E|230722,嘉荫县,黑F|230781,铁力市,黑F|230882,富锦市,黑D|230921,勃利县,黑K|231025,林口县,黑C|231081,绥芬河市,黑C|231084,宁安市,黑C|231121,嫩江县,黑N|231181,北安市,黑N|231221,望奎县,黑M|231223,青冈县,黑M|231226,绥棱县,黑M|231281,安达市,黑M|231282,肇东市,黑M|231283,海伦市,黑M|232700,大兴安岭市,黑P','450000,广西壮族自治区,450100,南宁市,桂A|450200,柳州市,桂B|450900,玉林市,桂K|450300,桂林市,桂C|451000,百色市,桂L|450500,北海市,桂E|450800,贵港市,桂R|451200,河池市,桂M|450400,梧州市,桂D|451100,贺州市,桂J|450600,防城港市,桂P|450700,钦州市,桂N|451300,来宾市,桂G|451400,崇左市,桂F|450122,武鸣县,桂A|450126,宾阳县,桂A|450127,横　县,桂A|450221,柳江县,桂B|450223,鹿寨县,桂B|450321,阳朔县,桂C|450322,临桂县,桂C|450323,灵川县,桂C|450324,全州县,桂C|450330,平乐县,桂C|450331,荔蒲县,桂C|450332,恭城瑶族自治县,桂C|450481,岑溪市,桂D|450521,合浦县,桂E|450681,东兴市,桂P|450721,灵山县,桂N|450821,平南县,桂R|450881,桂平市,桂R|450921,容　县,桂K|450922,陆川县,桂K|450923,博白县,桂K|450981,北流市,桂K|451022,田东县,桂L|451023,平果县,桂L|451025,靖西县,桂L|451031,隆林各族自治县,桂L|451122,钟山县,桂J|451221,南丹县,桂M|451228,都安瑶族自治县,桂M|451281,宜州市,桂M|451421,扶绥县,桂F','150000,内蒙古自治区,150100,呼和浩特市,蒙A|150200,包头市,蒙B|150600,鄂尔多斯市,蒙K|150400,赤峰市,蒙D|150500,通辽市,蒙G|150300,乌海市,蒙C|150800,巴彦淖尔市,蒙L|150900,乌兰察布市,蒙J|150700,呼伦贝尔市,蒙E|152500,锡林郭勒盟,蒙H|152200,兴安盟,蒙F|150122,托克托县,蒙A|150221,土默特右旗,蒙B|150223,达尔罕茂明安联合旗,蒙B|150422,巴林左旗,蒙D|150429,宁城县,蒙D|150525,奈曼旗,蒙G|150621,达拉特旗,蒙K|150622,准格尔旗,蒙K|150626,乌审旗,蒙K|150627,伊金霍洛旗,蒙K|150781,满洲里市,蒙E|150924,兴和县,蒙J|152201,乌兰浩特市,蒙F|152502,锡林浩特市,蒙H','650000,新疆维吾尔自治区,650100,乌鲁木齐市,新A|652800,巴音郭楞蒙古自治州,新M|652301,昌吉市,新B|650200,克拉玛依市,新J|652901,阿克苏市,新N|653101,喀什市,新Q|654003,奎屯市,新F|659001,石河子市,新A|654000,伊犁哈萨克自治州,新F|652201,哈密市,新L|654201,塔城市,新G|654301,阿勒泰市,新H|652101,吐鲁番市,新K|652700,博尔塔拉蒙古自治州,新E|650121,乌鲁木齐县,新A|652122,鄯善县,新K|652100,吐鲁番地区,新K|652302,阜康市,新B|652303,米泉市,新B|652323,呼图壁县,新B|652324,玛纳斯县,新B|652325,奇台县,新B|652300,昌吉回族自治州,新B|652701,博乐市,新E|652801,库尔勒市,新M|652822,轮台县,新M|652827,和静县,新M|652923,库车县,新N|653001,阿图什市,新P|654002,伊宁市,新F|654022,察布查尔锡伯自治县,新F|654025,新源县,新F|654202,乌苏市,新G|654221,额敏县,新G|654223,沙湾县,新G','640000,宁夏回族自治区,640100,银川市,宁A|640300,吴忠市,宁C|640200,石嘴山市,宁B|640400,固原市,宁D|640500,中卫市,宁E','350000,福建省,350100,福州市,闽A|350500,泉州市,闽C|350200,厦门市,闽D|350800,龙岩市,闽F|350300,莆田市,闽B|350900,宁德市,闽J|350400,三明市,闽G|350600,漳州市,闽E|350181,福清市,闽A|350700,南平市,闽H|350582,晋江市,闽C|350122,连江县,闽A|350123,罗源县,闽A|350124,闽清县,闽A|350125,永泰县,闽A|350128,平潭县,闽A|350182,长乐市,闽A|350322,仙游县,闽B|350421,明溪县,闽G|350423,清流县,闽G|350424,宁化县,闽G|350425,大田县,闽G|350426,尤溪县,闽G|350427,沙　县,闽G|350428,将乐县,闽G|350429,泰宁县,闽G|350430,建宁县,闽G|350481,永安市,闽G|350524,安溪县,闽C|350525,永春县,闽C|350526,德化县,闽C|350581,石狮市,闽C|350583,南安市,闽C|350622,云霄县,闽E|350623,漳浦县,闽E|350624,诏安县,闽E|350625,长泰县,闽E|350626,东山县,闽E|350627,南靖县,闽E|350681,龙海市,闽E|350721,顺昌县,闽H|350722,浦城县,闽H|350723,光泽县,闽H|350724,松溪县,闽H|350781,邵武市,闽H|350782,武夷山市,闽H|350783,建瓯市,闽H|350784,建阳市,闽H|350821,长汀县,闽F|350822,永定县,闽F|350823,上杭县,闽F|350824,武平县,闽F|350825,连城县,闽F|350881,漳平市,闽F|350921,霞浦县,闽J|350922,古田县,闽J|350924,寿宁县,闽J|350981,福安市,闽J','460000,海南省,460100,海口市,琼A|469002,琼海市,琼C|469003,儋州市,琼C|469005,文昌市,琼C|469006,万宁市,琼C|469007,东方市,琼D|469025,定安县,琼C|469027,澄迈县,琼C|469030,白沙黎族自治县,琼D|469031,昌江黎族自治县,琼D|469034,陵水黎族自治县,琼D|469029,洋浦,琼E|469026,屯昌县,琼C|469028,临高县,琼C|469036,琼中黎族苗族自治县,琼D|460200,三亚市,琼B','620000,甘肃省,620100,兰州市,甘A|620900,酒泉市,甘F|620400,白银市,甘D|620800,平凉市,甘L|620500,天水市,甘E|621000,庆阳市,甘M|620600,武威市,甘H|620700,张掖市,甘G|620200,嘉峪关市,甘B|620300,金昌市,甘C|621200,陇南市,甘K|621100,定西市,甘J','540000,西藏自治区,540100,拉萨市,藏A'];
    /* jshint ignore:end */

    this._provinces = [];
    this._provinceMap = {};
    this._cityMap = {};
};

/**
 * 处理省市字符串
 */
ad.widget.tieba.PingAnFrs.Processor.prototype.process = function () {
    var me = this;

    var item, sCities, sCity, cityAttr, province, city;
    for(var i = 0, l = me._items.length; i < l; i++) {
        item = me._items[i];
        sCities = item.split('|');

        for(var j = 0, len = sCities.length; j < len; j++) {
            sCity = sCities[j];
            cityAttr = sCity.split(',');
            if (j === 0) {
                province = new ad.widget.tieba.PingAnFrs.Province(
                    cityAttr[0],
                    cityAttr[1]
                );
                me._provinces.push(province);
                me._provinceMap[province._id] = province;
                cityAttr.shift();
                cityAttr.shift();
            }

            city = new ad.widget.tieba.PingAnFrs.City(
                cityAttr[0],
                cityAttr[1],
                cityAttr[2]
            );
            province.add(city);
            me._cityMap[cityAttr[0]] = city;
        }
    }
};





















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
