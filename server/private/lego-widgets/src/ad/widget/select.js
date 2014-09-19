/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: select.js 9607 2012-06-08 17:10:22Z loutongbing $
 *
 **************************************************************************/



/**
 * src/ad/widget/select.js ~ 2012/06/09 00:30:31
 * @author loutongbing
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');
goog.require('ui.events');
goog.require('ad.base');
goog.include('ad/widget/select.html');
goog.include('ad/widget/select.less');

goog.provide('ad.widget.Select');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Select = function(data) {
    
    /**
     * @type {Array}
     * 所有选项数据
     * @private
     */
    this._items = [];
    
    /**
     * @type {string}
     * dropdown 地址
     * @private
     */
    this._dropdownUrl = RT_CONFIG.HOST('ecma.bdimg.com') + '/public01/ps/select.js';
    
    /**
     * @type {Object|null}
     * 下拉框对象
     * @private
     */
    this._dropdown = null;
    
    /**
     * @type {Element|null}
     * 下拉框元素跟节点
     * @private
     */
    this._container = null;
    
    /**
     * @type {Element|null}
     * 下拉框
     * @private
     */
    this._menu = null;
    
    /**
     * @type {string}
     * @private
     */
    this._view = 'AD_ad_widget_select';
    
    ad.widget.Widget.call(this, data);
    
};
baidu.inherits(ad.widget.Select, ad.widget.Widget);


/** @override */
ad.widget.Select.prototype.patchData = function() {
    var me = this;
    if(me._data && me._data['data'] && me._data['data'].length) {
        me._items = me._data['data'];
    }
};

/**
 * 获取下拉菜单元素
 * @return {Element|null}
 */
ad.widget.Select.prototype.getMenuRoot = function() {
    var me = this;
    if(me._menu){
       return me._menu; 
    }
    else {
        if(me._container) {
            var elms = me._container.getElementsByTagName('div');
            if(elms && elms.length){
                baidu.each(elms, function(item){
                    if(baidu.dom.hasClass(item, 'c-dropdown2-menu')){
                        me._menu = item;
                    }
                });
            }
        }
        return me._menu;
    }
};

/**
 * 获取下拉框箭头元素
 * @return {Element|null}
 */
ad.widget.Select.prototype.getIcon = function() {
    var icon = this._container.getElementsByTagName('i');
    if(icon && icon.length){
        return icon[0];
    }
    else {
        return null;
    }
};

/**
 * 获取index索引对应的下拉选项对象
 * @return {number} index 索引
 * @return {Object|null}
 */
ad.widget.Select.prototype.get = function(index) {
    if(this._dropdown){
        return this._dropdown['get'](index);
    }
    else {
        return null;
    }
};

/**
 * 获取所有下拉选项对象
 * @return {Array|null}
 */
ad.widget.Select.prototype.getAll = function() {
    if(this._dropdown){
        return this._dropdown['get']();
    }
    else {
        return null;
    }
};

/**
 * 获取下拉选项长度
 * @return {number|null}
 */
ad.widget.Select.prototype.getLength = function() {
    if(this._dropdown){
        return typeof this._dropdown['menuItems'] === "undefined" 
               ? this._dropdown['getLength']() : this._dropdown['menuItems'].length;
    }
    else {
        return null;
    }
};

/**
 * 获取当前选中下拉选项索引
 * @return {number|null}
 */
ad.widget.Select.prototype.getIndex = function() {
    if(this._dropdown){
        return typeof this._dropdown['index'] === "undefined" ? this._dropdown['getIndex']() : this._dropdown['index'];
    }
    else {
        return null;
    }
};

/**
 * 设置下拉框选中对应索引的选项
 * @param {number} index 索引
 */
ad.widget.Select.prototype.setIndex = function(index) {
    if(this._dropdown){
        this._dropdown['setIndex'](index);
    }
};

/**
 * 获取隐藏域的name
 * @return {string|null}
 */
ad.widget.Select.prototype.getName = function() {
    if(this._dropdown){
        if(typeof this._dropdown['getName'] !== "undefined") {
            return this._dropdown['getName']();
        }
        var hiddenInput = this._dropdown['hiddenInput'];
        if(hiddenInput){
            return baidu.dom.getAttr(hiddenInput, "name");
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

/**
 * 设置隐藏域的name（用于form表单提交）
 * @param {string} name 隐藏域的name
 */
ad.widget.Select.prototype.setName = function(name) {
    if(this._dropdown){
        this._dropdown['setName'](name);
    }
};

/**
 * 在index索引位置添加option
 * @param {Object|Array} item 下拉选项或下拉选项数组
 * @param {number=} index 索引
 */
ad.widget.Select.prototype.add = function(item, index) {
    if(this._dropdown){
        this._dropdown['add'](item, index);
    }
};

/**
 * 删除index索引位置选项
 * @param {number} index 索引
 */
ad.widget.Select.prototype.remove = function(index) {
    if(this._dropdown){
        this._dropdown['remove'](index);
    }
};

/**
 * 删除所有选项
 */
ad.widget.Select.prototype.removeAll = function() {
    if(this._dropdown){
        this._dropdown['removeAll']();
    }
};

/**
 * 获取当前选中下拉选项值
 * @return {string|null}
 */
ad.widget.Select.prototype.getValue = function() {
    if(this._dropdown){
        return typeof this._dropdown['value'] === "undefined" ? this._dropdown['getValue']() : this._dropdown['value'];
    }
    else {
        return null;
    }
};


/**
 * 设置下拉框选中对应值的选项
 * @param {string} value 选项值
 */
ad.widget.Select.prototype.setValue = function(value) {
    if(this._dropdown){
        this._dropdown['setValue'](value);
    }
};


/**
 * 获取当前选中下拉选项文本
 * @return {string|null}
 */
ad.widget.Select.prototype.getText = function() {
    if(this._dropdown){
        return typeof this._dropdown['text'] === "undefined" ? this._dropdown['getText']() : this._dropdown['text'];
    }
    else {
        return null;
    }
};


/**
 * 将当前下拉框对象追加到某一dom中
 * @param {Element} dom dom容器
 */
ad.widget.Select.prototype.appendTo = function(dom) {
    if(this._dropdown){
        this._dropdown['appendTo'](dom);
    }
};

/**
 * 下拉菜单打开事件处理
 */
ad.widget.Select.prototype._openHandler = function() {
    baidu.dom.setStyles(this.getMenuRoot(), {"display": "block"});
    baidu.dom.removeClass(this.getIcon(), "c-icon-triangle-down");
    baidu.dom.addClass(this.getIcon(), "c-icon-triangle-up");
};

/**
 * 下拉菜单关闭事件处理
 */
ad.widget.Select.prototype._closeHandler = function() {
    baidu.dom.setStyles(this.getMenuRoot(), {"display": "none"});
    baidu.dom.removeClass(this.getIcon(), "c-icon-triangle-up");
    baidu.dom.addClass(this.getIcon(), "c-icon-triangle-down");
};

/** @override */
ad.widget.Select.prototype.enterDocument = function() {
    ad.widget.Select.superClass.enterDocument.call(this);
};

/** @override */
ad.widget.Select.prototype.bindEvent = function() {
    var me = this;
    me._container = baidu.g(me.getId('select-container'));
    me._tip = baidu.g(me.getId('load-tip'));
    
    //下拉框数据选项
    var dropdownOptions = {
        "appendTo": me._container,
        "onopen": function(){
            me._openHandler();
        },
        "onclose": function(){
            me._closeHandler();
        },
        "onchange": function(obj) {
            me.trigger(ui.events.CHANGE, obj);
        }
    };
    //加载并实例化下拉对象
    function createDropdown (){
        var requireId = me._dropdownUrl.replace(/[\W]/g, '');
        var requestUrl = me._dropdownUrl;
        ad.base.require(requireId, requestUrl, function(Dropdown){
            me._dropdown = new Dropdown(me._items, dropdownOptions);
            //下拉框加载完毕，去除加载提示
            if(me._dropdown) {
                baidu.dom.remove(me._tip);
            }
        });
    }
    /*
     * 加载下拉控件对象，并实例化对象。
     * 如果是在大搜页面环境，使用window.A.use加载，
     * 否则先确定页面加载了jQuery，再加载下拉控件
     */
    function loadDropdown() {
        if(window['A'] && window['A']['use']) {
            window['A']['use']('dropdown21', function(){
                me._dropdown = window['A']['ui']['dropdown21'](me._items, dropdownOptions);
                //下拉框加载完毕，去除加载提示
                if(me._dropdown) {
                    baidu.dom.remove(me._tip);
                }
            });
        }
        else {
            ad.base.jqueryReady(function(){
                createDropdown();
            });
        }
    }
    //使用config中的下拉数据加载下拉框
    if(me._items && me._items.length) {
        loadDropdown();
    }
    else {
        //否则使用config中的数据文件加载下拉框
        var requireId = me._data['datasource_url'].replace(/[\W]/g, '');
        var requestUrl = me._data['datasource_url'];
        ad.base.require(requireId, requestUrl, function(data){
            me._items = data;
            loadDropdown();
        });
    }
};

/**
 * @override
 */
ad.widget.Select.prototype.dispose = function() {
    this._dropdown = null;
    this._menu = null;
    this.__items = null;
    this._container = null;
    ad.widget.Select.superClass.dispose.call(this);
};





/* vim: set ts=4 sw=4 sts=4 tw=100 : */
