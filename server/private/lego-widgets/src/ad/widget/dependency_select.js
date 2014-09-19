
/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dependency_select.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/dependency_select.js ~ 2012/06/09 00:30:31
 * @author fanxueliang
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.include('ad/widget/dependency_select.html');
goog.include('ad/widget/dependency_select.less');

goog.provide('ad.widget.DependencySelect');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.DependencySelect = function(data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_dependency_select';
    /**
     * @type {Object}  下拉框数据.
     */
    this.data_map = {};
    /**
     * @type {Array}  默认数据.
     */
    this._defaultValue = [{'text': '请选择*', 'value': 'null'}];
    /**
     * @type {Object}  下拉联动处理函数集合.
     */
    this._eventHandlerMap = {};
};

baidu.inherits(ad.widget.DependencySelect, ad.widget.Widget);

/**
 * @param {Element|string} ele dom元素.
 * @param {Array} data 数据集合.
 */
ad.widget.DependencySelect.prototype.setValues = function(ele, data) {
    var ele_select = baidu.g(ele);
    ele_select.options.length = 0;
    for (var i = 0; i < data.length; i++) {
        var option = new Option(data[i].text, data[i].value);
        ele_select.options.add(option);
    }
};
/**
 * 获取下拉框数据
 * @return {Array} 数据集合.
 */
ad.widget.DependencySelect.prototype.getValues = function() {
    var me = this;
    var data = [];
    var select_eles = baidu.g(me.getId('select-con')).getElementsByTagName('select');
    baidu.array.each(select_eles, function(item, i) {
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
 * 初始化所有下拉框
 */
ad.widget.DependencySelect.prototype.enterDocumentInternal = function() {
    var me = this;
    var select_eles = baidu.g(me.getId('select-con')).getElementsByTagName('select');
    baidu.array.each(select_eles, function(item, index) {
        me.setValues(item, me._defaultValue);
    });
};

/** @override */
ad.widget.DependencySelect.prototype.enterDocument = function() {
    this.enterDocumentInternal();
};

/**
 * 构造依赖的map
 * @param {Object} ds 数据源.
 * @param {string=} opt_prefix 前缀.
 * @param {Object=} opt_map 结果map.
 */
ad.widget.DependencySelect.prototype.genMap = function(ds, opt_prefix, opt_map) {
    var children = ds.children;
    if (!opt_map) {
        opt_map = {};
        ds = baidu.object.clone(ds);
    }
    var curKey = '';
    if (typeof opt_prefix == 'undefined') {
        curKey = ds.value;
    }else {
        curKey = opt_prefix + '-' + ds.value;
    }
    opt_map[curKey] = ds.children;
    if (children && children.length > 0) {
        for (var i = 0; i < children.length; i++) {
            arguments.callee(children[i], curKey, opt_map);
        }
    }
    return opt_map;
};

/**
 * @private
 */
ad.widget.DependencySelect.prototype._bindEvent = function() {
    if (!this._data['data'] || !this._data['data'].length) {
        return;
    }

    var me = this;
    for (var i = 0; i < me._data['data'].length; i++) {
        me.data_map[me._data['data'][i]['value']] = me.genMap(me._data['data'][i]);
    }

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

    var dpd = me._data['dependency'];
    var ds = me._data['data'];
    if (dpd.length > 0) {
        me.setValues(baidu.g(me.getId(dpd[0]['name'])), ds);
        for (var i = dpd.length - 1; i >= 0; i--) {
            var id = me.getId(dpd[i]['name']);
            if (i < dpd.length - 1) {
                me._eventHandlerMap[id + 'Change'] = function() {
                    var _id = me.getId(dpd[i]['name']),
                        nextId = me.getId(dpd[i + 1]['name']),
                        _i = i,
                        _dpd = dpd;
                    return function() {
                        //先去除下一个联动元素的处理函数(防止多次调用)
                        me._eventHandlerMap[nextId + 'Change'] && baidu.event.un(baidu.g(nextId), 'change', me._eventHandlerMap[nextId + 'Change']);
                        //更新下一个联动元素的选项
                        var mapKey = getMapKey(_dpd, _i);
                        var next_select_data = me.data_map[mapKey[0]][mapKey[1]] || [];
                        me.setValues(baidu.g(nextId), next_select_data);
                        //在最后一个联动元素数据更新后，触发自定义change事件
                        if (nextId == me.getId(_dpd[_dpd.length - 1]['name'])) {
                            me.trigger(ui.events.CHANGE, me.getValues(), next_select_data, _dpd.length - 1 - _i, ds);
                        }
                        //调用下一个联动函数
                        me._eventHandlerMap[nextId + 'Change'] && me._eventHandlerMap[nextId + 'Change'].call(null);
                        //最后加上下一个联动元素的处理函数
                        me._eventHandlerMap[nextId + 'Change'] && baidu.event.on(baidu.g(nextId), 'change', me._eventHandlerMap[nextId + 'Change']);
                    };
                }();
                baidu.event.on(baidu.g(id), 'change', me._eventHandlerMap[id + 'Change']);
            }else {
                //注册最后一个联动元素change事件
                baidu.event.on(baidu.g(id), 'change', function() {
                    var mapKey = getMapKey(dpd, dpd.length - 1);
                    var next_select_data = me.data_map[mapKey[0]][mapKey[1]] || [];
                    me.trigger(ui.events.CHANGE, me.getValues(), next_select_data, 0, ds);
                });
            }
        }
        me._eventHandlerMap[dpd[0] + 'Change'] && me._eventHandlerMap[dpd[0] + 'Change'].call(null);
    }

    this.trigger(ui.events.LOAD);
};

/**
 * @private
 */
ad.widget.DependencySelect.prototype._loadDatasource = function() {
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
ad.widget.DependencySelect.prototype.bindEvent = function() {
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
};

ad.widget.DependencySelect.prototype.initByVal = function(val) {
    var sel = baidu.g(this.getId(this._data['dependency'][0]['name']));
    if (sel) {
        sel.value = val;
        baidu.event.fire(sel, 'change', {});
    }
};

/**
 * @return {?Element}
 */
ad.widget.DependencySelect.prototype.getEleByName = function(name) {
    return baidu.g(this.getId(name));
};










/* vim: set ts=4 sw=4 sts=4 tw=100: */
