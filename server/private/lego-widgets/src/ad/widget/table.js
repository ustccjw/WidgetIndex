/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: table.js 9607 2012-06-08 17:10:22Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/table.js ~ 2012/06/09 00:30:31
 * @author fanxueliang
 * @version $Revision: 9607 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/table.html');
goog.include('ad/widget/table.less');

goog.provide('ad.widget.Table');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.Table = function (data) {
    ad.widget.Widget.call(this, data);
    this._view = 'AD_ad_widget_table';
};
baidu.inherits(ad.widget.Table, ad.widget.Widget);

/**
 * @override
 */
ad.widget.Table.prototype.patchData = function () {
    baidu.array.each(this._data['head'], function (item, i) {
        item['column_count'] = parseInt(item['column_count'], 10) || 1;
    });

    var baseRowNumber = this._data['head'].length > 0 ? 2 : 1;
    baidu.array.each(this._data['body'], function (item, i) {
        var className = 'ec-row-' + i;
        if ((i % 2 == 1)) {
            className += ' ec-tr-bg';
        }
        item['class'] = className;

        baidu.array.each(item['tr'], function (item, j) {
            item['title2'] = '表格' + (baseRowNumber + i) + '-' + (j + 1);
        });
    });
};














/* vim: set ts=4 sw=4 sts=4 tw=100: */
