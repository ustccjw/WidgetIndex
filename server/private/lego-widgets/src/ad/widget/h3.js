/***************************************************************************
 *
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * $Id: h3.js 10980 2012-08-07 15:56:13Z fanxueliang $
 *
 **************************************************************************/



/**
 * src/ad/widget/h3.js ~ 2012/06/08 13:23:19
 * @author loutongbing
 * @version $Revision: 10980 $
 * @description
 *
 **/
goog.require('ad.widget.Widget');

goog.include('ad/widget/h3.html');
goog.include('ad/widget/h3.less');

goog.provide('ad.widget.H3');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.H3 = function(data) {
    ad.widget.Widget.call(this, data);

    this._view = 'AD_ad_widget_h3';
};
baidu.inherits(ad.widget.H3, ad.widget.Widget);

/** @override */
ad.widget.H3.prototype.enterDocument = function() {
    ad.widget.H3.superClass.enterDocument.call(this);

    var links = baidu.g(this.getId('table')).getElementsByTagName('A');
    if (links.length) {
        for (var i = 0, l = links.length; i < l; i++) {
            var td = links[i].parentNode;
            // 因为存在表头，所以是第二行
            var tr = td.parentNode;

            links[i].setAttribute('title2',
                '表格' + (tr.rowIndex + 1) + '-' + (td.cellIndex + 1));
        }
    }
};



















/* vim: set ts=4 sw=4 sts=4 tw=100: */
