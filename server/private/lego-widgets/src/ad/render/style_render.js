/***************************************************************************
 * 
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/render/style_render.js
 * desc:    
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2012/11/26 13:58:24$
 */

goog.require('ad.url');
goog.require('ad.render.Render');
goog.include('ad/render/style_render.less');

goog.provide('ad.render.StyleRender');

/**
 * @constructor
 * @param {Object} layout 布局
 * @param {{block_class: string}=} opt_options 选项
 * @extends {ad.render.Render}
 */
ad.render.StyleRender = function(layout, opt_options) {
    /**
     * @type {Object}
     * 布局数据
     */
    this._layout = layout;
    this._options = opt_options || {};

    ad.render.Render.call(this);
};
baidu.inherits(ad.render.StyleRender, ad.render.Render);

/**
 * @param {Object.<string, ad.widget.Widget>} widgets .
 * @return {string} 最终广告的物料代码.
 */
ad.render.StyleRender.prototype.process = function(widgets) {
    var layout = this.genLayout(this._layout);
    var data = {};

    baidu.object.each(widgets, function(item, key) {
        data[key] = item.getMainHtml();
        data[key + '-id'] = item.getId();
    });

    // 不应该用baidu.format，说不准哪个投放的页面用了
    // tangram，然后那个版本的baidu.format跟我的行为不一致
    var html = Mustache.render(layout, data);

    // FIXME(leeight) 我也不知道哪里出现的问题，先这么处理了吧
    html = html.replace(/%25%25(BEGIN_HOST|END_HOST)%25%25/g, '%%$1%%');

    return html;
};

/** @override */
ad.render.StyleRender.prototype.attachToElements = function(widgetMap, wrapper) {
    baidu.object.each(widgetMap, function(/** @type {ad.widget.Widget} */item, key) {
        // key: r0c1r0c2...
        var idxArr = key.substr(1).split(/r|c/);
        var root = wrapper;
        for (var i = 0; root && i < idxArr.length; i++) {
            root = root.children[idxArr[i]];
        }

        if (!root) {
            throw new Error('Invalid pre-rendered html formated.');
        }

        // 找到了，把ID设置一下.
        item.setId(root.id);
    });
};

/**
 * 从样式JSON生成Layout
 * @param {Object} layout 样式JSON
 * @return {string}
 */
ad.render.StyleRender.prototype.genLayout = function(layout) {
    function getPadding(arr) {
        if (arr) {
            return arr.join('px ') + 'px';
        }
        else {
            return '0';
        }
    }

    function getStyles(cell) {
        cell['padding'] = cell['padding'] || '0000'.split('');
        return {
            'width': (cell['width'] - cell['padding'][1] - cell['padding'][3]),
            'height': (cell['height'] - cell['padding'][0] - cell['padding'][2]),
            'padding': getPadding(cell['padding']),
            'margin': getPadding(cell['margin'])
        };
    }

    var rowTpl = [
        '<div style="{{style}}" {{{idKey}}} class="ec-ma-cell {{rowClass}} {{instClass}}">',
        '{{{cols}}}',
        '</div>'
    ].join('');
    var colTpl = [
        '<div style="{{style}}" {{{idKey}}} class="ec-ma-cell {{colClass}} {{instClass}}">',
        '{{{rows}}}',
        '</div>'
    ].join('');

    function walk(cell, key, isRow) {
        var cellStyles = getStyles(cell);
        if (isRow) {
            var hasCol = cell['cols'] && cell['cols'].length > 0;
            var cols = [];
            if (hasCol) {
                for (var i = 0; i < cell['cols'].length; i++) {
                    cols.push(walk(cell['cols'][i], key + 'c' + i, false));
                }
            }
            return Mustache.render(
                rowTpl,
                {
                    'style': (
                        cell['isHeightFixed'] ? 'height:' + cellStyles['height'] + 'px;' : ''
                    ) + 'padding:' + cellStyles['padding'] + ';',
                    'rowClass': 'ad-' + key,
                    'instClass': (
                        hasCol
                            ? ''
                            : 'ad-inst-' + cell['index']
                    ),
                    'idKey': '{{#' + key + '-id}}id="{{' + key + '-id}}"{{/' + key + '-id}}',
                    'cols': (
                         hasCol
                            ? cols.join('')
                            : '{{{' + key + '}}}'
                    )
                }
            );
        }
        else {
            var hasRow = cell['rows'] && cell['rows'].length > 0;
            var rows = [];
            if (hasRow) {
                for (var i = 0; i < cell['rows'].length; i++) {
                    rows.push(walk(cell['rows'][i], key + 'r' + i, true));
                }
            }
            return Mustache.render(
                colTpl,
                {
                    'style': 'width:' + cellStyles['width'] + 'px;float:left;padding:' + cellStyles['padding'] + ';',
                    'colClass': 'ad-' + key,
                    'instClass': (
                        hasRow
                            ? ''
                            : 'ad-inst-' + cell['index']
                    ),
                    'idKey': '{{#' + key + '-id}}id="{{' + key + '-id}}"{{/' + key + '-id}}',
                    'rows': (
                         hasRow
                            ? rows.join('')
                            : '{{{' + key + '}}}'
                    )
                }
            );
        }
    }

    var html = [];
    for (var i = 0; i < layout['rows'].length; i++) {
        html.push(walk(layout['rows'][i], 'r' + i, true));
    }

    var ctainerTpl = [
        '<div style="padding:{{canvasMargin}}" class="ad-material-wrapper">',
        // {{{backgroundImage}}}不是{{backgroundImage}}，避免转义%%BEGIN_HOST%%
        '<div style="width:{{width}}px;padding:{{canvasPadding}};{{{backgroundImage}}}{{backgroundColor}}{{border}}"'
                + ' class="ad-material-inside">{{{rows}}}</div>',
        '</div>'
    ].join('');
    var styles = getStyles(layout);
    return Mustache.render(ctainerTpl, {
        'width' : styles.width,
        'canvasMargin': styles.margin,
        'canvasPadding': styles.padding,
        'backgroundImage' : (
            layout['background']
                ? Mustache.render(
                    // 需要用{{{}}}不是{{}}，避免%%BEGIN_HOST%%被转义为%25%25
                    'background-image:url({{{url}}});background-repeat:repeat;',
                    {
                        // 这段儿代码参与到后端渲染，所以我们需要把第二个参数设置为true，
                        // 这样子不管啥模式下都会走https的流量，不过影响不大
                        'url' : encodeURI(ad.url.normalize(layout['background'], true))
                    }
                )
                : ''
        ),
        'backgroundColor': (
            layout['backgroundColor']
                ? 'background-color:' + layout['backgroundColor'] + ';' //  white repeat
                : ''
        ),
        'border': (
            layout['borderWidth']
                ? 'border:' + layout['borderWidth'] + 'px solid ' + layout['borderColor'] + ';' //  white repeat
                : ''
        ),
        'rows': html.join('')
    });
};


















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
