/***************************************************************************
 * 
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    ../../../src/ad/test/schema_editor.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2012/11/15 11:46:43$
 */

goog.require('ad.json.Schema');
goog.require('ui.pref.WidgetPreference');
goog.require('ad.test.Widget');
goog.require('ad.test.wp');
goog.include('css/coup-edit.css');
goog.include('css/ui-textinput.css');
goog.include('css/ui-mateditor.css');
goog.include('ad/test/schema_editor.less');
//goog.include('ad/test/schema_editor.html');

goog.provide('ad.test.SchemaEditor');

/**
 * @constructor
 * @param {string|Node} element 容器元素或容器id，指定显示配置表单的容器.
 * @param {string} ns Widget的命名空间.
 * @param {Array.<Object>} opt_schema Widget的schema.
 */
ad.test.SchemaEditor = function(element, ns, opt_schema) {
    this._container = baidu.g(element);
    this._ns = ns;
    this._wp = null;
    this._itemMap = {};
    this._schema = opt_schema || null;

    baidu.addClass(this._container, 'clearfix');
    this._jsonCtner = baidu.dom.create('div', {
        'class': 'json-ctner'
    });
    this._prefsCtner = baidu.dom.create('div', {
        'class': 'ui-mateditor schema-prefs'
    });
    this._previewCtner = baidu.dom.create('div', {
        'class': 'ui-mateditor preview-prefs'
    });
    this._buttonRow = baidu.dom.create('div', {
        'class': 'button-row'
    });
    this._rightCtner = baidu.dom.create('div', {
        'class': 'right-ctner'
    });
    this._rightCtner.appendChild(this._prefsCtner);
    this._rightCtner.appendChild(this._previewCtner);
    this._rightCtner.appendChild(this._buttonRow);
    this._container.innerHTML = '';
    this._container.appendChild(this._jsonCtner);
    this._container.appendChild(this._rightCtner);
    baidu.hide(this._rightCtner);
};

/**
 * change事件
 */
ad.test.SchemaEditor.prototype.onchange = baidu.fn.blank;

/**
 * 渲染
 */
ad.test.SchemaEditor.prototype.render = function() {
    var me = this;

    var wp = new ui.pref.WidgetPreference(ad.test.SchemaEditor.META_USER_PREFS, '配置元数据', 'wpform');
    me._prefsCtner.innerHTML = wp.toForm();
    wp.bindEvent();
    ad.test.wp._WP_INSTANCE = wp;
    ad.test.wp._CURRENT_NS = '???';
    me._wp = wp;
    me._buttonRow.innerHTML = '<input type="button" class="btn btn-primary btn-confirm" value="确定" />'
                              + '<input type="button" class="btn btn-validate" value="验证" style="display:none;" />';

    function saveItem() {
        var oriItem = me._itemMap[me._currentIndex],
            custom = me._schemaItemDataConvertor.convertBack(me._wp.getValue());

        // 替换原有数据
        baidu.extend(oriItem, custom);

        // 更新label
        var link = baidu.dom.query('a[data-index=' + me._currentIndex + ']', me._jsonCtner)[0];
        link.innerHTML = baidu.string.encodeHTML(oriItem['displayName'] || oriItem['name']) + (me._postfixMap[oriItem['datatype']] || '');
    }
    // 点击保存单个元素配置
    baidu.on(baidu.q('btn-confirm', me._buttonRow)[0], 'click', function() {
        if (me._wp.validate()) {
            // 保存
            saveItem();

            // 隐藏表单
            baidu.hide(me._rightCtner);

            // 触发改变事件
            me.onchange();
        }
    });

    baidu.on(baidu.q('btn-validate', me._buttonRow)[0], 'click', function() {
        if (!me._previewWp) {
            return;
        }
        me._previewWp.validate();
    });

    // 从config文件里生成schema和读取已有schema
    me._generateInitSchema(function(schema) {
        me._schema = schema;
        me._renderJsonTree(schema);

        me._bindTreeEvent();

        // 绑定预览按钮的事件
        var btnPreview = baidu.q('btn-preview', me._jsonCtner)[0];
        baidu.on(btnPreview, 'click', function() {
            me._showPanel('preview');
            var wp = new ui.pref.WidgetPreference(me._schema, '预览', 'previewwp');
            me._previewCtner.innerHTML = wp.toForm();
            wp.bindEvent();
            me._previewWp = wp;
        });

        var timer;
        baidu.on(me._jsonCtner, 'mouseenter', function() {
            clearTimeout(timer);
            var btnPreview = baidu.q('btn-preview', me._jsonCtner)[0];

            baidu.show(btnPreview);
        });
        baidu.on(me._jsonCtner, 'mouseleave', function() {
            clearTimeout(timer);
            var btnPreview = baidu.q('btn-preview', me._jsonCtner)[0];

            timer = setTimeout(function() {
                baidu.hide(btnPreview);
            }, 10000);
        });
    });
};

/**
 * 读取config.js生成schema与已有schema合并(如果存在的话)
 * @param {function} callback 回调函数
 */
ad.test.SchemaEditor.prototype._generateInitSchema = function(callback) {
    var me = this;
    var info = ad.test.Widget.getInfo(me._ns);
    if (!info) {
        return;
    }

    var file = info['file'];
    var config_file = file.replace(/\.js/, '.config.js');
    var schema_file = info['schema_file'];
    var detected_schema = null;
    var count = 1;
    function checkDone() {
        if (--count == 0) {
            callback(ad.test.SchemaEditor.mergeSchema(detected_schema, me._schema));
        }
    }
    baidu.ajax.get(ad.test.url.getAbsolute(config_file) + '?.stamp=' + Math.random(), function(xhr) {
        var code = xhr.responseText;
        var WIDGET_CONFIG = eval('(function(){' + code + ';return WIDGET_CONFIG;})();');

        if (typeof WIDGET_CONFIG == 'undefined') {
            return false;
        }

        var detector = new ad.json.Schema();
        var schema = detector.guess(WIDGET_CONFIG);
        detected_schema = detector.format_wp(schema);

        checkDone();
    });
};

/**
 * 合并猜测的schema和已经存在的schema(有可能config数据结构有变，通过这种方式更新schema)
 * @param {Array.<Object>} detected_schema 从config生成的schema
 * @param {?Array.<object} opt_exist_schema 旧的schema
 */
ad.test.SchemaEditor.mergeSchema = function(detected_schema, opt_exist_schema) {
    if (!opt_exist_schema || opt_exist_schema.length <= 0) {
        return detected_schema;
    }

    var map = {};
    baidu.each(opt_exist_schema, function(item) {
        var name = item['name'];
        map[name] = item;
    });
    baidu.each(detected_schema, function(item, i) {
        var datatype = item['datatype'],
            name = item['name'];
        if (map[name]) {
            detected_schema[i] = map[name];
        }
        // TODO: 支持更复杂的merge，对复杂类型迭代做合并
    });

    return detected_schema;
};

/**
 * 获取当前的schema
 * @return {Array.<Object>}
 */
ad.test.SchemaEditor.prototype.getValue = function() {
    var me = this;

    return me._schema || null;
};

/**
 * 字段名后缀，用以区分复杂类型
 */
ad.test.SchemaEditor.prototype._postfixMap = {
    'LIST': '[]',
    'OBJECT': '{}'
};

/**
 * 根据schema渲染出JSON树
 * @param {Array.<Object>} schema
 */
ad.test.SchemaEditor.prototype._renderJsonTree = function(schema) {
    var me = this,
        index = 0;

    me._itemMap = {};

    function walk(arr, isRoot) {
        var lis = [];
        for (var i = 0, item; i < arr.length; i++) {
            item = arr[i];
            var curIndex = index++;
            if (baidu.array.contains(['STRING', 'HTML', 'BOOL', 'HIDDEN', 'ENUM', 'UPLOAD'], item['datatype'])) {
                lis.push(baidu.format('<li class="${li_class}"><a href="javascript:void(0);" data-index="${index}">${name}</a></li>', {
                    'name': baidu.string.encodeHTML(item['displayName'] || item['name']),
                    'index': curIndex,
                    'li_class': (i == arr.length - 1 ? 'last' : '')
                }));
                me._itemMap[curIndex] = item;
            } else if (baidu.array.contains(['LIST', 'OBJECT'], item['datatype'])) {
                lis.push(baidu.format([
                    '<li class="collapsable${extra_class}">',
                        '<div class="hitarea collapsable-hitarea${extra_hitarea_class}"></div>',
                        '<a href="javascript:void(0);" data-index="${index}">${name}</a>',
                        '${next_level}',
                    '</li>'
                ].join(''), {
                    'name': baidu.string.encodeHTML(item['displayName'] || item['name']) + (me._postfixMap[item['datatype']] || ''),
                    'index': curIndex,
                    'extra_class': (i == arr.length - 1 ? ' last-collapsable' : ''),
                    'extra_hitarea_class': (i == arr.length - 1 ? ' last-collapsable-hitarea' : ''),
                    'next_level': walk(item['items'])
                }));
                me._itemMap[curIndex] = item;
            } else {
                throw 'json tree not support ' + item['datatype'] + ' yet...';
            }
        }
        return baidu.format('<ul class="${theclass}">${lis}</ul>', {
            'theclass': (isRoot ? 'treeview' : ''),
            'lis': lis.join('')
        });
    }

    me._jsonCtner.innerHTML = walk(schema, true) + '<a class="btn-preview" href="#" style="display:none;">预览</a>';
};

/**
 * 绑定JSON树事件
 */
ad.test.SchemaEditor.prototype._bindTreeEvent = function() {
    var me = this;

    baidu.on(me._jsonCtner, 'click', function(e) {
        e = e || window.event;
        var target = baidu.event.getTarget(e);

        if (target && target.nodeType == 1) {
            if (target.nodeName == 'A') { // 树节点被点击
                var index = target.getAttribute('data-index');
                if (index != null) {
                    // 记录index
                    me._currentIndex = index;

                    // 恢复表单数据
                    var schemaItem = me._itemMap[index];
                    me._wp.setValue(me._schemaItemDataConvertor.convert(schemaItem));

                    // 显示表单
                    me._showPanel('prefs');

                    // 更新样式
                    baidu.each(baidu.q('selected', me._jsonCtner), function(ele) {
                        baidu.removeClass(ele, 'selected');
                    });
                    baidu.addClass(target, 'selected');

                    baidu.event.stop(e);
                }
            } else if (target.nodeName == 'DIV' && baidu.dom.hasClass(target, 'hitarea')) { // 树节点的展开收起
                var li = target.parentNode,
                    ul = baidu.dom.query('>ul', li)[0];
                if (baidu.dom.hasClass(target, 'expandable-hitarea')) {
                    target.className = target.className.replace(/expandable/g, 'collapsable');
                    li.className = li.className.replace(/expandable/g, 'collapsable');
                    baidu.show(ul);
                } else {
                    target.className = target.className.replace(/collapsable/g, 'expandable');
                    li.className = li.className.replace(/collapsable/g, 'expandable');
                    baidu.hide(ul);
                }
            }
        }
    });
};

/**
 * 显示编辑面板或者预览面板
 * @param {string} which 哪个面板，prefs或preview
 */
ad.test.SchemaEditor.prototype._showPanel = function(which) {
    var me = this;
    if (which == 'prefs') {
        baidu.show(me._prefsCtner);
        baidu.hide(me._previewCtner);
        baidu.show(baidu.q('btn-confirm', me._buttonRow)[0]);
        baidu.hide(baidu.q('btn-validate', me._buttonRow)[0]);
    } else {
        baidu.hide(me._prefsCtner);
        baidu.show(me._previewCtner);
        baidu.hide(baidu.q('btn-confirm', me._buttonRow)[0]);
        baidu.show(baidu.q('btn-validate', me._buttonRow)[0]);
    }
    baidu.show(me._rightCtner);
};

ad.test.SchemaEditor.prototype._schemaItemDataConvertor = (function() {
    var ruleTypeMap = {
        'STRING': {
            'boolMap': {
                'required': 1
            },
            'singleValueMap': {
                'minByteLength': 1,
                'maxByteLength': 1,
                'stringType': 1
            }
        },
        'LIST': {
            'singleValueMap': {
                'minCount': 1,
                'maxCount': 1
            }
        }
    };

    var convertorMap = {
        'STRING': {
            'convert': function(schemaItem) {
                var userData = {
                    'name': schemaItem['name'],
                    'displayName': schemaItem['displayName']
                };
                var uniqueData = {
                    'defaultValue': schemaItem['defaultValue'],
                    'tip': schemaItem['tip'],
                    'multiline': schemaItem['multiline'],
                    'rules': []
                };
                baidu.object.each(schemaItem['rules'], function(value, key) {
                    var rule = {}
                    if (ruleTypeMap['STRING']['boolMap'][key]) {
                        rule[key] = {};
                    } else if (ruleTypeMap['STRING']['singleValueMap'][key]) {
                        rule[key] = {
                            'value': value
                        };
                    }
                    uniqueData['rules'].push({
                        'type': rule
                    });
                });
                userData['datatype'] = {};
                userData['datatype']['STRING'] = uniqueData;
                return userData;
            },
            'convertBack': function(userData) {
                var schemaItem = {
                    'name': userData['name'],
                    'displayName': userData['displayName']
                };
                var uniqueData = userData['datatype']['STRING'];
                var rules = uniqueData['rules'];
                schemaItem['datatype'] = 'STRING';
                schemaItem['defaultValue'] = uniqueData['defaultValue'];
                schemaItem['tip'] = uniqueData['tip'];
                schemaItem['multiline'] = uniqueData['multiline'];
                schemaItem['rules'] = {};
                baidu.each(rules, function(rule) {
                    var type = baidu.object.keys(rule['type'])[0],
                        detail = rule['type'][type];
                    if (ruleTypeMap['STRING']['boolMap'][type]) {
                        schemaItem['rules'][type] = true;
                    } else if (ruleTypeMap['STRING']['singleValueMap'][type]) {
                        schemaItem['rules'][type] = detail['value'];
                    }
                });
                return schemaItem;
            }
        },
        'LIST': {
            'convert': function(schemaItem) {
                var userData = {
                    'name': schemaItem['name'],
                    'displayName': schemaItem['displayName']
                };
                var uniqueData = {
                    'tip': schemaItem['tip'],
                    'rules': []
                };
                baidu.object.each(schemaItem['rules'], function(value, key) {
                    var rule = {}
                    if (ruleTypeMap['LIST']['singleValueMap'][key]) {
                        rule[key] = {
                            'value': value
                        };
                    }
                    uniqueData['rules'].push({
                        'type': rule
                    });
                });
                userData['datatype'] = {};
                userData['datatype']['LIST'] = uniqueData;
                return userData;
            },
            'convertBack': function(userData) {
                var schemaItem = {
                    'name': userData['name'],
                    'displayName': userData['displayName']
                };
                var uniqueData = userData['datatype']['LIST'];
                var rules = uniqueData['rules'];
                schemaItem['datatype'] = 'LIST';
                schemaItem['tip'] = uniqueData['tip'];
                schemaItem['rules'] = {};
                baidu.each(rules, function(rule) {
                    var type = baidu.object.keys(rule['type'])[0],
                        detail = rule['type'][type];
                    if (ruleTypeMap['LIST']['singleValueMap'][type]) {
                        schemaItem['rules'][type] = detail['value'];
                    }
                });
                return schemaItem;
            }
        },
        'OBJECT': {
            'convert': function(schemaItem) {
                var userData = {
                    'name': schemaItem['name'],
                    'displayName': schemaItem['displayName'],
                    'datatype': {
                        'OBJECT': {}
                    }
                };
                return userData;
            },
            'convertBack': function(userData) {
                var schemaItem = {
                    'name': userData['name'],
                    'displayName': userData['displayName'],
                    'datatype': 'OBJECT',
                    'rules': []
                };
                return schemaItem;
            }
        }
    }

    return {
        /**
         * 根据schema单元生成其对应的user data...
         * @param {Object} schemaItem schema单元
         * @return {Object} schema单元的user data
         */
        'convert': function(schemaItem) {
            var convertor = convertorMap[schemaItem['datatype']];

            if (convertor) {
                return convertor.convert(schemaItem);
            } else {
                throw 'Covertor of ' + schemaItem['datatype'] + ' unimplemented';
            }
        },

        /**
         * 根据使用者配置的表单数据恢复schema单元
         * @param {Object} userData schema单元的user data
         * @return {Object} schemaItem schema单元
         */
        'convertBack': function(userData) {
            var datatype = baidu.object.keys(userData['datatype'])[0];
            var convertor = convertorMap[datatype];

            if (convertor) {
                return convertor.convertBack(userData);
            } else {
                throw 'Covertor of ' + datatype + ' unimplemented';
            }
        }
    }
})();

/**
 * 编辑schema的表单的schema...
 * @type {Object}
 */
ad.test.SchemaEditor.META_USER_PREFS = [
    {
        "name": "name",
        "displayName": "字段名(英文字母或下划线)",
        "defaultValue": "",
        "tip": "",
        "datatype": "STRING",
        "multiline": false,
        "rules": {
            "required": true
        },
        "extraAttr": {},
        "items": [],
        "enumValues": [],
        "headCell": [],
        "dataCell": []
    },
    {
        "name": "displayName",
        "displayName": "显示名",
        "defaultValue": "",
        "tip": "",
        "datatype": "STRING",
        "multiline": false,
        "rules": {
            "required": true
        },
        "extraAttr": {},
        "items": [],
        "enumValues": [],
        "headCell": [],
        "dataCell": []
    },
    {
        "name": "datatype",
        "displayName": "数据类型",
        "defaultValue": "STRING",
        "tip": "",
        "datatype": "ALTERNATIVE",
        "multiline": false,
        "rules": {},
        "extraAttr": {},
        "items": [],
        "enumValues": [
            {
                "value": "STRING",
                "displayValue": "STRING",
                "items": [
                    {
                        "name": "defaultValue",
                        "displayName": "默认值",
                        "defaultValue": "",
                        "tip": "",
                        "datatype": "STRING",
                        "multiline": false,
                        "rules": {},
                        "extraAttr": {},
                        "items": [],
                        "enumValues": [],
                        "headCell": [],
                        "dataCell": []
                    },
                    {
                        "name": "tip",
                        "displayName": "提示文字",
                        "defaultValue": "",
                        "tip": "",
                        "datatype": "STRING",
                        "multiline": false,
                        "rules": {},
                        "extraAttr": {},
                        "items": [],
                        "enumValues": [],
                        "headCell": [],
                        "dataCell": []
                    },
                    {
                        "name": "multiline",
                        "displayName": "是否多行",
                        "defaultValue": "",
                        "tip": "",
                        "datatype": "BOOL",
                        "multiline": false,
                        "rules": {},
                        "extraAttr": {},
                        "items": [],
                        "enumValues": [],
                        "headCell": [],
                        "dataCell": []
                    },
                    {
                        "name": "rules",
                        "displayName": "验证规则",
                        "defaultValue": "",
                        "tip": "",
                        "datatype": "LIST",
                        "multiline": false,
                        "rules": {},
                        "extraAttr": {},
                        "items": [
                            {
                                "name": "type",
                                "displayName": "验证类型",
                                "defaultValue": "required",
                                "tip": "",
                                "datatype": "ALTERNATIVE",
                                "multiline": false,
                                "rules": {},
                                "extraAttr": {},
                                "items": [],
                                "enumValues": [
                                    {
                                        "value": "required",
                                        "displayValue": "必填",
                                        "items": []
                                    },
                                    {
                                        "value": "minByteLength",
                                        "displayValue": "不小于N字节",
                                        "items": [
                                            {
                                                "name": "value",
                                                "displayName": "N值(正整数)",
                                                "defaultValue": "",
                                                "tip": "指定允许的最小字节数",
                                                "datatype": "STRING",
                                                "multiline": false,
                                                "rules": {
                                                    "required": true,
                                                    "stringType": "INTEGER"
                                                },
                                                "extraAttr": {},
                                                "items": [],
                                                "enumValues": [],
                                                "headCell": [],
                                                "dataCell": []
                                            }
                                        ]
                                    },
                                    {
                                        "value": "maxByteLength",
                                        "displayValue": "不大于N字节",
                                        "items": [
                                            {
                                                "name": "value",
                                                "displayName": "N值(正整数)",
                                                "defaultValue": "",
                                                "tip": "指定允许的最大字节数",
                                                "datatype": "STRING",
                                                "multiline": false,
                                                "rules": {
                                                    "required": true,
                                                    "stringType": "INTEGER"
                                                },
                                                "extraAttr": {},
                                                "items": [],
                                                "enumValues": [],
                                                "headCell": [],
                                                "dataCell": []
                                            }
                                        ]
                                    },
                                    {
                                        "value": "stringType",
                                        "displayValue": "字符串数据类型",
                                        "items": [
                                            {
                                                "name": "value",
                                                "displayName": "类型",
                                                "defaultValue": "URL",
                                                "tip": "",
                                                "datatype": "ENUM",
                                                "multiline": false,
                                                "rules": {},
                                                "extraAttr": {},
                                                "items": [],
                                                "enumValues": [
                                                    {
                                                        "value": "URL",
                                                        "displayValue": "URL",
                                                        "items": []
                                                    },
                                                    {
                                                        "value": "NUMBER",
                                                        "displayValue": "数字",
                                                        "items": []
                                                    },
                                                    {
                                                        "value": "INTEGER",
                                                        "displayValue": "整数",
                                                        "items": []
                                                    },
                                                    {
                                                        "value": "FLOAT",
                                                        "displayValue": "浮点数",
                                                        "items": []
                                                    },
                                                    {
                                                        "value": "IMAGE",
                                                        "displayValue": "图片URL",
                                                        "items": []
                                                    }
                                                ],
                                                "headCell": [],
                                                "dataCell": []
                                            }
                                        ]
                                    }
                                ],
                                "headCell": [],
                                "dataCell": []
                            }
                        ],
                        "enumValues": [],
                        "headCell": [],
                        "dataCell": []
                    }
                ]
            },
            {
                "value": "LIST",
                "displayValue": "LIST",
                "items": [
                    {
                        "name": "tip",
                        "displayName": "提示文字",
                        "defaultValue": "",
                        "tip": "",
                        "datatype": "STRING",
                        "multiline": false,
                        "rules": {},
                        "extraAttr": {},
                        "items": [],
                        "enumValues": [],
                        "headCell": [],
                        "dataCell": []
                    },
                    {
                        "name": "rules",
                        "displayName": "验证规则",
                        "defaultValue": "",
                        "tip": "",
                        "datatype": "LIST",
                        "multiline": false,
                        "rules": {},
                        "extraAttr": {},
                        "items": [
                            {
                                "name": "type",
                                "displayName": "验证类型",
                                "defaultValue": "minCount",
                                "tip": "",
                                "datatype": "ALTERNATIVE",
                                "multiline": false,
                                "rules": {},
                                "extraAttr": {},
                                "items": [],
                                "enumValues": [
                                    {
                                        "value": "minCount",
                                        "displayValue": "不少于N个",
                                        "items": [
                                            {
                                                "name": "value",
                                                "displayName": "N值(正整数)",
                                                "defaultValue": "",
                                                "tip": "指定允许的最小个数",
                                                "datatype": "STRING",
                                                "multiline": false,
                                                "rules": {
                                                    "required": true,
                                                    "stringType": "INTEGER"
                                                },
                                                "extraAttr": {},
                                                "items": [],
                                                "enumValues": [],
                                                "headCell": [],
                                                "dataCell": []
                                            }
                                        ]
                                    },
                                    {
                                        "value": "maxCount",
                                        "displayValue": "不多于N个",
                                        "items": [
                                            {
                                                "name": "value",
                                                "displayName": "N值(正整数)",
                                                "defaultValue": "",
                                                "tip": "指定允许的最大个数",
                                                "datatype": "STRING",
                                                "multiline": false,
                                                "rules": {
                                                    "required": true,
                                                    "stringType": "INTEGER"
                                                },
                                                "extraAttr": {},
                                                "items": [],
                                                "enumValues": [],
                                                "headCell": [],
                                                "dataCell": []
                                            }
                                        ]
                                    }
                                ],
                                "headCell": [],
                                "dataCell": []
                            }
                        ],
                        "enumValues": [],
                        "headCell": [],
                        "dataCell": []
                    }
                ]
            },
            {
                "value": "OBJECT",
                "displayValue": "OBJECT",
                "items": []
            }
        ],
        "headCell": [],
        "dataCell": []
    }
];

















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
