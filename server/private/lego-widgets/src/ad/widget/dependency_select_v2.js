/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: dependency_select_v2.js 9607 2012-06-08 17:10:22Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/dependency_select_v2.js ~ 2012/06/09 00:30:31
 * @author loutongbing
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.require('ad.base');
goog.include('ad/widget/dependency_select_v2.html');
goog.include('ad/widget/dependency_select_v2.less');

goog.provide('ad.widget.DependencySelectV2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.DependencySelectV2 = function(data) {
    
    /**
     * @type {Array}
     * 所有选项数据
     * @private
     */
    this._items = [];
    
    /**
     * @type {Object}
     * 依赖的数据Map
     * @private
     */
    this._dataMap = {};
    
    /**
     * @type {Array|null}
     * 依赖关系
     * @private
     */
    this._dependency = null;
    
    /**
     * @type {string}
     * dropdown 地址
     * @private
     */
    this._dropdownUrl = RT_CONFIG.HOST('ecma.bdimg.com') + '/public01/ps/select.js';
    
    /**
     * @type {Object}
     * 下拉框Map对象
     * @private
     */
    this._depDropdowns = {};
    
    /**
     * @type {Object}
     * 下拉框元素跟节点Map
     * @private
     */
    this._containers = {};
    
    /**
     * @type {Object}
     * 下拉框Map对象
     * @private
     */
    this._menus = {};
    
    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_dependency_select_v2';
    
    ad.widget.Widget.call(this, data);
    
};
baidu.inherits(ad.widget.DependencySelectV2, ad.widget.Widget);


/** @override */
ad.widget.DependencySelectV2.prototype.patchData = function() {
    var me = this;
    if (me._data && me._data['data'] && me._data['data'].length) {
        me._items = me._data['data'];
    }
    if (me._data && me._data['dependency'] && me._data['dependency'].length) {
        me._dependency = me._data['dependency'];
    }
};

/**
 * 根据name获取下拉菜单元素
 * @param {string} name 下拉框name
 * @return {Element|undefined}
 */
ad.widget.DependencySelectV2.prototype.getMenuRoot = function(name) {
    var me = this;
    if (me._menus[name]) {
        return me._menus[name];
    }
    else {
        if (me._containers && me._containers[name]) {
            var elms = me._containers[name].getElementsByTagName('div');
            if (elms && elms.length) {
                baidu.each(elms, function(item) {
                    if (baidu.dom.hasClass(item, 'c-dropdown2-menu')) {
                        me._menus[name] = item;
                    }
                });
            }
        }
        return me._menus[name];
    }
};


/**
 * 根据name获取下拉框箭头元素
 * @param {string} name 下拉框name
 * @return {Element|null}
 */
ad.widget.DependencySelectV2.prototype.getIcon = function(name) {
    if (name && this._containers[name]) {
        var icon = this._containers[name].getElementsByTagName('i');
        if (icon && icon.length) {
            return icon[0];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

/** @override */
ad.widget.DependencySelectV2.prototype.enterDocument = function() {
    ad.widget.DependencySelectV2.superClass.enterDocument.call(this);
    var me = this;
    me._tips = {};
    baidu.each(me._dependency, function(item) {
        if (item && item['name']) {
            me._depDropdowns[item['name']] = null;
            me._containers[item['name']] = baidu.g(me.getId(item['name'] + '-container'));
            me._menus[item['name']] = null;
            me._tips[item['name']] = baidu.g(me.getId(item['name'] + '-load-tip'));
        }
    });
};

/**
 * 删除对应下拉框所有选项
 * @param {Object} dropdown 下拉框对象
 */
ad.widget.DependencySelectV2.prototype.removeAll = function(dropdown) {
    if (dropdown && typeof dropdown['removeAll'] === 'function') {
        dropdown['removeAll']();
    }
};

/**
 * 在对应下拉框添加选项
 * @param {Object} dropdown 下拉框对象
 * @param {Array|Object} data 下拉选项数据
 */
ad.widget.DependencySelectV2.prototype.add = function(dropdown, data) {
    if (dropdown && typeof dropdown['add'] === 'function') {
        dropdown['add'](data);
    }
};

/**
 * 获取当前所有下拉框对象Map
 * @return {Object|null}
 */
ad.widget.DependencySelectV2.prototype.getDropdowns = function() {
    if (this._depDropdowns) {
        return this._depDropdowns;
    }
    else {
        return null;
    }
};

/**
 * 获取依赖的数据Map
 * @return {Object|null}
 */
ad.widget.DependencySelectV2.prototype.getDataMap = function() {
    if (this._dataMap) {
        return this._dataMap;
    }
    else {
        return null;
    }
};

/**
 * 获取对应下拉框选中的下拉选项值
 * @param {Object} dropdown 下拉框对象
 * @return {string|null}
 */
ad.widget.DependencySelectV2.prototype.getValue = function(dropdown) {
    if (dropdown) {
        return typeof dropdown['value'] === 'undefined' ? dropdown['getValue']() : dropdown['value'];
    }
    else {
        return null;
    }
};


/**
 * 设置对应下拉框选中对应值的选项
 * @param {Object} dropdown 下拉框对象
 * @param {string} value 选项值
 */
ad.widget.DependencySelectV2.prototype.setValue = function(dropdown, value) {
    if (dropdown) {
        dropdown['setValue'](value);
    }
};

/**
 * 设置对应依赖索引下拉框的选项
 * @param {number=} startIndex 依赖索引，如果不设置，则初始化所有下拉框
 */
ad.widget.DependencySelectV2.prototype.setDropDownData = function(startIndex) {
    var me = this;
    var data;
    var keys = [];
    baidu.each(me._dependency, function(item, index) {
        if (item && item['name'] && me._depDropdowns[item['name']]) {
            if (!data) {
                data = me._items;
            }
            else {
                data = baidu.getObjectByName(keys.join('-'), me._dataMap[keys[0]]);
            }
            // 存在startIndex，并且依赖索引大于startIndex，则更新对应索引的下拉框数据
            if (typeof startIndex === 'undefined' || startIndex < index) {
                me.removeAll(me._depDropdowns[item['name']]);
                me.add(me._depDropdowns[item['name']], data);
            }
            // 获取依赖索引小于index的下拉框值，以便获取对应依赖的下拉框选项数据
            var text = me.getValue(me._depDropdowns[item['name']]);
            keys.push(text);
        }
    });
    if (typeof startIndex === 'undefined') {
        me.trigger(ui.events.LOAD, me._depDropdowns);
    }
};


/**
 * 构造依赖的数据map
 * @param {Object} ds 数据源.
 * @param {string=} opt_prefix 前缀.
 * @param {Object=} opt_map 结果map.
 * @return {Object}
 */
ad.widget.DependencySelectV2.prototype.genMap = function(ds, opt_prefix, opt_map) {
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

/**
 * 下拉菜单change事件处理
 * @param {string} name 下拉框name
 * @param {number} index 依赖索引
 * @param {Object} obj change数据
 */
ad.widget.DependencySelectV2.prototype._changeHandler = function(name, index, obj) {
    this.setDropDownData(index);
    this.trigger(ui.events.CHANGE, name, index, obj);
};

/**
 * 对应name的下拉菜单打开事件处理
 * @param {string} name 下拉框name
 */
ad.widget.DependencySelectV2.prototype._openHandler = function(name) {
    baidu.dom.setStyles(this.getMenuRoot(name), { 'display': 'block' });
    baidu.dom.removeClass(this.getIcon(name), 'c-icon-triangle-down');
    baidu.dom.addClass(this.getIcon(name), 'c-icon-triangle-up');
};

/**
 * 对应name下拉菜单关闭事件处理
 * @param {string} name 下拉框name
 */
ad.widget.DependencySelectV2.prototype._closeHandler = function(name) {
    baidu.dom.setStyles(this.getMenuRoot(name), { 'display': 'none' });
    baidu.dom.removeClass(this.getIcon(name), 'c-icon-triangle-up');
    baidu.dom.addClass(this.getIcon(name), 'c-icon-triangle-down');
};

/**
 * 加载并初始化所有下拉框
 */
ad.widget.DependencySelectV2.prototype.createDropdownMap = function() {
    var me = this;
    var requireId = me._dropdownUrl.replace(/[\W]/g, '');
    var requestUrl = me._dropdownUrl;
    ad.base.require(requireId, requestUrl, function(Dropdown) {
        baidu.each(me._dependency, function(item, index) {
            if (item && item['name']) {
                // 下拉框数据选项
                var dropdownOptions = {
                    'appendTo': me._containers[item['name']],
                    'onopen': function() {
                        me._openHandler(item['name']);
                    },
                    'onclose': function() {
                        me._closeHandler(item['name']);
                    },
                    'onchange': function(obj) {
                        me._changeHandler(item['name'], index, obj);
                    }
                };
                var dropdown = new Dropdown([], dropdownOptions);
                if (dropdown) {
                    dropdown['setName'](item['name']);
                    me._depDropdowns[item['name']] = dropdown;
                }
                // 下拉框加载完毕，去除加载提示
                if (me._depDropdowns[item['name']]) {
                    baidu.dom.remove(me._tips[item['name']]);
                }
            }
        });
        me.setDropDownData();
    });
};

/** @override */
ad.widget.DependencySelectV2.prototype.bindEvent = function() {
    var me = this;
    
    /*
     * 加载下拉控件对象，并实例化对象。
     * 先确定页面加载了jQuery，再加载下拉控件
     */

    function loadDropdown() {
        ad.base.jqueryReady(function() {
            me.createDropdownMap();
        });
    }
    /*
     * 构造数据的层级关系Map
     */
    function genDataMap(data) {
        var map = {};
        for (var i = 0; i < data.length; i++) {
            map[data[i]['value']] = me.genMap(data[i]);
        }
        return map;
    }
    // 使用config中的下拉数据加载下拉框
    if (me._items && me._items.length) {
        me._dataMap = genDataMap(me._items);
        loadDropdown();
    }
    else {
        // 否则使用config中的数据文件加载下拉框
        var requireId = me._data['datasource_url'].replace(/[\W]/g, '');
        var requestUrl = me._data['datasource_url'];
        ad.base.require(requireId, requestUrl, function(data) {
            me._items = data;
            me._dataMap = genDataMap(me._items);
            loadDropdown();
        });
    }
};

/**
 * @override
 */
ad.widget.DependencySelectV2.prototype.dispose = function() {
    this._items = null;
    this._dataMap = null;
    this._dependency = null;
    this._depDropdowns = null;
    this._containers = null;
    this._menus = null;
    this._tips = null;
    ad.widget.DependencySelectV2.superClass.dispose.call(this);
};





/* vim: set ts=4 sw=4 sts=4 tw=100 : */
