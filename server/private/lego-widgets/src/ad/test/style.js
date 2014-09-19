/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: style.js 15220 2012-12-04 13:05:55Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/style.js ~ 2012/09/17 15:30:59
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 15220 $
 * @description
 * widget的样式设置
 **/
goog.require('ad.string');
goog.require('ad.test.Widget');

goog.include('ad/test/style.html');
goog.provide('ad.test.style');

var _ = window['_'] || function(name){ return name; };

/**
 * style change.
 * @param {string} styles new style.
 * @param {Object} styles json.
 */
ad.test.style.onchange = baidu.fn.blank;


/**
 * @private
 * @type {string}
 */
ad.test.style._CURRENT_NS = '';

/**
 * @param {string} ns the widget's namespace.
 * @param {Object} opt_styles 历史配置.
 * @param {Function=} opt_callback load complete callback.
 */
ad.test.style.loadWidget = function(ns, opt_styles, opt_callback) {
    if (ns === ad.test.style._CURRENT_NS) {
        return false;
    }

    var ctor = goog.getObjectByName(ns);
    if (!ctor) {
        alert('Can\'t find ' + ns + ' constructor.');
        return false;
    }

    var info = ad.test.Widget.getInfo(ns);
    if (!info) {
        return false;
    }

    var file = info['style_config_file'];
    if (file && file !== '-') {
        baidu.ajax.get(ad.test.url.getAbsolute(file) + '?.stamp=' + Math.random(), function(xhr) {
            var text = xhr.responseText;
            var json = baidu.json.parse(text);
            json['ns'] = ns;

            ad.test.style.renderFromJson(json, opt_styles || {});
            ad.test.style._CURRENT_NS = ns;
            if (baidu.lang.isFunction(opt_callback)) {
                opt_callback();
            }
        });
    } else {
        var root = baidu.g('ws');
        if (root) {
            root.innerHTML = '<fieldset><legend>CSS配置</legend><div>暂无可用配置信息.</div></fieldset>';
        }
        ad.test.style._CURRENT_NS = '';
        ad.test.style.onchange = baidu.fn.blank;
    }
};

ad.test.style._SELECT = function(items, name, value) {
    var html = ['<select data-name="', name, '">'];
    for (var i = 0; i < items.length; i++) {
        html.push(
            '<option value="',
            baidu.encodeHTML(items[i]),
            '"',
            (value === items[i] ? ' selected="selected"' : ''),
            '>',
            baidu.encodeHTML(items[i]), '</option>'
        );
    }
    html.push('</select>');

    return html.join('');
};

ad.test.style._INPUT = function(type, name, value) {
    return '<input type="' + type + '" data-name="' +
           name + '" value="' + (value || '') + '" placeholder="' + _(name) + '">';
};

ad.test.style._INPUT_NUMBER = function(name, value) {
    return '<input type="number" data-unit="px" data-name="' + name
           + '" value="' + (value || '') + '" placeholder="' + _(name) + '">';
};

ad.test.style._INPUT_COLOR = function(name, value) {
    return '<input type="color" list="color-data-list" data-name="'
           + name + '" value="' + (value || '#FFFF00') + '" placeholder="' + _(name) + '">';
};

ad.test.style.RULE_MAP = {
    'color': function(value) {
        return ad.test.style._INPUT_COLOR('color', value);
    },
    'font-size':  function(value) {
        return ad.test.style._SELECT(['', '10px', '12px', '14px', '16px', '18px', '20px'], 'font-size', value);
    },
    'font-family': function(value) {
        return ad.test.style._SELECT(['', 'arial', 'sans-seirf', 'serif', '宋体'], 'font-family', value);
    },
    'width': function(value) {
        return ad.test.style._INPUT_NUMBER('width', value);
    },
    'height': function(value) {
        return ad.test.style._INPUT_NUMBER('height', value);
    },
    'default': function(name, value) {
        return ad.test.style._INPUT('text', name, value);
    }
};

/**
 * @param {Array.<string>} options
 * @param {Object} opt_data 配置数据
 * @return {string}
 */
ad.test.style._generateOptionsHtml = function(options, defaults, opt_data) {
    var html = [];
    var data = opt_data || {};
    var defaults = defaults || {};
    for (var i = 0, option; option = options[i]; i++) {
        html.push('<div class="control">');
        var value = data[option] != null ? data[option] : defaults[i];
        if (ad.test.style.RULE_MAP[option]) {
            html.push(ad.test.style.RULE_MAP[option](value));
        } else {
            html.push(ad.test.style.RULE_MAP['default'](option, value));
        }
        html.push('</div>');
    }

    return html.join('');
};

/**
 * @param {Object} json the style configuration.
 * @param {Object} styles 历史配置.
 * @return {string}
 */
ad.test.style._generateHtml = function(json, styles) {
    var selectors = json['selectors'];

    var html = ['<fieldset><legend>CSS配置</legend><form class="form-horizontal">'];

    /*
    html.push('<datalist id="color-data-list">');
    html.push('<option>#ff0000</option>');
    html.push('<option>#0000ff</option>');
    html.push('<option>#00ff00</option>');
    html.push('<option>#ffff00</option>');
    html.push('<option>#00ffff</option>');
    html.push('</datalist>');
    */

    for (var i = 0, selector; selector = selectors[i]; i++) {
        html.push([
            '<div class="control-group">',
                '<label class="control-label">' + selector['display_name'] + '：</label>',
                '<div class="controls" data-name="' + selector['name'] + '">',
                    ad.test.style._generateOptionsHtml(
                        selector['options'], selector['defaults'], styles[selector['name']]),
                '</div>',
            '</div>'].join('\n'));
    }
    html.push('</form></fieldset>');

    return html.join('');
};

/**
 * @param {Object} json the style configuration.
 * @param {Object} styles 历史配置.
 */
ad.test.style.renderFromJson = function(json, styles) {
    /*
    json['_'] = function() {
        return function(text, render) {
            return _(text);
        }
    }
    json['T'] = function() {
        return function(text, render) {
            if (text == 'color') {
                return text;
            } else {
                return 'text';
            }
        }
    }
    */
    ad.test.style.render(json, styles);
};

/**
 * @param {Object} json the style configuration.
 * @param {Object} styles 历史配置.
 * @param {Element=} opt_root the render root.
 */
ad.test.style.render = function(json, styles, opt_root) {
    var html = ad.test.style._generateHtml(json, styles);
    var root = opt_root || baidu.g('ws');
    if (root) {
        root.innerHTML = html;
        var form = root.querySelector('form.form-horizontal');
        baidu.on(form, 'change', function() {
            var output = ad.test.style.getData(opt_root);
            ad.test.style.onchange(output.css, output.json);
        });
    }
};

/**
 * 获取配置
 */
ad.test.style.getData = function(opt_root) {
    var root = opt_root || baidu.g('ws');
    var form = root.querySelector('form.form-horizontal');
    var styles = [];
    var controls = form.querySelectorAll('div.controls');
    var json = {};
    for (var i = 0; i < controls.length; i++) {
        var control = controls[i];
        var selector = control.getAttribute('data-name');
        var rules = control.querySelectorAll('*[data-name]');
        json[selector] = {};
        var style = selector + ' {\n';
        for (var j = 0; j < rules.length; j++) {
            var ruleName = rules[j].getAttribute('data-name');
            var value = ad.string.trim(rules[j].value);
            var unit = rules[j].getAttribute('data-unit');
            if (value) {
                json[selector][ruleName] = value;
                style += '  ' + ruleName + ': ' + value + (unit ? unit : '') + ' !important;\n';
            }
        }
        style += '}';
        styles.push(style);
    }
    return {
        css: styles.join('\n'),
        json: json
    };
};













/* vim: set ts=4 sw=4 sts=4 tw=100: */
