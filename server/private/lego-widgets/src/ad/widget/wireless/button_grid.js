/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/button_grid.js ~ 2013/12/16 17:43:04
 * @author songao@baidu.com (songao)
 * @version $Revision: 150523 $
 * @description
 * button_grid相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/button_grid.less');
goog.include('ad/widget/wireless/button_grid.html');

goog.provide('ad.widget.wireless.ButtonGrid');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.ButtonGrid = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_button_grid';
};
baidu.inherits(ad.widget.wireless.ButtonGrid, ad.widget.Widget);

/** @override */
ad.widget.wireless.ButtonGrid.prototype.patchData = function() {
    var options = this.getData('options');
    var countPerRow = this.getData('count_per_row', 2);
    var grid = [];
    for (var i = 0; i < options.length; i++) {
        var rowIndex = parseInt(i / countPerRow, 10);
        var colIndex = i % countPerRow;
        if (!grid[rowIndex]) {
            grid[rowIndex] = [];
        }
        grid[rowIndex][colIndex] = {
            'text': options[i]['text'],
            'rcv_url': options[i]['rcv_url'],
            'cell_index': (i + 1)
        };
    }
    this._data['grid'] = grid;
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
