/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: canvas.js 12776 2012-10-15 03:08:37Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/test/canvas.js ~ 2012/09/10 15:24:21
 * @author leeight(liyubei@baidu.com)
 * @version $Revision: 12776 $
 * @description
 *
 **/
goog.require('ad.dom');
goog.require('ad.test.Widget');
goog.require('ad.test.ui');
goog.require('app.event.EventTarget');
goog.require('ui.events');

goog.provide('ad.test.Canvas');

/**
 * @constructor
 * @extends {app.event.EventTarget}
 */
ad.test.Canvas = function() {
    app.event.EventTarget.call(this);
    this._root = document.querySelector('.canvas');

    /**
     * FIXME(leeight) REMOVE ALL THE RELATED CODES.
     * 样式缓存，以后应该是会持久化到文件或者数据库
     * 元素数据结构:{'name':'样式1','style':[{'name':'video','width':300,'height':200,'left':10,'top':10}]}
     */
    this._styles = [];

    /**
     * @private
     * @type {Array.<ad.test.Widget>}
     */
    this._widgets = [];

    /**
     * 当前选择的模块
     * @private
     * @type {ad.test.Widget}
     */
    this._curWidget;
};
baidu.inherits(ad.test.Canvas, app.event.EventTarget);

/**
 * @return {Array.<ad.test.Widget>}
 */
ad.test.Canvas.prototype.getAllWidgets = function() {
    return this._widgets;
};

/**
 * @param {ad.test.Widget} widget 加入新的widget.
 */
ad.test.Canvas.prototype.removeWidget = function(widget) {
    baidu.array.remove(this._widgets, widget);
};

/**
 * @param {ad.test.Widget} widget 加入新的widget.
 */
ad.test.Canvas.prototype.addWidget = function(widget) {
    var me = this,
        root = me._root.appendChild(widget.getRoot());

    widget._draggableHandler = baidu.dom.draggable(root, {
        'range' : [0, 500, 500, 0],
        'capture' : false,
        'ondragstart' : baidu.fn.bind(this._ondragstart, this, widget),
        'ondrag' : baidu.fn.bind(this._ondrag, this, widget),
        'ondragend' : baidu.fn.bind(this._ondragend, this, widget),
        'handler' : root.querySelector('h2')
    });

    widget._resizableHandler = baidu.dom.resizable(root, {
        'direction' : [/*"s","e","n","w","nw","ne","sw",*/'se'],
        'onresizeend': function() {
            widget.adpPreview();
            me.showAllPreview();
        },
        'onresize': function() {
            setTimeout(function() {
                me.setWidgetPropertyByRender();
            },50);
        },
        'onresizestart': function() {
            me.hideAllPreview();
        }
    });

    widget.setCanvas(me);
    widget.getTitle();
    widget.bindEvent();
    widget.preview();

    this._widgets.push(widget);
};

/**
 * @private
 * @param {ad.test.Widget} widget 拖动的Widget.
 */
ad.test.Canvas.prototype._ondragstart = function(widget) {
    baidu.dom.setStyle(widget.getRoot(), 'z-index', ad.test.ui.getNextZIndex());
    this.hideAllPreview();
    this.trigger(ui.events.DRAG_START, widget);
};

/**
 * @private
 * @param {ad.test.Widget} widget 拖动的Widget.
 */
ad.test.Canvas.prototype._ondragend = function(widget) {
    this.trigger(ui.events.DRAG_END, widget);
    this.setWidgetPropertyByRender();
    this.showAllPreview();
};

/**
 * @private
 * @param {ad.test.Widget} widget 拖动的Widget.
 */
ad.test.Canvas.prototype._ondrag = function(widget) {
    var me = this;
    setTimeout(function() {
        me.trigger(ui.events.DRAG, widget);
        me.setWidgetPropertyByRender();
    },50);
};

/**
 * Canvas聚焦
 */
ad.test.Canvas.prototype.focus = function() {
    var root = this._root;
    baidu.dom.setStyle(root, 'background-color', 'yellow');
};

/**
 * Canvas失去焦点
 */
ad.test.Canvas.prototype.blur = function() {
    var root = this._root;
    baidu.dom.setStyle(root, 'background-color', '#f5f5f5');
};

/**
 * @param {number} max 颜色数目.
 * @return {Array.<string>}
 */
ad.test.Canvas.prototype._getColor = function(max) {
    function to_string(value) {
      var v = parseInt(value, 10);
      var s = v.toString(16);
      if (v <= 15) {
        return '0' + s;
      }
      return s;
    }

    function auto_color(max) {
      var colors = [];
      for (var i = 0; i < max; i++) {
        var red = (0xFF + Math.random() * 0xFF) / 2;
        var green = (0xFF + Math.random() * 0xFF) / 2;
        var blue = (0xFF + Math.random() * 0xFF) / 2;
        colors.push('#' + to_string(red) + to_string(green) + to_string(blue));
      }
      return colors;
    }
    return auto_color(max);
};

ad.test.Canvas.prototype.enableResizable = function() {
    return false;   // 暂时不开放接口...
    if (this._root) {
        baidu.dom.resizable(this._root, {
            'direction' : [/*"s","e","n","w","nw","ne","sw",*/'se']
        });
    }
};

/**
 * 允许放置元素
 */
ad.test.Canvas.prototype.enableDroppable = function() {
    var root = this._root;
    var me = this;
    baidu.dom.droppable(root, {
        'ondrop' : function(o) {
            me.blur();
            var trigger = o.trigger;
            var reciever = o.reciever;
            if (trigger) {
                var p1 = baidu.dom.getPosition(trigger);
                var p2 = baidu.dom.getPosition(reciever);
                var top = Math.max(p1.top - p2.top, 0);
                var left = Math.max(p1.left - p2.left, 0);

                var dt = trigger.querySelector('dt');
                if (dt) {
                    var name = dt.innerHTML;
                    var ns = dt.getAttribute('data-ns');

                    me.addWidget(new ad.test.Widget(name, 'width:300px;height:100px;top:' +
                        top + 'px;left:' + left + 'px;background:' + me._getColor(1)[0], ns));
                }
            }
        },
        'ondropover' : function(o) {
            var trigger = o.trigger;
            if (trigger && !baidu.dom.hasClass(trigger, 'widget')) {
                me.focus();
            }
        },
        'ondropout' : function() {
            me.blur();
        }
    });
};

/**
 * 样式布局信息
 */
ad.test.Canvas.prototype.genLayout = function() {
    var layout = ['<div class="layout">'];
    var widgetNodes = this._root.querySelectorAll('.widget');
    if (widgetNodes && widgetNodes.length) {
        baidu.array.each(widgetNodes, function(item,i) {
            layout.push('<div class="widget" style="' + item.style.cssText + '"></div>');
        });
    }
    layout.push('</div>');
    //return layout.join('');
    alert(layout.join(''));
};

/**
 * 清空画布
 */
ad.test.Canvas.prototype.clear = function() {
    this._root.innerHTML = '';
};

/**
 * 根据布局信息推算样式结构(模块组成情况)
 * @private
 */
ad.test.Canvas.prototype.getStyleByLayout = function() {
    var result = [];
    var widgetNodes = this._root.querySelectorAll('.widget');
    if (widgetNodes && widgetNodes.length) {
        baidu.array.each(widgetNodes, function(item,i) {
            var widget = {};
            widget['name'] = baidu.getAttr(item, 'data-name');
            widget['width'] = ad.dom.getStyle(item, 'width');
            widget['height'] = ad.dom.getStyle(item, 'height');
            widget['left'] = ad.dom.getStyle(item, 'left');
            widget['top'] = ad.dom.getStyle(item, 'top');
            result.push(widget);
        });
    }
    return result;
};

/**
 * 添加样式
 * @private
 */
ad.test.Canvas.prototype.addStyle = function(style) {
    var styles = this._styles;

    if (styles) {
        for (var i = 0; i < styles.length; i++) {
            if (style['name'] == styles[i]['name']) {
                styles[i]['style'] = style['style'];
                return;
            }
        }
        styles.push(style);
    }
};

/**
 * 加载样式
 * @private
 */
ad.test.Canvas.prototype.loadStyle = function(styleIndex) {
    var me = this,
        styles = this._styles;

    var style = styles[styleIndex], css, widget;
    if (style && style['style'] && style['style'].length) {
        baidu.array.each(style['style'], function(item,i) {
            css = 'width:' + item['width'] + ';height:' + item['height'] + ';left:' + item['left'] + ';top:' + item['top'] + ';background:blue;';
            widget = new ad.test.Widget(item['name'], css);
            me.addWidget(widget);
        });
    }

    this.enableDroppable();
};


/**
 * 样式下拉列表绑定
 */
ad.test.Canvas.prototype.bindStyleSelect = function() {
    var options = [],
        styles = this._styles;
    if (styles && styles.length) {
        baidu.array.each(styles, function(item,i) {
            options.push('<option value="' + i + '">' + item.name + '</option>');
        });
    }
    var root = baidu.g('sel-style');
    if (root) {
        root.innerHTML = options.join('');
    }
};

/**
 * 校验模块间是否有重叠,没有重叠返回真，否则为假
 * @param {Array.<ad.test.Widget>} style
 * @return {boolean}
 */
ad.test.Canvas.prototype.check = function(style) {
    var widgets = style, j = 0;
    if (widgets && widgets.length) {
        for (var i = 0 , len = widgets.length; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (this._checkOverlay(widgets[i], widgets[j])) {
                    return false;
                }
            }
        }
        return true;
    }
    return true;
};

/**
 * 判断指定的2个模块是否有重叠，有重叠返回真，否则为假
 * @param {ad.test.Widget} w1
 * @param {ad.test.Widget} w2
 * @return {boolean}
 */
ad.test.Canvas.prototype._checkOverlay = function(w1, w2) {
    var top_min, left_min, top_max, left_max, width1, height1, width2, height2;
    top_min = Math.min(parseInt(w1['top']), parseInt(w2['top']));
    left_min = Math.min(parseInt(w1['left']), parseInt(w2['left']));
    top_max = Math.max(parseInt(w1['top']) + parseInt(w1['height']), parseInt(w2['top']) + parseInt(w2['height']));
    left_max = Math.max(parseInt(w1['left']) + parseInt(w1['width']), parseInt(w2['left']) + parseInt(w2['width']));
    width1 = left_max - left_min;
    height1 = top_max - top_min;
    width2 = parseInt(w1['width']) + parseInt(w2['width']);
    height2 = parseInt(w1['height']) + parseInt(w2['height']);
    return (width1 < width2) && (height1 < height2);
};

/**
 * 分析渲染结果来填充模块属性面板
 */
ad.test.Canvas.prototype.setWidgetPropertyByRender = function() {
    var widget = this._curWidget;
    if (!widget) {
        return;
    }
    var txtW, txtH, txtL, txtT;
    txtW = baidu.g('txt-widget-property-width');
    txtH = baidu.g('txt-widget-property-height');
    txtL = baidu.g('txt-widget-property-left');
    txtT = baidu.g('txt-widget-property-top');
    txtW && (txtW.value = widget.getWidth());
    txtH && (txtH.value = widget.getHeight());
    txtL && (txtL.value = widget.getLeft());
    txtT && (txtT.value = widget.getTop());
};

/**
 * 分析模块属性面板重新渲染模块
 */
ad.test.Canvas.prototype.setWidgetPropertyForRender = function() {
    var widget = this._curWidget;
    if (!widget) {
        return;
    }
    var width, height, left, top;
    width = parseInt(baidu.g('txt-widget-property-width').value);
    height = parseInt(baidu.g('txt-widget-property-height').value);
    left = parseInt(baidu.g('txt-widget-property-left').value);
    top = parseInt(baidu.g('txt-widget-property-top').value);
    widget.setStyle('width:' + width + 'px;height:' + height + 'px;left:' + left + 'px;top:' + top + 'px;');
};

/**
 * 隐藏所有模块的预览(为了解决拖拽bug)
 */
ad.test.Canvas.prototype.hideAllPreview = function() {
    this._setPreviewStyle('none');
};

/**
 * 显示所有模块的预览(为了解决拖拽bug)
 */
ad.test.Canvas.prototype.showAllPreview = function() {
    this._setPreviewStyle('block');
};

/**
 * 设置所有模块预览的display属性
 * @param {string} style
 */
ad.test.Canvas.prototype._setPreviewStyle = function(style) {
    var iframes = this._root.querySelectorAll('iframe');
    if (iframes && iframes.length) {
        baidu.array.each(iframes, function(item,i) {
            baidu.setStyle(item, 'display', style);
        });
    }
};













/* vim: set ts=4 sw=4 sts=4 tw=100: */
