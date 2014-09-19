/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 150523 2012-10-30 10:06:05Z  $
 *
 **************************************************************************/



/**
 * src/ad/widget/image_grid.js ~ 2013/02/22 11:45:21
 * @author zhouminming01@baidu.com (zhouminming01)
 * @version $Revision: 150523 $
 * @description
 * image_grid相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/image_grid.less');
goog.include('ad/widget/image_grid.html');

goog.provide('ad.widget.ImageGrid');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.ImageGrid = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_image_grid';
};
baidu.inherits(ad.widget.ImageGrid, ad.widget.Widget);

/** @override */
ad.widget.ImageGrid.prototype.patchData = function() {
    if (this._data) {
        if (this._data['column']) {
            this._data['width'] = this._data['column'] * (this._data['grid_width'] + this._data['column_gap']);
        }

        var gridWidth = this._data['grid_width'];
        var gridHeight = this._data['grid_height'];
        var columnGap = this._data['column_gap'];
        var rowGap = this._data['row_gap'];
        var grids = this._data['grids'];
        var gridsNum = grids.length;
        var grid;
        for (var i=0, l=gridsNum; i<l; i++) {
            grid = grids[i];
            var w;
            var h;
            if (grid['space']) {
                var tmp = grid['space'].split('x');    // '2x2' ==> [2, 2]
                var columnN = parseInt(tmp[0], 10);
                var rowN = parseInt(tmp[1], 10);
                w = gridWidth * columnN + (columnN - 1) * columnGap;
                h = gridHeight * rowN + (rowN - 1) * rowGap;
            } else {
                w = gridWidth;
                h = gridHeight;
            }

            grid['width'] = w;
            grid['height'] = h;
        }
    }
};






















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
