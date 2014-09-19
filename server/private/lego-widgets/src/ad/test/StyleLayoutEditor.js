/***************************************************************************
 * 
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/ad/test/StyleLayoutEditor.js
 * desc:    
 * author:  leeight(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2012/11/27 18:40:42$
 */

goog.require('ui.LayoutEditor');
goog.provide('ad.test.StyleLayoutEditor');

/**
 * 样式编辑控件
 * @constructor
 * @extends {ui.InputControl}
 * @param {Object} options 控件初始化参数.
 */
ad.test.StyleLayoutEditor = function(options) {
    ui.LayoutEditor.call(this, options);

    this.prefix = 'ui-';
};
baidu.inherits(ad.test.StyleLayoutEditor, ui.LayoutEditor);

/**
 * @inheritDoc
 */
ad.test.StyleLayoutEditor.prototype.render = function(opt_main) {
    var me = this;

    if (me.datasource) {
        me._walker(me.datasource, function(cell) {
            cell.widgetId = cell.ns;
        });
    }

    ad.test.StyleLayoutEditor.superClass.render.call(me, opt_main);
};



/**
 * @inheritDoc
 */
ad.test.StyleLayoutEditor.prototype.initCellEvent = function() {
    var me = this;

    ad.test.StyleLayoutEditor.superClass.initCellEvent.call(this);
    me._bindDroppableEvent();
};

/**
 * 绑定droppable事件
 */
ad.test.StyleLayoutEditor.prototype._bindDroppableEvent = function() {
    var me = this;
    var leaves = baidu.q('is-leaf', me.canvasContainer, 'div');
    me._dropActives = [];
    baidu.array.each(
        leaves,
        function(cell){
            baidu.dom.droppable(
                cell,
                {
                    ondropover: function(target) {
                        me._dropActives.push(target.reciever);
                    },
                    ondropout: function(target) {
                        baidu.array.remove(me._dropActives, target.reciever);
                    },
                    ondrop: function(target) {
                        me._dropActives = [];
                        //XXX: tangram里有拼写错误... reciever应该为receiver...
                        var receiver = target.reciever;
                        var trigger = target.trigger;
                        var ns = baidu.dom.getAttr(baidu.dom.query('dt', trigger)[0], 'data-ns');
                        me._saveWidget(receiver, ns);
                    }
                }
            );
        }
    );
};

/**
 * 保存drop的widget
 */
ad.test.StyleLayoutEditor.prototype._saveWidget = function(cell, ns) {
    var me = this;
    var cellObj = me.getCellObj(cell.id);
    // 保存选择的widget
    me.widgets[ns] = me._treeWidgets[ns];
    cellObj.widgetId = ns;
    me.renderLayout();
    //重新选中原来选择了的单元格
    me.handleCellClick(cell);
    me.trigger(ui.events.CHANGE);
};

/**
 * @inheritDoc
 */
ad.test.StyleLayoutEditor.prototype.getValue = function(opt_raw) {
    var value = ad.test.StyleLayoutEditor.superClass.getValue.call(this, true);

    this._walker(value, function(cell) {
        cell.ns = cell.widgetId;
        delete cell.widgetId;
    });
    return opt_raw ? value : baidu.json.stringify(value);
};

/**
 * 获取布局中的模块
 * @return {Array}
 */
ad.test.StyleLayoutEditor.prototype.getStyleWidgets = function() {
    var me = this;
    var layout = me.getValue(true);
    var map = {};

    me._walker(layout, function(cell, key) {
        map[key] = cell;
    });

    return map;
};

/**
 * 遍历布局的单元格
 */
ui.LayoutEditor.prototype._walker = function(template, callback) {
    var me = this;
    var templateWidth = template.width;
    var templateHeight = template.height;
    var rows = template.rows;
    if (rows && rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cols = row.cols;
            var rowId = 'r' + i;
            if (cols && cols.length > 0) {
                for (var j = 0; j < cols.length; j++) {
                    var col = cols[j];
                    var colId = rowId + 'c' + j;
                    callback(col, colId);
                }
            } else {
                callback(row, rowId);
            }
        }
    }
};











/* vim: set ts=4 sw=4 sts=4 tw=100 : */
