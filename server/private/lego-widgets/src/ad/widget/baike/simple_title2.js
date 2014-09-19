/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/baike/simple_title2.js ~ 2013/12/30 15:50:29
 * @author wdw0705@gmail.com (wangdawei04)
 * @version $Revision: 10927 $
 * @description
 * simple_title2相关的实现逻辑
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/baike/simple_title2.less');
goog.include('ad/widget/baike/simple_title2.html');

goog.provide('ad.widget.baike.SimpleTitle2');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.baike.SimpleTitle2 = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_baike_simple_title2';
};
baidu.inherits(ad.widget.baike.SimpleTitle2, ad.widget.Widget);

/**
 * @override 
 */
ad.widget.baike.SimpleTitle2.prototype.patchData = function() {
    ad.widget.baike.SimpleTitle2.superClass.patchData.call(this);

    var tags = this.getData('tags'), display;
    if (tags && tags.length) {
    	display = 'block';
    }
    else {
    	display = 'none';
    }
    //this.setData({'tag_display': display});
    this._data['tag_display'] = display;
};




















/* vim: set ts=4 sw=4 sts=4 tw=100: */
