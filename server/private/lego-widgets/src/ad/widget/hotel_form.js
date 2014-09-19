/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: hotel_form.js 10927 2012-08-05 07:35:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/hotel_form.js ~ 2013/01/24 21:08:37
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * button相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/hotel_form.less');
goog.include('ad/widget/hotel_form.html');

goog.provide('ad.widget.HotelForm');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.HotelForm = function(data) {
    ad.widget.Widget.call(this, data);
    /**
     * HotelForm使用的业务脚本
     * @type {string}
     */
    this._script = RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/dd5d69ebe7b261ac96b2a30901080ba5.js';
    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_hotel_form';
};
baidu.inherits(ad.widget.HotelForm, ad.widget.Widget);

/** @override */
ad.widget.HotelForm.prototype.patchData = function() {
    var me = this;
    /* for lego patch start */
    if (me._data['hotels']) {
        me._data['hotel_options'] = me._data['hotel_options'] || {};
        for (var i = 0; i < me._data['hotels'].length; i++) {
            if (me._data['hotels'][i]
                && me._data['hotels'][i]['alternative_hotel_type']
            ) {
                var hotelType = me._data['hotels'][i]['alternative_hotel_type'];
                if (hotelType['native_hotel']) {
                    me._data['native_hotel'] = hotelType['native_hotel'];
                    me._data['hotel_options']['native_hotel'] = me._data['hotel_options']['native_hotel'] || {};
                    me._data['hotel_options']['native_hotel']['default_checked'] =
                        hotelType['native_hotel']['default_checked'];
                }
                if (hotelType['internal_hotel']) {
                    me._data['internal_hotel'] = hotelType['internal_hotel'];
                    me._data['hotel_options']['internal_hotel'] = me._data['hotel_options']['internal_hotel'] || {};
                    me._data['hotel_options']['internal_hotel']['default_checked'] =
                        hotelType['internal_hotel']['default_checked'];
                }
            }
        }
        if (me._data['hotel_options'] && me._data['hotel_options']['internal_hotel']
            && me._data['hotel_options']['native_hotel']
            && me._data['hotel_options']['native_hotel']['default_checked']
            && me._data['hotel_options']['internal_hotel']['default_checked']
        ) {
            me._data['hotel_options']['internal_hotel']['default_checked'] = false;
        }
        delete me._data['hotels'];
    }
    /* for lego patch end */

    if (me._data['native_hotel'] && !me._data['native_hotel']['form_charset']) {
        me._data['native_hotel']['form_charset'] = 'UTF-8';
    }
    if (me._data['internal_hotel'] && !me._data['internal_hotel']['form_charset']) {
        me._data['internal_hotel']['form_charset'] = 'UTF-8';
    }
    if (me._data['native_hotel'] && !me._data['native_hotel']['form_method']) {
        me._data['native_hotel']['form_method'] = 'GET';
    }
    if (me._data['internal_hotel'] && !me._data['internal_hotel']['form_method']) {
        me._data['internal_hotel']['form_method'] = 'GET';
    }

    if (!me._data['native_hotel'] || !me._data['internal_hotel']) {
        delete me._data['hotel_options'];
    }
};

/** @override */
ad.widget.HotelForm.prototype.enterDocument = function() {
    ad.widget.HotelForm.superClass.enterDocument.call(this);
    var me = this;
    if (me._data['native_hotel'] && me._data['internal_hotel']) {
        if (me._data['hotel_options'] && me._data['hotel_options']['internal_hotel']
            && me._data['hotel_options']['internal_hotel']['default_checked']
        ) {
            baidu.g(me.getId('hotel-options-internal')).checked = 'checked';
            baidu.dom.setStyles(
                baidu.g(me.getId('native-hotel-form')),
                {
                    'display':'none'
                }
            );
            baidu.dom.setStyles(
                baidu.g(me.getId('internal-hotel-form')),
                {
                    'display':'block'
                }
            );
        }
        else {
            baidu.g(me.getId('hotel-options-native')).checked = 'checked';
            baidu.dom.setStyles(
                baidu.g(me.getId('native-hotel-form')),
                {
                    'display':'block'
                }
            );
            baidu.dom.setStyles(
                baidu.g(me.getId('internal-hotel-form')),
                {
                    'display':'none'
                }
            );
        }
    }
    else if (!me._data['native_hotel']) {
        baidu.dom.setStyles(
            baidu.g(me.getId('internal-hotel-form')),
            {
                'display':'block'
            }
        );
    }
    else {
        baidu.dom.setStyles(
            baidu.g(me.getId('native-hotel-form')),
            {
                'display':'block'
            }
        );
    }
    baidu.sio.callByBrowser(me._script, function() {
        me._enterDocument();
    });
};

/**
 * 日期格式化
 * @private
 * @param {Date|number|string=} date 源日期
 * @return {string} 日期字符串
 */
ad.widget.HotelForm.prototype._transformDate = function(date) {
    date = date || new Date();
    if (typeof date === 'string') {
        var dateArrry = date.split('-');
        date = new Date();
        date.setUTCFullYear(dateArrry[0] - 0, dateArrry[1] - 1, dateArrry[2] - 0);
        date.setUTCHours(0, 0, 0);
    }
    else if (typeof date === 'number') {
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
ad.widget.HotelForm.prototype._getNextDate = function(date) {
    var me = this;
    date = date || new Date();
    if (typeof date === 'string') {
        var dateArrry = date.split('-');
        date = new Date();
        date.setUTCFullYear(dateArrry[0] - 0, dateArrry[1] - 1, dateArrry[2] - 0);
        date.setUTCHours(0, 0, 0);
    }
    else if (typeof date === 'number') {
        date = new Date(date);
    }
    var next = date.getTime() * 1 + 24 * 60 * 60 * 1000;
    var nextDate = me._transformDate(next);
    return nextDate;
};

/**
 * 加载AutoComplete控件数据，初始化控件
 * @private
 */
ad.widget.HotelForm.prototype._initAutoComplete = function () {
    var me = this;
    // 加载数据
    if (window['require']) {
        if (me._data['datasource_url'] && /([.]js)$/i.test(me._data['datasource_url'])) {
            var parseArr = me._data['datasource_url'].split('/');
            var filename = ad.string.trim(parseArr[parseArr.length - 1]).replace(/([.]js)$/i, '');
            var baseUrl = me._data['datasource_url'].replace(/([.]js)$/i, '').replace(filename, '');
            window['require']['config']({
                'baseUrl': baseUrl
            });
            /* jshint ignore:start */
            window['require']([filename], function (city) {
                if (me._data['native_hotel'] && baidu.g(me.getId('native-checkin-city'))) {
                    var domesticHotelObj = new AutoComplete({
                        'trigger': '#' + me.getId('native-checkin-city'),
                        'dataSource': city['native_city']
                    }).render();
                }
                if (me._data['internal_hotel'] && baidu.g(me.getId('internal-checkin-city'))) {
                    var domesticHotelObj = new AutoComplete({
                        'trigger': '#' + me.getId('internal-checkin-city'),
                        'dataSource': city['internal_city']
                    }).render();
                }
            });
            /* jshint ignore:end */
        }

    }
};

/**
 * 业务脚本加载完成，初始化，渲染控件
 * @private
 */
ad.widget.HotelForm.prototype._enterDocument = function() {
    var me = this;

    /**
     * 更新结束日期
     * @param {Calendar} calendar 日历控件
     * @param {string|Element} startInput 开始日期元素
     * @param {string|Element} endInput 结束日期元素
     */
    function updateEndDate(calendar, startInput, endInput) {
        var startdate = ad.string.trim(baidu.g(startInput).value);
        var defaultEnddate = me._getNextDate(startdate);
        calendar['range']([defaultEnddate, '3099-01-01']);
        var value = ad.string.trim(baidu.g(endInput).value);
        if (!value || value !== defaultEnddate
            || new Date(value) < new Date(defaultEnddate))
        {
            baidu.g(endInput).value = defaultEnddate;
        }
    }
    var today = me._transformDate();
    var nativeCheckinEle = baidu.g(me.getId('native-checkindate'));
    var nativeCheckoutEle = baidu.g(me.getId('native-checkoutdate'));
    var internalCheckinEle = baidu.g(me.getId('internal-checkindate'));
    var internalCheckoutEle = baidu.g(me.getId('internal-checkoutdate'));
    var nativeCheckinCalendar = '';
    var nativeCheckoutCalendar = '';
    var internalCheckinCalendar = '';
    var internalCheckoutCalendar = '';
    if (nativeCheckinEle && nativeCheckoutEle) {
        nativeCheckinCalendar = new Calendar({
            'trigger': '#' + me.getId('native-checkindate'),
            'range': [today, '3099-01-01']
        });
        nativeCheckoutCalendar = new Calendar({
            'trigger': '#' + me.getId('native-checkoutdate')
        });
        baidu.g(me.getId('native-checkindate')).value = me._transformDate();
        baidu.on(me.getId('native-checkindate'), 'mousedown', function() {
            var value = ad.string.trim(baidu.g(me.getId('native-checkindate')).value);
            if (!value) {
                baidu.g(me.getId('native-checkindate')).value = me._transformDate();
            }
        });

        baidu.on(me.getId('native-checkindate'), 'blur', function() {
            updateEndDate(
                nativeCheckoutCalendar,
                me.getId('native-checkindate'),
                me.getId('native-checkoutdate')
            );
        });
        baidu.g(me.getId('native-checkoutdate')).value = me._getNextDate();
        baidu.on(me.getId('native-checkoutdate'), 'mousedown', function() {
            updateEndDate(
                nativeCheckoutCalendar,
                me.getId('native-checkindate'),
                me.getId('native-checkoutdate')
            );
        });
    }
    if (internalCheckinEle && internalCheckoutEle) {
        internalCheckinCalendar = new Calendar({
            'trigger': '#' + me.getId('internal-checkindate'),
            'range': [today, '3099-01-01']
        });
        internalCheckoutCalendar = new Calendar({
            'trigger': '#' + me.getId('internal-checkoutdate')
        });
        baidu.g(me.getId('internal-checkindate')).value = me._transformDate();
        baidu.on(me.getId('internal-checkindate'), 'mousedown', function() {
            var value = ad.string.trim(baidu.g(me.getId('internal-checkindate')).value);
            if (!value) {
                baidu.g(me.getId('internal-checkindate')).value = me._transformDate();
            }
        });

        baidu.on(me.getId('internal-checkindate'), 'blur', function() {
            updateEndDate(
                internalCheckoutCalendar,
                me.getId('internal-checkindate'),
                me.getId('internal-checkoutdate')
            );
        });
        baidu.g(me.getId('internal-checkoutdate')).value = me._getNextDate();
        baidu.on(me.getId('internal-checkoutdate'), 'mousedown', function() {
            updateEndDate(
                internalCheckoutCalendar,
                me.getId('internal-checkindate'),
                me.getId('internal-checkoutdate')
            );
        });
    }
    me._initAutoComplete();
};

/**
 * 事件处理
 * @override
 */
ad.widget.HotelForm.prototype.bindEvent = function() {
    ad.widget.HotelForm.superClass.bindEvent.call(this);
    var me = this;
    var cityInputs = baidu.dom.q('ec-default-text', me.getId('content'), 'input');
    if (cityInputs && cityInputs.length) {
        baidu.each(cityInputs, function(item, index) {
            baidu.on(item, 'focus', function() {
                baidu.dom.addClass(item, 'ec-default-text');
                if (item.value === baidu.dom.getAttr(item, 'defaulttext')) {
                    item.value = '';
                }
            });
            baidu.on(item, 'blur', function() {
                if (item.value === '') {
                    item.value = baidu.dom.getAttr(item, 'defaulttext');
                }
                else {
                    baidu.dom.removeClass(item, 'ec-default-text');
                }
            });
        });
    }
    var nativeHotelForm = baidu.g(me.getId('native-hotel-form'));
    var internalHotelForm = baidu.g(me.getId('internal-hotel-form'));
    if (nativeHotelForm) {
        baidu.on(me.getId('native-hotel-submit'), 'click', function() {
            var form = this.form;
            var cityName = '';
            if ((me._data['native_hotel']['form_charset'] || '').toUpperCase() === 'GBK') {
                baidu.dom.setAttr(form, 'accept-charset', 'GBK');
                document.charset = 'GBK';
                cityName = baidu.g(me.getId('native-checkin-city')).value;
                if (!cityName
                    || cityName === baidu.dom.getAttr(
                        baidu.g(me.getId('native-checkin-city')), 'defaulttext'
                    )
                ) {
                    cityName = me._data['native_hotel']['city']['default_value']
                               ? me._data['native_hotel']['city']['default_value'] : '';
                }
                ad.base.setTimeout(function() {
                    document.charset = 'UTF-8';
                }, 500);
            }
            else {
                baidu.dom.setAttr(form, 'accept-charset', 'UTF-8');
                document.charset = 'UTF-8';
                cityName = baidu.g(me.getId('native-checkin-city')).value;
                if (!cityName
                    || cityName === baidu.dom.getAttr(
                        baidu.g(me.getId('native-checkin-city')), 'defaulttext'
                    )
                ) {
                    cityName = me._data['native_hotel']['city']['default_value']
                               ? me._data['native_hotel']['city']['default_value'] : '';
                }
            }
            baidu.g(baidu.dom.getAttr(me.getId('native-checkin-city'), 'forid')).value = cityName;
            baidu.g(baidu.dom.getAttr(me.getId('native-keyword'), 'forid')).value
                = baidu.g(me.getId('native-keyword')).value;
            baidu.g(baidu.dom.getAttr(me.getId('native-checkindate'), 'forid')).value
                = baidu.g(me.getId('native-checkindate')).value;
            baidu.g(baidu.dom.getAttr(me.getId('native-checkoutdate'), 'forid')).value
                = baidu.g(me.getId('native-checkoutdate')).value;
            form.submit();
            // 监控
            me.sendLog('native-hotel-submit', 'native-hotel-submit');
        });
    }
    if (internalHotelForm) {
        baidu.on(me.getId('internal-hotel-submit'), 'click', function() {
            var form = this.form;
            var cityName = '';
            if ((me._data['internal_hotel']['form_charset'] || '').toUpperCase() === 'GBK') {
                baidu.dom.setAttr(form, 'accept-charset', 'GBK');
                document.charset = 'GBK';
                cityName = baidu.g(me.getId('internal-checkin-city')).value;
                if (!cityName
                    || cityName === baidu.dom.getAttr(
                        baidu.g(me.getId('internal-checkin-city')), 'defaulttext'
                    )
                ) {
                    cityName = me._data['internal_hotel']['city']['default_value']
                               ? me._data['internal_hotel']['city']['default_value'] : '';
                }
                ad.base.setTimeout(function() {
                    document.charset = 'UTF-8';
                }, 500);
            }
            else {
                baidu.dom.setAttr(form, 'accept-charset', 'UTF-8');
                document.charset = 'UTF-8';
                cityName = baidu.g(me.getId('internal-checkin-city')).value;
                if (!cityName
                    || cityName === baidu.dom.getAttr(
                        baidu.g(me.getId('internal-checkin-city')), 'defaulttext'
                    )
                ) {
                    cityName = me._data['internal_hotel']['city']['default_value']
                               ? me._data['internal_hotel']['city']['default_value'] : '';
                }
            }
            baidu.g(baidu.dom.getAttr(me.getId('internal-checkin-city'), 'forid')).value = cityName;
            baidu.g(baidu.dom.getAttr(me.getId('internal-keyword'), 'forid')).value
                = baidu.g(me.getId('internal-keyword')).value;
            baidu.g(baidu.dom.getAttr(me.getId('internal-checkindate'), 'forid')).value
                = baidu.g(me.getId('internal-checkindate')).value;
            baidu.g(baidu.dom.getAttr(me.getId('internal-checkoutdate'), 'forid')).value
                = baidu.g(me.getId('internal-checkoutdate')).value;
            form.submit();
            // 监控
            me.sendLog('internal-hotel-submit', 'internal-hotel-submit');
        });
    }

    var hotelOptionsNative = baidu.g(me.getId('hotel-options-native'));
    var hotelOptionsInternal = baidu.g(me.getId('hotel-options-internal'));
    if (hotelOptionsNative) {
        baidu.on(hotelOptionsNative, 'click', function() {
            baidu.dom.setStyles(
                baidu.g(me.getId('native-hotel-form')),
                {
                    'display':'block'
                }
            );
            baidu.dom.setStyles(
                baidu.g(me.getId('internal-hotel-form')),
                {
                    'display':'none'
                }
            );
        });
    }
    if (hotelOptionsInternal) {
        baidu.on(hotelOptionsInternal, 'click', function() {
            baidu.dom.setStyles(
                baidu.g(me.getId('native-hotel-form')),
                {
                    'display':'none'
                }
            );
            baidu.dom.setStyles(
                baidu.g(me.getId('internal-hotel-form')),
                {
                    'display':'block'
                }
            );
        });
    }
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
