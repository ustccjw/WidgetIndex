/***************************************************************************
 *
 * Copyright (c) 2013 Baidu.com, Inc. All Rights Reserved
 * $Id: widget.js 10927 2012-08-05 07:35:29Z liyubei $
 *
 **************************************************************************/



/**
 * src/ad/widget/standard/tab_cont.js ~ 2013/10/26 20:40:54
 * @author liyubei@baidu.com (liyubei)
 * @version $Revision: 10927 $
 * @description
 * 高级样式——多TAB展现样式的内容
 **/

goog.require('ad.widget.Widget');

goog.include('ad/widget/standard/tab_cont.less');
goog.include('ad/widget/standard/tab_cont.html');

goog.provide('ad.widget.standard.TabCont');

/**
 * @constructor
 * @param {Object} data 数据集合.
 * @extends {ad.widget.Widget}
 */
ad.widget.standard.TabCont = function(data) {
    ad.widget.Widget.call(this, data);

    /**
     * 当前Widget的View模板名称.
     * @type {string}
     */
    this._view = 'AD_ad_widget_standard_tab_cont';
};
baidu.inherits(ad.widget.standard.TabCont, ad.widget.Widget);

/** @override */
ad.widget.standard.TabCont.prototype.enterDocument = function() {
    ad.widget.standard.TabCont.superClass.enterDocument.call(this);

    // CODE HERE
};

/** @override */
ad.widget.standard.TabCont.prototype.bindEvent = function() {
    ad.widget.standard.TabCont.superClass.bindEvent.call(this);

    // CODE HERE
};

/** @override */
ad.widget.standard.TabCont.prototype.patchData = function() {
    if (this._data) {
        this._data['_custom_data'] = new Date();
    }
}






















/* vim: set ts=4 sw=4 sts=4 tw=100: */
