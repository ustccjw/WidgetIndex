/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: ctrip.js 10927 2012-08-05 07:35:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/ctrip.js ~ 2013/01/24 21:08:37
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * button相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/ctrip.less');
goog.include('ad/widget/ctrip.html');

goog.provide('ad.widget.Ctrip');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Ctrip = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * ctrip使用的业务脚本
     * @type {string}
     */
    this._script = RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/f1c72dd8e94159a09b98d9ff61d72e08.js';

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_ctrip';
};
baidu.inherits(ad.widget.Ctrip, ad.widget.Widget);

/** @override */
ad.widget.Ctrip.prototype.patchData = function() {
    var me = this;
    if(me._data['data_city']) {
        me._city = me._data['data_city'];
    }
    if(me._data['types'] && me._data['types'].length) {
        for(var i = 0, len = me._data['types'].length; i < len; i++) {
            if(me._data['types'][i]) {
                me._data['types'][i]['index'] = i + 1;
            }
        }
    }
};

/**
 * 日期格式化
 * @private
 * @param {Date|number|string=} date 源日期
 * @return {string} 日期字符串
 */
ad.widget.Ctrip.prototype._transformDate = function(date){
    date = date || new Date();
    if(typeof date === 'string'){
        var dateArr = date.split('-');
        date = new Date();
        date.setUTCFullYear(dateArr[0] - 0, dateArr[1] - 1, dateArr[2] - 0);
        date.setUTCHours(0, 0, 0);
    } else if(typeof date === 'number'){
        date = new Date(date);
    }
    var year = date.getFullYear();
    var month = (date.getMonth() * 1 + 1) < 10
                    ? ('0' + (date.getMonth() * 1 + 1))
                    : (date.getMonth() * 1 + 1);
    var day = date.getDate() < 10
                ? ('0' + date.getDate())
                : (date.getDate());
    return year + '-' + month + '-' + day;
};

/**
 * 获取下一日期
 * @private
 * @param {Date|number|string=} date 前一日期
 * @return {string}
 */
ad.widget.Ctrip.prototype._getNextDate = function(date){
    var me = this;
    date = date || new Date();
    if(typeof date === 'string'){
        var dateArr = date.split('-');
        date = new Date();
        date.setUTCFullYear(dateArr[0] - 0, dateArr[1] - 1, dateArr[2] - 0);
        date.setUTCHours(0, 0, 0);
    }
    else if(typeof date === 'number'){
        date = new Date(date);
    }
    var next = date.getTime() * 1 + 24 * 60 * 60 * 1000;
    var nextDate = me._transformDate(next);
    return nextDate;
};

/* jshint ignore:start */
/**
 * 加载AutoComplete控件数据，初始化控件
 * @private
 */
ad.widget.Ctrip.prototype._initAutoComplete = function (){
    var me = this;

    ad.base.require(me.getId('city-id'), me._city, function(data){
        var citys = data;
        var allAirline = citys['domestic_airline'].concat(
            citys['inter_airline']
        );
        var domesticHotelObj = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('domestic-checkin-src'),
            'dataSource': citys['domestic_hotel']
        }).render();
        var domesticAirStartcity = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('domestic-startcity-src'),
            'dataSource': citys['domestic_airline']
        }).render();
        var domesticAirDestcity = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('domestic-endcity-src'),
            'dataSource': citys['domestic_airline']
        }).render();
        var interAirStartcity = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('inter-startcity-src'),
            'dataSource': allAirline
        }).render();
        var interAirDestcity = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('inter-endcity-src'),
            'dataSource': allAirline
        }).render();
        var tourStartcity = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('tour-start-city-src'),
            'dataSource': citys['domestic_hotel']
        }).render();
        var tourDestcity = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('tour-end-city-src'),
            'dataSource': citys['domestic_hotel']
        }).render();
        var trainStartcity = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('start-city-src'),
            'dataSource': citys['domestic_train']
        }).render();
        var trainDestcity = new me.tools['AutoComplete']({
            'trigger': '#'+ me.getId('end-city-src'),
            'dataSource': citys['domestic_train']
        }).render();
    });
};
/* jshint ignore:end */

/* jshint ignore:start */
/**
 * 业务脚本加载完成，初始化，渲染控件
 * @private
 */
ad.widget.Ctrip.prototype._enterDocument = function() {
    var me = this;
    var today = me._transformDate();
    var SimpleTabView = me.tools['Widget']['extend']({
        'attrs': {
            'triggers': {
                'value': '.ad-widget-trip-ul li',
                'getter': function(val) {
                    return this.$(val);
                }
            },
            'panels': {
                'value': '.ad-widget-content > div',
                'getter': function(val) {
                    return this.$(val);
                }
            },
            'activeIndex': {
                'value': 0
            }
        },
        'events': {
            'click .ad-widget-trip-ul li' : '_switchToEventHandler'
        },
        '_onRenderActiveIndex': function(val, prev, key) {
            var triggers = this.get('triggers');
            var panels = this.get('panels');
            triggers.eq(prev).removeClass('ad-widget-current').addClass('ad-widget-trip-list');
            triggers.eq(val).addClass('ad-widget-current').removeClass('ad-widget-trip-list');
            panels.eq(prev).hide();
            panels.eq(val).show();
        },
        '_switchToEventHandler': function(ev) {
            var index = this.get('triggers').index(ev.target);
            this['switchTo'](index);
            if (ev.target.id === me.getId('triptab1')) {
                //监控
                me.sendLog('tab-air', 'tab-air');
            } else if (ev.target.id === me.getId('triptab2')) {
                //监控
                me.sendLog('tab-hotel', 'tab-hotel');
            } else if (ev.target.id === me.getId('triptab3')) {
                //监控
                me.sendLog('tab-tour', 'tab-tour');
            } else {
                //监控
                me.sendLog('tab-train', 'tab-train');
            }
        },
        'switchTo': function(index) {
            this.set('activeIndex', index);
        },
        'setup': function() {
            this.get('panels').hide();
            this['switchTo'](this.get('activeIndex'));
        }
    });
    var tabView = new SimpleTabView({
        'element': '#' + me.getId('tripSearch'),
        'activeIndex': 0
    }).render();

    var domesticHotelCheckin = new me.tools['Calendar']({
        'trigger': '#' + me.getId('domestic-checkindate'),
        'range': [today, '3099-01-01']
    });

    var domesticHotelCheckout = new me.tools['Calendar']({
        'trigger': '#' + me.getId('domestic-checkoutdate')
    });

    me.tools['jQuery']('.ad-widget-flightway')[0].checked = 'checked';
    var SubAirlineView = me.tools['Widget']['extend']({
        'attrs': {
            'triggers': {
                'value': '#' + me.getId('flightSwitch') + ' input',
                'getter': function(val) {
                    return this.$(val);
                }
            },
            'panels': {
                'value': '.ad-widget-air-form',
                'getter': function(val) {
                    return this.$(val);
                }
            },
            'subIndex': {
                'value': 0
            }
        },
        'events': {
            'click .ad-widget-air-type input': '_switchSubToAirEventHandler'
        },
        '_onRenderSubIndex': function(val, prev, key) {
            var triggers = this.get('triggers');
            var panels = this.get('panels');
            triggers.eq(prev).removeClass('current');
            triggers.eq(val).addClass('current');
            panels.eq(prev).hide();
            panels.eq(val).show();
        },
        '_switchSubToAirEventHandler': function(ev) {
            var index = this.get('triggers').index(ev.target);
            this['switchSubTo'](index);
        },
        'switchSubTo': function(index) {
            this.set('subIndex', index);
        },
        'setup': function() {
            this.get('panels').hide();
            this['switchSubTo'](this.get('subIndex'));
        }
    });
    var subAirlineView = new SubAirlineView({
        'element': '#' + me.getId('content-air'),
        'activeIndex': 0
    }).render();
    var domesticAirStart = new me.tools['Calendar']({
        'trigger': '#' + me.getId('domestic-startdate'),
        'range': [today, '3099-01-01']
    });
    var domesticAirEnd = new me.tools['Calendar']({
        'trigger': '#' + me.getId('domestic-enddate')
    });
    var interAirStart = new me.tools['Calendar']({
        'trigger': '#' + me.getId('inter-startdate'),
        'range': [today, '3099-01-01']
    });
    var interAirEnd = new me.tools['Calendar']({
        'trigger': '#' + me.getId('inter-enddate')
    });

    var trainCheckout = new me.tools['Calendar']({
        'trigger': '#' + me.getId('train-date'),
        'range': [today, '3099-01-01']
    });
    baidu.g(me.getId('domestic-startdate')).value = me._transformDate();
    baidu.on(me.getId('domestic-startdate'), 'mousedown', function(){
        var value = ad.string.trim(baidu.g(me.getId('domestic-startdate')).value);
        if(!value){
            baidu.g(me.getId('domestic-startdate')).value = me._transformDate();
        }
    });

    /**
     * 更新结束日期
     * @param {Calendar} calendar 日历控件
     * @param {string|Element} startInput 开始日期元素
     * @param {string|Element} endInput 结束日期元素
     */
    function updateEndDate(calendar, startInput, endInput){
        var startdate = ad.string.trim(baidu.g(startInput).value);
        var defaultEnddate = me._getNextDate(startdate);
        calendar['range']([defaultEnddate, '3099-01-01']);
        var value = ad.string.trim(baidu.g(endInput).value);
        if(!value || value !== defaultEnddate
            || new Date(value) < new Date(defaultEnddate))
        {
            baidu.g(endInput).value = defaultEnddate;
        }
    }
    baidu.on(me.getId('domestic-startdate'), 'blur', function(){
        updateEndDate(
            domesticAirEnd,
            me.getId('domestic-startdate'),
            me.getId('domestic-enddate')
        );
    });
    baidu.g(me.getId('domestic-enddate')).value = me._getNextDate();
    baidu.on(me.getId('domestic-enddate'), 'mousedown', function(){
        updateEndDate(
            domesticAirEnd,
            me.getId('domestic-startdate'),
            me.getId('domestic-enddate')
        );
    });
    baidu.g(me.getId('inter-startdate')).value = me._transformDate();
    baidu.on(me.getId('inter-startdate'), 'mousedown', function(){
        var value = ad.string.trim(baidu.g(me.getId('inter-startdate')).value);
        if(!value){
            baidu.g(me.getId('inter-startdate')).value = me._transformDate();
        }
    });
    baidu.on(me.getId('inter-startdate'), 'blur', function(){
        updateEndDate(
            interAirEnd,
            me.getId('inter-startdate'),
            me.getId('inter-enddate')
        );
    });
    baidu.g(me.getId('inter-enddate')).value = me._getNextDate();
    baidu.on(me.getId('inter-enddate'), 'mousedown', function(){
        updateEndDate(
            interAirEnd,
            me.getId('inter-startdate'),
            me.getId('inter-enddate')
        );
    });
    baidu.g(me.getId('domestic-checkindate')).value = me._transformDate();
    baidu.on(me.getId('domestic-checkindate'), 'mousedown', function(){
        var value = ad.string.trim(baidu.g(me.getId('domestic-checkindate')).value);
        if(!value){
            baidu.g(me.getId('domestic-checkindate')).value = me._transformDate();
        }
    });

    baidu.on(me.getId('domestic-checkindate'), 'blur', function(){
        updateEndDate(
            domesticHotelCheckout,
            me.getId('domestic-checkindate'),
            me.getId('domestic-checkoutdate')
        );
    });
    baidu.g(me.getId('domestic-checkoutdate')).value = me._getNextDate();
    baidu.on(me.getId('domestic-checkoutdate'), 'mousedown', function(){
        updateEndDate(
            domesticHotelCheckout,
            me.getId('domestic-checkindate'),
            me.getId('domestic-checkoutdate')
        );
    });
    baidu.g(me.getId('train-date')).value = me._transformDate();
    baidu.on(me.getId('train-date'), 'mousedown', function(){
        var value = ad.string.trim(baidu.g(me.getId('train-date')).value);
        if(!value){
            baidu.g(me.getId('train-date')).value = me._transformDate();
        }
    });
    me._initAutoComplete();
};
/* jshint ignore:end */

/**
 * 事件处理
 * @override
 */
ad.widget.Ctrip.prototype.bindEvent = function() {
    ad.widget.Ctrip.superClass.bindEvent.call(this);
    var me = this;
    if(COMPILED){
        if (document.readyState === 'complete') {
            ad.base.require(me.getId('script-id'), me._script, function(tool){
                me.tools = tool;
                me._enterDocument();
            });
        } else {
            baidu.on(window, 'load', function() {
                ad.base.require(me.getId('script-id'), me._script, function(tool){
                    me.tools = tool;
                    me._enterDocument();
                });
            });
        }
    } else {
        ad.base.require(me.getId('script-id'), me._script, function(tool){
            me.tools = tool;
            me._enterDocument();
        });
    }

    var inputs = document.getElementsByTagName('input');
    var cityInputs = [];
    for(var i = 0; i < inputs.length; i++) {
        if(baidu.dom.hasAttr(inputs[i],'defaulttext')){
            cityInputs.push(inputs[i]);
        }
    }
    if(cityInputs && cityInputs.length){
        baidu.each(cityInputs, function(item, index){
            baidu.on(item, 'focus', function(){
                baidu.dom.addClass(item, 'ad-widget-default-text');
                if(item.value === baidu.dom.getAttr(item, 'defaulttext')){
                    item.value = '';
                }
            });
            baidu.on(item, 'blur', function(){
                if(item.value === ''){
                    item.value = baidu.dom.getAttr(item, 'defaulttext');
                }else{
                    baidu.dom.removeClass(item, 'ad-widget-default-text');
                }
            });
        });
    }
    baidu.on(me.getId('domsch-hotel'), 'click', function(){
        var form = this.form;
        if (form['encoding']['value'] === '1') {
            baidu.dom.setAttr(form, 'accept-charset', 'GBK');
            document.charset = 'GBK';
            ad.base.setTimeout(function() {
                document.charset = 'UTF-8';
            }, 500);
        } else {
            baidu.dom.setAttr(form, 'accept-charset', 'UTF-8');
            document.charset = 'UTF-8';
            if (form['encoding']['value'] === '2') {
                var cityName = baidu.g(me.getId('domestic-checkin-src')).value;
                if(!cityName
                    || cityName === baidu.dom.getAttr(
                        baidu.g(me.getId('domestic-checkin-src')), 'defaulttext'
                    )
                ){
                    cityName = '上海';
                }
                baidu.g(me.getId('domestic-checkin')).value = encodeURIComponent(cityName);
                var hotelName = baidu.g(me.getId('domestic-keyword-src')).value;
                baidu.g(me.getId('domestic-keyword')).value = encodeURIComponent(hotelName);
            }
        }
        form.submit();
        //监控
        me.sendLog('hotel-submit', 'hotel-submit');
    });
    baidu.on(me.getId('flightway-go'), 'click', function(){
        baidu.dom.hide(me.getId('date1-label'));
        baidu.dom.hide(me.getId('date1-input'));
        baidu.dom.hide(me.getId('date2-label'));
        baidu.dom.hide(me.getId('date2-input'));
        baidu.g(me.getId('native-flightway')).value = 0;
        baidu.g(me.getId('internal-flightway')).value = 0;
    });
    baidu.on(me.getId('flightway-go-back'), 'click', function(){
        baidu.dom.show(me.getId('date1-label'));
        baidu.dom.show(me.getId('date1-input'));
        baidu.dom.show(me.getId('date2-label'));
        baidu.dom.show(me.getId('date2-input'));
        baidu.g(me.getId('native-flightway')).value = 1;
        baidu.g(me.getId('internal-flightway')).value = 1;
    });
    /**
     * 设置表单出发城市，到达城市默认值，并提交表单
     * @param {Element} form 表单元素
     * @param {string} startCitySrcId 出发城市输入框id
     * @param {string} startCityId 出发城市id
     * @param {string} startCityDefaultValue 出发城市默认值
     * @param {string} endCitySrcId 到达城市输入框id
     * @param {string} endCityId 到达城市id
     * @param {string} endCityDefaultValue 到达城市默认值
     */
    function setFormCityAndSubmit(form,
        startCitySrcId, startCityId, startCityDefaultValue,
        endCitySrcId, endCityId, endCityDefaultValue) {
        if (form['encoding']['value'] === '1') {
            baidu.dom.setAttr(form, 'accept-charset', 'GBK');
            document.charset = 'GBK';
            ad.base.setTimeout(function() {
                document.charset = 'UTF-8';
            }, 500);
        } else {
            baidu.dom.setAttr(form, 'accept-charset', 'UTF-8');
            document.charset = 'UTF-8';
            if (form['encoding']['value'] === '2') {
                var startCity = baidu.g(startCitySrcId).value;
                if(!startCity
                    || startCity === baidu.dom.getAttr(
                        baidu.g(startCitySrcId), 'defaulttext'
                    )
                ){
                    startCity = startCityDefaultValue;
                }
                baidu.g(startCityId).value = encodeURIComponent(startCity);
                var endCity = baidu.g(endCitySrcId).value;
                if(!endCity
                    || endCity === baidu.dom.getAttr(
                        baidu.g(endCitySrcId), 'defaulttext'
                    )
                ){
                    endCity = endCityDefaultValue;
                }
                baidu.g(endCityId).value = encodeURIComponent(endCity);
            }
        }
        form.submit();
    }
    baidu.on(me.getId('domsch-air'), 'click', function(){
        var form = this.form;
        setFormCityAndSubmit(
            form, me.getId('domestic-startcity-src'),
            me.getId('domestic-startcity'), '上海',
            me.getId('domestic-endcity-src'), me.getId('domestic-endcity'),
            '北京'
        );
        //监控
        me.sendLog('air-submit', 'air-submit');
    });

    baidu.on(me.getId('intersch-air'), 'click', function(){
        var form = this.form;
        setFormCityAndSubmit(
            form, me.getId('inter-startcity-src'),
            me.getId('inter-startcity'), '北京',
            me.getId('inter-endcity-src'), me.getId('inter-endcity'),
            '首尔'
        );
        //监控
        me.sendLog('inter-air-submit', 'inter-air-submit');
    });
    baidu.on(me.getId('stasch-tour'), 'click', function(){
        var form = this.form;
        setFormCityAndSubmit(
            form, me.getId('tour-start-city-src'),
            me.getId('tour-start-city'), '北京',
            me.getId('tour-end-city-src'), me.getId('tour-end-city'),
            '三亚'
        );
        //监控
        me.sendLog('tour-submit', 'tour-submit');
    });
    baidu.on(me.getId('stasch-train'), 'click', function(){
        var form = this.form;
        setFormCityAndSubmit(
            form, me.getId('start-city-src'),
            me.getId('start-city'), '北京',
            me.getId('end-city-src'), me.getId('end-city'),
            '上海'
        );
        //监控
        me.sendLog('train-submit', 'train-submit');
    });
};





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
