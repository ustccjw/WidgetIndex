/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: schema.js 14540 2012-11-15 17:51:41Z songao $
 *
 **************************************************************************/



/**
 * src/ad/json/schema.js ~ 2012/08/05 20:28:51
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 14540 $
 * @description
 * 根据JSON的实例来猜测对应的Schema
 **/
goog.provide('ad.json.Schema');

/**
 * @constructor
 */
ad.json.Schema = function() {
  // TODO
};

/**
 * @param {*} value The value to get the type of.
 * @return {string} The name of the type.
 */
ad.json.Schema.prototype._getType = function(value) {
  if (baidu.lang.isString(value)) {
    return 'string';
  } else if (baidu.lang.isBoolean(value)) {
    return 'boolean';
  } else if (baidu.lang.isNumber(value)) {
    return 'number';
  } else if (baidu.lang.isArray(value)) {
    return 'array';
  } else if (baidu.lang.isObject(value)) {
    return 'object';
  } else {
    return 'null';
  }
  // return goog.typeOf(value);
};

/**
 * 根据类型返回默认值
 * @param {string} type 类型值.
 * @return {*} 对应的默认值.
 */
ad.json.Schema.prototype._getDefaultValue = function(type) {
  if (type === 'string') {
    return 'HELLO WORLD';
  } else if (type === 'url') {
    return 'http://www.baidu.com';
  } else if (type === 'number') {
    return 8964;
  } else if (type === 'boolean') {
    return true;
  }
};

/**
 * 生成UserPref的格式
 * @param {Array} schema guess_schema返回的内容.
 * @return {Array} Widget UserPref格式的内容.
 */
ad.json.Schema.prototype.format_wp = function(schema) {
  var item;
  var result = [];

  var _ = window['_'] || function(name){ return name; };

  for (var i = 0; i < schema.length; i++) {
    item = schema[i];
    if (item[0] === 0) {
      // primitive types
      var rules = {},
          stringTypeMap = {
            'number': 'NUMBER',
            'url': 'URL'
          };
      if (stringTypeMap[item[2]]) {
        rules['stringType'] = stringTypeMap[item[2]];
      }
      result.push({
        "name" : item[1],
        "displayName" : _(item[1]),
        "defaultValue" : this._getDefaultValue(item[2]),
        // FIXME
        "datatype" : ((item[2] == 'number' || item[2] == 'url') ? 'STRING' : (item[2] == 'boolean' ? 'BOOL' : item[2].toUpperCase())),
        "rules": rules
      });
    } else if (item[0] === 1) {
      result.push({
        "name" : item[1],
        "displayName" : _(item[1]),
        "datatype" : "OBJECT",
        "items" : this.format_wp(item[2])
      });
    } else if (item[0] === 2) {
      result.push({
        "name" : item[1],
        "displayName" : _(item[1]),
        // TODO
        "datatype" : "LIST",
        "items" : this.format_wp(item[2])
      });
    }
  }

  return result;
}

/**
 * 生成UserPref的格式
 * @param {Array} schema guess_schema返回的内容.
 * @return {string} UserPref格式的内容.
 */
ad.json.Schema.prototype.format = function(schema) {
  var item;
  var result = [];

  for (var i = 0; i < schema.length; i++) {
    item = schema[i];
    if (item[0] === 0) {
      // primitive types
      result.push('<UserPref ' +
        'name="' + item[1] + '" ' +
        'display_name="' + item[1] + '" ' +
        'default_value="' + this._getDefaultValue(item[2]) + '" ' +
        'datatype="' + item[2] + '" />');
    } else if (item[0] === 1) {
      // object types
      result.push('<UserPref ' +
        'name="' + item[1] + '" ' +
        'display_name="' + item[1] + '" ' +
        'datatype="object">');
      result.push(this.format(item[2]));
      result.push('</UserPref>');
    } else if (item[0] === 2) {
      // array types
      result.push('<UserPref ' +
        'name="' + item[1] + '" ' +
        'display_name="' + item[1] + '" ' +
        'datatype="list">');
      result.push(this.format(item[2]));
      result.push('</UserPref>');
    }
  }

  return result.join('\n');
};

/**
 * @param {Object} instance JSON的实例.
 * @return {?Object} 猜测出来的schema，如果失败，返回null.
 */
ad.json.Schema.prototype.guess = function(instance) {
  var schema = [];
  var value;
  var type = this._getType(instance);

  if (type != 'object') {
    return [0, null, type];
  }

  for (var p in instance) {
    if (!Object.prototype.hasOwnProperty.call(instance, p)) {
      continue;
    }
    value = instance[p];
    type = this._getType(value);
    switch (type) {
      case 'boolean':
      case 'number':
        schema.push([0, p, type]);
        break;
      case 'string':
        if (/_url$/.test(p)) {
          schema.push([0, p, 'url']);
        } else {
          schema.push([0, p, type]);
        }
        break;
      case 'object':
        schema.push([1, p, this.guess(value)]);
        break;
      case 'array':
        if (value.length <= 0) {
          schema.push([2, p, [0, null, 'string']]);
        } else {
          schema.push([2, p, this.guess(value[0])]);
        }
        break;
    }
  }

  return schema;
};



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
