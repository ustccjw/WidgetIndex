/***************************************************************************
 * 
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * test_mustache.js ~ 2013/08/21 22:05:56
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var fs = require('fs');
var template = [
'{{#items}}',
'{{name}} - {{@index}}',
'{{#@first}} - first {{/@first}}',
'{{#@odd}} - odd {{/@odd}}',
'{{#@even}} - even {{/@even}}',
'{{#@last}} - last {{/@last}}',
'{{/items}}',
'{{#hello}}{{.}}{{/hello}}'
].join('\n');
var Mustache = require('./mustache.compiled.js');
var fn = Mustache.compile(template, {debug: true});
console.log(fn({hello:['hello'],items:[{name:'leeight'}, {name:'middle'}, {name:'liyubei'}]}));





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
