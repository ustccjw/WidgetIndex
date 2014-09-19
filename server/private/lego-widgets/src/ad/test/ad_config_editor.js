/***************************************************************************
 * 
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    ../../../src/ad/test/ad_config_editor.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2012/11/06 10:43:56$
 */

goog.require('ad.json.Schema');
goog.require('ui.pref.WidgetPreference');
goog.require('ad.test.Widget');
goog.require('ad.test.wp');
goog.include('css/ui-mateditor.css');
goog.include('ad/test/ad_config_editor.less');
goog.include('ad/test/ad_config_editor.html');

goog.provide('ad.test.AdConfigEditor');

/**
 * @constructor
 * @param {string|Node} element 容器元素或容器id，指定显示配置表单的容器.
 */
ad.test.AdConfigEditor = function(element) {
    this._container = baidu.g(element);
    this._cache = {
        'full_ast': null,
        'ad_config_ast': null,
        'ad_config_code': ''
    };
    this._wp = null;
};

/**
 * 设置物料代码，传入js代码，渲染出表单
 * @param {string} code 物料js代码
 */
ad.test.AdConfigEditor.prototype.setCode = function(code) {
    this._code = code;
    // parse & render
    this.parseJs(code);
    this.renderWidgetPreference();
};

ad.test.AdConfigEditor.prototype.parseJs = function(code) {
    var jsp = uglify.parser,
        pro = uglify.uglify,
        ast = jsp.parse(code),
        cache = this._cache;
    // cache ast
    cache.full_ast = ast;
    cache.ad_config_ast = this.getAdConfigAst(ast);
    cache.ad_config_code = pro.gen_code(['toplevel', [
        ['var', [
            ['AD_CONFIG', cache.ad_config_ast[1]]
        ]]
    ]]);
};

ad.test.AdConfigEditor.prototype.renderWidgetPreference = function() {
    var cache = this._cache;
    var code = cache.ad_config_code;
    var WIDGET_CONFIG = eval('(function(){' + code + ';return AD_CONFIG;})();');

    if (typeof WIDGET_CONFIG == 'undefined') {
        return false;
    }

    var detector = new ad.json.Schema();
    var schema = detector.guess(WIDGET_CONFIG);
    var wp_schema = detector.format_wp(schema);

    var wp = new ui.pref.WidgetPreference(wp_schema, '编辑物料配置', 'wpform');
    this._container.innerHTML = wp.toForm();
    baidu.dom.addClass(this._container, 'ui-mateditor');
    wp.bindEvent();
    wp.setValue(WIDGET_CONFIG);

    ad.test.wp._WP_INSTANCE = wp;
    ad.test.wp._CURRENT_NS = '???';

    this._wp = wp;
};

/**
 * 搜索ast树，找到AD_CONFIG所在的节点
 */
ad.test.AdConfigEditor.prototype.getAdConfigAst = function(ast) {
    var pro = uglify.uglify,
        walker = pro.ast_walker(),
        ad_config_ast = null;
    // handler
    function var_process(defs) {
        // this[0] => 'var'
        // (this[1] === defs) => [..., ['AD_CONFIG', ['object', [...]]], ...]
        baidu.each(defs, function(def, i) {
            if (def[0] == 'AD_CONFIG' && def[1]) {
                ad_config_ast = def;
            }
        });
    }
    // walker walk
    var new_ast = walker.with_walkers({
        'var': var_process
    }, function() {
        return walker.walk(ast);
    });
    return ad_config_ast;
}

ad.test.AdConfigEditor.prototype.getMaterialCode = function() {
    var jsp = uglify.parser,
        pro = uglify.uglify,
        wp = this._wp,
        ast = jsp.parse('var AD_CONFIG = ' + baidu.json.stringify(wp.getValue())),
        new_ad_config_ast = ast[1][0][1][0][1],
        cache = this._cache;
    // replace with new one
    cache.ad_config_ast[1] = new_ad_config_ast;
    // generate code
    return this.encodeSpecialChars(pro.gen_code(cache.full_ast, {
        'beautify': true,
        'ascii_only': true
    }));
}

ad.test.AdConfigEditor.prototype.getXmlCode = function() {
    var jsp = uglify.parser,
        pro = uglify.uglify,
        cache = this._cache,
        cloned_ast = baidu.object.clone(cache.full_ast),
        code = cache.ad_config_code,
        WIDGET_CONFIG = eval('(function(){' + code + ';return AD_CONFIG;})();');

    if (typeof WIDGET_CONFIG == 'undefined') {
        return false;
    }

    // generate userprefs
    var detector = new ad.json.Schema();
    var schema = detector.guess(WIDGET_CONFIG);
    var user_pref = detector.format(schema);

    var ad_config_ast = this.getAdConfigAst(cloned_ast);
    // replace:
    //      var AD_CONFIG = {...}
    // with:
    //      var AD_CONFIG = baidu.gadgets.getPrefs();
    ad_config_ast[1] = ["call",["dot",["dot",["name","baidu"],"gadgets"],"getPrefs"],[]];

    // add param "gadgets" in toplevel closure
    cloned_ast[1][0][1][1][2].push('gadgets');
    // baidu.gadgets = gadgets;
    cloned_ast[1][0][1][1][3].unshift(["stat",["assign",true,["dot",["name","baidu"],"gadgets"],["name","gadgets"]]]);
    // var baidu = baidu || {};
    cloned_ast[1][0][1][1][3].unshift(["var",[["baidu",["binary","||",["name","baidu"],["object",[]]]]]]);
    // add param value "baidu.gadgets" in toplevel closure parameter list
    cloned_ast[1][0][1][2].push(["dot",["name","baidu"],"gadgets"]);

    // generate code
    var material_js_code = this.encodeSpecialChars(pro.gen_code(cloned_ast, {
        'ascii_only': true,
        'inline_script': true
    }));

    return Mustache.render(er.template.get('AD_ad_config_editor'), {
        'xml_head': '<?x' + 'ml version="1.0" encoding="UTF-8" ?>',
        'user_prefs': user_pref,
        'material_code': material_js_code,
        'script_end_tag': '</s' + 'cript>'
    });
};

ad.test.AdConfigEditor.prototype.encodeSpecialChars = function(str) {
    // replace the characters not in XML Character Range with unicode
    // see XML Character Range in:
    //    http://www.w3.org/TR/2008/REC-xml-20081126/#NT-Char
    //      or
    //    http://support.microsoft.com/kb/315580/en-us
    return str.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f]/g, function(ch) {
        var code = ch.charCodeAt(0).toString(16);
        while (code.length < 2) code = "0" + code;
        return "\\x" + code;
    });
};


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
