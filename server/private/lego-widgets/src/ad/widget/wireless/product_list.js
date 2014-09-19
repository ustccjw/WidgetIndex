/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/wireless/product_list.js ~ 2013/12/11 14:34:54
 * @author shaojunjie@baidu.com (shaojunjie)
 * @version $Revision: 10927 $
 * @description
 * product_list相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/wireless/product_list.less');
goog.include('ad/widget/wireless/product_list.html');

goog.provide('ad.widget.wireless.ProductList');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.wireless.ProductList = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_wireless_product_list';
};
baidu.inherits(ad.widget.wireless.ProductList, ad.widget.Widget);


/** @override */
ad.widget.wireless.ProductList.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
    if (this._data && this._data['options'] && this._data['options'].length) {
        baidu.each(this._data['options'], function(item, index1) {
            if (item) {
                item['_index1'] = index1 + 1;
            }
            if (item && item['list'] && item['list'].length) {
                baidu.each(item['list'], function(detail, index2) {
                    if (detail) {
                        detail['_index2'] = index2 + 1;
                    }
                });
            }
        });

        //解决：Middle，Small样式中产品列表需换行的问题
        baidu.each(this._data['options'], function(option) {
            if (option['list']) {
                option['lists'] = [];
                if (option['num_per_line']) {
                    var j = 0;
                    var arr = [];
                    baidu.each(option['list'], function(o) {
                        arr.push(o);
                        j++;
                        if (j === option['num_per_line']) {
                            option['lists'].push(arr);
                            j = 0;
                            arr = [];
                        }
                    });
                    if (arr.length > 0) {
                        option['lists'].push(arr);
                    }
                } else {
                    option['lists'].push(option['list']);
                }
            }
        });
    }


}



/* vim: set ts=4 sw=4 sts=4 tw=100: */