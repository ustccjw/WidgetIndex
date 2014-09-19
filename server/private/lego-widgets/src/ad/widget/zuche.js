/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: zuche.js 10927 2012-08-05 07:35:29Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/zuche.js ~ 2013/01/24 21:08:37
 * @author fanxueliang@baidu.com (fanxueliang)
 * @version $Revision: 10927 $
 * @description
 * button相关的实现逻辑
 **/
goog.require('ad.string');
goog.require('ad.widget.Widget');

goog.include('ad/widget/zuche.less');
goog.include('ad/widget/zuche.html');

goog.provide('ad.widget.ZuChe');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ZuChe = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * ctrip使用的业务脚本
     * @type {string}
     */
    this._script = RT_CONFIG.HOST('ecma.bdimg.com') + '/adtest/f1c72dd8e94159a09b98d9ff61d72e08.js';

    /**
     * @type {Object}  下拉框数据.
     */
    this._dataMap = {};

    /**
     * @type {Object}  下拉联动处理函数集合.
     */
    this._eventHandlerMap = {};

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_zuche';
};
baidu.inherits(ad.widget.ZuChe, ad.widget.Widget);

/** @override */
ad.widget.ZuChe.prototype.patchData = function() {
    var me = this;
    if(me._data['display_short_driving_self']) {
        me._data['dependency'] = [
            {
                'name': 'fromcity'
            },{
                'name': 'fromstore'
            }
        ];
    }
    else if (me._data['display_long_driving']){
        me._data['dependency'] = [
            {
                'name': 'brand'
            },{
                'name': 'type'
            }
        ];
    }
};

/**
 * 日期格式化
 * @private
 * @param {Date|number|string=} date 源日期
 * @return {string} 日期字符串
 */
ad.widget.ZuChe.prototype._transformDate = function(date){
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
ad.widget.ZuChe.prototype._getNextDate = function(date){
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
    var next = date.getTime() * 1 ;
    var nextDate = me._transformDate(next);
    return nextDate;
};

/**
 * 业务脚本加载完成，初始化，渲染控件
 * @private
 */
ad.widget.ZuChe.prototype._enterDocument = function() {
    var me = this;

    /* jshint ignore:start */
    var today = me._transformDate();
    var fromCalendar = new me.tools['Calendar']({
        'trigger': '#' + me.getId('fromdate_str'),
        'range': [today, '2099-01-01']
    });
    /* jshint ignore:end */


    var domesticHotelCheckout = new me.tools['Calendar']({
        'trigger': '#' + me.getId('todate_str')
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
    baidu.g(me.getId('fromdate_str')).value = me._transformDate();
    baidu.on(me.getId('fromdate_str'), 'mousedown', function(){
        var value = ad.string.trim(baidu.g(me.getId('fromdate_str')).value);
        if(!value){
            baidu.g(me.getId('fromdate_str')).value = me._transformDate();
        }
    });

    baidu.on(me.getId('fromdate_str'), 'blur', function(){
        updateEndDate(
            domesticHotelCheckout,
            me.getId('fromdate_str'),
            me.getId('todate_str')
        );
        baidu.g(me.getId('fromdate')).value = baidu.g(me.getId('fromdate_str')).value.replace(/[-]/g, '');
    });
    baidu.g(me.getId('todate_str')).value = me._transformDate();
    baidu.on(me.getId('todate_str'), 'mousedown', function(){
        updateEndDate(
            domesticHotelCheckout,
            me.getId('fromdate_str'),
            me.getId('todate_str')
        );
    });
    baidu.on(me.getId('todate_str'), 'blur', function(){
        baidu.g(me.getId('todate')).value = baidu.g(me.getId('todate_str')).value.replace(/[-]/g, '');
    });
    baidu.g(me.getId('fromdate')).value = baidu.g(me.getId('fromdate_str')).value.replace(/[-]/g, '');
    baidu.g(me.getId('todate')).value = baidu.g(me.getId('todate_str')).value.replace(/[-]/g, '');
};

/**
 * @param {Element|string} ele dom元素.
 * @param {Array} data 数据集合.
 */
ad.widget.ZuChe.prototype.setValues = function(ele, data) {
    var eleSelect = baidu.g(ele);
    eleSelect.options.length = 0;
    for (var i = 0; i < data.length; i++) {
        var option = new Option(data[i].text, data[i].value);
        eleSelect.options.add(option);
    }
};

/**
 * 获取下拉框数据
 * @return {Array} 数据集合.
 */
ad.widget.ZuChe.prototype.getValues = function() {
    var me = this;
    var data = [];
    var selectEles = [];
    baidu.each(me._data['dependency'], function(item, index){
        selectEles.push(baidu.g(me.getId(item['name'])));
    });
    baidu.array.each(selectEles, function(item, i) {
        var index = item.selectedIndex;
        var value = item.options[index].value;
        var text = item.options[index].innerHTML;
        data.push(
            {
                'elm' : item,
                'selectedIndex' : index,
                'value' : value,
                'text' : text
            }
        );
    });
    return data;
};

/**
 * 构造依赖的map
 * @param {Object} ds 数据源.
 * @param {string=} opt_prefix 前缀.
 * @param {Object=} opt_map 结果map.
 */
ad.widget.ZuChe.prototype.genMap = function(ds, opt_prefix, opt_map) {
    var children = ds.children;
    if (!opt_map) {
        opt_map = {};
        ds = baidu.object.clone(ds);
    }
    var curKey = '';
    if (typeof opt_prefix === 'undefined') {
        curKey = ds.value;
    }
    else {
        curKey = opt_prefix + '-' + ds.value;
    }
    opt_map[curKey] = ds.children;
    if (children && children.length > 0) {
        for (var i = 0; i < children.length; i++) {
            this.genMap(children[i], curKey, opt_map);
        }
    }
    return opt_map;
};

ad.widget.ZuChe.prototype._bindDependencySelectEvent = function() {
    var me = this;
    if(!me._data['dependency_data'] || !me._data['dependency_data'].length) {
        return;
    }
    for (var i = 0; i < me._data['dependency_data'].length; i++) {
        me._dataMap[me._data['dependency_data'][i]['value']] = me.genMap(me._data['dependency_data'][i]);
    }

    /* jshint ignore:start */
    /**
     * 初始化所有下拉框
     */
    function getMapKey(dp, index) {
        var partArr = [];
        for (var i = 0; i < dp.length && i <= index; i++) {
            partArr.push(baidu.g(me.getId(dp[i]['name'])).value);
        }
        return [partArr[0], partArr.join('-')];
    }
    /* jshint ignore:end */

    var dpd = me._data['dependency'];
    var ds = me._data['dependency_data'];
    if (dpd.length > 0) {
        baidu.each(dpd, function(item, index){
            var data = ds;
            for(var i = 0; i < index; i++) {
                data = data[0]['children'];
            }
            me.setValues(baidu.g(me.getId(dpd[index]['name'])), data);
        });
        /* jshint ignore:start */
        for (var i = dpd.length - 1; i >= 0; i--) {
            var id = me.getId(dpd[i]['name']);
            if (i < dpd.length - 1) {
                me._eventHandlerMap[id + 'Change'] = function() {
                    var nextId = me.getId(dpd[i + 1]['name']),
                        _i = i,
                        _dpd = dpd;
                    return function() {
                        //先去除下一个联动元素的处理函数(防止多次调用)
                        if (me._eventHandlerMap[nextId + 'Change']) {
                            baidu.event.un(baidu.g(nextId), 'change', me._eventHandlerMap[nextId + 'Change']);
                        }
                        //更新下一个联动元素的选项
                        var mapKey = getMapKey(_dpd, _i);
                        var nextSelectData = me._dataMap[mapKey[0]][mapKey[1]] || [];
                        me.setValues(baidu.g(nextId), nextSelectData);
                        //在最后一个联动元素数据更新后，触发自定义change事件
                        if (nextId === me.getId(_dpd[_dpd.length - 1]['name'])) {
                            me.trigger(ui.events.CHANGE, me.getValues(), nextSelectData, _dpd.length - 1 - _i, ds);
                        }
                        //调用下一个联动函数
                        me._eventHandlerMap[nextId + 'Change'] && me._eventHandlerMap[nextId + 'Change'].call(null);
                        //最后加上下一个联动元素的处理函数
                        if (me._eventHandlerMap[nextId + 'Change']) {
                            baidu.event.on(baidu.g(nextId), 'change', me._eventHandlerMap[nextId + 'Change']);
                        }
                    };
                }();
                baidu.event.on(baidu.g(id), 'change', me._eventHandlerMap[id + 'Change']);
            }
            else {
                //注册最后一个联动元素change事件
                baidu.event.on(baidu.g(id), 'change', function() {
                    var mapKey = getMapKey(dpd, dpd.length - 1);
                    var nextSelectData = me._dataMap[mapKey[0]][mapKey[1]] || [];
                    me.trigger(ui.events.CHANGE, me.getValues(), nextSelectData, 0, ds);
                });
            }
        }
        /* jshint ignore:end */
        me._eventHandlerMap[dpd[0] + 'Change'] && me._eventHandlerMap[dpd[0] + 'Change'].call(null);
    }

    this.trigger(ui.events.LOAD);
};

/**
 * @private
 */
ad.widget.ZuChe.prototype._bindEvent = function() {
    var me = this;
    if (!me._data['data']) {
        return;
    }
    if(me._data['display_short_driving_self']) {
        me._data['dependency_data'] = me._data['data']['duanzuzijia_city_store'];
        me.setValues(baidu.g(me.getId('fromhour')), me._data['data']['duanzuzijia_time']);
        me.setValues(baidu.g(me.getId('tohour')), me._data['data']['duanzuzijia_time']);
        me._bindDependencySelectEvent();
    }
    else if (me._data['display_long_driving']){
        me._data['dependency_data'] = me._data['data']['changzu_type'];
        me.setValues(baidu.g(me.getId('fromcity')), me._data['data']['changzu_city']);
        me.setValues(baidu.g(me.getId('rentday')), me._data['data']['changzu_time']);
        me._bindDependencySelectEvent();
    }
    else if (me._data['display_short_driving_other']){
        me.setValues(baidu.g(me.getId('fromcity')), me._data['data']['duanzudaijia_city']);
        me.setValues(baidu.g(me.getId('type')), me._data['data']['duanzudaijia_type']);
    }
    else if (me._data['display_free_ride']){
        me.setValues(baidu.g(me.getId('fromcity')), me._data['data']['changzu_city']);
        me.setValues(baidu.g(me.getId('tocity')), me._data['data']['changzu_city']);
    }
};

/**
 * @private
 */
ad.widget.ZuChe.prototype._loadDatasource = function() {
    var me = this;
    if (me._data['datasource_url']) {
        ad.base.require(me.getId('datasource-id'), me._data['datasource_url'], function(data) {
            me._data['data'] = data;
            me._bindEvent();
        });
    }
    else {
        me._bindEvent();
    }
};

/** @override */
ad.widget.ZuChe.prototype.bindEvent = function() {
    var me = this;
    if (COMPILED) {
        if (document.readyState === 'complete') {
            me._loadDatasource();
        }
        else {
            baidu.on(window, 'load', function() {
                me._loadDatasource();
            });
        }
    }
    else {
        me._loadDatasource();
    }
    if(me._data['display_short_driving_self']) {
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
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
